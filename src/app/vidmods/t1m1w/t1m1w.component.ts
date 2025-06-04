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
  selector: 'app-t1m1w',
  templateUrl: './t1m1w.component.html',
  styleUrls: ['./t1m1w.component.scss'],
})
export class T1m1wComponent  implements OnInit {
  stabatas: Tabata[]=[];
  exercises: Exercise[] = [];
  videoUrl: SafeResourceUrl | undefined;


  constructor(private modalController: ModalController,private workoutsService: WorkoutsService) { }

  ngOnInit() {
    this.getSpecificTabata();
  }
  getSpecificTabata(): void {
    this.workoutsService.getSpecificTabata().subscribe(
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

          if (stabatas.t1m1) {
            const exeName = stabatas.t1m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exe = exercises;
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
