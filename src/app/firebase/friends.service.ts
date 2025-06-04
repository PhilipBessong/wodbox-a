// friends.service.ts
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of, forkJoin,from, throwError} from 'rxjs';
import { FirebaseAuthService, User } from './auth/firebase-auth.service';
import { arrayUnion, writeBatch, doc, deleteDoc, getFirestore, arrayRemove } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  currentUser$: any;

  constructor(private afs: AngularFirestore, private auth: FirebaseAuthService) {}

   sendMotivation(senderId: string, receiverId: string, fName: string, lName: string, dpImage: string) {
  return this.afs
    .collection('motivations')
    .add({
      message: `${fName} ${lName} wants you motivated!`,
      senderId,
      timestamp: new Date(),
      dpImage
    });
}


  sendFriendRequest(senderId: string, receiverId: string, senderfName: string | null | undefined, senderlName: string | null | undefined,senderDp: string | null | undefined) {
    return this.afs.collection('friendRequests').add({
      sender: senderId,
      receiver: receiverId,
      fName: senderfName || 'Unknown', // Provide a default value
      lName: senderlName || '', // Provide a default value
      senderDp: senderDp || 'default.jpg', // Store sender's profile image
      status: 'pending', 
      timestamp: new Date(),
    });
  }
  
  getFriendRequests(): Observable<any[]> {
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        if (!user) return of([]);
  
        return this.afs
          .collection('friendRequests', (ref) => ref.where('receiver', '==', user.uid))
          .snapshotChanges()
          .pipe(
            switchMap((actions) => {
              if (!actions.length) return of([]);
  
              const requests = actions.map((a) => {
                const id = a.payload.doc.id;
                const requestData: any = a.payload.doc.data();
                return { id, ...requestData };
              });
  
              // Fetch sender details
              const senderRequests = requests.map((req) =>
                this.afs
                  .collection('users')
                  .doc<User>(req.sender)
                  .valueChanges()
                  .pipe(
                    map((senderData) => {
                      if (!senderData) {
                        console.error('Sender data not found for:', req.sender);
                      }
                      return {
                        ...req,
                        senderFname: senderData?.fName || 'Unknown',
                        senderLname: senderData?.lName || '',
                        senderImage: senderData?.dpImage || 'default.jpg',
                      };
                    })
                  )
              );
  
              return senderRequests.length ? forkJoin(senderRequests) : of([]);
            })
          );
      })
    );
  }
  
  // ✅ Accept Friend Request: Add both users to each other's friends list & delete request
  acceptFriendRequest(requestId: string, senderId: string): Observable<void> {
    return this.auth.getCurrentUser().pipe(
      switchMap((user) => {
        if (!user) throw new Error('User not found');
        const receiverId = user.uid;
        const db = getFirestore();

        // Get Firestore document references
        const senderRef = doc(db, `users/${senderId}`);
        const receiverRef = doc(db, `users/${receiverId}`);
        const requestRef = doc(db, `friendRequests/${requestId}`);

        // Firestore batch update
        const batch = writeBatch(db);
        batch.update(senderRef, { friends: arrayUnion(receiverId) });
        batch.update(receiverRef, { friends: arrayUnion(senderId) });
        batch.delete(requestRef); // Delete the request

        return from(batch.commit()); // Execute Firestore batch operation
      })
    );
  }
  

  declineFriendRequest(requestId: string) {
    return this.afs.doc(`friendRequests/${requestId}`).delete();
  }

  unfriend(userIdToRemove: string): Observable<void> {
    return this.auth.getCurrentUser().pipe(
      switchMap((currentUser) => {
        if (!currentUser) throw new Error('User not logged in');
        
        const db = getFirestore();
        const currentUserRef = doc(db, `users/${currentUser.uid}`);
        const targetUserRef = doc(db, `users/${userIdToRemove}`);
  
        const batch = writeBatch(db);
  
        // Remove each user from the other's friends list
        batch.update(currentUserRef, { friends: arrayRemove(userIdToRemove) });
        batch.update(targetUserRef, { friends: arrayRemove(currentUser.uid) });
  
        return from(batch.commit());
      })
    );
  }
  

  

  
  
}
