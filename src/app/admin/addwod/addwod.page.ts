import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MsearchComponent } from '../msearch/msearch.component';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {
  WorkoutsService,
  Exercise
} from 'src/app/firebase/workouts.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

// Define the type of initForm
interface InitForm {
  wodCat: string;
  wodStyle: string;
  rounds: number;
  mpr: number | null;
  r1m1: string;
  r1m2: string;
  r1m3: string;
  r1sets: number | null;
  r1move: number | null;
  r1rest: number | null;
  r2m1: string;
  r2m2: string;
  r2m3: string;
  r2sets: number | null;
  r2move: number | null;
  r2rest: number | null;
  r3m1: string;
  r3m2: string;
  r3m3: string;
  r3sets: number | null;
  r3move: number | null;
  r3rest: number | null;
  r4m1: string;
  r4m2: string;
  r4m3: string;
  r4sets: number | null;
  r4move: number | null;
  r4rest: number | null;
  daDate: string;
}

// Define the InitFormKeys type outside the class
type InitFormKeys = keyof InitForm;

@Component({
  selector: 'app-addwod',
  templateUrl: './addwod.page.html',
  styleUrls: ['./addwod.page.scss'],
})
export class AddwodPage implements OnInit {
  
  moves: Exercise[]=[];
  mprs: number = 0;
  selectedNumber: number| null = null;
  constructor(
    private workoutsService: WorkoutsService,
    private firestore: AngularFirestore,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadMoves();
  }
  
  loadMoves(){
    this.moves = this.workoutsService.getAllMoves();
     // Initialize form controls after data is available

  }

  initForm: InitForm = {
    wodCat: '',
    wodStyle: 'INTERVAL',
    rounds: 1,
    mpr: null,
    r1m1: '',
    r1m2: '',
    r1m3: '',
    r1sets: null,
    r1move: null,
    r1rest: null,
    r2m1: '',
    r2m2: '',
    r2m3: '',
    r2sets: null,
    r2move: null,
    r2rest: null,
    r3m1: '',
    r3m2: '',
    r3m3: '',
    r3sets: null,
    r3move: null,
    r3rest: null,
    r4m1: '',
    r4m2: '',
    r4m3: '',
    r4sets: null,
    r4move: null,
    r4rest: null,
    daDate: new Date().toISOString().substring(0, 10), // Initialize with today's date
  };

    onNumberChange(value: any) {
      // Convert value to number
      const numericValue = Number(value);
      
      if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 4) {
        this.selectedNumber = numericValue;
        this.initForm.rounds = numericValue;
      } else {
        // Reset to null if invalid
        this.selectedNumber = null;
        this.initForm.rounds = 1; // Set default for rounds
      }
    }

    async openMoveSelection(inputField: InitFormKeys) {
      const modal = await this.modalController.create({
        component: MsearchComponent,
        componentProps: { moves: this.moves }
      });
  
      modal.onDidDismiss().then((dataReturned: any) => {
        if (dataReturned !== null && dataReturned.data) {
          const selectedMove: Exercise = dataReturned.data as Exercise;
          if (inputField in this.initForm) {
            (this.initForm[inputField] as unknown) = selectedMove.exeName; // Use type assertion
          }
        }
      });
  
      return await modal.present();
    }
  showErrorCard = false;
 
  submitForm() {
    // Check for missing required fields
    if (!this.initForm.wodCat || !this.initForm.daDate || !this.initForm.r1m1 || !this.initForm.r1move) {
      alert('Please fill in all the required fields.');
      return;
    }
    if( this.initForm.rounds ===2 && !this.initForm.r2move && !this.initForm.r2sets && !this.initForm.r2rest){
      alert('Please fill in all the required fields.');
      return;
    }
    if( this.initForm.rounds ===3 && !this.initForm.r3move && !this.initForm.r3sets && !this.initForm.r3rest){
      alert('Please fill in all the required fields.');
      return;
    }
    if( this.initForm.rounds ===4 && !this.initForm.r4move && !this.initForm.r4sets && !this.initForm.r4rest){
      alert('Please fill in all the required fields.');
      return;
    }
  
    // Define the collections to check for existing documents
    const collections = ['workouts', 'tabatas', 'ladders', 'emoms','amrap'];
  
    // Create an array of promises for checking each collection
    const checkPromises = collections.map(collection =>
      this.firestore.collection(collection, ref => ref.where('daDate', '==', this.initForm.daDate)
                                                      .where('wodCat', '==', this.initForm.wodCat))
        .get().toPromise()
    );
  
    // Use Promise.all to wait for all checks to complete
    Promise.all(checkPromises)
      .then(querySnapshots => {
        // Check if any of the collections have existing documents
        const documentExists = querySnapshots.some(snapshot => snapshot && snapshot.size > 0);
  
        if (documentExists) {
          // If a document with the same date and wodCat already exists
          this.showErrorCard = true;
        } else {
          // If no such document exists in any collection, submit the form
          this.firestore.collection('workouts').add(this.initForm)
            .then(() => {
              console.log('Workout data submitted successfully!');
              // Optionally, reset the form or navigate to another page
              this.router.navigate(['/ahome']);
            })
            .catch(error => {
              console.error('Error submitting workout data:', error);
              // Handle error appropriately
            });
        }
      })
      .catch(error => {
        console.error('Error checking for existing documents:', error);
        // Handle error appropriately
      });
  }
  
  
  hideErrorCard() {
    this.showErrorCard = false;
  }
   
  backtoWarmUp(){
    this.router.navigate(['/wodstyle']);
  }
}
