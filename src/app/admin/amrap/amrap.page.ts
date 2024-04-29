import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  WorkoutsService,
  Exercise,
} from 'src/app/firebase/workouts.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-amrap',
  templateUrl: './amrap.page.html',
  styleUrls: ['./amrap.page.scss'],
})
export class AmrapPage implements OnInit {

  constructor(
    private router: Router,
    private workoutsService: WorkoutsService,
 
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) { }

  towodstyle() {
    this.router.navigate(['/wodstyle']);
  }
  moves: Exercise[] = [];
  numamrap: number = 0;
  mpas: number = 0;

  amrapData = {
    wodCat: '',
    wodStyle: 'AMRAP',
  amrapNum: 0,
    mpa: 0,
    a1m1: '',
    a1m2: '',
    a1m3: '',
    a1m4: '',
    a2m1: '',
    a2m2: '',
    a2m3: '',
    a2m4: '',
    a3m1: '',
    a3m2: '',
    a3m3: '',
    a3m4: '',
    a1move: 0,
    a2move: 0,
    a3move: 0,
    a1m1rep: 0,
    a1m2rep: 0,
    a1m3rep: 0,
    a1m4rep: 0,
    a2m1rep: 0,
    a2m2rep: 0,
    a2m3rep: 0,
    a2m4rep: 0,
    a3m1rep: 0,
    a3m2rep: 0,
    a3m3rep: 0,
    a3m4rep: 0,
    daDate: new Date().toISOString().substring(0, 10), // Initialize with today's date
  };
  ngOnInit() {
    this.loadMoves();
  }
  loadMoves() {
    this.moves = this.workoutsService.getAllMoves();
  }
  showErrorCard = false;
  submitForm() {
    if (!this.amrapData.wodCat || !this.amrapData.daDate || !this.amrapData.a1m1) {
      // Handle form validation or display an error message
      // For now, I'm displaying a simple alert message
      alert('Please fill in all the required fields.');
      return;
    
    }
  
    // Check if there is a document with the same date and wodCat
    this.firestore.collection('amrap', ref => ref.where('daDate', '==', this.amrapData.daDate)
                                                      .where('wodCat', '==', this.amrapData.wodCat))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        if (querySnapshot && querySnapshot.size > 0) {
          // If a document with the same date and wodCat already exists
          this.showErrorCard = true;
        } else {
          // If no such document exists, submit the form
          this.firestore.collection('amrap').add(this.amrapData)
            .then(() => {
              console.log('User data submitted successfully!');
              // Optionally, reset the form
              this.router.navigate(['/ahome']);
            })
            .catch(error => {
              console.error('Error submitting user data:', error);
              // Handle error appropriately
            });
        }
      })
      .catch(error => {
        console.error('Error checking for existing document:', error);
        // Handle error appropriately
      });
  
  }
  hideErrorCard() {
    this.showErrorCard = false;
  }
}
