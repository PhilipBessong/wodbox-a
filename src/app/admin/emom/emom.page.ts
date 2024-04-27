import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { WorkoutsService, Exercise } from 'src/app/firebase/workouts.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-emom',
  templateUrl: './emom.page.html',
  styleUrls: ['./emom.page.scss'],
})
export class EmomPage implements OnInit {
  constructor(
    private router: Router,
    private workoutsService: WorkoutsService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) {}

  towodstyle() {
    this.router.navigate(['/wodstyle']);
  }

  moves: Exercise[] = [];
  numemom: number = 0;
  mpes: number = 0;
  ngOnInit() {
    this.loadMoves();
  }
  loadMoves() {
    this.moves = this.workoutsService.getAllMoves();
  }
  emomData = {
    wodCat: '',
    wodStyle: 'EMOM',
   emomNum: 0,
    mpe: 0,
    e1m1: '',
    e1m2: '',
    e1m3: '',
    e1m4: '',
    e2m1: '',
    e2m2: '',
    e2m3: '',
    e2m4: '',
    e3m1: '',
    e3m2: '',
    e3m3: '',
    e3m4: '',
    e1m1rep: 0,
    e1m2rep: 0,
    e1m3rep: 0,
    e1m4rep: 0,
    e2m1rep: 0,
    e2m2rep: 0,
    e2m3rep: 0,
    e2m4rep: 0,
    e3m1rep: 0,
    e3m2rep: 0,
    e3m3rep: 0,
    e3m4rep: 0,
    daDate: new Date().toISOString().substring(0, 10), // Initialize with today's date
  };
  showErrorCard = false;
  submitForm() {
    if (!this.emomData.wodCat || !this.emomData.daDate || !this.emomData.e1m1) {
      // Handle form validation or display an error message
      // For now, I'm displaying a simple alert message
      alert('Please fill in all the required fields.');
      return;
    
    }
  
    // Check if there is a document with the same date and wodCat
    this.firestore.collection('emoms', ref => ref.where('daDate', '==', this.emomData.daDate)
                                                      .where('wodCat', '==', this.emomData.wodCat))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        if (querySnapshot && querySnapshot.size > 0) {
          // If a document with the same date and wodCat already exists
          this.showErrorCard = true;
        } else {
          // If no such document exists, submit the form
          this.firestore.collection('emoms').add(this.emomData)
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
