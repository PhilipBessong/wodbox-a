import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MsearchComponent } from '../msearch/msearch.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  WorkoutsService,
  Exercise,
} from 'src/app/firebase/workouts.service';
import { NavController, ToastController } from '@ionic/angular';
interface ladderData {
  wodCat: string;
  wodStyle: string;
  ladderNum: number;
  mpl: number| null;
  l1m1: string;
  l1m2: string;
  l1m3: string;
  l1m4: string;
  l2m1: string;
  l2m2: string;
  l2m3: string;
  l2m4: string;
  l3m1: string;
  l3m2: string;
  l3m3: string;
  l3m4: string;
  l1move: number;
  l2move: number;
  l3move: number;
  daDate: string;}
  type ladderfrmmKeys = keyof ladderData;
@Component({
  selector: 'app-ladder',
  templateUrl: './ladder.page.html',
  styleUrls: ['./ladder.page.scss'],
})
export class LadderPage implements OnInit {

  constructor(
    private router: Router,
    private workoutsService: WorkoutsService,
    private modalController: ModalController,
    private firestore: AngularFirestore
  ) { }

  moves: Exercise[] = [];
  numladder: number | null = null;
  mpls: number = 0;

  ladderData = {
    wodCat: '',
    wodStyle: 'LADDER',
   ladderNum: 1,
    mpl: null,
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
    l1move: null,
    l2move: null,
    l3move: null,
    daDate: new Date().toISOString().substring(0, 10), // Initialize with today's date
  };
  ngOnInit() {
    this.loadMoves();
  }
  towodstyle() {
    this.router.navigate(['/wodstyle']);
  }
  loadMoves() {
    this.moves = this.workoutsService.getAllMoves();
  }
  onNumberChange(value: any) {
    // Convert value to number
    const numericValue = Number(value);
    
    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 4) {
      this.numladder = numericValue;
      this.ladderData.ladderNum = numericValue;
    } else {
      // Reset to null if invalid
      this.numladder = null;
      this.ladderData.ladderNum = 1; // Set default for rounds
    }
  }

  showErrorCard = false;
  submitForm() {
    if (!this.ladderData.wodCat || !this.ladderData.daDate || !this.ladderData.l1m1||!this.ladderData.l1move) {
      // Handle form validation or display an error message
      // For now, I'm displaying a simple alert message
      alert('Please fill in all the required fields.');
      return;
    
    }
      // Define the collections to check for existing documents
      const collections = ['workouts', 'tabatas', 'ladders', 'emoms','amrap'];
  
      // Create an array of promises for checking each collection
     const checkPromises = collections.map(collection =>
       this.firestore.collection(collection, ref => ref.where('daDate', '==', this.ladderData.daDate)
                                                       .where('wodCat', '==', this.ladderData.wodCat))
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
           this.firestore.collection('ladders').add(this.ladderData)
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
  async openMoveSelection(inputField: ladderfrmmKeys) {
    const modal = await this.modalController.create({
      component: MsearchComponent,
      componentProps: { moves: this.moves }
    });

    modal.onDidDismiss().then((dataReturned: any) => {
      if (dataReturned !== null && dataReturned.data) {
        const selectedMove: Exercise = dataReturned.data as Exercise;
        if (inputField in this.ladderData) {
          (this.ladderData[inputField] as unknown) = selectedMove.exeName; // Use type assertion
        }
      }
    });

    return await modal.present();
  }

}
