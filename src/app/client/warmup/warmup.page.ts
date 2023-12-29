import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import {
  Workout,
  Style,
  Exercise,
  WorkoutsService,
} from 'src/app/firebase/workouts.service';
@Component({
  selector: 'app-warmup',
  templateUrl: './warmup.page.html',
  styleUrls: ['./warmup.page.scss'],
})
export class WarmupPage implements OnInit {
  workouts: Workout[] = []; // Define an array to store the retrieved workouts
  specificWorkouts: Workout[]=[];
  wodStyle: Style[] = [];
  exercises: Exercise[] = [];
  videoUrl: SafeResourceUrl | undefined;
  videoHeight = '300px'; // Adjust the height as needed
  videoWidth = '400px';

  constructor(private workoutsService: WorkoutsService) {}

  ngOnInit(): void {
    this.getSpecificWorkouts();
  }

  getSpecificWorkouts(): void {
    this.workoutsService.getSpecificWorkouts().subscribe(
      (workouts: Workout[]) => {
        this.specificWorkouts = workouts;
      },
      (error) => {
        console.error('Error fetching specific workouts:', error);
      }
    );
  }
  
  loadup() {
    const wodCat = 'Warm Up';
    // Get today's date in the format yyyy-MM-dd
    const today = new Date().toISOString().slice(0, 10);

    this.workoutsService.getWorkoutsByCategoryAndDate(wodCat, today).subscribe(
      (data) => {
        this.workouts = data;
        // Fetch style information for each workout and update the workouts array
        this.workouts.forEach((workout) => {
          this.workoutsService
            .getStyleByName(workout.wodStyle)
            .subscribe((style) => {
              // Add style information to each workout
              workout.styleName = style?.styleName;
              workout.styleDescription = style?.styleDescription;
            });
          //begin showing workouts from r1 if they exit within the retrieved worout.

          if (workout.r1m1) {
            const exeName = workout.r1m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                workout.exe = exercises;
              });
          }
          if (workout.r1m2) {
            const exeName = workout.r1m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                workout.exeR1M2 = exercises;
              });
          }
          if (workout.r1m3) {
            const exeName = workout.r1m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                workout.exeR1M3 = exercises;
              });
          }
          if (workout.r2m1) {
            const exeName = workout.r2m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                workout.exeR2M1 = exercises;
              });
          }
          if (workout.r2m2) {
            const exeName = workout.r2m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                workout.exeR2M2 = exercises;
              });
          }
          if (workout.r2m3) {
            const exeName = workout.r2m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                workout.exeR2M3 = exercises;
              });
          }
          if (workout.r3m1) {
            const exeName = workout.r3m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                workout.exeR3M1 = exercises;
              });
          }
          if (workout.r3m2) {
            const exeName = workout.r3m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                workout.exeR3M2 = exercises;
              });
          }
          if (workout.r3m3) {
            const exeName = workout.r3m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                workout.exeR3M3 = exercises;
              });
          }
          if (workout.r4m1) {
            const exeName = workout.r4m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                workout.exeR4M1 = exercises;
              });
          }
          if (workout.r4m2) {
            const exeName = workout.r4m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                workout.exeR4M2 = exercises;
              });
          }
          if (workout.r4m3) {
            const exeName = workout.r4m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                workout.exeR4M3 = exercises;
              });
          }
        });
      },
      (error) => {
        console.error('Error fetching workouts:', error); // Log any errors
      }
    );
  }
}
