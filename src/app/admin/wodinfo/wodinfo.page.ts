import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Workout,Tabata, WorkoutsService,Style,
  Exercise, } from 'src/app/firebase/workouts.service';
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

  workout: Workout = {
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
    daDate: ''
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
    daDate: ''
  }
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private workoutService: WorkoutsService,
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.mpts = this.tabataData.mpt
    this.loadMoves();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.workoutService.getWorkoutById(id).subscribe((workout) => {
        if (workout) {
          this.workout = workout;
        }
      });
      this.workoutService.getTabataById(id).subscribe((tabata) => {
        if (tabata) {
          this.tabataData = tabata;
        }
      });
    }
  }
  loadMoves() {
    this.moves = this.workoutService.getAllMoves();
  }

  backhome(){
    this.router.navigate(['/ahome']);
  }
  saveChanges() {
    this.workoutService.updateWorkout(this.workout.id, this.workout)
      .then(() => {
        this.navCtrl.navigateBack('/ahome'); // Navigate back after saving changes
      })
      .catch((error) => {
        console.error('Error updating workout:', error);
        // Handle error, show error message, etc.
      });
  }
  savetabata() {
    this.workoutService.updateTabata(this.tabataData.id, this.tabataData)
      .then(() => {
        this.navCtrl.navigateBack('/ahome'); // Navigate back after saving changes
      })
      .catch((error) => {
        console.error('Error updating workout:', error);
        // Handle error, show error message, etc.
      });
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
  cancel(){
    this.router.navigate(['/ahome']);
  }

}
