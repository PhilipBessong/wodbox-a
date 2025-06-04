import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import {
  Exercise,
  Emom,
  WorkoutsService,
} from 'src/app/firebase/workouts.service';
@Component({
  selector: 'app-e3m3',
  templateUrl: './e3m3.component.html',
  styleUrls: ['./e3m3.component.scss'],
})
export class E3m3Component  implements OnInit {

  semoms: Emom[] = [];
  exercises: Exercise[] = [];
  videoUrl: SafeResourceUrl | undefined;

  constructor(
    private modalController: ModalController,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit() {
    this.getSpecificEmomWarmup();
  }
  getSpecificEmomWarmup(): void {
    this.workoutsService.getSpecificEmomWarmup().subscribe(
      (emoms: Emom[]) => {
        this.semoms = emoms;
        this.semoms.forEach((semoms) => {
          this.workoutsService
            .getStyleByName(semoms.wodStyle)
            .subscribe((style) => {
              // Add style information to each workout
              semoms.styleName = style?.styleName;
              semoms.styleDescription = style?.styleDescription;
            });
          //begin showing workouts from r1 if they exit within the retrieved worout.

          if (semoms.e3m3) {
            const exeName = semoms.e3m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                semoms.exee3m3 = exercises;
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
