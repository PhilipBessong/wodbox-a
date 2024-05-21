import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  WorkoutsService,
  Exercise,
} from 'src/app/firebase/workouts.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-ladder',
  templateUrl: './ladder.page.html',
  styleUrls: ['./ladder.page.scss'],
})
export class LadderPage implements OnInit {

  constructor(
    private router: Router,
    private workoutsService: WorkoutsService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) { }

  moves: Exercise[] = [];
  numladder: number = 0;
  mpls: number = 0;

  ladderData = {
    wodCat: '',
    wodStyle: 'LADDER',
   ladderNum: 0,
    mpl: 0,
    l1m1: '',
    l1m2: '',
    l1m3: '',
    l1m4: '',
    l2m1: '',
    l2m2: '',
    l2m3: '',
    l2m4: '',
    l3m1: '',
    l3m2: '',
    l3m3: '',
    l3m4: '',
    l1move: 0,
    l2move: 0,
    l3move: 0,
    daDate: new Date().toISOString().substring(0, 10), // Initialize with today's date
  };
  ngOnInit() {
    this.loadMoves();
  }
  towodstyle() {
    this.router.navigate(['/wodstyle']);
  }
  loadMoves() {
    this.moves = this.workoutsService.getAllMoves();
  }
  showErrorCard = false;
  submitForm() {
    if (!this.ladderData.wodCat || !this.ladderData.daDate || !this.ladderData.l1m1||!this.ladderData.l1move) {
      // Handle form validation or display an error message
      // For now, I'm displaying a simple alert message
      alert('Please fill in all the required fields.');
      return;
    
    }
      // Check if there is a document with the same date and wodCat
      this.firestore.collection('ladders', ref => ref.where('daDate', '==', this.ladderData.daDate)
      .where('wodCat', '==', this.ladderData.wodCat))
.get()
.toPromise()
.then((querySnapshot) => {
if (querySnapshot && querySnapshot.size > 0) {
// If a document with the same date and wodCat already exists
this.showErrorCard = true;
} else {
// If no such document exists, submit the form
this.firestore.collection('ladders').add(this.ladderData)
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
    //if (!this.ladderData.wodCat || !this.ladderData.daDate || !this.ladderData.l1m1) {
      // Handle form validation or display an error message
      // For now, I'm displaying a simple alert message
   //   alert('Please fill in all the required fields.');
   //   return;
    
    //}
  
  
  
  }
  hideErrorCard() {
    this.showErrorCard = false;
  }
}
