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
  selector: 'app-t8m1w',
  templateUrl: './t8m1w.component.html',
  styleUrls: ['./t8m1w.component.scss'],
})
export class T8m1wComponent  implements OnInit {

  stabatas: Tabata[] = [];
  exercises: Exercise[] = [];
  videoUrl: SafeResourceUrl | undefined;

  constructor(
    private modalController: ModalController,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit() {
    this.getSpecificTabata();
  }
  getSpecificTabata(): void {
    this.workoutsService.getSpecificTabata().subscribe(
      (tabatas: Tabata[]) => {
        this.stabatas = tabatas;
        this.stabatas.forEach((stabatas) => {
          //begin showing workouts from r1 if they exit within the retrieved worout.

          if (stabatas.t8m1) {
            const exeName = stabatas.t8m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet8m1 = exercises;
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
