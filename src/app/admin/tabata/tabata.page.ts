import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MsearchComponent } from '../msearch/msearch.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  WorkoutsService,
  Exercise,
} from 'src/app/firebase/workouts.service';

interface TabataData {
  wodCat: string;
  wodStyle: string;
  tabataNum: number;
  mpt: number| null;
  t1m1: string;
  t1m2: string;
  t2m1: string;
  t2m2: string;
  t3m1: string;
  t3m2: string;
  t4m1: string;
  t4m2: string;
  t5m1: string;
  t5m2: string;
  t6m1: string;
  t6m2: string;
  t7m1: string;
  t7m2: string;
  t8m1: string;
  t8m2: string;
  move: number;
  rest: number;
  sets: number;
  daDate: string;}
 type tabatafrmmKeys = keyof TabataData; 
@Component({
  selector: 'app-tabata',
  templateUrl: './tabata.page.html',
  styleUrls: ['./tabata.page.scss'],
})
export class TabataPage implements OnInit {
  moves: Exercise[] = [];
  numtabat:number| null = null;
  mpts: number = 0;

  constructor(
    private router: Router,
    private workoutsService: WorkoutsService,
    private modalController: ModalController,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadMoves();
  }
  tabataData: TabataData = {
    wodCat: '',
    wodStyle: 'TABATA',
    tabataNum: 1,
    mpt: null,
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
    t6m1: '',
    t6m2: '',
    t7m1: '',
    t7m2: '',
    t8m1: '',
    t8m2: '',
    move:20,
    rest:10,
    sets: 8,
    daDate: new Date().toISOString().substring(0, 10), // Initialize with today's date
  };

  onNumberChange(value: any) {
    // Convert value to number
    const numericValue = Number(value);
    
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 8) {
      this.numtabat = numericValue;
      this.tabataData.tabataNum = numericValue;
    } else {
      // Reset to null if invalid
      this.numtabat = null;
      this.tabataData.tabataNum = 1; // Set default for rounds
    }
  }


  loadMoves() {
    this.moves = this.workoutsService.getAllMoves();
  }
  async openMoveSelection(inputField: tabatafrmmKeys) {
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

  showErrorCard = false;
  submitForm() {
    if (!this.tabataData.wodCat || !this.tabataData.daDate || !this.tabataData.t1m1) {
      // Handle form validation or display an error message
      // For now, I'm displaying a simple alert message
      alert('Please fill in all the required fields.');
      return;
    }
    
     // Define the collections to check for existing documents
     const collections = ['workouts', 'tabatas', 'ladders', 'emoms','amrap'];
  
     // Create an array of promises for checking each collection
    const checkPromises = collections.map(collection =>
      this.firestore.collection(collection, ref => ref.where('daDate', '==', this.tabataData.daDate)
                                                      .where('wodCat', '==', this.tabataData.wodCat))
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
          this.firestore.collection('tabatas').add(this.tabataData)
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
  
  towodstyle() {
    this.router.navigate(['/wodstyle']);
  }
  
}
