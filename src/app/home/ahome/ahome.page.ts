import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Workout, WorkoutsService, Tabata, Ladder } from 'src/app/firebase/workouts.service';
@Component({
  selector: 'app-ahome',
  templateUrl: './ahome.page.html',
  styleUrls: ['./ahome.page.scss'],
})
export class AhomePage implements OnInit {
  workouts: Workout[]=[];
  tabatas: Tabata[]=[];
  ladders: Ladder[]=[];
  constructor(
    private workoutService: WorkoutsService,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loadWorkouts();
    this.loadTabatas();
    this.loadLadders();
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
  tabataCard(tabataDate: string): string {
    const today = new Date();
    const tabataDateObj = new Date(tabataDate);

    if (tabataDateObj.toDateString() === today.toDateString()) {
      return '#FFA500'; // Orange for today
    } else if (tabataDateObj < today) {
      return '#808080'; // Grey for past dates
    } else {
      return '#22B9E9'; // Blue for future dates
    }
  }
  intervalCard(intervalDate: string): string {
    const today = new Date();
    const intervalDateObj = new Date(intervalDate);

    if (intervalDateObj.toDateString() === today.toDateString()) {
      return '#FFA500'; // Orange for today
    } else if (intervalDateObj < today) {
      return '#808080'; // Grey for past dates
    } else {
      return '#22B9E9'; // Blue for future dates
    }
  }
  loadLadders() {
    this.workoutService.getAllLadders().subscribe((ladders) => {
      this.ladders = ladders;
    });
  }
  onCardClick(id: string | undefined) {
    if (id) {
      this.workoutService.getWorkoutById(id).subscribe((workout: Workout | undefined) => {
        if (workout) {
          this.router.navigate(['/wodinfo', id]); // Assuming 'wodinfo' is the route for viewing a workout
        } else {
          console.error('Workout not found'); // Handle error if workout is not found
        }
      });
    } else {
      console.error('Workout ID is undefined');
    }
  }
 tabataClick(id: string | undefined) {
    if (id) {
      this.workoutService.getTabataById(id).subscribe((tabata: Tabata | undefined) => {
        if (tabata) {
          this.router.navigate(['/wodinfo', id]); // Assuming 'wodinfo' is the route for viewing a workout
        } else {
          console.error('Workout not found'); // Handle error if workout is not found
        }
      });
    } else {
      console.error('Workout ID is undefined');
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
      this.loadTabatas();
    });
  }
  deleteLadder(id: string| undefined) {
    this.workoutService.deleteLadder(id).then(() => {
      // Reload workouts after deletion
      this.loadLadders();
    });
  }
  todaAdduser(){
    this.navCtrl.navigateForward(['/adduser']);
  }
  todaAddwod(){
    this.navCtrl.navigateForward(['/wodstyle']);
  }
  logout(){
    this.navCtrl.navigateForward(['/login']);
  }
}
