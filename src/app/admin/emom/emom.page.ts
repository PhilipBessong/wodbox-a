import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MsearchComponent } from '../msearch/msearch.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { WorkoutsService, Exercise, Emom } from 'src/app/firebase/workouts.service';
import { NavController, ToastController } from '@ionic/angular';

interface  emomData {
  wodCat: '',
  wodStyle: 'EMOM',
 emomNum: 1,
  mpe:number| null,
  sets: number;
  e1m1: string;
  e1m2: string;
  e1m3: string;
  e1m4: string;
  e2m1: string;
  e2m2: string;
  e2m3: string;
  e2m4: string;
  e3m1: string;
  e3m2:string;
  e3m3: string;
  e3m4:string;
  e1m1rep: null,
  e1m2rep: null,
  e1m3rep: null,
  e1m4rep: null,
  e2m1rep: null,
  e2m2rep: null,
  e2m3rep: null,
  e2m4rep: null,
  e3m1rep: null,
  e3m2rep: null,
  e3m3rep: null,
  e3m4rep: null,
  daDate: string; 
};
type emomfrmmKeys = keyof emomData;
@Component({
  selector: 'app-emom',
  templateUrl: './emom.page.html',
  styleUrls: ['./emom.page.scss'],
})
export class EmomPage implements OnInit {
  constructor(
    private router: Router,
    private workoutsService: WorkoutsService,
    private toastCtrl: ToastController,
    private modalController: ModalController,
    private firestore: AngularFirestore
  ) {}

  towodstyle() {
    this.router.navigate(['/wodstyle']);
  }

  moves: Exercise[] = [];
  numemom: number| null = null;
  mpes: number = 0;
  sets: number = 1;
  ngOnInit() {
    this.loadMoves();
  }
  loadMoves() {
    this.moves = this.workoutsService.getAllMoves();
  }
  emomData = {
    wodCat: '',
    wodStyle: 'EMOM',
   emomNum: 1,
    mpe: null,
    sets:null,
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
    e1m1rep: null,
    e1m2rep: null,
    e1m3rep: null,
    e1m4rep: null,
    e2m1rep: null,
    e2m2rep: null,
    e2m3rep: null,
    e2m4rep: null,
    e3m1rep: null,
    e3m2rep: null,
    e3m3rep: null,
    e3m4rep: null,
    daDate: new Date().toISOString().substring(0, 10), // Initialize with today's date
  };
  onNumberChange(value: any) {
    // Convert value to number
    const numericValue = Number(value);
    
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 4) {
      this.numemom = numericValue;
      this.emomData.emomNum = numericValue;
    } else {
      // Reset to null if invalid
      this.numemom = null;
      this.emomData.emomNum = 1; // Set default for rounds
    }
  }

  showErrorCard = false;
  submitForm() {
    if (!this.emomData.wodCat || !this.emomData.daDate || !this.emomData.e1m1||!this.emomData.e1m1rep) {
      // Handle form validation or display an error message
      // For now, I'm displaying a simple alert message
      alert('Please fill in all the required fields.');
      return;
    
    }
  
     // Define the collections to check for existing documents
     const collections = ['workouts', 'tabatas', 'ladders', 'emoms','amrap'];
  
     // Create an array of promises for checking each collection
    const checkPromises = collections.map(collection =>
      this.firestore.collection(collection, ref => ref.where('daDate', '==', this.emomData.daDate)
                                                      .where('wodCat', '==', this.emomData.wodCat))
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
          this.firestore.collection('emoms').add(this.emomData)
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
  async openMoveSelection(inputField: emomfrmmKeys) {
    const modal = await this.modalController.create({
      component: MsearchComponent,
      componentProps: { moves: this.moves }
    });

    modal.onDidDismiss().then((dataReturned: any) => {
      if (dataReturned !== null && dataReturned.data) {
        const selectedMove: Exercise = dataReturned.data as Exercise;
        if (inputField in this.emomData) {
          (this.emomData[inputField] as unknown) = selectedMove.exeName; // Use type assertion
        }
      }
    });

    return await modal.present();
  }

}
