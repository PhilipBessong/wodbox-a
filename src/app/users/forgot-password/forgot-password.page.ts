import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/firebase/auth/firebase-auth.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string = '';
  constructor(
    private authService: FirebaseAuthService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async forgotPassword(): Promise<void> {
    try {
      await this.authService.forgotPassword(this.email);

      const toast = await this.toastController.create({
        message: 'An email has been sent with password reset instructions.',
        duration: 5000,
        position: 'bottom'
      });
      toast.present();

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } catch (error) {
      console.error('Error sending password reset email:', error);

      const toast = await this.toastController.create({
        message: 'Error sending password reset email. Please try again.',
        duration: 5000,
        position: 'bottom'
      });
      toast.present();
    }
  }
}
