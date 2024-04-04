import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/firebase/auth/firebase-auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
})
export class AdduserPage implements OnInit {
  email: string = '';
  password: string = '';
  usertype: string = '';
  constructor(
    private authService: FirebaseAuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async signUp() {
    try {
      await this.authService.signUp(this.email, this.password, this.usertype);
      await this.presentSuccessToast('Sign up successful! Please login.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Sign up error:', error);
      // Handle error: display a message to the user
      await this.presentErrorToast('Sign up failed. Please try again.');
    }
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
  backtoWarmUp(){
    this.router.navigate(['/ahome']);
  }

}
