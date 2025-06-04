import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import {
  Exercise,
  Amrap,
  WorkoutsService,
} from 'src/app/firebase/workouts.service';
@Component({
  selector: 'app-a3m2',
  templateUrl: './a3m2.component.html',
  styleUrls: ['./a3m2.component.scss'],
})
export class A3m2Component  implements OnInit {
  samraps: Amrap[] = [];
  exercises: Exercise[] = [];
  videoUrl: SafeResourceUrl | undefined;

  constructor(
    private modalController: ModalController,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit() {
    this.getSpecificAmrapWarmup();
  }
  getSpecificAmrapWarmup(): void {
    this.workoutsService.getSpecificAmrapWarmup().subscribe(
      (amraps: Amrap[]) => {
        this.samraps = amraps;
        this.samraps.forEach((samraps) => {
          this.workoutsService
            .getStyleByName(samraps.wodStyle)
            .subscribe((style) => {
              // Add style information to each workout
              samraps.styleName = style?.styleName;
              samraps.styleDescription = style?.styleDescription;
            });
            //begin showing workouts from r1 if they exit within the retrieved worout.

         
          if (samraps.a3m2) {
            const exeName = samraps.a3m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                samraps.exea3m2 = exercises;
              });
          }
   
        });
      },
      (error) => {
        console.error('Error fetching specific workouts:', error);
      }
    );
  }
  async dismissModal() {
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
