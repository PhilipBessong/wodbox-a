import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  Workout,
  Style,
  Tabata,
  Ladder,
  Exercise,
  Amrap,
  Emom,
  WorkoutsService,
} from 'src/app/firebase/workouts.service';
@Component({
  selector: 'app-wod',
  templateUrl: './wod.page.html',
  styleUrls: ['./wod.page.scss'],
})
export class WodPage implements OnInit {
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
  constructor(private workoutsService: WorkoutsService, private router: Router) { }

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
            const exeName = stabatas.t3m1;
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
}
