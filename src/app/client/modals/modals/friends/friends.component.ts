import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import {
  Observable,
  BehaviorSubject,
  of,
  firstValueFrom,
  forkJoin,
} from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap, map, take } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { FriendsService } from 'src/app/firebase/friends.service';
import {
  FirebaseAuthService,
  User,
} from 'src/app/firebase/auth/firebase-auth.service';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {
  friendRequests$: Observable<any[]> | undefined;
  private searchTermSubject = new BehaviorSubject<string>('');
  users: Observable<any[]>;
  friends: any[] = [];
  motives: any[] = [];
  motivations$: Observable<any[]> = of([]);

  constructor(
    private authService: FirebaseAuthService,
    private modalController: ModalController,
    private firestore: AngularFirestore,
    private friendsService: FriendsService,
    private toastController: ToastController
  ) {
    this.users = this.firestore.collection('users').valueChanges();
  }
  ngOnInit() {
    this.friendRequests$ = this.getFriendRequests();
    this.loadFriends();
    //this.loadMotives();
    this.users = this.searchTermSubject.pipe(
      switchMap((searchTerm) => {
        if (searchTerm && searchTerm.trim() !== '') {
          return this.firestore
            .collection('users', (ref) =>
              ref
                .where('email', '>=', searchTerm)
                .where('email', '<=', searchTerm + '\uf8ff')
            )
            .snapshotChanges()
            .pipe(
              map((actions) =>
                actions.map((a) => {
                  const id = a.payload.doc.id;
                  const data: any = a.payload.doc.data();
                  return { id, ...data };
                })
              )
            );
        } else {
          return []; // Return an empty array if searchTerm is empty
        }
      })
    );
    this.friendsService.deleteOldMotivations().catch((err) => {
      console.error('Failed to delete old motivations:', err);
    });
    this.authService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((currentUser) => {
        if (currentUser?.uid) {
          this.motivations$ = this.firestore
            .collection(
              'motivations',
              (ref) => ref.where('friendId', '==', currentUser.uid)
              //.orderBy('timestamp', 'desc')
            )
            .snapshotChanges()
            .pipe(
              map((actions) => {
                return actions.map((a) => {
                  const data: any = a.payload.doc.data();
                  const id = a.payload.doc.id;
                  return { id, ...data };
                });
              })
            );
        }
      });
  }
  getFriendRequests(): Observable<any[]> {
    return this.authService.getCurrentUser().pipe(
      switchMap((user) => {
        if (!user) return of([]); // If no user is logged in, return an empty array

        return this.firestore
          .collection('friendRequests', (ref) =>
            ref.where('receiver', '==', user.uid)
          )
          .snapshotChanges() // Use snapshotChanges() to include document IDs
          .pipe(
            map((actions) => {
              return actions.map((a) => {
                const data = a.payload.doc.data() as any;
                const id = a.payload.doc.id;
                return {
                  id,
                  senderId: data.sender,
                  senderFname: data.fName || 'Unknown',
                  senderLname: data.lName || '',
                  senderDp: data.senderDp || '',
                  status: data.status,
                };
              });
            })
          );
      })
    );
  }
  loadFriends() {
    this.authService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((currentUser) => {
        if (currentUser?.uid) {
          this.firestore
            .doc(`users/${currentUser.uid}`)
            .valueChanges()
            .pipe(take(1))
            .subscribe((userData: any) => {
              const friendUIDs: string[] = userData?.friends || [];

              if (friendUIDs.length > 0) {
                const friendChunks = this.chunkArray(friendUIDs, 10); // Max 10 per Firestore query
                const observables = friendChunks.map((chunk) =>
                  this.firestore
                    .collection('users', (ref) =>
                      ref.where(
                        firebase.firestore.FieldPath.documentId(),
                        'in',
                        chunk
                      )
                    )
                    .valueChanges({ idField: 'id' })
                    .pipe(take(1))
                );

                // Combine all chunk results into one array
                forkJoin(observables).subscribe((chunkedResults: any[][]) => {
                  this.friends = chunkedResults.reduce(
                    (acc, curr) => acc.concat(curr),
                    []
                  );
                });
              } else {
                this.friends = [];
              }
            });
        }
      });
  }

  loadMotives() {
    this.authService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((currentUser) => {
        if (currentUser?.uid) {
          this.firestore
            .doc(`users/${currentUser.uid}`)
            .valueChanges()
            .pipe(take(1))
            .subscribe((userData: any) => {
              const motiveUIDs: string[] = userData?.motives || [];
              if (motiveUIDs.length > 0) {
                this.firestore
                  .collection('users', (ref) =>
                    ref.where(
                      firebase.firestore.FieldPath.documentId(),
                      'in',
                      motiveUIDs.slice(0, 10) // Firestore allows max 10 items for 'in'
                    )
                  )
                  .valueChanges({ idField: 'id' })
                  .subscribe((motiveList: any[]) => {
                    this.motives = motiveList;
                  });
              } else {
                this.motives = [];
              }
            });
        }
      });
  }
  motivateAllFriends() {
    this.authService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe(async (currentUser: User | null) => {
        if (!currentUser?.uid) return;

        const senderId = currentUser.uid;

        // 🔥 Fetch full user profile from Firestore
        const userDoc = await firstValueFrom(
          this.firestore.doc(`users/${senderId}`).valueChanges()
        );

        const fName = (userDoc as any)?.fName || '';
        const lName = (userDoc as any)?.lName || '';
        const dpImage = (userDoc as any)?.dpImage || '';

        const sendPromises = this.friends.map((friend) => {
          return this.friendsService.sendMotivation(
            senderId,
            friend.id,
            fName,
            lName,
            dpImage
          );
        });

        try {
          await Promise.all(sendPromises);
          this.showToast('Motivations sent to all friends!');
        } catch (error) {
          console.error('Error sending motivations:', error);
          this.showToast('Failed to send some motivations.');
        }
      });
  }

  chunkArray<T>(arr: T[], chunkSize: number): T[][] {
    const results: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      results.push(arr.slice(i, i + chunkSize));
    }
    return results;
  }

  searchUsers(event: any) {
    const searchTerm: string = event.target.value.toLowerCase();
    this.searchTermSubject.next(searchTerm);
  }

  sendFriendRequest(receiverId: string, receiverEmail: string) {
    this.authService.getCurrentUser().subscribe(async (user) => {
      if (!user) {
        this.showToast('You must be logged in to send friend requests.');
        return;
      }

      if (user.uid === receiverId) {
        this.showToast('You cannot send a friend request to yourself.');
        return;
      }

      try {
        // Fetch user details once
        const snapshot = await firstValueFrom(
          this.firestore.collection('users').doc(user.uid).get()
        );
        if (snapshot.exists) {
          const senderData: any = snapshot.data();
          const senderFname = senderData?.fName || 'Unknown';
          const senderLname = senderData?.lName || '';
          const senderDp = senderData?.dpImage || 'assets/default.jpg';

          // Send friend request
          await this.friendsService.sendFriendRequest(
            user.uid,
            receiverId,
            senderFname,
            senderLname,
            senderDp
          );
          this.showToast(`Friend request sent to ${receiverEmail}`);
        } else {
          this.showToast('User details not found.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        this.showToast('Failed to send friend request');
      }
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
  onFriendClick(friend: User) {
    // Handle friend click event here
  }
  acceptRequest(requestId: string, senderId: string) {
    this.friendsService.acceptFriendRequest(requestId, senderId).subscribe(
      () => {
        console.log('Friend request accepted successfully');
      },
      (error) => {
        console.error('Error accepting friend request:', error);
      }
    );
  }

  declineRequest(requestId: string) {
    this.friendsService.declineFriendRequest(requestId).then(() => {
      console.log('Friend request declined');
    });
  }

  unFriend(friendId: string) {
    this.friendsService.unfriend(friendId).subscribe({
      next: () => {
        console.log('Successfully unfriended');
        // Optionally show a toast, alert, or update local UI
      },
      error: (err) => {
        console.error('Error unfriending user:', err);
      },
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }
  invfrmview: boolean = false;
  openinvfrm() {
    this.invfrmview = true;
  }
  closeinvfrm() {
    this.invfrmview = false;
  }
}
