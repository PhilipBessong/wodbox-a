import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import {
  Style,
  Exercise,
  Tabata,
  WorkoutsService,
} from 'src/app/firebase/workouts.service';
@Component({
  selector: 'app-t3m2',
  templateUrl: './t3m2.component.html',
  styleUrls: ['./t3m2.component.scss'],
})
export class T3m2Component  implements OnInit {

  stabatas: Tabata[]=[];
  exercises: Exercise[] = [];
  videoUrl: SafeResourceUrl | undefined;


  constructor(private modalController: ModalController,private workoutsService: WorkoutsService) { }

  ngOnInit() {
    this.getSpecificTabataWod();
  }
  getSpecificTabataWod(): void {
    this.workoutsService.getSpecificTabataWod().subscribe(
      (tabatas: Tabata[]) => {
        this.stabatas = tabatas;
        this.stabatas.forEach((stabatas) => {
          this.workoutsService
            .getStyleByName(stabatas.wodStyle)
            .subscribe((style) => {
              // Add style information to each workout
              stabatas.styleName = style?.styleName;
              stabatas.styleDescription = style?.styleDescription;
            });
            //begin showing workouts from r1 if they exit within the retrieved worout.

         
          if (stabatas.t3m2) {
            const exeName = stabatas.t3m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet3m2 = exercises;
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
