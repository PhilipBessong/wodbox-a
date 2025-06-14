import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/firebase/auth/firebase-auth.service';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { FriendsComponent } from 'src/app/client/modals/modals/friends/friends.component';
import { ProfileComponent } from 'src/app/client/modals/profile/profile.component';
import { AlertController } from '@ionic/angular';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-chome',
  templateUrl: './chome.page.html',
  styleUrls: ['./chome.page.scss'],
})
export class ChomePage implements OnInit {
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private menu: MenuController,
    private firestore: AngularFirestore,
    private modalController: ModalController,
    private authService: FirebaseAuthService,
    private alertCtrl: AlertController
  ) {}

  errorMessage: string = '';
  friendRequests$: Observable<any[]> | undefined;
  hasFriendRequests: boolean = false;
  hasMotivations: boolean = false;
  ngOnInit() {
    this.friendRequests$ = this.getFriendRequests();
    this.friendRequests$.subscribe((requests) => {
      this.hasFriendRequests = requests && requests.length > 0;
    });

    this.authService.getCurrentUser().pipe(take(1)).subscribe((user) => {
    if (user?.uid) {
      this.firestore
        .collection('motivations', (ref) =>
          ref.where('friendId', '==', user.uid)
        )
        .valueChanges()
        .subscribe((motivations: any[]) => {
          this.hasMotivations = motivations.length > 0;
        });
    }
  });
  }
  
  // Logout Method with Confirmation Popup
  async onLogout(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Logout cancelled');
          },
        },
        {
          text: 'Logout',
          handler: async () => {
            try {
              await this.authService.logout();
              console.log('Logout successful');
            } catch (error) {
              this.errorMessage = 'Error during logout. Please try again.';
              console.error('Error during logout:', error);
            }
          },
        },
      ],
    });

    await alert.present();
  }
 
  toWarmup() {
    this.router.navigate(['/warmup']);
  }
  toWOD() {
    this.router.navigate(['/wod']);
  }
  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  openMenu() {
    this.menu.open();
  }

  closeMenu() {
    this.menu.close();
  }
  async openFriendsModal() {
    const modal = await this.modalController.create({
      component: FriendsComponent,
    });
     modal.onDidDismiss().then(() => {
    this.hasFriendRequests = false; // Remove red dot after dismiss
    this.hasMotivations = false; // Remove red dot after dismiss
  });
    return await modal.present();
  }
  async openProfileModal() {
    const modal = await this.modalController.create({
      component: ProfileComponent,
    });
    return await modal.present();
  }

   getFriendRequests(): Observable<any[]> {
      return this.authService.getCurrentUser().pipe(
        switchMap((user) => {
          if (!user) return of([]); // If no user is logged in, return an empty array
    
          return this.firestore
            .collection('friendRequests', (ref) => ref.where('receiver', '==', user.uid))
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
                    senderDp: data.senderDp  || '',
                    status: data.status,
                  };
                });
              })
            );
        })
      );
    }

    
}
