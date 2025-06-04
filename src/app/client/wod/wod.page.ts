import { Component, Inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { R1m1wComponent } from 'src/app/vidmods/r1m1w/r1m1w.component';

import { R1m2wComponent } from 'src/app/vidmods/r1m2w/r1m2w.component';
import { R1m3wComponent } from 'src/app/vidmods/r1m3w/r1m3w.component';
import {
  Workout,
  Style,
  Exercise,
  Tabata,
  Ladder,
  Amrap,
  Emom,
  WorkoutsService,
} from 'src/app/firebase/workouts.service';
import { Router } from '@angular/router';

import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Plugin } from '@capacitor/core';
import { R2m1wComponent } from 'src/app/vidmods/r2m1w/r2m1w.component';
import { R2m2wComponent } from 'src/app/vidmods/r2m2w/r2m2w.component';
import { R2m3wComponent } from 'src/app/vidmods/r2m3w/r2m3w.component';
import { R3m1wComponent } from 'src/app/vidmods/r3m1w/r3m1w.component';
import { R3m2wComponent } from 'src/app/vidmods/r3m2w/r3m2w.component';
import { R3m3wComponent } from 'src/app/vidmods/r3m3w/r3m3w.component';
import { R4m1wComponent } from 'src/app/vidmods/r4m1w/r4m1w.component';
import { R4m2wComponent } from 'src/app/vidmods/r4m2w/r4m2w.component';
import { R4m3wComponent } from 'src/app/vidmods/r4m3w/r4m3w.component';
import { T1m1wComponent } from 'src/app/vidmods/t1m1w/t1m1w.component';
import { T1m2wComponent } from 'src/app/vidmods/t1m2w/t1m2w.component';
import { T2m1wComponent } from 'src/app/vidmods/t2m1w/t2m1w.component';
import { T2m2wComponent } from 'src/app/vidmods/t2m2w/t2m2w.component';
import { T3m1wComponent } from 'src/app/vidmods/t3m1w/t3m1w.component';
import { T3m2wComponent } from 'src/app/vidmods/t3m2w/t3m2w.component';
import { T4m1wComponent } from 'src/app/vidmods/t4m1w/t4m1w.component';
import { T4m2wComponent } from 'src/app/vidmods/t4m2w/t4m2w.component';
import { T5m1wComponent } from 'src/app/vidmods/t5m1w/t5m1w.component';
import { T5m2wComponent } from 'src/app/vidmods/t5m2w/t5m2w.component';
import { T6m1wComponent } from 'src/app/vidmods/t6m1w/t6m1w.component';
import { T6m2wComponent } from 'src/app/vidmods/t6m2w/t6m2w.component';
import { T7m1wComponent } from 'src/app/vidmods/t7m1w/t7m1w.component';
import { T7m2wComponent } from 'src/app/vidmods/t7m2w/t7m2w.component';
import { T8m1wComponent } from 'src/app/vidmods/t8m1w/t8m1w.component';
import { T8m2wComponent } from 'src/app/vidmods/t8m2w/t8m2w.component';
import { L1m1wComponent } from 'src/app/vidmods/l1m1w/l1m1w.component';
import { L1m2wComponent } from 'src/app/vidmods/l1m2w/l1m2w.component';
import { L1m3wComponent } from 'src/app/vidmods/l1m3w/l1m3w.component';
import { L1m4wComponent } from 'src/app/vidmods/l1m4w/l1m4w.component';
import { L2m1wComponent } from 'src/app/vidmods/l2m1w/l2m1w.component';
import { L2m2wComponent } from 'src/app/vidmods/l2m2w/l2m2w.component';
import { L2m3wComponent } from 'src/app/vidmods/l2m3w/l2m3w.component';
import { L2m4wComponent } from 'src/app/vidmods/l2m4w/l2m4w.component';
import { L3m1wComponent } from 'src/app/vidmods/l3m1w/l3m1w.component';
import { L3m2wComponent } from 'src/app/vidmods/l3m2w/l3m2w.component';
import { L3m3wComponent } from 'src/app/vidmods/l3m3w/l3m3w.component';
import { L3m4wComponent } from 'src/app/vidmods/l3m4w/l3m4w.component';
import { E1m1wComponent } from 'src/app/vidmods/e1m1w/e1m1w.component';
import { E1m2wComponent } from 'src/app/vidmods/e1m2w/e1m2w.component';
import { E1m3wComponent } from 'src/app/vidmods/e1m3w/e1m3w.component';
import { E1m4wComponent } from 'src/app/vidmods/e1m4w/e1m4w.component';
import { E2m1wComponent } from 'src/app/vidmods/e2m1w/e2m1w.component';
import { E2m2wComponent } from 'src/app/vidmods/e2m2w/e2m2w.component';
import { E2m3wComponent } from 'src/app/vidmods/e2m3w/e2m3w.component';
import { E2m4wComponent } from 'src/app/vidmods/e2m4w/e2m4w.component';
import { E3m1wComponent } from 'src/app/vidmods/e3m1w/e3m1w.component';
import { E3m2wComponent } from 'src/app/vidmods/e3m2w/e3m2w.component';
import { E3m3wComponent } from 'src/app/vidmods/e3m3w/e3m3w.component';
import { E3m4wComponent } from 'src/app/vidmods/e3m4w/e3m4w.component';
import { A1m1wComponent } from 'src/app/vidmods/a1m1w/a1m1w.component';
import { A1m2wComponent } from 'src/app/vidmods/a1m2w/a1m2w.component';
import { A1m3wComponent } from 'src/app/vidmods/a1m3w/a1m3w.component';
import { A1m4wComponent } from 'src/app/vidmods/a1m4w/a1m4w.component';
import { A2m1wComponent } from 'src/app/vidmods/a2m1w/a2m1w.component';
import { A2m2wComponent } from 'src/app/vidmods/a2m2w/a2m2w.component';
import { A2m3wComponent } from 'src/app/vidmods/a2m3w/a2m3w.component';
import { A2m4wComponent } from 'src/app/vidmods/a2m4w/a2m4w.component';
import { A3m1wComponent } from 'src/app/vidmods/a3m1w/a3m1w.component';
import { A3m2wComponent } from 'src/app/vidmods/a3m2w/a3m2w.component';
import { A3m3wComponent } from 'src/app/vidmods/a3m3w/a3m3w.component';
import { A3m4wComponent } from 'src/app/vidmods/a3m4w/a3m4w.component';
@Component({
  selector: 'app-wod',
  templateUrl: './wod.page.html',
  styleUrls: ['./wod.page.scss'],
})
export class WodPage implements OnInit {
  loading = true;

  onVideoLoaded() {
    this.loading = false;
  }
  specificWorkouts: Workout[]=[];
  stabatas: Tabata[]=[];
  sladders: Ladder[]=[];
  samraps:Amrap[]=[];
  semoms: Emom[]=[];
  wodStyle: Style[] = [];
  exercises: Exercise[] = [];
  videoUrl: SafeResourceUrl | undefined;
  videoHeight = '300px'; // Adjust the height as needed
  videoWidth = '400px';
  constructor(    private sanitizer: DomSanitizer // Inject DomSanitizer for sanitizing video URLs
    ,@Inject(ModalController)  private modalController: ModalController,private workoutsService: WorkoutsService, private router: Router) {}
  ngOnInit() {
    this.getSpecificWOD();
    this.getSpecificTabata();
    this.getSpecificLadderWOD();
    this.getSpecificAmrapWOD();
    this.getSpecificEmomWOD();
  }
  getSpecificWOD(): void {
    this.workoutsService.getSpecificWOD().subscribe(
      (workouts: Workout[]) => {
        this.specificWorkouts = workouts;
        this.specificWorkouts.forEach((specificWorkouts) => {
          this.workoutsService
            .getStyleByName(specificWorkouts.wodStyle)
            .subscribe((style) => {
              // Add style information to each workout
              specificWorkouts.styleName = style?.styleName;
              specificWorkouts.styleDescription = style?.styleDescription;
            });
            //begin showing workouts from r1 if they exit within the retrieved worout.

          if (specificWorkouts.r1m1) {
            const exeName = specificWorkouts.r1m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                specificWorkouts.exe = exercises;
              });
          }
          if (specificWorkouts.r1m2) {
            const exeName = specificWorkouts.r1m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                specificWorkouts.exeR1M2 = exercises;
              });
          }
          if (specificWorkouts.r1m3) {
            const exeName = specificWorkouts.r1m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                specificWorkouts.exeR1M3 = exercises;
              });
          }
          if (specificWorkouts.r2m1) {
            const exeName = specificWorkouts.r2m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                specificWorkouts.exeR2M1 = exercises;
              });
          }
          if (specificWorkouts.r2m2) {
            const exeName = specificWorkouts.r2m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                specificWorkouts.exeR2M2 = exercises;
              });
          }
          if (specificWorkouts.r2m3) {
            const exeName = specificWorkouts.r2m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                specificWorkouts.exeR2M3 = exercises;
              });
          }
          if (specificWorkouts.r3m1) {
            const exeName = specificWorkouts.r3m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                specificWorkouts.exeR3M1 = exercises;
              });
          }
          if (specificWorkouts.r3m2) {
            const exeName = specificWorkouts.r3m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                specificWorkouts.exeR3M2 = exercises;
              });
          }
          if (specificWorkouts.r3m3) {
            const exeName = specificWorkouts.r3m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                specificWorkouts.exeR3M3 = exercises;
              });
          }
          if (specificWorkouts.r4m1) {
            const exeName = specificWorkouts.r4m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                specificWorkouts.exeR4M1 = exercises;
              });
          }
          if (specificWorkouts.r4m2) {
            const exeName = specificWorkouts.r4m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                specificWorkouts.exeR4M2 = exercises;
              });
          }
          if (specificWorkouts.r4m3) {
            const exeName = specificWorkouts.r4m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                specificWorkouts.exeR4M3 = exercises;
              });
          }
        });
      },
      (error) => {
        console.error('Error fetching specific workouts:', error);
      }
    );
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
          if (stabatas.t1m2) {
            const exeName = stabatas.t1m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet1m2 = exercises;
              });
          }
          if (stabatas.t2m1) {
            const exeName = stabatas.t2m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet2m1 = exercises;
              });
          }
          if (stabatas.t2m2) {
            const exeName = stabatas.t2m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet2m2 = exercises;
              });
          }
          if (stabatas.t3m1) {
            const exeName = stabatas.t3m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet3m1 = exercises;
              });
          }
          if (stabatas.t3m2) {
            const exeName = stabatas.t3m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet3m2 = exercises;
              });
          }
          if (stabatas.t4m1) {
            const exeName = stabatas.t4m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet4m1 = exercises;
              });
          }
          if (stabatas.t4m2) {
            const exeName = stabatas.t4m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet4m2 = exercises;
              });
          }
          if (stabatas.t5m1) {
            const exeName = stabatas.t5m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet5m1 = exercises;
              });
          }
          if (stabatas.t5m2) {
            const exeName = stabatas.t5m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet5m2 = exercises;
              });
          }
          if (stabatas.t6m1) {
            const exeName = stabatas.t6m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet6m1 = exercises;
              });
          }
          if (stabatas.t6m2) {
            const exeName = stabatas.t6m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet6m2 = exercises;
              });
          }
          if (stabatas.t7m1) {
            const exeName = stabatas.t7m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet7m1 = exercises;
              });
          }
          if (stabatas.t7m2) {
            const exeName = stabatas.t7m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet7m2 = exercises;
              });
          }if (stabatas.t8m1) {
            const exeName = stabatas.t8m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet8m1 = exercises;
              });
          }
          if (stabatas.t8m2) {
            const exeName = stabatas.t8m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                stabatas.exet8m2 = exercises;
              });
          }
         
        });
      },
      (error) => {
        console.error('Error fetching specific workouts:', error);
      }
    );
  }
  getSpecificLadderWOD(): void {
    this.workoutsService.getSpecificLadderWOD().subscribe(
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
          if (sladders.l1m2) {
            const exeName = sladders.l1m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                sladders.exel1m2 = exercises;
              });
          }
          if (sladders.l1m3) {
            const exeName = sladders.l1m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                sladders.exel1m3 = exercises;
              });
          }
          if (sladders.l1m4) {
            const exeName = sladders.l1m4;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                sladders.exel1m4 = exercises;
              });
          }
          if (sladders.l2m1) {
            const exeName = sladders.l2m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                sladders.exel2m1 = exercises;
              });
          }
          if (sladders.l2m2) {
            const exeName = sladders.l2m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                sladders.exel2m2 = exercises;
              });
          }
          if (sladders.l2m3) {
            const exeName = sladders.l2m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                sladders.exel2m3 = exercises;
              });
          }
          if (sladders.l2m4) {
            const exeName = sladders.l2m4;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                sladders.exel2m4 = exercises;
              });
          }
          if (sladders.l3m1) {
            const exeName = sladders.l3m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                sladders.exel3m1 = exercises;
              });
          }
          if (sladders.l3m2) {
            const exeName = sladders.l3m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                sladders.exel3m2 = exercises;
              });
          }
          if (sladders.l3m3) {
            const exeName = sladders.l3m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                sladders.exel3m3 = exercises;
              });
          }
          if (sladders.l3m4) {
            const exeName = sladders.l3m4;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                sladders.exel3m4 = exercises;
              });
          }
        });
      },
      (error) => {
        console.error('Error fetching specific workouts:', error);
      }
    );
  }
  getSpecificEmomWOD(): void {
    this.workoutsService.getSpecificEmomWOD().subscribe(
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

          if (semoms.e1m1) {
            const exeName = semoms.e1m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                semoms.exe = exercises;
              });
          }
          if (semoms.e1m2) {
            const exeName = semoms.e1m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                semoms.exee1m2 = exercises;
              });
          }
          if (semoms.e1m3) {
            const exeName = semoms.e1m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                semoms.exee1m3 = exercises;
              });
          }
          if (semoms.e1m4) {
            const exeName = semoms.e1m4;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                semoms.exee1m4 = exercises;
              });
          }
          if (semoms.e2m1) {
            const exeName = semoms.e2m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                semoms.exee2m1 = exercises;
              });
          }
          if (semoms.e2m2) {
            const exeName = semoms.e2m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                semoms.exee2m2 = exercises;
              });
          }
          if (semoms.e2m3) {
            const exeName = semoms.e2m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                semoms.exee2m3 = exercises;
              });
          }
          if (semoms.e2m4) {
            const exeName = semoms.e2m4;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                semoms.exee2m4 = exercises;
              });
          }
          if (semoms.e3m1) {
            const exeName = semoms.e3m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                semoms.exee3m1 = exercises;
              });
          }
          if (semoms.e3m2) {
            const exeName = semoms.e3m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                semoms.exee3m2 = exercises;
              });
          }
          if (semoms.e3m3) {
            const exeName = semoms.e3m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                semoms.exee3m3 = exercises;
              });
          }
          if (semoms.e3m4) {
            const exeName = semoms.e3m4;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                semoms.exee3m4 = exercises;
              });
          }
        });
      },
      (error) => {
        console.error('Error fetching specific workouts:', error);
      }
    );
  }
  getSpecificAmrapWOD(): void {
    this.workoutsService.getSpecificAmrapWOD().subscribe(
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

          if (samraps.a1m1) {
            const exeName = samraps.a1m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                samraps.exe = exercises;
              });
          }
          if (samraps.a1m2) {
            const exeName = samraps.a1m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                samraps.exea1m2 = exercises;
              });
          }
          if (samraps.a1m3) {
            const exeName = samraps.a1m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                samraps.exea1m3 = exercises;
              });
          }
          if (samraps.a1m4) {
            const exeName = samraps.a1m4;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                samraps.exea1m4 = exercises;
              });
          }
          if (samraps.a2m1) {
            const exeName = samraps.a2m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                samraps.exea2m1 = exercises;
              });
          }
          if (samraps.a2m2) {
            const exeName = samraps.a2m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                samraps.exea2m2 = exercises;
              });
          }
          if (samraps.a2m3) {
            const exeName = samraps.a2m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                samraps.exea2m3 = exercises;
              });
          }
          if (samraps.a2m4) {
            const exeName = samraps.a2m4;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                samraps.exea2m4 = exercises;
              });
          }
          if (samraps.a3m1) {
            const exeName = samraps.a3m1;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                samraps.exea3m1 = exercises;
              });
          }
          if (samraps.a3m2) {
            const exeName = samraps.a3m2;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                samraps.exea3m2 = exercises;
              });
          }
          if (samraps.a3m3) {
            const exeName = samraps.a3m3;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                samraps.exea3m3 = exercises;
              });
          }
          if (samraps.a3m4) {
            const exeName = samraps.a3m4;
            this.workoutsService
              .getExebyname(exeName)
              .subscribe((exercises) => {
                samraps.exea3m4 = exercises;
              });
          }
        });
      },
      (error) => {
        console.error('Error fetching specific workouts:', error);
      }
    );
  }
  backtoWarmUp(){
    this.router.navigate(['/chome']);
  }
  navigateToPage(): void {
    // Iterate over specificWorkouts
    this.specificWorkouts.forEach((workout) => {
      this.checkWodStyleAndNavigate(workout.wodStyle);
    });
  
    // Iterate over stabatas
    this.stabatas.forEach((tabata) => {
      this.checkWodStyleAndNavigate(tabata.wodStyle);
    });
  
    // Iterate over sladders
    this.sladders.forEach((ladder) => {
      this.checkWodStyleAndNavigate(ladder.wodStyle);
    });
  
    // Iterate over semoms
    this.semoms.forEach((emom) => {
      this.checkWodStyleAndNavigate(emom.wodStyle);
    });
  
    // Iterate over samraps
    this.samraps.forEach((amrap) => {
      this.checkWodStyleAndNavigate(amrap.wodStyle);
    });
  }
  
  // Helper method to check wodStyle and navigate
  checkWodStyleAndNavigate(wodStyle: string): void {
    if (wodStyle === 'INTERVAL' || wodStyle === 'TABATA') {
      // Navigate to WodgoPage
      this.router.navigate(['/wodon']);
    } else {
      // Navigate to WodgoTwoPage
      this.router.navigate(['/wodontwo']);
    }
  }
  async openFullscreenVideo(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape'
    });

    // Open the video modal
    this.openVideoModal(videoUrl);
}
  async openVideoModal(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: R1m1wComponent, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl // Pass the video URL to the modal component
      }
    });
     await modal.present();
      // Listen for modal dismissal and unlock the orientation
      await modal.onWillDismiss();
      await ScreenOrientation.unlock();
  }
  async ofvr1m2(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape'
    });

    // Open the video modal
    this.openr1m2vm(videoUrl);
}
async openr1m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: R1m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
  await modal.present();
  // Listen for modal dismissal and unlock the orientation
  await modal.onWillDismiss();
  await ScreenOrientation.unlock();
}
async ofvr1m3(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openr1m3vm(videoUrl);
}
async openr1m3vm(videoUrl: string) {
// Sanitize the video URL
this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
const modal = await this.modalController.create({
  component: R1m3wComponent, // Create a separate component for the modal content
  canDismiss: true,
  backdropDismiss: true,
  componentProps: {
    videoUrl: videoUrl // Pass the video URL to the modal component
  }
});
 await modal.present();
await modal.present();
// Listen for modal dismissal and unlock the orientation
await modal.onWillDismiss();
await ScreenOrientation.unlock();
}
async ofvr2m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openr2m1vm(videoUrl);
}
async openr2m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: R2m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvr2m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openr2m2vm(videoUrl);
}
async openr2m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: R2m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvr2m3(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openr2m3vm(videoUrl);
}
async openr2m3vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: R2m3wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvr3m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openr3m1vm(videoUrl);
}
async openr3m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: R3m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvr3m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openr3m2vm(videoUrl);
}
async openr3m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: R3m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvr3m3(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openr3m3vm(videoUrl);
}
async openr3m3vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: R3m3wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvr4m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openr4m1vm(videoUrl);
}
async openr4m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: R4m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvr4m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openr4m2vm(videoUrl);
}
async openr4m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: R4m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvr4m3(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openr4m3vm(videoUrl);
}
async openr4m3vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: R4m3wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt1m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent1m1vm(videoUrl);
}
async opent1m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T1m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt1m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent1m2vm(videoUrl);
}
async opent1m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T1m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt2m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent2m1vm(videoUrl);
}
async opent2m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T2m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt2m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent2m2vm(videoUrl);
}
async opent2m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T2m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt3m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent3m1vm(videoUrl);
}
async opent3m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T3m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt3m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent1m2vm(videoUrl);
}
async opent3m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T3m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt4m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent4m1vm(videoUrl);
}
async opent4m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T4m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt4m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent4m2vm(videoUrl);
}
async opent4m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T4m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt5m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent5m1vm(videoUrl);
}
async opent5m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T5m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt5m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent5m2vm(videoUrl);
}
async opent5m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T5m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt6m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent6m1vm(videoUrl);
}
async opent6m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T6m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt6m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent6m2vm(videoUrl);
}
async opent6m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T6m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt7m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent7m1vm(videoUrl);
}
async opent7m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T7m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt7m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent7m2vm(videoUrl);
}
async opent7m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T7m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt8m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent8m1vm(videoUrl);
}
async opent8m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T8m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvt8m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opent8m2vm(videoUrl);
}
async opent8m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: T8m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvl1m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openl1m1vm(videoUrl);
}
async openl1m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: L1m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvl1m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openl1m2vm(videoUrl);
}
async openl1m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: L1m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvl1m3(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openl1m3vm(videoUrl);
}
async openl1m3vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: L1m3wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvl1m4(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openl1m4vm(videoUrl);
}
async openl1m4vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: L1m4wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvl2m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openl2m1vm(videoUrl);
}
async openl2m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: L2m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvl2m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openl2m2vm(videoUrl);
}
async openl2m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: L2m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvl2m3(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openl2m3vm(videoUrl);
}
async openl2m3vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: L2m3wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvl2m4(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openl2m4vm(videoUrl);
}
async openl2m4vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: L2m4wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvl3m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openl3m1vm(videoUrl);
}
async openl3m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: L3m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvl3m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openl3m2vm(videoUrl);
}
async openl3m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: L3m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvl3m3(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openl3m3vm(videoUrl);
}
async openl3m3vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: L3m3wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofvl3m4(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.openl3m4vm(videoUrl);
}
async openl3m4vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: L3m4wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofve1m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opene1m1vm(videoUrl);
}
async opene1m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: E1m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofve1m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opene1m2vm(videoUrl);
}
async opene1m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: E1m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofve1m3(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opene1m3vm(videoUrl);
}
async opene1m3vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: E1m3wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofve1m4(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opene1m4vm(videoUrl);
}
async opene1m4vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: E1m4wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofve2m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opene2m1vm(videoUrl);
}
async opene2m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: E2m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofve2m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opene2m2vm(videoUrl);
}
async opene2m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: E2m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofve2m3(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opene2m3vm(videoUrl);
}
async opene2m3vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: E2m3wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofve2m4(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opene2m4vm(videoUrl);
}
async opene2m4vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: E2m4wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofve3m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opene3m1vm(videoUrl);
}
async opene3m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: E3m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofve3m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opene3m2vm(videoUrl);
}
async opene3m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: E3m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofve3m3(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opene3m3vm(videoUrl);
}
async opene3m3vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: E3m3wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofve3m4(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opene3m4vm(videoUrl);
}
async opene3m4vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: E3m4wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofva1m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opena1m1vm(videoUrl);
}
async opena1m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: A1m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofva1m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opena1m2vm(videoUrl);
}
async opena1m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: A1m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofva1m3(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opena1m3vm(videoUrl);
}
async opena1m3vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: A1m3wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofva1m4(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opena1m4vm(videoUrl);
}
async opena1m4vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: A1m4wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofva2m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opena2m1vm(videoUrl);
}
async opena2m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: A2m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofva2m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opena2m2vm(videoUrl);
}
async opena2m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: A2m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofva2m3(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opena2m3vm(videoUrl);
}
async opena2m3vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: A2m3wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofva2m4(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opena2m4vm(videoUrl);
}
async opena2m4vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: A2m4wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofva3m1(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opena3m1vm(videoUrl);
}
async opena3m1vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: A3m1wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofva3m2(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opena3m2vm(videoUrl);
}
async opena3m2vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: A3m2wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofva3m3(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opena3m3vm(videoUrl);
}
async opena3m3vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: A3m3wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
async ofva3m4(videoUrl: string) {
  // Lock screen orientation to landscape
  await ScreenOrientation.lock({
    orientation: 'landscape'
  });

  // Open the video modal
  this.opena3m4vm(videoUrl);
}
async opena3m4vm(videoUrl: string) {
  // Sanitize the video URL
  this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  const modal = await this.modalController.create({
    component: A3m4wComponent, // Create a separate component for the modal content
    canDismiss: true,
    backdropDismiss: true,
    componentProps: {
      videoUrl: videoUrl // Pass the video URL to the modal component
    }
  });
   await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
}
}
