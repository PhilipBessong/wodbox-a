import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {
  WorkoutsService,
  Exercise
} from 'src/app/firebase/workouts.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-addwod',
  templateUrl: './addwod.page.html',
  styleUrls: ['./addwod.page.scss'],
})
export class AddwodPage implements OnInit {
  
  moves: Exercise[]=[];
  mprs: number = 0;
  selectedNumber: number = 0;
  constructor(
    private workoutsService: WorkoutsService,
    private firestore: AngularFirestore,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadMoves();
  }
  
  loadMoves(){
    this.moves = this.workoutsService.getAllMoves();
     // Initialize form controls after data is available

  }

  initForm ={
      wodCat: '',
      wodStyle: 'INTERVAL',
      rounds: 0,
      mpr: 0,
      r1m1: '',
      r1m2: '',
      r1m3: '',
      r1sets: 0,
      r1move: 0,
      r1rest: 0,
      r2m1: '',
      r2m2: '',
      r2m3: '',
      r2sets: 0,
      r2move: 0,
      r2rest: 0,
      r3m1: '',
      r3m2: '',
      r3m3: '',
      r3sets: 0,
      r3move: 0,
      r3rest: 0,
      r4m1: '',
      r4m2: '',
      r4m3: '',
      r4sets: 0,
      r4move: 0,
      r4rest: 0,
      daDate: new Date().toISOString().substring(0, 10), // Initialize with today's date
    };
  showErrorCard = false;
 
  submitForm() {
    if (!this.initForm.wodCat || !this.initForm.daDate || !this.initForm.r1m1) {
      // Handle form validation or display an error message
      // For now, I'm displaying a simple alert message
      alert('Please fill in all the required fields.');
      return;
    
    }
  
    // Check if there is a document with the same date and wodCat
    this.firestore.collection('workouts', ref => ref.where('daDate', '==', this.initForm.daDate)
                                                      .where('wodCat', '==', this.initForm.wodCat))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        if (querySnapshot && querySnapshot.size > 0) {
          // If a document with the same date and wodCat already exists
          this.showErrorCard = true;
        } else {
          // If no such document exists, submit the form
          this.firestore.collection('workouts').add(this.initForm)
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
   
  backtoWarmUp(){
    this.router.navigate(['/wodstyle']);
  }
}
