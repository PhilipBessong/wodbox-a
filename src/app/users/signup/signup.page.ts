import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/firebase/auth/firebase-auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  fName: string='';
  lName: string='';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  profileImage: string = ''; // URL of uploaded image
  selectedFile: File | null = null;
  usertype: string = 'client'
  constructor(
    private authService: FirebaseAuthService,
    private router: Router,
    private toastController: ToastController,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
  }

  async signUp() {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      await this.presentErrorToast("Passwords do not match. Please try again.");
      return;
    }
  
    // Ensure all required fields are provided
    if (!this.email || !this.password || !this.fName || !this.lName) {
      await this.presentErrorToast("Please fill out all required fields.");
      return;
    }
  
    try {
      // Attempt sign up
      let profileImageUrl = '';
      if (this.selectedFile) {
        profileImageUrl = await this.uploadProfileImage();
      }
      await this.authService.signUp(this.email, this.password, this.usertype, this.fName, this.lName, profileImageUrl);
      await this.presentSuccessToast('Sign up successful! Please login.');
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Sign up error:', error);
  
      // Handle error based on the available error message
      const errorMessage = error?.message || 'Sign up failed. Please try again.';
      await this.presentErrorToast(errorMessage);
    }
  }


  selectImage() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async uploadProfileImage(): Promise<string> {
    if (!this.selectedFile) return '';

    const filePath = `userImages/${this.email}_${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedFile);

    await task.snapshotChanges().pipe(finalize(() => {})).toPromise();
    return fileRef.getDownloadURL().toPromise();
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'success'
    });
    toast.present();
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: 'danger'
    });
    toast.present();
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
