import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/firebase/auth/firebase-auth.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private authService: FirebaseAuthService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      // Redirect to client homepage after successful login
      this.navCtrl.navigateRoot('/chome');
      
      // Display success message
      this.presentToast('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      // Show error message to the user
      this.presentToast('Login failed. Please check your credentials.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000 // Display duration in milliseconds
    });
    toast.present();
  }
}