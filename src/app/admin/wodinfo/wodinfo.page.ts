import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {
  Workout,
  Tabata,
  WorkoutsService,
  Style,
  Exercise,
} from 'src/app/firebase/workouts.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-wodinfo',
  templateUrl: './wodinfo.page.html',
  styleUrls: ['./wodinfo.page.scss'],
})
export class WodinfoPage implements OnInit {
  moves: Exercise[] = [];
  numtabat: number = 0;
  mpts: number = 0;
  rounds: number = 0;
  mprs: number = 0;
    // Define isDateInPast property
    isDateInPast: boolean = false;
    isTabataPresent: boolean = false;
    isIntrvalPresent: boolean = false;

  workout: Workout = {
    id: '',
    wodCat: '',
    wodStyle: '',
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
    daDate: '',
  };
  isDisabled: boolean = true;
  toggleEdit() {
    this.isDisabled = !this.isDisabled;
  }
  tabataData: Tabata = {
    id: '',
    wodCat: '',
    wodStyle: '',
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
    move: 0,
    rest: 0,
    sets: 0,
    daDate: '',
  };
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private workoutService: WorkoutsService,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadMoves();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.workoutService.getWorkoutById(id).subscribe((workout) => {
        if (workout) {
          this.workout = workout;
          this.mprs = workout.mpr;
          this.rounds= workout.rounds;
          this.isIntrvalPresent = true;
          const currentDate = new Date();
          const intDate = new Date(workout.daDate);
          if (intDate < currentDate) {
       
            this.isDateInPast = true;
          } else {
            this.isDateInPast = false;
          }
        }
      });
      this.workoutService.getTabataById(id).subscribe((tabata) => {
        if (tabata) {
          this.tabataData = tabata;
          this.mpts = tabata.mpt; // Load mpt after tabataData is set
          this.numtabat = tabata.tabataNum;
          this.isTabataPresent = true; // Set to true if tabata data is present
          const currentDate = new Date();
          const tabataDate = new Date(tabata.daDate);
          if (tabataDate < currentDate) {
          
            this.isDateInPast = true;
          } else {
            this.isDateInPast = false;
          }
        }
      });
    }
  }



  loadMoves() {
    this.moves = this.workoutService.getAllMoves();
  }

  backhome() {
    this.router.navigate(['/ahome']);
  }
  saveinterval(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      // Check if id is not null before using it
      this.workoutService
        .updateWorkout(id, this.workout)
        .then(() => {
          this.navCtrl.navigateBack('/ahome'); // Navigate back after saving changes
        })
        .catch((error) => {
          console.error('Error updating tabata:', error);
          // Handle error, show error message, etc.
        });
    }else {
      console.error('Error: Tabata ID is null');
      // Handle the case where the ID is null, show error message, etc.
    }
  }
  savetabata(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      // Check if id is not null before using it
      this.workoutService
        .updateTabata(id, this.tabataData)
        .then(() => {
          this.navCtrl.navigateBack('/ahome'); // Navigate back after saving changes
        })
        .catch((error) => {
          console.error('Error updating tabata:', error);
          // Handle error, show error message, etc.
        });
    } else {
      console.error('Error: Tabata ID is null');
      // Handle the case where the ID is null, show error message, etc.
    }
  }

  cancel() {
    this.router.navigate(['/ahome']);
  }
}
