import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import {
  Exercise,
  Tabata,
  WorkoutsService,
} from 'src/app/firebase/workouts.service';
@Component({
  selector: 'app-t6m1',
  templateUrl: './t6m1.component.html',
  styleUrls: ['./t6m1.component.scss'],
})
export class T6m1Component  implements OnInit {

  stabatas: Tabata[] = [];
  exercises: Exercise[] = [];
  videoUrl: SafeResourceUrl | undefined;

  constructor(
    private modalController: ModalController,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit() {
    this.getSpecificTabataWod();
  }
  getSpecificTabataWod(): void {
    this.workoutsService.getSpecificTabataWod().subscribe(
      (tabatas: Tabata[]) => {
        this.stabatas = tabatas;
        this.stabatas.forEach((stabatas) => {
          //begin showing workouts from r1 if they exit within the retrieved worout.
          if (stabatas.t6m1) {
            const exeName = stabatas.t6m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet6m1 = exercises;
              });
          }
        });
      },
      (error) => {
        console.error('Error fetching specific workouts:', error);
      }
    );
  }
  dismissModal() {
    this.modalController.dismiss();
  }
  async lockOrientation() {
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });
  }

  ngOnDestroy() {
    // Unlock orientation when leaving the page
    ScreenOrientation.unlock();
  }

}
