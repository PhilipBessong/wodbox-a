import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private firestore: AngularFirestore,
    private router: Router
    ) { }

     // Sign Up
     async signUp(email: string, password: string, usertype: string): Promise<void> {
      try {
        const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
        if (credential && credential.user) {
          await this.createUserInFirestore(credential.user.uid, email, usertype);
        }
      } catch (error) {
        // Handle error
        console.error('Error creating user:', error);
        throw error;
      }
    }
    
    async createUserInFirestore(userId: string, email: string, usertype: string): Promise<void> {
      try {
        // Add the user to the 'users' collection with email and usertype fields
        await this.firestore.collection('users').doc(userId).set({
          email,
          usertype
        });
      } catch (error) {
        // Handle error
        console.error('Error adding user to Firestore:', error);
        throw error;
      }
    }
    
    

  // Login
  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (userCredential && userCredential.user) {
        const userId = userCredential.user.uid;
        const userData = await this.getUserDataFromFirestore(userId);
  
        if (userData && userData.usertype) {
          // Navigate based on usertype
          this.navigateBasedOnUserType(userData.usertype);
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }
  
  async getUserDataFromFirestore(userId: string): Promise<any> {
    try {
      const userDoc = await this.firestore.collection('users').doc(userId).get().toPromise();
      if (userDoc) {
        return userDoc.data();
      } else {
        throw new Error('User document does not exist');
      }
    } catch (error) {
      console.error('Error fetching user data from Firestore:', error);
      throw error;
    }
  }
  
  

  navigateBasedOnUserType(usertype: string): void {
    switch (usertype) {
      case 'admin':
        this.router.navigate(['/ahome']); // Navigate to admin homepage
        break;
      case 'client':
        this.router.navigate(['/chome']); // Navigate to user homepage
        break;
      // Add more cases for other usertypes if needed
      default:
        // Navigate to a default homepage if the usertype doesn't match any case
        this.router.navigate(['/default-home']);
        break;
    }
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
