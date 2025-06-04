import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Workout, WorkoutsService, Tabata, Ladder,Emom, Amrap } from 'src/app/firebase/workouts.service';
import { FirebaseAuthService } from 'src/app/firebase/auth/firebase-auth.service';
import { AlertController } from '@ionic/angular';
import { first, Subscription } from 'rxjs';
  interface WorkoutItem {
    id: string;
    daDate: string;
    wodCat: string;
    wodStyle: string;
    rounds?: number;
    tabataNum?: number;
    ladderNum?: number;
    emomNum?: number;
    amrapNum?: number;
    mpr?: number;
    mpt?: number;
    mpl?: number;
    mpe?: number;
    mpa?: number;
    type: 'workout' | 'tabata' | 'ladder' | 'emom' | 'amrap';
  }
  



@Component({
  selector: 'app-ahome',
  templateUrl: './ahome.page.html',
  styleUrls: ['./ahome.page.scss'],
})
export class AhomePage implements OnInit, OnDestroy {
  private wodSub: Subscription | null = null;
  workouts: Workout[]=[];
  tabatas: Tabata[]=[];
  ladders: Ladder[]=[];
  emoms: Emom[]=[];
  amraps: Amrap[]=[]
  combinedWorkouts: WorkoutItem[] = [];
  errorMessage: string = '';
  constructor(
    private workoutService: WorkoutsService,
    private authService: FirebaseAuthService,
    private router: Router,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.loadWorkouts();
    this.loadTabatas();
    this.loadLadders();
    this.loadEmoms();
    this.loadAmraps();
  }

  sortByDate(arr: any[], dateField: string) {
    const today = new Date().setHours(0, 0, 0, 0); // Normalize today's date
  
    return arr.sort((a, b) => {
      const dateA = new Date(a[dateField]).setHours(0, 0, 0, 0);
      const dateB = new Date(b[dateField]).setHours(0, 0, 0, 0);
  
      // First, sort by date (today first, then future, then past)
      if (dateA === today && dateB !== today) {
        return -1; // a is today, b is not
      } else if (dateA !== today && dateB === today) {
        return 1; // b is today, a is not
      }
  
      if (dateA > today && dateB <= today) {
        return -1; // a is future, b is today or past
      } else if (dateA <= today && dateB > today) {
        return 1; // b is future, a is today or past
      }
  
      if (dateA < today && dateB >= today) {
        return 1; // a is past, b is not
      } else if (dateA >= today && dateB < today) {
        return -1; // b is past, a is not
      }
      // For past dates, organize them in descending order
    if (dateA < today && dateB < today) {
      return dateB - dateA; // Sort past dates in descending order
    }
  
      // If both have the same date, prioritize 'Warm up' first
      if (dateA === dateB) {
        if (a.wodCat === 'Warm up' && b.wodCat !== 'Warm up') {
          return -1; // a is Warm up, b is not
        } else if (b.wodCat === 'Warm up' && a.wodCat !== 'Warm up') {
          return 1; // b is Warm up, a is not
        }
      }
  
      // If dates are equal and wodCat is the same, maintain original order
      return 0;
    });
  }
  
  

  combineAndSortWorkouts() {
    const combined: WorkoutItem[] = [
      ...this.workouts.map(workout => ({
        ...workout,
        id: String(workout.id), // Convert number to string if needed
        type: 'workout' as const,
        rounds: workout.rounds,
        mpr: workout.mpr
      })),
      ...this.tabatas.map(tabata => ({
        ...tabata,
        id: String(tabata.id), // Convert number to string if needed
        type: 'tabata' as const,
        tabataNum: tabata.tabataNum,
        mpt: tabata.mpt
      })),
      ...this.ladders.map(ladder => ({
        ...ladder,
        id: String(ladder.id), // Convert number to string if needed
        type: 'ladder' as const,
        ladderNum: ladder.ladderNum,
        mpl: ladder.mpl
      })),
      ...this.emoms.map(emom => ({
        ...emom,
        id: String(emom.id), // Convert number to string if needed
        type: 'emom' as const,
        emomNum: emom.emomNum,
        mpe: emom.mpe
      })),
      ...this.amraps.map(amrap => ({
        ...amrap,
        id: String(amrap.id), // Convert number to string if needed
        type: 'amrap' as const,
        amrapNum: amrap.amrapNum,
        mpa: amrap.mpa
      }))
    ];
    this.combinedWorkouts = this.sortByDate(combined, 'daDate');
  }
  
  
  loadWorkouts() {
    this.workoutService.getAllWorkouts().subscribe(workouts => {
      this.workouts = this.sortByDate(workouts, 'daDate');
      this.combineAndSortWorkouts();
    });
  }
  
  loadTabatas() {
    this.workoutService.getAllTabatas().subscribe(tabatas => {
      this.tabatas = this.sortByDate(tabatas, 'daDate');
      this.combineAndSortWorkouts();
    });
  }
  
  loadLadders() {
    this.workoutService.getAllLadders().subscribe(ladders => {
      this.ladders = this.sortByDate(ladders, 'daDate');
      this.combineAndSortWorkouts();
    });
  }
  
  loadEmoms() {
    this.workoutService.getAllEmoms().subscribe(emoms => {
      this.emoms = this.sortByDate(emoms, 'daDate');
      this.combineAndSortWorkouts();
    });
  }
  
  loadAmraps() {
    this.workoutService.getAllAmraps().subscribe(amraps => {
      this.amraps = this.sortByDate(amraps, 'daDate');
      this.combineAndSortWorkouts();
    });
  }
  

  getCardBackground(item: WorkoutItem) {
    switch (item.type) {
      case 'workout':
        return this.intervalCard(item.daDate);
      case 'tabata':
        return this.tabataCard(item.daDate);
      case 'ladder':
        return this.ladderCard(item.daDate);
      case 'emom':
        return this.emomCard(item.daDate);
      case 'amrap':
        return this.amrapCard(item.daDate);
      default:
        return 'white';
    }
  }
  
  onCardClick(item: WorkoutItem) {
    switch (item.type) {
      case 'workout':
        this.workoutClick(item.id);
        break;
      case 'tabata':
        this.tabataClick(item.id);
        break;
      case 'ladder':
        this.ladderClick(item.id);
        break;
      case 'emom':
        this.emomClick(item.id);
        break;
      case 'amrap':
        this.amrapClick(item.id);
        break;
    }
  }
  
  
  deleteItem(item: WorkoutItem, event: Event) {
    event.stopPropagation();
    switch (item.type) {
      case 'workout':
        this.deleteWorkout(item.id, event);
        break;
      case 'tabata':
        this.deleteTabata(item.id, event);
        break;
      case 'ladder':
        this.deleteLadder(item.id, event);
        break;
      case 'emom':
        this.deleteEmom(item.id, event);
        break;
      case 'amrap':
        this.deleteAmrap(item.id, event);
        break;
    }
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
  
  workoutClick(id: string | undefined) {
    if (id) {
      this.navCtrl.navigateForward(['/wodinfo', id]);
    } else {
      console.error('Workout ID is undefined');
    }
  }
  tabataClick(id: string | undefined) {
    if (id) {
      this.navCtrl.navigateForward(['/wodinfo', id]);
    } else {
      console.error('Workout ID is undefined');
    }
  }
  ladderClick(id: string | undefined) {
    if (id) {
      this.navCtrl.navigateForward(['/wodinfo', id]);
    } else {
      console.error('Workout ID is undefined');
    }
  }
  emomClick(id: string | undefined) {
    if (id) {
      this.navCtrl.navigateForward(['/wodinfo', id]);
    } else {
      console.error('Workout ID is undefined');
    }
  }
  amrapClick(id: string | undefined) {
    if (id) {
      this.navCtrl.navigateForward(['/wodinfo', id]);
    } else {
      console.error('Workout ID is undefined');
    }
  }
  unsubscribeAndNavigateBack(): void {
    if (this.wodSub) {
      this.wodSub.unsubscribe();
      this.wodSub = null;
    }
    this.navCtrl.back();
  }

  ngOnDestroy(): void {
    // Cleanup logic
    if (this.wodSub) {
      this.wodSub.unsubscribe();
    }
    console.log('AhomePage destroyed');
  }
  deleteWorkout(id: string| undefined, event: Event) {
    event.stopPropagation();
    // Show confirmation dialog
    if (confirm("Are you sure you want to delete this Interval?")) {
      // If user confirms deletion, proceed with deletion
      this.workoutService.deleteWorkout(id).then(() => {
        // Reload workouts after deletion
        this.loadTabatas();
      });
    }else{
      this.navCtrl.navigateRoot(['/ahome']);
    }
  }
  deleteTabata(id: string | undefined, event: Event) {
    event.stopPropagation();
    // Show confirmation dialog
    if (confirm("Are you sure you want to delete this Tabata?")) {
      // If user confirms deletion, proceed with deletion
      this.workoutService.deleteTabata(id).then(() => {
        // Reload workouts after deletion
        this.loadTabatas();
      });
    }else{
      this.navCtrl.navigateRoot(['/ahome']);
    }
  }
  
  deleteLadder(id: string| undefined, event: Event) {
    event.stopPropagation();
    // Show confirmation dialog
    if (confirm("Are you sure you want to delete this Ladder?")) {
      // If user confirms deletion, proceed with deletion
      this.workoutService.deleteLadder(id).then(() => {
        // Reload workouts after deletion
        this.loadLadders();
      });
    }else{
      this.navCtrl.navigateRoot(['/ahome']);
    }
  }
  deleteEmom(id: string | undefined, event: Event) {
    event.stopPropagation();
    // Show confirmation dialog
    if (confirm("Are you sure you want to delete this Emom?")) {
      // If user confirms deletion, proceed with deletion
      this.workoutService.deleteEmom(id).then(() => {
        // Reload workouts after deletion
        this.loadEmoms();
      });
    }else{
      this.navCtrl.navigateRoot(['/ahome']);
    }
  }
  deleteAmrap(id: string | undefined, event: Event) {
    event.stopPropagation();
    // Show confirmation dialog
    if (confirm("Are you sure you want to delete this Amrap?")) {
      // If user confirms deletion, proceed with deletion
      this.workoutService.deleteAmrap(id).then(() => {
        // Reload workouts after deletion
        this.loadAmraps();
      });
    }else{
      this.navCtrl.navigateRoot(['/ahome']);
    }
  }
  todaAdduser(){
    this.navCtrl.navigateForward(['/adduser']);
  }
  todaAddwod(){
    this.navCtrl.navigateForward(['/wodstyle']);
  }
  
   async onLogout(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Logout cancelled');
          },
        },
        {
          text: 'Logout',
          handler: async () => {
            try {
              await this.authService.logout();
              console.log('Logout successful');
            } catch (error) {
              this.errorMessage = 'Error during logout. Please try again.';
              console.error('Error during logout:', error);
            }
          },
        },
      ],
    });

    await alert.present();
  }
 
}
