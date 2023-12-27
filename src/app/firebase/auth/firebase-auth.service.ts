import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private platform: Platform,
    ) { }

     // Sign Up
  async signUp(email: string, password: string): Promise<void> {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Login
  async login(email: string, password: string): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Logout
  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  // Forgot Password
  async forgotPassword(email: string): Promise<void> {
    await this.afAuth.sendPasswordResetEmail(email);
  }

  //Login with google/ other socials
  async socialSignIn(provider: firebase.auth.AuthProvider): Promise<any> {
    if (this.platform.is('desktop')) {
      return this.signInWithPopup(provider);
    } else {
      return this.signInWithRedirect(provider);
    }
  }

  private async signInWithPopup(provider: firebase.auth.AuthProvider): Promise<any> {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      return result;
    } catch (error) {
      // Handle error
      console.error('Error signing in with popup:', error);
      throw error;
    }
  }

  private async signInWithRedirect(provider: firebase.auth.AuthProvider): Promise<any> {
    try {
      await this.afAuth.signInWithRedirect(provider);
      // Redirect will happen automatically
    } catch (error) {
      // Handle error
      console.error('Error signing in with redirect:', error);
      throw error;
    }
  }
}
