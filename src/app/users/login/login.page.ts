import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/firebase/auth/firebase-auth.service';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  stayLoggedIn: boolean = false;

  constructor(
    private authService: FirebaseAuthService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.create();
    this.checkStayLoggedIn();
  }

  async login() {
    try {
      await this.authService.login(this.email, this.password);

      // If stay logged in is checked, save login state
      if (this.stayLoggedIn) {
        await this.storage.set('stayLoggedIn', true);
        await this.storage.set('email', this.email);
      } else {
        await this.storage.remove('stayLoggedIn');
        await this.storage.remove('email');
      }

      // Display success message and navigate
      this.presentToast('Login successful');

      // Clear inputs after successful login
      this.email = '';
      this.password = '';
    } catch (error) {
      console.error('Login error:', error);
      this.presentToast('Login failed. Please check your credentials.');
    }
  }


  async checkStayLoggedIn() {
    const stayLoggedIn = await this.storage.get('stayLoggedIn');
    if (stayLoggedIn) {
      this.email = await this.storage.get('email');
      // Optionally set stayLoggedIn to true if they had it saved
      this.stayLoggedIn = true;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Display duration in milliseconds
    });
    toast.present();
  }
  
  // Add this property to toggle password visibility
showPassword: boolean = false;

// Function to toggle password visibility
togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}


  tocreate() {
    // Example of navigating programmatically with relative paths
    this.navCtrl.navigateForward(['./signup']);
  }
}

