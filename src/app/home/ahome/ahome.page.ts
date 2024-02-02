import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { Workout, WorkoutsService, Tabata } from 'src/app/firebase/workouts.service';
@Component({
  selector: 'app-ahome',
  templateUrl: './ahome.page.html',
  styleUrls: ['./ahome.page.scss'],
})
export class AhomePage implements OnInit {
  workouts: Workout[]=[];
  tabatas: Tabata[]=[];
  constructor(
    private navCtrl: NavController,
    private workoutService: WorkoutsService
  ) { }

  ngOnInit() {
    this.loadWorkouts();
    this.loadTabatas();
  }

  loadWorkouts() {
    this.workoutService.getAllWorkouts().subscribe((workouts) => {
      this.workouts = workouts;
    });
  }
  loadTabatas() {
    this.workoutService.getAllTabatas().subscribe((tabatas) => {
      this.tabatas = tabatas;
    });
  }
  navigateToView(id: string| undefined) {
    if (id) {
      this.navCtrl.navigateForward(['/wodinfo', id]);
      // 'workout-detail' is the route for the detailed view of a workout
      // Pass the workout ID as a parameter to fetch details in the detail view
    }
  }

  deleteWorkout(id: string| undefined) {
    this.workoutService.deleteWorkout(id).then(() => {
      // Reload workouts after deletion
      this.loadWorkouts();
    });
  }
  deleteTabata(id: string| undefined) {
    this.workoutService.deleteTabata(id).then(() => {
      // Reload workouts after deletion
      this.loadWorkouts();
    });
  }
  todaAdduser(){
    this.navCtrl.navigateForward(['/adduser']);
  }
  todaAddwod(){
    this.navCtrl.navigateForward(['/wodstyle']);
  }
}
