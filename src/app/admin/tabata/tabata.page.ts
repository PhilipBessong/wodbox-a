import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  WorkoutsService,
  Style,
  Exercise,
} from 'src/app/firebase/workouts.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tabata',
  templateUrl: './tabata.page.html',
  styleUrls: ['./tabata.page.scss'],
})
export class TabataPage implements OnInit {
  towodstyle() {
    this.router.navigate(['/wodstyle']);
  }
  constructor(
    private router: Router,
    private workoutsService: WorkoutsService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) {}
  moves: Exercise[] = [];
  numtabat: number = 0;
  mpts: number = 0;

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
    sets: 1,
    daDate: new Date().toISOString().substring(0, 10), // Initialize with today's date
  };

  ngOnInit() {
    this.loadMoves();
  }
  loadMoves() {
    this.moves = this.workoutsService.getAllMoves();
  }
  submitForm() {
    if (!this.tabataData.wodCat || !this.tabataData.daDate) {
      // Handle form validation or display an error message
      return;
    }

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
}
