import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Timestamp } from '@firebase/firestore';
import {
  WorkoutsService,
  Style,
  Workout,
  Exercise
} from 'src/app/firebase/workouts.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-addwod',
  templateUrl: './addwod.page.html',
  styleUrls: ['./addwod.page.scss'],
})
export class AddwodPage implements OnInit {
  workoutForm!: FormGroup;
  wodStyles: Style[] = [];
  moves: Exercise[]=[];
  mprs: number = 0;
  selectedNumber: number = 0;
  constructor(
    private workoutsService: WorkoutsService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadStyles();
    this.initForm();
    this.loadMoves();
  }

  initForm(): void {
    this.workoutForm = this.formBuilder.group({
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
    });
  }

  loadStyles() {
    // Call the getAllWodStyles() function from your data service
    this.wodStyles = this.workoutsService.getAllWodStyles();
  }
  loadMoves(){
    this.moves = this.workoutsService.getAllMoves();
  }

  async onSubmit(): Promise<void> {
    const newWorkout: Workout = this.workoutForm.value;
    const dateInput = newWorkout.daDate;

    try {
      // Assuming 'workoutsService.createWorkout' adds the workout to Firestore
      await this.workoutsService.createWorkout(newWorkout);
      // Show success message using ToastController
      const toast = await this.toastCtrl.create({
        message: 'Workout created successfully!',
        duration: 2000, // Duration in milliseconds
        position: 'top', // Position of the toast
      });
      toast.present();

      // Navigate to '/ahome'
      this.navCtrl.navigateForward('/ahome');
    } catch (error) {
      console.error('Error creating workout:', error);
      // Show error message using ToastController
      const toast = await this.toastCtrl.create({
        message: 'Failed to create workout. Please try again.',
        duration: 2000,
        position: 'top',
        color: 'danger', // Optional: Setting the toast color to red for error
      });
      toast.present();
    }
  }
}
