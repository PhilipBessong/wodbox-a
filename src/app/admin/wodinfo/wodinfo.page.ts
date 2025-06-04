import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonRouterOutlet  } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Workout,
  Tabata,
  WorkoutsService,
  Exercise,
  Ladder,
  Emom,
  Amrap,
} from 'src/app/firebase/workouts.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { MsearchComponent } from '../msearch/msearch.component';
// Define the keys type 
type WorkoutKeys = keyof Workout;
type TabataKeys = keyof Tabata;
@Component({
  selector: 'app-wodinfo',
  templateUrl: './wodinfo.page.html',
  styleUrls: ['./wodinfo.page.scss'],
})
export class WodinfoPage implements OnInit, OnDestroy  {
  private wodSub: Subscription[] = [];
  moves: Exercise[] = [];
  numtabat: number = 0;
  mpts: number = 0;
  rounds: number = 0;
  mprs: number = 0;
  numladder: number = 0;
  mpls: number = 0;
  numemom: number = 0;
  mpes: number = 0;
  numamrap: number = 0;
  mpas: number = 0;
  sets:number = 0;
  showButtons: boolean = false;
    // Define isDateInPast property
    //isDateInPast: boolean = false;
    isTabataPresent: boolean = false;
    isIntrvalPresent: boolean = false;
    isLadderPresent: boolean = false;
    isEmomPresent: boolean = false;
    isAmrapPresent: boolean = false;
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
    this.showButtons= true;
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
    t6m1: '',
    t6m2: '',
    t7m1: '',
    t7m2: '',
    t8m1: '',
    t8m2: ''
  };
  ladderData: Ladder= {
    id:'',
    wodCat: '',
    wodStyle: '',
   ladderNum: 0,
    mpl: 0,
    l1m1: '',
    l1m2: '',
    l1m3: '',
    l1m4: '',
    l2m1: '',
    l2m2: '',
    l2m3: '',
    l2m4: '',
    l3m1: '',
    l3m2: '',
    l3m3: '',
    l3m4: '',
    l1move: 0,
    l2move: 0,
    l3move: 0,
    daDate: ''
  };
  emomData: Emom = {
    wodCat: '',
    wodStyle: '',
   emomNum: 0,
   sets: 0,
    mpe: 0,
    e1m1: '',
    e1m2: '',
    e1m3: '',
    e1m4: '',
    e2m1: '',
    e2m2: '',
    e2m3: '',
    e2m4: '',
    e3m1: '',
    e3m2: '',
    e3m3: '',
    e3m4: '',
    e1m1rep: 0,
    e1m2rep: 0,
    e1m3rep: 0,
    e1m4rep: 0,
    e2m1rep: 0,
    e2m2rep: 0,
    e2m3rep: 0,
    e2m4rep: 0,
    e3m1rep: 0,
    e3m2rep: 0,
    e3m3rep: 0,
    e3m4rep: 0,
    daDate: '', // Initialize with today's date
  };
  amrapData: Amrap = {
    wodCat: '',
    wodStyle: '',
  amrapNum: 0,
    mpa: 0,
    a1m1: '',
    a1m2: '',
    a1m3: '',
    a1m4: '',
    a2m1: '',
    a2m2: '',
    a2m3: '',
    a2m4: '',
    a3m1: '',
    a3m2: '',
    a3m3: '',
    a3m4: '',
    a1move: 0,
    a2move: 0,
    a3move: 0,
    a1m1rep: 0,
    a1m2rep: 0,
    a1m3rep: 0,
    a1m4rep: 0,
    a2m1rep: 0,
    a2m2rep: 0,
    a2m3rep: 0,
    a2m4rep: 0,
    a3m1rep: 0,
    a3m2rep: 0,
    a3m3rep: 0,
    a3m4rep: 0,
    daDate: '',
  };
  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutsService,
    private router: Router,
 
    private modalController: ModalController,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.loadMoves();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.wodSub.push(
        this.workoutService.getWorkoutById(id).subscribe((workout) => {
          if (workout) {
            this.workout = workout;
            this.mprs = workout.mpr;
            this.rounds = workout.rounds;
            this.isIntrvalPresent = true;
          }
        })
      );

      this.wodSub.push(
        this.workoutService.getTabataById(id).subscribe((tabata) => {
          if (tabata) {
            this.tabataData = tabata;
            this.mpts = tabata.mpt;
            this.numtabat = tabata.tabataNum;
            this.isTabataPresent = true;
          }
        })
      );

      this.wodSub.push(
        this.workoutService.getLadderById(id).subscribe((ladder) => {
          if (ladder) {
            this.ladderData = ladder;
            this.mpls = ladder.mpl;
            this.numladder = ladder.ladderNum;
            this.isLadderPresent = true;
          }
        })
      );

      this.wodSub.push(
        this.workoutService.getEmomById(id).subscribe((emom) => {
          if (emom) {
            this.emomData = emom;
            this.mpes = emom.mpe;
            this.numemom = emom.emomNum;
            this.isEmomPresent = true;
          }
        })
      );

      this.wodSub.push(
        this.workoutService.getAmrapById(id).subscribe((amrap) => {
          if (amrap) {
            this.amrapData = amrap;
            this.mpas = amrap.mpa;
            this.numamrap = amrap.amrapNum;
            this.isAmrapPresent = true;
          }
        })
      );
    }
    
  }

  ngOnDestroy(): void {
    // Unsubscribe from all active subscriptions
    this.wodSub.forEach((sub) => sub.unsubscribe());
  }
  loadMoves() {
    this.moves = this.workoutService.getAllMoves();
  }
  async openMoveSelection(inputField: WorkoutKeys) {
    const modal = await this.modalController.create({
      component: MsearchComponent,
      componentProps: { moves: this.moves }
    });

    modal.onDidDismiss().then((dataReturned: any) => {
      if (dataReturned !== null && dataReturned.data) {
        const selectedMove: Exercise = dataReturned.data as Exercise;
        if (inputField in this.workout) {
          (this.workout[inputField] as unknown) = selectedMove.exeName; // Use type assertion
        }
      }
    });

    return await modal.present();
  }
  async opentMoveSlct(inputField: TabataKeys) {
    const modal = await this.modalController.create({
      component: MsearchComponent,
      componentProps: { moves: this.moves }
    });

    modal.onDidDismiss().then((dataReturned: any) => {
      if (dataReturned !== null && dataReturned.data) {
        const selectedMove: Exercise = dataReturned.data as Exercise;
        if (inputField in this.tabataData) {
          (this.tabataData[inputField] as unknown) = selectedMove.exeName; // Use type assertion
        }
      }
    });

    return await modal.present();
  }

  backhome(): void{
  // Unsubscribe from subscriptions and navigate to the desired route
  this.ngOnDestroy(); // Ensure cleanup
  this.router.navigate(['/ahome']); // Navigate to the home page
  }
  ionViewWillLeave() {
    console.log('View is leaving');
    this.ngOnDestroy(); // Cleanup when user navigates away
  }

  showErrorCard = false;
  showSaveCard = false;

  async saveInterval(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('Error: interval ID is null');
      return;
    }
  
    if (!this.workout.daDate || !this.workout.wodCat) {
      console.error('Error: daDate or wodCat is undefined in workout');
      return;
    }

    if (this.workout.rounds < 4) {
      this.workout.r4m1 = '';
      this.workout.r4m2 = '';
      this.workout.r4m3 = '';
      this.workout.r4sets = 0;
      this.workout.r4move = 0;
      this.workout.r4rest = 0;
    }
    if (this.workout.rounds < 3) {
      this.workout.r3m1 = '';
      this.workout.r3m2 = ''; 
      this.workout.r3m3 = '';
      this.workout.r3sets = 0;
      this.workout.r3move = 0;
      this.workout.r3rest = 0;
      this.workout.r4m1 = '';
      this.workout.r4m2 = '';
      this.workout.r4m3 = '';
      this.workout.r4sets = 0;
      this.workout.r4move = 0;
      this.workout.r4rest = 0;
    }
    if (this.workout.rounds < 2) {
      this.workout.r2m1 = '';
      this.workout.r2m2 = '';
      this.workout.r2m3 = '';
      this.workout.r2sets = 0;
      this.workout.r2move = 0;
      this.workout.r2rest = 0;
      this.workout.r3m1 = '';
      this.workout.r3m2 = '';
      this.workout.r3m3 = '';
      this.workout.r3sets = 0;
      this.workout.r3move = 0;
      this.workout.r3rest = 0;
      this.workout.r4m1 = '';
      this.workout.r4m2 = '';
      this.workout.r4m3 = '';
      this.workout.r4sets = 0;
      this.workout.r4move = 0;
      this.workout.r4rest = 0;
    }

    if (this.workout.mpr < 3) {
    this.workout.r1m3 = '';
    this.workout.r2m3 = '';
    this.workout.r3m3 = '';
    this.workout.r4m3 = '';
    }
    if (this.workout.mpr < 2) {
      this.workout.r2m2 = '';
      this.workout.r3m2 = '';
      this.workout.r4m2 = '';
    }
  
    const collections = ['workouts', 'tabatas', 'ladders', 'emoms', 'amrap'];
  
    try {
      const querySnapshots = await Promise.all(
        collections.map(async collection => {
          return this.firestore.collection(collection, ref =>
            ref
              .where('daDate', '==', this.workout.daDate)
              .where('wodCat', '==', this.workout.wodCat)
              .where('id', '!=', id)
          ).get().toPromise();
        })
      );
  
      const documentExists = querySnapshots.some(snapshot => snapshot && snapshot.size > 0);
  
      if (documentExists) {
        this.showErrorCard = true;
        return;
      }
  
      await this.workoutService.updateWorkout(id, this.workout);
      // Update UI state
      this.showButtons = false;
      this.isDisabled = true;
      this.showSaveCard= true;
      
    } catch (error) {
      console.error('Error during saveInterval execution:', error);
    }
  }
  async savetabata(): Promise<void> {
    // Extract `id` from the route at the beginning
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('Error: tabata ID is null');
      return; // Exit if no ID
    }
  
    // Ensure `daDate` and `wodCat` are defined
    if (!this.tabataData.daDate || !this.tabataData.wodCat) {
      console.error('Error: daDate or wodCat is undefined in tabata');
      return;
    }

    if (this.tabataData.tabataNum < 8) {
      this.tabataData.t8m1 = '';
      this.tabataData.t8m2 = '';
    }
    if (this.tabataData.tabataNum < 7) {
      this.tabataData.t7m1 = '';
      this.tabataData.t7m2 = '';
    }
    if (this.tabataData.tabataNum < 6) {
      this.tabataData.t6m1 = '';
      this.tabataData.t6m2 = '';
    }
    if (this.tabataData.tabataNum < 5) {
      this.tabataData.t5m1 = '';
      this.tabataData.t5m2 = '';
    }
    if (this.tabataData.tabataNum < 4) {
      this.tabataData.t4m1 = '';
      this.tabataData.t4m2 = '';
    }
    if (this.tabataData.tabataNum < 3) {
      this.tabataData.t3m1 = '';
      this.tabataData.t3m2 = '';
    }
    if (this.tabataData.tabataNum < 2) {
      this.tabataData.t2m1 = '';
      this.tabataData.t2m2 = '';
    }
    if (this.tabataData.mpt < 2) {
      this.tabataData.t1m2 = '';
      this.tabataData.t2m2 = '';
      this.tabataData.t3m2 = '';
      this.tabataData.t4m2 = '';
      this.tabataData.t5m2 = '';
      this.tabataData.t6m2 = '';
      this.tabataData.t7m2 = '';
      this.tabataData.t8m2 = '';
    }
    // Define the collections to check
    const collections = ['workouts', 'tabatas', 'ladders', 'emoms', 'amrap'];
    
    try {
      // Perform Firestore checks for all collections
      const querySnapshots = await Promise.all(
        collections.map(async collection => {
          return this.firestore.collection(collection, ref =>
            ref
              .where('daDate', '==', this.tabataData.daDate)
              .where('wodCat', '==', this.tabataData.wodCat)
              .where('id', '!=', id)
          ).get().toPromise();
        })
      );
      // Determine if a conflicting document exists
      const documentExists = querySnapshots.some(snapshot => snapshot && snapshot.size > 0);
  
      if (documentExists) {
        this.showErrorCard = true; // Show error card
        return;
      }
        
      // Update the tabata
      await this.workoutService.updateTabata(id, this.tabataData);
      // Update UI state
      this.showButtons = false;
      this.isDisabled = true;
      this.showSaveCard= true;
  
    } catch (error) {
      console.error('Error during saveTabata execution:', error);
      // Handle error (e.g., display error message to user)
    }
  }
  async saveladder(): Promise<void> {
    // Extract `id` from the route at the beginning
    const id = this.route.snapshot.paramMap.get('id');
  
    if (!id) {
      console.error('Error: ladder ID is null');
      return; // Exit if no ID
    }
    // Ensure `daDate` and `wodCat` are defined
    if (!this.ladderData.daDate || !this.ladderData.wodCat) {
      console.error('Error: daDate or wodCat is undefined in ladder');
      return;
    }

    if (this.ladderData.ladderNum < 3) {
      this.ladderData.l3m1 = '';
      this.ladderData.l3m2 = '';
      this.ladderData.l3m3 = '';
      this.ladderData.l3m4 = '';
    }
    if (this.ladderData.ladderNum < 2) {
      this.ladderData.l2m1 = '';
      this.ladderData.l2m2 = '';
      this.ladderData.l2m3 = '';
      this.ladderData.l2m4 = '';
    }
    if (this.ladderData.mpl < 4) {
      this.ladderData.l1m4 = '';
      this.ladderData.l2m4 = '';
      this.ladderData.l3m4 = '';
    }
    if (this.ladderData.mpl < 3) {
      this.ladderData.l1m3 = '';
      this.ladderData.l2m3 = '';
      this.ladderData.l3m3 = '';
      this.ladderData.l1m4 = '';
      this.ladderData.l2m4 = '';
      this.ladderData.l3m4 = '';
    }
    if (this.ladderData.mpl < 2) {
      this.ladderData.l1m2 = '';
      this.ladderData.l2m2 = '';
      this.ladderData.l3m2 = '';
      this.ladderData.l1m3 = '';
      this.ladderData.l2m3 = '';
      this.ladderData.l3m3 = '';
      this.ladderData.l1m4 = '';
      this.ladderData.l2m4 = '';
      this.ladderData.l3m4 = '';
    }    
  
    // Define the collections to check
    const collections = ['workouts', 'tabatas', 'ladders', 'emoms', 'amrap'];
    
    try {

      
      // Perform Firestore checks for all collections
      const querySnapshots = await Promise.all(
        collections.map(async collection => {
          console.log(`Checking collection: ${collection}`);
          return this.firestore.collection(collection, ref =>
            ref
              .where('daDate', '==', this.ladderData.daDate)
              .where('wodCat', '==', this.ladderData.wodCat)
              .where('id', '!=', id)
          ).get().toPromise();
        })
      );
  
  
      // Determine if a conflicting document exists
      const documentExists = querySnapshots.some(snapshot => snapshot && snapshot.size > 0);
  
      if (documentExists) {
        console.log('Document with the same date and wodCat already exists.');
        this.showErrorCard = true; // Show error card
        return;
      }
  
      console.log('No conflicting document found, proceeding to update...');
      
      // Update the ladder
      await this.workoutService.updateLadder(id, this.ladderData);
      // Update UI state
      this.showButtons = false;
      this.isDisabled = true;
      this.showSaveCard= true;
    } catch (error) {
      console.error('Error during saveLadder execution:', error);
      // Handle error (e.g., display error message to user)
    }
  }
  async saveemom(): Promise<void> {
    // Extract `id` from the route at the beginning
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Emom ID:', id);
  
    if (!id) {
      console.error('Error: Emom ID is null');
      return; // Exit if no ID
    }
  
    // Ensure `daDate` and `wodCat` are defined
    if (!this.emomData.daDate || !this.emomData.wodCat) {
      console.error('Error: daDate or wodCat is undefined in emom');
      return;
    }

    if (this.emomData.emomNum < 3) {
      this.emomData.e3m1 = '';
      this.emomData.e3m2 = '';
      this.emomData.e3m3 = '';
      this.emomData.e3m4 = '';
    }
    if (this.emomData.emomNum < 2) {
      this.emomData.e2m1 = '';
      this.emomData.e2m2 = '';
      this.emomData.e2m3 = '';
      this.emomData.e2m4 = '';
    }
    if (this.emomData.mpe < 4) {
      this.emomData.e1m4 = '';
      this.emomData.e2m4 = '';
      this.emomData.e3m4 = '';
    }
    if (this.emomData.mpe < 3) {
      this.emomData.e1m3 = '';
      this.emomData.e2m3 = '';
      this.emomData.e3m3 = '';
      this.emomData.e1m4 = '';
      this.emomData.e2m4 = '';
      this.emomData.e3m4 = '';
    }
    if (this.emomData.mpe < 2) {
      this.emomData.e1m2 = '';
      this.emomData.e2m2 = '';
      this.emomData.e3m2 = '';
      this.emomData.e1m3 = '';
      this.emomData.e2m3 = '';
      this.emomData.e3m3 = '';
      this.emomData.e1m4 = '';
      this.emomData.e2m4 = '';
      this.emomData.e3m4 = '';
    }    
  
    // Define the collections to check
    const collections = ['workouts', 'tabatas', 'ladders', 'emoms', 'amrap'];
    
    try {
      const start = Date.now();
      
      // Perform Firestore checks for all collections
      const querySnapshots = await Promise.all(
        collections.map(async collection => {
          console.log(`Checking collection: ${collection}`);
          return this.firestore.collection(collection, ref =>
            ref
              .where('daDate', '==', this.emomData.daDate)
              .where('wodCat', '==', this.emomData.wodCat)
              .where('id', '!=', id)
          ).get().toPromise();
        })
      );
  
      console.log('Firestore checks completed in', Date.now() - start, 'ms');
  
      // Determine if a conflicting document exists
      const documentExists = querySnapshots.some(snapshot => snapshot && snapshot.size > 0);
  
      if (documentExists) {
        console.log('Document with the same date and wodCat already exists.');
        this.showErrorCard = true; // Show error card
        return;
      }
  
      console.log('No conflicting document found, proceeding to update...');
      
      // Update the emom
      await this.workoutService.updateEmom(id, this.emomData);
      console.log('Emom updated successfully.');
  
      // Update UI state
      this.showButtons = false;
      this.isDisabled = true;
      this.showSaveCard= true;

    } catch (error) {
      console.error('Error during saveEmom execution:', error);
      // Handle error (e.g., display error message to user)
    }
  }
  async saveamrap(): Promise<void> {
    // Extract `id` from the route at the beginning
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Amrap ID:', id);
  
    if (!id) {
      console.error('Error: Amrap ID is null');
      return; // Exit if no ID
    }
  
    // Ensure `daDate` and `wodCat` are defined
    if (!this.amrapData.daDate || !this.amrapData.wodCat) {
      console.error('Error: daDate or wodCat is undefined in amrap');
      return;
    }

    if (this.amrapData.amrapNum < 3) {
     this.amrapData.a3m1 = '';
      this.amrapData.a3m2 = '';
      this.amrapData.a3m3 = '';
      this.amrapData.a3m4 = '';
    }
    if (this.amrapData.amrapNum < 2) {
      this.amrapData.a2m1 = '';
      this.amrapData.a2m2 = '';
      this.amrapData.a2m3 = '';
      this.amrapData.a2m4 = '';
    }
    if (this.amrapData.mpa < 4) {
      this.amrapData.a1m4 = '';
      this.amrapData.a2m4 = '';
      this.amrapData.a3m4 = '';
    }
    if (this.amrapData.mpa < 3) {
      this.amrapData.a1m3 = '';
      this.amrapData.a2m3 = '';
      this.amrapData.a3m3 = '';
      this.amrapData.a1m4 = '';
      this.amrapData.a2m4 = '';
      this.amrapData.a3m4 = '';
    }
    if (this.amrapData.mpa < 2) {
      this.amrapData.a1m2 = '';
      this.amrapData.a2m2 = '';
      this.amrapData.a3m2 = '';
      this.amrapData.a1m3 = '';
      this.amrapData.a2m3 = '';
      this.amrapData.a3m3 = '';
      this.amrapData.a1m4 = '';
      this.amrapData.a2m4 = '';
      this.amrapData.a3m4 = '';
    }    
  
    // Define the collections to check
    const collections = ['workouts', 'tabatas', 'ladders', 'emoms', 'amrap'];
    
    try {
      const start = Date.now();
      
      // Perform Firestore checks for all collections
      const querySnapshots = await Promise.all(
        collections.map(async collection => {
          console.log(`Checking collection: ${collection}`);
          return this.firestore.collection(collection, ref =>
            ref
              .where('daDate', '==', this.amrapData.daDate)
              .where('wodCat', '==', this.amrapData.wodCat)
              .where('id', '!=', id)
          ).get().toPromise();
        })
      );
  
      console.log('Firestore checks completed in', Date.now() - start, 'ms');
  
      // Determine if a conflicting document exists
      const documentExists = querySnapshots.some(snapshot => snapshot && snapshot.size > 0);
  
      if (documentExists) {
        console.log('Document with the same date and wodCat already exists.');
        this.showErrorCard = true; // Show error card
        return;
      }
  
      console.log('No conflicting document found, proceeding to update...');
      
      // Update the amrap
      await this.workoutService.updateAmrap(id, this.amrapData);
      console.log('Amrap updated successfully.');
  
      // Update UI state
      this.showButtons = false;
      this.isDisabled = true;
      this.showSaveCard= true;

    } catch (error) {
      console.error('Error during saveAmrap execution:', error);
      // Handle error (e.g., display error message to user)
    }
  }
  hideErrorCard() {
    this.showErrorCard = false;
  }
  hideSaveCard(){
    this.showSaveCard = false;
    this.ngOnDestroy();
    this.router.navigate(['/ahome']);
  }
  cancel() {
    this.showButtons= false;
    this.isDisabled = !this.isDisabled;
    this.ngOnDestroy();
    this.router.navigate(['/ahome']);
   
  }
}
