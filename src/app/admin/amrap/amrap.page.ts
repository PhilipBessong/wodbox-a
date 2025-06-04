import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MsearchComponent } from '../msearch/msearch.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  WorkoutsService,
  Exercise,
  Amrap,
} from 'src/app/firebase/workouts.service';
import { NavController, ToastController } from '@ionic/angular';
interface amrapData {
  wodCat: '';
  wodStyle: 'AMRAP';
  amrapNum: number;
  mpa: number | null;
  a1m1: string;
  a1m2: string;
  a1m3: string;
  a1m4: string;
  a2m1: string;
  a2m2: string;
  a2m3: string;
  a2m4: string;
  a3m1: string;
  a3m2: string;
  a3m3: string;
  a3m4: string;
  a1move: number | null;
  a2move: number | null;
  a3move: number | null;
  a1m1rep: number | null;
  a1m2rep: number | null;
  a1m3rep: number | null;
  a1m4rep: number | null;
  a2m1rep: number | null;
  a2m2rep: number | null;
  a2m3rep: number | null;
  a2m4rep: number | null;
  a3m1rep: number | null;
  a3m2rep: number | null;
  a3m3rep: number | null;
  a3m4rep: number | null;
  daDate: string; // Initialize with today's date
}
type amrapfrmmKeys = keyof amrapData;
@Component({
  selector: 'app-amrap',
  templateUrl: './amrap.page.html',
  styleUrls: ['./amrap.page.scss'],
})
export class AmrapPage implements OnInit {
  constructor(
    private router: Router,
    private workoutsService: WorkoutsService,
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) {}

  towodstyle() {
    this.router.navigate(['/wodstyle']);
  }
  moves: Exercise[] = [];
  numamrap: number | null = null;
  mpas: number = 0;
  sets: number = 0;
  amrapData: amrapData = {
    wodCat: '',
    wodStyle: 'AMRAP',
    amrapNum: 1,
    mpa: null,
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
    a1move: null,
    a2move: null,
    a3move: null,
    a1m1rep: null,
    a1m2rep: null,
    a1m3rep: null,
    a1m4rep: null,
    a2m1rep: null,
    a2m2rep: null,
    a2m3rep: null,
    a2m4rep: null,
    a3m1rep: null,
    a3m2rep: null,
    a3m3rep: null,
    a3m4rep: null,
    daDate: new Date().toISOString().substring(0, 10), // Initialize with today's date
  };
  ngOnInit() {
    this.loadMoves();
  }
  loadMoves() {
    this.moves = this.workoutsService.getAllMoves();
  }
  showErrorCard = false;
  onNumberChange(value: any) {
    // Convert value to number
    const numericValue = Number(value);

    if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 4) {
      this.numamrap = numericValue;
      this.amrapData.amrapNum = numericValue;
    } else {
      // Reset to null if invalid
      this.numamrap = null;
      this.amrapData.amrapNum = 1; // Set default for rounds
    }
  }

  submitForm() {
    if (
      !this.amrapData.wodCat ||
      !this.amrapData.daDate ||
      !this.amrapData.a1m1 ||
      !this.amrapData.a1m1rep ||
      !this.amrapData.a1move
    ) {
      // Handle form validation or display an error message
      // For now, I'm displaying a simple alert message
      alert('Please fill in all the required fields.');
      return;
    }

    // Define the collections to check for existing documents
    const collections = ['workouts', 'tabatas', 'ladders', 'emoms', 'amrap'];

    // Create an array of promises for checking each collection
    const checkPromises = collections.map((collection) =>
      this.firestore
        .collection(collection, (ref) =>
          ref
            .where('daDate', '==', this.amrapData.daDate)
            .where('wodCat', '==', this.amrapData.wodCat)
        )
        .get()
        .toPromise()
    );

    // Use Promise.all to wait for all checks to complete
    Promise.all(checkPromises)
      .then((querySnapshots) => {
        // Check if any of the collections have existing documents
        const documentExists = querySnapshots.some(
          (snapshot) => snapshot && snapshot.size > 0
        );

        if (documentExists) {
          // If a document with the same date and wodCat already exists
          this.showErrorCard = true;
        } else {
          // If no such document exists in any collection, submit the form
          this.firestore
            .collection('amrap')
            .add(this.amrapData)
            .then(() => {
              console.log('Workout data submitted successfully!');
              // Optionally, reset the form or navigate to another page
              this.router.navigate(['/ahome']);
            })
            .catch((error) => {
              console.error('Error submitting workout data:', error);
              // Handle error appropriately
            });
        }
      })
      .catch((error) => {
        console.error('Error checking for existing documents:', error);
        // Handle error appropriately
      });
  }
  hideErrorCard() {
    this.showErrorCard = false;
  }

  async openMoveSelection(inputField: amrapfrmmKeys) {
    const modal = await this.modalController.create({
      component: MsearchComponent,
      componentProps: { moves: this.moves },
    });

    modal.onDidDismiss().then((dataReturned: any) => {
      if (dataReturned !== null && dataReturned.data) {
        const selectedMove: Exercise = dataReturned.data as Exercise;
        if (inputField in this.amrapData) {
          (this.amrapData[inputField] as unknown) = selectedMove.exeName; // Use type assertion
        }
      }
    });

    return await modal.present();
  }
}
