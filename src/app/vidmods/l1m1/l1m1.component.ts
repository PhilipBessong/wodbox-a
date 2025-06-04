import { Component, OnInit,OnDestroy } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import {
  Style,
  Exercise,
  Ladder,
  WorkoutsService,
} from 'src/app/firebase/workouts.service';
@Component({
  selector: 'app-l1m1',
  templateUrl: './l1m1.component.html',
  styleUrls: ['./l1m1.component.scss'],
})
export class L1m1Component  implements OnInit {
  sladders: Ladder[]=[];
  exercises: Exercise[] = [];
  videoUrl: SafeResourceUrl | undefined;


  constructor(private modalController: ModalController,private workoutsService: WorkoutsService) { }

  ngOnInit() {

    this.getSpecificLadderWarmup();
  
    this.lockOrientation();
  }

 
  getSpecificLadderWarmup(): void {
    this.workoutsService.getSpecificLadderWarmup().subscribe(
      (ladders: Ladder[]) => {
        this.sladders = ladders;
        this.sladders.forEach((sladders) => {
          this.workoutsService
            .getStyleByName(sladders.wodStyle)
            .subscribe((style) => {
              // Add style information to each workout
              sladders.styleName = style?.styleName;
              sladders.styleDescription = style?.styleDescription;
            });
            //begin showing workouts from r1 if they exit within the retrieved worout.

          if (sladders.l1m1) {
            const exeName = sladders.l1m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                sladders.exe = exercises;
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
