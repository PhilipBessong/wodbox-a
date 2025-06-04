import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, ModalController } from '@ionic/angular';
import {
  FirebaseAuthService,
  User,
} from 'src/app/firebase/auth/firebase-auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  user: User | null = null;
  profileImageUrl: string = '';
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private toastController: ToastController,
    private firebaseAuthService: FirebaseAuthService,
    private alertController: AlertController,
    private storage: AngularFireStorage,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.profileForm = this.fb.group({
      fName: [{ value: '', disabled: true }, Validators.required],
      lName: [{ value: '', disabled: true }, Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  editingEnabled = false; // Track whether editing is enabled
  isPassChange = false; // Track whether password change is enabled
  dismissModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {
    this.firebaseAuthService.currentUser$.subscribe((user) => {
      this.user = user;
      if (user) {
        this.profileImageUrl = user.dpImage || '';
        this.profileForm.patchValue({
          email: user.email ?? '',
          fName: user.fName ?? '',
          lName: user.lName ?? '',
        });
      }
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Profile Options',
      buttons: [
        {
          text: 'Change Picture',
          icon: 'image-outline',
          handler: () => {
            this.uploadImage();
          }
        },
        {
          text: 'Delete Picture',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.confirmRemoveImage();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
  
  changePicture() {
    console.log('Change Picture clicked');
    // Implement your logic to change the picture (e.g., open file picker or camera)
  }

  
  uploadImage() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const filePath = `userImages/${this.user?.email}_${Date.now()}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
  
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log('File uploaded, download URL:', url); // Debugging
  
            this.firebaseAuthService.getCurrentUser().subscribe(user => {
              if (!user || !user.uid) {
                console.error('User not found or missing UID!');
                return;
              }
  
              this.firebaseAuthService
                .updateUser(user.uid, { dpImage: url })
                .then(() => {
                  console.log('User updated successfully in Firestore');
                  this.showToast('Profile picture updated successfully');
                })
                .catch((error) => {
                  console.error('Error updating user in Firestore:', error);
                  this.showToast('Failed to update profile picture');
                });
            });  // **✅ Properly closed `subscribe()`**
          });
        })
      ).subscribe();
    }
  }
  

  async confirmRemoveImage() {
    const alert = await this.alertController.create({
      header: 'Remove Profile Picture',
      message: 'Are you sure you want to remove your profile picture?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Remove image cancelled');
          },
        },
        {
          text: 'Remove',
          handler: () => {
            this.removeImage();
          },
        },
      ],
    });

    await alert.present();
  }

  removeImage() {
    const filePath = `users/${this.user?.uid}/profile.jpg`;
    const fileRef = this.storage.ref(filePath);

    fileRef.delete().subscribe(
      () => {
        this.profileImageUrl = '';
        if (this.user) {
          this.firebaseAuthService.updateUser(this.user.uid, { dpImage: '' });
        }
        this.showToast('Profile picture removed successfully');
      },
      (error) => {
        console.error('Error removing image:', error);
        this.showToast('Failed to remove profile picture');
      }
    );
  }

  enableEditing() {
    this.isEditing = true;
    this.profileForm.enable(); // Enables all form controls
  }
  cancelEditing() {
    this.isEditing = false;
    this.profileForm.disable(); // Disables all form controls
  }
  enablePassChange() {
    this.isPassChange = true;
  }
  async updateProfile() {
    if (this.user && this.profileForm?.valid) {
      try {
        const updatedEmail = this.profileForm.value.email;
        if (updatedEmail !== this.user.email) {
          await this.firebaseAuthService.updateEmail(updatedEmail);
        }
        await this.firebaseAuthService.updateUser(
          this.user.uid,
          this.profileForm.value
        );
        this.showToast('Profile updated successfully');
      } catch (error) {
        this.showToast('Failed to update profile');
      }
    }
    this.isEditing = false;
    this.profileForm.disable(); // Disables all form controls after updating
  }
  async changePassword() {
    const { newPassword, confirmPassword } = this.passwordForm.value;
    if (newPassword === confirmPassword) {
      try {
        await this.firebaseAuthService.changePassword(newPassword);
        this.showToast('Password changed successfully');
      } catch (error) {
        this.showToast('Failed to change password');
      }
    } else {
      this.showToast('Passwords do not match');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
