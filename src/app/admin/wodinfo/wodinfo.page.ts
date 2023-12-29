import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Workout, WorkoutsService } from 'src/app/firebase/workouts.service';
@Component({
  selector: 'app-wodinfo',
  templateUrl: './wodinfo.page.html',
  styleUrls: ['./wodinfo.page.scss'],
})
export class WodinfoPage implements OnInit {
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
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private workoutService: WorkoutsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.workoutService.getWorkoutById(id).subscribe((workout) => {
        if (workout) {
          this.workout = workout;
        }
      });
    }
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

}
