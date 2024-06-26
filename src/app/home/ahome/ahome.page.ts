import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Workout, WorkoutsService, Tabata, Ladder,Emom, Amrap } from 'src/app/firebase/workouts.service';
@Component({
  selector: 'app-ahome',
  templateUrl: './ahome.page.html',
  styleUrls: ['./ahome.page.scss'],
})
export class AhomePage implements OnInit {
  workouts: Workout[]=[];
  tabatas: Tabata[]=[];
  ladders: Ladder[]=[];
  emoms: Emom[]=[];
  amraps: Amrap[]=[]
  constructor(
    private workoutService: WorkoutsService,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loadWorkouts();
    this.loadTabatas();
    this.loadLadders();
    this.loadEmoms();
    this.loadAmraps();
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
  loadLadders() {
    this.workoutService.getAllLadders().subscribe((ladders) => {
      this.ladders = ladders;
    });
  }
  loadEmoms() {
    this.workoutService.getAllEmoms().subscribe((emoms) => {
      this.emoms = emoms;
    });
  }
  loadAmraps() {
    this.workoutService.getAllAmraps().subscribe((amraps) => {
      this.amraps = amraps;
    });
  }
  tabataCard(tabataDate: string): string {
    const today = new Date();
    const tabataDateObj = new Date(tabataDate);

    if (tabataDateObj.toDateString() === today.toDateString()) {
      return '#00b250'; // green for today
    } else if (tabataDateObj < today) {
      return '#808080'; // Grey for past dates
    } else {
      return '#FFA500';  // Orange for future dates
    }
  }
  intervalCard(intervalDate: string): string {
    const today = new Date();
    const intervalDateObj = new Date(intervalDate);

    if (intervalDateObj.toDateString() === today.toDateString()) {
      return '#00b250'; // green for today
    } else if (intervalDateObj < today) {
      return '#808080'; // Grey for past dates
    } else {
      return '#FFA500';  // Orange for future dates
    }
  }
 ladderCard(ladderDate: string): string {
    const today = new Date();
    const ladderDateObj = new Date(ladderDate);

    if (ladderDateObj.toDateString() === today.toDateString()) {
      return '#00b250'; // green for today
    } else if (ladderDateObj < today) {
      return '#808080'; // Grey for past dates
    } else {
      return '#FFA500';  // Orange for future dates
    }
  }
  emomCard(emomDate: string): string {
    const today = new Date();
    const emomDateObj = new Date(emomDate);

    if (emomDateObj.toDateString() === today.toDateString()) {
      return '#00b250'; // green for today
    } else if (emomDateObj < today) {
      return '#808080'; // Grey for past dates
    } else {
      return '#FFA500';  // Orange for future dates
    }
  }
 amrapCard(amrapDate: string): string {
    const today = new Date();
    const amrapDateObj = new Date(amrapDate);

    if (amrapDateObj.toDateString() === today.toDateString()) {
      return '#00b250'; // green for today
    } else if (amrapDateObj < today) {
      return '#808080'; // Grey for past dates
    } else {
      return '#FFA500';  // Orange for future dates
    }
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
ladderClick(id: string | undefined) {
    if (id) {
      this.workoutService.getLadderById(id).subscribe((ladder: Ladder | undefined) => {
        if (ladder) {
          this.router.navigate(['/wodinfo', id]); // Assuming 'wodinfo' is the route for viewing a workout
        } else {
          console.error('Workout not found'); // Handle error if workout is not found
        }
      });
    } else {
      console.error('Workout ID is undefined');
    }
  }
  emomClick(id: string | undefined) {
    if (id) {
      this.workoutService.getEmomById(id).subscribe((emom: Emom | undefined) => {
        if (emom) {
          this.router.navigate(['/wodinfo', id]); // Assuming 'wodinfo' is the route for viewing a workout
        } else {
          console.error('Workout not found'); // Handle error if workout is not found
        }
      });
    } else {
      console.error('Workout ID is undefined');
    }
  }
 amrapClick(id: string | undefined) {
    if (id) {
      this.workoutService.getAmrapById(id).subscribe((amrap: Amrap | undefined) => {
        if (amrap) {
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
  deleteTabata(id: string | undefined) {
    // Show confirmation dialog
    if (confirm("Are you sure you want to delete this Tabata?")) {
      // If user confirms deletion, proceed with deletion
      this.workoutService.deleteTabata(id).then(() => {
        // Reload workouts after deletion
        this.loadTabatas();
      });
    }else{
      window.location.href = '/ahome';
    }
  }
  
  deleteLadder(id: string| undefined) {
    this.workoutService.deleteLadder(id).then(() => {
      // Reload workouts after deletion
      this.loadLadders();
    });
  }
  deleteEmom(id: string | undefined) {
    // Show confirmation dialog
    if (confirm("Are you sure you want to delete this Emom?")) {
      // If user confirms deletion, proceed with deletion
      this.workoutService.deleteEmom(id).then(() => {
        // Reload workouts after deletion
        this.loadEmoms();
      });
    }else{
      window.location.href = '/ahome';
    }
  }
  deleteAmrap(id: string | undefined) {
    // Show confirmation dialog
    if (confirm("Are you sure you want to delete this Amrap?")) {
      // If user confirms deletion, proceed with deletion
      this.workoutService.deleteAmrap(id).then(() => {
        // Reload workouts after deletion
        this.loadAmraps();
      });
    }else{
      window.location.href = '/ahome';
    }
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
