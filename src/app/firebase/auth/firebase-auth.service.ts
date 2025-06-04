import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { switchMap, filter, catchError, map, take } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string | null; // Allow email to be string | null
  fName?: string;
  lName: string;
  dpImage?: string;
  friends?: string[];
  friendInvites?: string[];
  motives?: string[];
  usertype?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  user$!: Observable<User | null>;
  currentUser$: Observable<User | null>;
  constructor(
    private afAuth: AngularFireAuth,
    @Inject(Platform) private platform: Platform,
    private firestore: AngularFirestore,
    @Inject(Router) private router: Router
  ) {
    // Set up observable to track current user
    this.currentUser$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore
            .collection<User>('users')
            .doc<User>(user.uid)
            .valueChanges()
            .pipe(catchError(() => of(null)));
        } else {
          return of<User | null>(null);
        }
      })
    ) as Observable<User | null>;
  }
  // Method to retrieve friend invites for the current user
  getFriendInvites(): Observable<string[]> {
    return this.currentUser$.pipe(
      map((user) => (user ? user.friendInvites || [] : [])) // Return friend invites or an empty array
    );
  }

  // Method to accept a friend invite
  acceptFriendInvite(inviteUid: string): Observable<void> {
    return this.currentUser$.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          const userRef = this.firestore.collection('users').doc(user.uid);
          return from(
            userRef.update({
              friends: firebase.firestore.FieldValue.arrayUnion(inviteUid),
              friendInvites:
                firebase.firestore.FieldValue.arrayRemove(inviteUid),
            })
          ).pipe(
            map(() => undefined) // Cast Observable<unknown> to Observable<void>
          );
        } else {
          return of(undefined);
        }
      })
    );
  }
  // Method to decline a friend invite
  declineFriendInvite(inviteUid: string): Observable<void> {
    return this.currentUser$.pipe(
      take(1),
      switchMap((user) => {
        if (user) {
          const userRef = this.firestore.collection('users').doc(user.uid);
          return from(
            userRef.update({
              friendInvites:
                firebase.firestore.FieldValue.arrayRemove(inviteUid),
            })
          ).pipe(
            map(() => undefined) // Cast Observable<unknown> to Observable<void>
          );
        } else {
          return of(undefined);
        }
      })
    );
  }
  private updateUserData(
    user: firebase.User | null,
    fName: string
  ): Promise<void> | undefined {
    if (!user) return;
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email ?? '', // Provide a default empty string if email is null
      fName,
      friends: [],
      friendInvites: [],
      lName: '',
    };
    return userRef.set(data, { merge: true });
  }

  // Sign Up
  async signUp(
    email: string,
    password: string,
    usertype: string,
    fName: string,
    lName: string,
    profileImage: string
  ) {
    const { user } = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (user) {
      const userData: User = {
        uid: user.uid,
        email: user.email,
        fName,
        lName,
        usertype,
        dpImage: profileImage, // Store profile image URL
      };
      await this.firestore.collection('users').doc(user.uid).set(userData);
    }
  }

  async createUserInFirestore(
    userId: string,
    email: string,
    usertype: string,
    fName: string,
    lName: string
  ): Promise<void> {
    try {
      // Add the user to the 'users' collection with email and usertype fields
      await this.firestore.collection('users').doc(userId).set({
        email,
        usertype,
        fName,
        lName,
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
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
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
      const userDoc = await this.firestore
        .collection('users')
        .doc(userId)
        .get()
        .toPromise();
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
    try {
      await this.afAuth.signOut();
      console.log('User logged out successfully.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
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

  private async signInWithPopup(
    provider: firebase.auth.AuthProvider
  ): Promise<any> {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      return result;
    } catch (error) {
      // Handle error
      console.error('Error signing in with popup:', error);
      throw error;
    }
  }

  private async signInWithRedirect(
    provider: firebase.auth.AuthProvider
  ): Promise<any> {
    try {
      await this.afAuth.signInWithRedirect(provider);
      // Redirect will happen automatically
    } catch (error) {
      // Handle error
      console.error('Error signing in with redirect:', error);
      throw error;
    }
  }

  getCurrentUser(): Observable<User | null> {
    return this.afAuth.authState.pipe(
      map((user) => {
        if (user) {
          return {
            uid: user.uid,
            email: user.email,
            lName: '', // Provide a default value for lName
            fName: user.displayName || undefined,
            dpImage: user.photoURL || undefined,
            friends: [],
            motives: [],
            friendInvites: [],
          } as User;
        } else {
          return null;
        }
      })
    );
  }
  async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    try {
      console.log('Updating user:', userId, 'with data:', userData); // Debugging log
      await this.firestore.collection('users').doc(userId).update(userData);
      console.log('Firestore update successful');
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
  async updateEmail(newEmail: string): Promise<void> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.updateEmail(newEmail);
      }
    } catch (error) {
      console.error('Error updating email:', error);
      throw error;
    }
  }

  async changePassword(newPassword: string): Promise<void> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.updatePassword(newPassword);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }
}
