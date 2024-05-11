import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  WorkoutsService,
  Exercise,
} from 'src/app/firebase/workouts.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tabata',
  templateUrl: './tabata.page.html',
  styleUrls: ['./tabata.page.scss'],
})
export class TabataPage implements OnInit {
  moves: Exercise[] = [];
  numtabat: number = 0;
  mpts: number = 0;

  constructor(
    private router: Router,
    private workoutsService: WorkoutsService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadMoves();
  }
  tabataData = {
    wodCat: '',
    wodStyle: 'TABATA',
    tabataNum: 0,
    mpt: 0,
    t1m1: '',
    t1m2: '',
    t2m1: '',
    t2m2: '',
    t3m1: '',
    t3m2: '',
    t4m1: '',
    t4m2: '',
    t5m1: '',
    t5m2: '',
    move:20,
    rest:10,
    sets: 8,
    daDate: new Date().toISOString().substring(0, 10), // Initialize with today's date
  };

  
  loadMoves() {
    this.moves = this.workoutsService.getAllMoves();
  }
  showErrorCard = false;
  submitForm() {
    if (!this.tabataData.wodCat || !this.tabataData.daDate || !this.tabataData.t1m1) {
      // Handle form validation or display an error message
      // For now, I'm displaying a simple alert message
      alert('Please fill in all the required fields.');
      return;
    
    }
  
    // Check if there is a document with the same date and wodCat
    this.firestore.collection('tabatas', ref => ref.where('daDate', '==', this.tabataData.daDate)
                                                      .where('wodCat', '==', this.tabataData.wodCat))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        if (querySnapshot && querySnapshot.size > 0) {
          // If a document with the same date and wodCat already exists
          this.showErrorCard = true;
        } else {
          // If no such document exists, submit the form
          this.firestore.collection('tabatas').add(this.tabataData)
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
  towodstyle() {
    this.router.navigate(['/wodstyle']);
  }
  
}
