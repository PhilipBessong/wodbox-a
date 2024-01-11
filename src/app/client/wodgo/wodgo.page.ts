import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser';
import {
  Workout,
  Style,
  Exercise,
  WorkoutsService,
} from 'src/app/firebase/workouts.service';
@Component({
  selector: 'app-wodgo',
  templateUrl: './wodgo.page.html',
  styleUrls: ['./wodgo.page.scss'],
})
export class WodgoPage implements OnInit {
  specificWorkouts: Workout[] = [];
  exercises: Exercise[] = [];
  videoUrl: SafeResourceUrl | undefined;
  videoHeight = '280px'; // Adjust the height as needed
  videoWidth = '400px';
  constructor(
    private router: Router,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit() {
    this.getSpecificWorkout();
    this.getIonContentClass();
  }
  getSpecificWorkout(): void {
    this.workoutsService.getSpecificWorkouts().subscribe(
      (specificWorkouts: Workout[]) => {
        this.specificWorkouts = specificWorkouts;
        this.specificWorkouts.forEach((specificWorkouts) => {
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

  // Define cdr1m1Show
  
cdr1m1Showc: boolean = true;
r1m2Showc: boolean = false;
r1m3Showc: boolean = false;

r2m1Showc: boolean = false;
r2m2Showc: boolean = false;
r2m3Showc: boolean = false;

r3m1Showc: boolean = false;
r3m2Showc: boolean = false;
r3m3Showc: boolean = false;

r4m1Showc: boolean = false;
r4m2Showc: boolean = false;
r4m3Showc: boolean = false;

r1RestShowc: boolean = false;
r1m2RestShowc: boolean = false;
r1m3RestShowc: boolean = false;

r2m1RestShowc: boolean = false;
r2m2RestShowc: boolean = false;
r2m3RestShowc: boolean = false;

r3m1RestShowc: boolean = false;
r3m2RestShowc: boolean = false;
r3m3RestShowc: boolean = false;

r4m1RestShowc: boolean = false;
r4m2RestShowc: boolean = false;
r4m3RestShowc: boolean = false;

ionContentClass: string = ''; // Property to hold the class for ion-content
lococon: string = '';
// Logic to determine the class based on variables
getIonContentClass(): void {
  if (this.cdr1m1Showc) {
    this.ionContentClass = 'red-content';
    this.lococon = 'logocon';
  } else if (this.r1RestShowc) {
    this.ionContentClass = 'blue-content';
    this.lococon = 'logocona';
  } else if (this.r1m2Showc) {
    this.ionContentClass = 'red-content';
    this.lococon = 'logocon'; 
  } else if (this.r1m2RestShowc){
    this.ionContentClass = 'blue-content';
    this.lococon = 'logocona';
  } else if (this.r1m3Showc) {
    this.ionContentClass = 'red-content';
    this.lococon = 'logocon'; 
  } else if (this.r1m3RestShowc){
    this.ionContentClass = 'blue-content';
    this.lococon = 'logocona';
  } else if (this.r2m1Showc) {
    this.ionContentClass = 'red-content';
    this.lococon = 'logocon'; 
  }else if (this.r2m1RestShowc){
    this.ionContentClass = 'blue-content';
    this.lococon = 'logocona';
  } else if (this.r2m2Showc) {
    this.ionContentClass = 'red-content';
    this.lococon = 'logocon'; 
  }else if (this.r2m2RestShowc){
    this.ionContentClass = 'blue-content';
    this.lococon = 'logocona';
  }else if (this.r2m3Showc) {
    this.ionContentClass = 'red-content';
    this.lococon = 'logocon'; 
  }else if (this.r2m3RestShowc){
    this.ionContentClass = 'blue-content';
    this.lococon = 'logocona';
  }//r3
   else if (this.r3m1Showc) {
    this.ionContentClass = 'red-content';
    this.lococon = 'logocon'; 
  }else if (this.r3m1RestShowc){
    this.ionContentClass = 'blue-content';
    this.lococon = 'logocona';
  } else if (this.r3m2Showc) {
    this.ionContentClass = 'red-content';
    this.lococon = 'logocon'; 
  }else if (this.r3m2RestShowc){
    this.ionContentClass = 'blue-content';
    this.lococon = 'logocona';
  }else if (this.r3m3Showc) {
    this.ionContentClass = 'red-content';
    this.lococon = 'logocon'; 
  }else if (this.r3m3RestShowc){
    this.ionContentClass = 'blue-content';
    this.lococon = 'logocona';
  }
  //r4
  else if (this.r4m1Showc) {
    this.ionContentClass = 'red-content';
    this.lococon = 'logocon'; 
  }else if (this.r4m1RestShowc){
    this.ionContentClass = 'blue-content';
    this.lococon = 'logocona';
  } else if (this.r4m2Showc) {
    this.ionContentClass = 'red-content';
    this.lococon = 'logocon'; 
  }else if (this.r4m2RestShowc){
    this.ionContentClass = 'blue-content';
    this.lococon = 'logocona';
  }else if (this.r4m3Showc) {
    this.ionContentClass = 'red-content';
    this.lococon = 'logocon'; 
  }else if (this.r4m3RestShowc){
    this.ionContentClass = 'blue-content';
    this.lococon = 'logocona';
  }
}
updateIonContentClass() {
  // Method to update the ion-content class based on variables
  this.getIonContentClass();
  // Apply ion-content class or update a property bound to ngClass in the template
}
  cd5Sec: number | undefined = undefined;
  buttonDisabled = false;
  cd5SecShow = true;
  srtbtnShow = true;
  strt5SecTimer(specificWorkouts: Workout) {
    this.buttonDisabled = true; // Disable the button
    this.cd5Sec = 5;
    this.srtbtnShow = false;
    this.cd5SecShow = true;
    const timerInterval = setInterval(() => {
      if (this.cd5Sec !== undefined && this.cd5Sec > 0) {
        this.cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr1m1Timer(specificWorkouts);
        this.cd5SecShow = false;
      }
    }, 1000); // Update the 5-second countdown every second
  }

  // movment1 timer
  r1RestShow = false;
  cdr1m1Timer: number | undefined = undefined;
  cdr1m1Show = true;
  isPr1m1Timer: boolean = false;
  remaincdr1m1: number | undefined = undefined;
  cdr1m1Intval: any;
  strtr1m1Timer(specificWorkouts: Workout) {
    if (specificWorkouts.r1move) {
      if (this.isPr1m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr1m1Timer = this.remaincdr1m1;
      } else if (this.cdr1m1Timer === undefined) {
        this.cdr1m1Timer = specificWorkouts.r1move;
      }
      this.cdr1m1Intval = setInterval(() => {
        if (this.cdr1m1Timer && this.cdr1m1Timer > 0) {
          this.remaincdr1m1 = this.cdr1m1Timer; // Store remaining time
          this.cdr1m1Timer--;
        } else {
          clearInterval(this.cdr1m1Intval);
          this.clearr1m1Cd();
          this.cdr1m1Show = false;
          this.r1RestShow = true;
          this.cdr1m1Showc = false;
          this.r1RestShowc = true;
          this.updateIonContentClass(); // Call a method to update the ion-content class
          this.startr1Rest(specificWorkouts);
        }
      }, 1000);
    }
  }

  clearr1m1Cd() {
    if (this.cdr1m1Intval) {
      clearInterval(this.cdr1m1Intval);
    }
    this.cdr1m1Timer = undefined;
    this.isPr1m1Timer = false;
    this.remaincdr1m1 = undefined;
  }
  r1m2Show = false;
  cdr1Rest: number | undefined = undefined;
  cdir1Rest: any;
  r1sets: number = 1;
  startr1Rest(specificWorkouts: Workout) {
    if (specificWorkouts.r1rest) {
      this.cdr1Rest = specificWorkouts.r1rest;

      this.cdir1Rest = setInterval(() => {
        if (this.cdr1Rest && this.cdr1Rest > 0) {
          // Store remaining time
          this.cdr1Rest--;
        } else {
          clearInterval(this.cdir1Rest);
          this.r1RestShowc = false;
          this.r1m2Showc = true;
        this.updateIonContentClass(); // Call a method to update the ion-content class
          this.clearcdr1rest();
          if (specificWorkouts.r1m2 !== "") {
            this.r1m2Show = true;
            this.r1RestShow = false;
          } else {
            if (this.r1sets !== specificWorkouts.r1sets) {
              this.r1sets++;
              this.r1RestShow = false;
              this.cdr1m1Show = true;
              this.srtbtnShow = true;
              this.buttonDisabled = false;
              this.srtbtn2Show = true;
              this.buttonDisabled = false;
            } else {
              if (specificWorkouts.r2m1 !== '') {
                this.r2m1Show = true;
                this.r1RestShow = false;
              } else {
                this.donescrnShow = true;
                this.r1RestShow = false;
              }
            }
          }
        }
      }, 1000);
    }
  }

  clearcdr1rest() {
    if (this.cdir1Rest) {
      clearInterval(this.cdir1Rest);
    }
    this.cdr1Rest = undefined;
  }

  cd5Sec2Show = true;
  srtbtn2Show = true;
  cd5Sec2: number | undefined = undefined;
  strt5Sec2Timer(specificWorkouts: Workout) {
    this.buttonDisabled = true; // Disable the button
    this.cd5Sec2 = 5;
    this.srtbtn2Show = false;
    this.cd5Sec2Show = true;

    const timerInterval = setInterval(() => {
      if (this.cd5Sec2 !== undefined && this.cd5Sec2 > 0) {
        this.cd5Sec2--;
      } else {
        clearInterval(timerInterval);
        this.strtr1m2Timer(specificWorkouts);
        this.cd5Sec2Show = false;
        this.cdr1m2Show = true;
      }
    }, 1000); // Update the 5-second countdown every second
  }

  cdr1m2Timer: number | undefined = undefined;
  cdr1m2Show = false;
  cdr1m2Intval: any;
  remaincdr1m2: number | undefined = undefined;
  isPr1m2Timer: boolean = false;
  strtr1m2Timer(specificWorkouts: Workout) {
    if (specificWorkouts.r1move) {
      if (this.isPr1m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr1m2Timer = this.remaincdr1m2;
      } else if (this.cdr1m2Timer === undefined) {
        this.cdr1m2Timer = specificWorkouts.r1move;
      }
      this.cdr1m2Intval = setInterval(() => {
        if (this.cdr1m2Timer && this.cdr1m2Timer > 0) {
          this.remaincdr1m2 = this.cdr1m2Timer; // Store remaining time
          this.cdr1m2Timer--;
        } else {
          clearInterval(this.cdr1m2Intval);
          this.clearr1m2Cd();

          this.r1m2Show = false;
          this.r1m2RestShow = true;
          this.r1m2Showc = false;
          this.r1m2RestShowc = true;
          this.updateIonContentClass(); // Call a method to update the ion-content class
          this.startr1m2Rest(specificWorkouts);
        }
      }, 1000);
    }
  }
  clearr1m2Cd() {
    if (this.cdr1m2Intval) {
      clearInterval(this.cdr1m2Intval);
    }
    this.cdr1m2Timer = undefined;
    this.isPr1m2Timer = false;
    this.remaincdr1m2 = undefined;
  }
  r1m3Show = false;
  r2m1Show = false;
  cdr1m2Rest: number | undefined = undefined;
  cdir1m2Rest: any;
  r1m2RestShow = false;

  startr1m2Rest(specificWorkouts: Workout) {
    if (specificWorkouts.r1rest) {
      this.cdr1m2Rest = specificWorkouts.r1rest;
      this.cdir1m2Rest = setInterval(() => {
        if (this.cdr1m2Rest && this.cdr1m2Rest > 0) {
          // Store remaining time
          this.cdr1m2Rest--;
        } else {
          clearInterval(this.cdir1m2Rest);
          this.r1m2RestShowc = false;
          this.r1m3Showc = true;
        this.updateIonContentClass(); // Call a method to update the ion-content class
          this.clearcdr1m2rest();
          if (specificWorkouts.r1m3 !== "") {
            this.r1m3Show = true;
            this.r1m2RestShow = false;
          } else {
            console.log(this.r1sets);
            console.log(specificWorkouts.r1sets)
            if (this.r1sets !== specificWorkouts.r1sets) {
              this.r1sets++;
              this.r1m2RestShow = false;
              this.cdr1m1Show = true;
              this.srtbtnShow = true;
              this.srtbtn2Show = true;
              this.buttonDisabled = false;
              this.cdr1m2Show = false;
            } else {
              if (specificWorkouts.r2m1 !== '') {
                this.r2m1Show = true;
                this.r1m2RestShow = false;
              } else {
                this.donescrnShow = true;
                this.r1m2RestShow = false;
              }
            }
          }
        }
      }, 1000);
    }
  }
  clearcdr1m2rest() {
    if (this.cdir1m2Rest) {
      clearInterval(this.cdir1m2Rest);
    }
    this.cdr1m2Rest = undefined;
  }

  cd5Sec3Show = true;
  srtbtn3Show = true;
  cd5Sec3: number | undefined = undefined;
  strt5Sec3Timer(specificWorkouts: Workout) {
    this.cd5Sec3 = 5;
    this.srtbtn3Show = false;
    this.cd5Sec3Show = true;
    const timerInterval = setInterval(() => {
      if (this.cd5Sec3 !== undefined && this.cd5Sec3 > 0) {
        this.cd5Sec3--;
      } else {
        clearInterval(timerInterval);
        this.strtr1m3Timer(specificWorkouts);
        this.cd5Sec3Show = false;
        this.cdr1m3Show = true;
      }
    }, 1000); // Update the 5-second countdown every second
  }

  cdr1m3Timer: number | undefined = undefined;
  cdr1m3Intval: any;
  remaincdr1m3: number | undefined = undefined;
  isPr1m3Timer: boolean = false;
  cdr1m3Show = false;
  strtr1m3Timer(specificWorkouts: Workout) {
    if (specificWorkouts.r1move) {
      if (this.isPr1m3Timer) {
        // Resume the countdown with the remaining time
        this.cdr1m3Timer = this.remaincdr1m3;
      } else if (this.cdr1m3Timer === undefined) {
        this.cdr1m3Timer = specificWorkouts.r1move;
      }
      this.cdr1m3Intval = setInterval(() => {
        if (this.cdr1m3Timer && this.cdr1m3Timer > 0) {
          this.remaincdr1m3 = this.cdr1m3Timer; // Store remaining time
          this.cdr1m3Timer--;
        } else {
          clearInterval(this.cdr1m3Intval);
          this.clearr1m3Cd();

          this.r1m3Show = false;
          this.r1m3RestShow = true;
          this.r1m3Showc = false;
          this.r1m3RestShowc = true;
          this.updateIonContentClass();
          this.startr1m3Rest(specificWorkouts);
        }
      }, 1000);
    }
  }
  clearr1m3Cd() {
    if (this.cdr1m3Intval) {
      clearInterval(this.cdr1m3Intval);
    }
    this.cdr1m3Timer = undefined;
    this.isPr1m3Timer = false;
    this.remaincdr1m3 = undefined;
  }
  r1m4Show = false;
  cdr1m3Rest: number | undefined = undefined;
  cdir1m3Rest: any;
  r1m3RestShow = false;
  startr1m3Rest(specificWorkouts: Workout) {
    if (specificWorkouts.r1rest) {
      this.cdr1m3Rest = specificWorkouts.r1rest;
      this.cdir1m3Rest = setInterval(() => {
        if (this.cdr1m3Rest && this.cdr1m3Rest > 0) {
          // Store remaining time
          this.cdr1m3Rest--;
        } else {
          clearInterval(this.cdir1m3Rest);
          this.r1m3RestShowc = false;
          this.r1m3Showc = true;
        this.updateIonContentClass(); // Call a method to update the ion-content class
          this.clearcdr1m3rest();

          if (this.r1sets !== specificWorkouts.r1sets) {
            this.r1sets++;
            this.r1m3RestShow = false;
            this.cdr1m1Show = true;
            this.cdr1m2Show = true;
            this.srtbtn3Show = true;
            this.srtbtn2Show = true;
            this.srtbtnShow = true;
            this.buttonDisabled = false;
            this.cdr1m3Show = false;
          } else {
            if (specificWorkouts.r2m1 !== '') {
              this.r2m1Show = true;
              this.r1m3RestShow = false;
            } else {
              this.donescrnShow = true;
              this.r1m3RestShow = false;
            }
          }
        }
      }, 1000);
    }
  }
  clearcdr1m3rest() {
    if (this.cdir1m3Rest) {
      clearInterval(this.cdir1m3Rest);
    }
    this.cdr1m3Rest = undefined;
  }

  //Round 2
  r2cd5Sec: number | undefined = undefined;
  r2cd5SecShow = true;
  r2srtbtnShow = true;
  r2strt5SecTimer(specificWorkouts: Workout) {
    this.r2cd5Sec = 5;
    this.r2srtbtnShow = false;
    this.r2cd5SecShow = true;

    const timerInterval = setInterval(() => {
      if (this.r2cd5Sec !== undefined && this.r2cd5Sec > 0) {
        this.r2cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr2m1Timer(specificWorkouts);
        this.r2cd5SecShow = false;
      }
    }, 1000); // Update the 5-second countdown every second
  }

  // movment1 timer
  r2RestShow = false;
  cdr2m1Timer: number | undefined = undefined;
  cdr2m1Show = true;
  isPr2m1Timer: boolean = false;
  remaincdr2m1: number | undefined = undefined;
  cdr2m1Intval: any;
  strtr2m1Timer(specificWorkouts: Workout) {
    if (specificWorkouts.r2move) {
      if (this.isPr2m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr2m1Timer = this.remaincdr2m1;
      } else if (this.cdr2m1Timer === undefined) {
        this.cdr2m1Timer = specificWorkouts.r2move;
      }
      this.cdr2m1Intval = setInterval(() => {
        if (this.cdr2m1Timer && this.cdr2m1Timer > 0) {
          this.remaincdr2m1 = this.cdr2m1Timer; // Store remaining time
          this.cdr2m1Timer--;
        } else {
          clearInterval(this.cdr2m1Intval);
          this.clearr2m1Cd();

          this.r2m1Show = false;
          this.r2RestShow = true;
          this.r2m1Showc = false;
          this.r2m1RestShowc = true;
          this.updateIonContentClass();
          this.startr2Rest(specificWorkouts);
        }
      }, 1000);
    }
  }

  clearr2m1Cd() {
    if (this.cdr2m1Intval) {
      clearInterval(this.cdr2m1Intval);
    }
    this.cdr2m1Timer = undefined;
    this.isPr2m1Timer = false;
    this.remaincdr2m1 = undefined;
  }
  r2m2Show = false;
  cdr2Rest: number | undefined = undefined;
  cdir2Rest: any;
  r2sets: number = 1;
  startr2Rest(specificWorkouts: Workout) {
    if (specificWorkouts.r2rest) {
      this.cdr2Rest = specificWorkouts.r2rest;
      this.cdir2Rest = setInterval(() => {
        if (this.cdr2Rest && this.cdr2Rest > 0) {
          // Store remaining time
          this.cdr2Rest--;
        } else {
          clearInterval(this.cdir2Rest); // Use cdir2Rest, not cdr2Rest
          this.r2m1RestShowc = false;
          this.r2m1Showc = true;
        this.updateIonContentClass(); // Call a method to update the ion-content class
          this.clearcdr2rest();
          if (specificWorkouts.r2m2 !== '') {
            this.r2RestShow = false;
            this.r2m2Show = true;
          } else {
            if (this.r2sets !== specificWorkouts.r2sets) {
              this.r2sets++;
              this.r2RestShow = false;
              this.r2m1Show = true;
              this.r2srtbtnShow = true;
              this.buttonDisabled = false;
              this.srtbtn2Show = true;
              this.buttonDisabled = false;
            } else {
              if (specificWorkouts.r3m1 !== '') {
                this.r3m1Show = true;
                this.r2RestShow = false;
              } else {
                this.donescrnShow = true;
                this.r2RestShow = false;
              }
            }
          }
        }
      }, 1000);
    }
  }

  clearcdr2rest() {
    if (this.cdir2Rest) {
      clearInterval(this.cdir2Rest); // Use cdir2Rest, not cdr2Rest
    }
    this.cdr2Rest = undefined;
  }

  r2m2cd5Sec: number | undefined = undefined;
  r2m2cd5SecShow = true;
  r2m2srtbtnShow = true;
  r2m2strt5SecTimer(specificWorkouts: Workout) {
    this.r2m2cd5Sec = 5;
    this.r2m2srtbtnShow = false;
    this.r2m2cd5SecShow = true;
    const timerInterval = setInterval(() => {
      if (this.r2m2cd5Sec !== undefined && this.r2m2cd5Sec > 0) {
        this.r2m2cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr2m2Timer(specificWorkouts);
        this.r2m2cd5SecShow = false;
      }
    }, 1000); // Update the 5-second countdown every second
  }
  r2m2RestShow = false;
  cdr2m2Timer: number | undefined = undefined;
  cdr2m2Show = true;
  isPr2m2Timer: boolean = false;
  remaincdr2m2: number | undefined = undefined;
  cdr2m2Intval: any;
  strtr2m2Timer(specificWorkouts: Workout) {
    if (specificWorkouts.r2move) {
      if (this.isPr2m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr2m2Timer = this.remaincdr2m2;
      } else if (this.cdr2m2Timer === undefined) {
        this.cdr2m2Timer = specificWorkouts.r2move;
      }
      this.cdr2m2Intval = setInterval(() => {
        if (this.cdr2m2Timer && this.cdr2m2Timer > 0) {
          this.remaincdr2m2 = this.cdr2m2Timer; // Store remaining time
          this.cdr2m2Timer--;
        } else {
          clearInterval(this.cdr2m2Intval);
          this.clearr2m2Cd();

          this.r2m2Show = false;
          this.r2m2RestShow = true;
          this.r2m2Showc = false;
          this.r2m2RestShowc = true;
          this.updateIonContentClass();
          this.startr2m2Rest(specificWorkouts);
        }
      }, 1000);
    }
  }

  clearr2m2Cd() {
    if (this.cdr2m2Intval) {
      clearInterval(this.cdr2m2Intval);
    }
    this.cdr2m2Timer = undefined;
    this.isPr2m2Timer = false;
    this.remaincdr2m2 = undefined;
  }
  donescrnShow = false;
  r3m1Show = false;
  r2m3Show = false;
  cdr2m2Rest: number | undefined = undefined;
  cdir2m2Rest: any;
  startr2m2Rest(specificWorkouts: Workout) {
    if (specificWorkouts.r2rest) {
      this.cdr2m2Rest = specificWorkouts.r2rest;
      this.cdir2m2Rest = setInterval(() => {
        if (this.cdr2m2Rest && this.cdr2m2Rest > 0) {
          // Store remaining time
          this.cdr2m2Rest--;
        } else {
          clearInterval(this.cdir2m2Rest);
          this.r2m2RestShowc = false;
          this.r2m2Showc = true;
        this.updateIonContentClass();
          this.clearcdr2m2rest();
          if (specificWorkouts.r2m3 !== '') {
            this.r2m3Show = true;
            this.r2m2RestShow = false;
          } else {
            if (this.r2sets !== specificWorkouts.r2sets) {
              this.r2sets++;
              this.r2m2RestShow = false;
              this.r2m1Show = true;

              this.cdr2m1Show = true;
              this.r2srtbtnShow = true;
              this.r2m2srtbtnShow = true;
              this.buttonDisabled = false;
              this.cdr2m2Show = true;
            } else {
              if (specificWorkouts.r3m1 !== '') {
                this.r3m1Show = true;
                this.r2m2RestShow = false;
              } else {
                this.donescrnShow = true;
                this.r2m2RestShow = false;
              }
            }
          }
        }
      }, 1000);
    }
  }

  clearcdr2m2rest() {
    if (this.cdir2m2Rest) {
      clearInterval(this.cdir2m2Rest);
    }
    this.cdr2m2Rest = undefined;
  }
  r2m3cd5Sec3Show = true;
  r2m3srtbtn3Show = true;
  r2m3cd5Sec3: number | undefined = undefined;
  cdr2m3Show = false;
  r2m3strt5Sec3Timer(specificWorkouts: Workout) {
    this.r2m3cd5Sec3 = 5;
    this.r2m3srtbtn3Show = false;
    this.r2m3cd5Sec3Show = true;
    const timerInterval = setInterval(() => {
      if (this.r2m3cd5Sec3 !== undefined && this.r2m3cd5Sec3 > 0) {
        this.r2m3cd5Sec3--;
      } else {
        clearInterval(timerInterval);
        this.strtr2m3Timer(specificWorkouts);
        this.r2m3cd5Sec3Show = false;
        this.cdr2m3Show = true;
      }
    }, 1000); // Update the 5-second countdown every second
  }

  cdr2m3Timer: number | undefined = undefined;
  cdr2m3Intval: any;
  remaincdr2m3: number | undefined = undefined;
  isPr2m3Timer: boolean = false;
  strtr2m3Timer(specificWorkouts: Workout) {
    if (specificWorkouts.r2move) {
      if (this.isPr2m3Timer) {
        // Resume the countdown with the remaining time
        this.cdr2m3Timer = this.remaincdr2m3;
      } else if (this.cdr2m3Timer === undefined) {
        this.cdr2m3Timer = specificWorkouts.r2move;
      }
      this.cdr2m3Intval = setInterval(() => {
        if (this.cdr2m3Timer && this.cdr2m3Timer > 0) {
          this.remaincdr2m3 = this.cdr2m3Timer; // Store remaining time
          this.cdr2m3Timer--;
        } else {
          clearInterval(this.cdr2m3Intval);
          this.clearr2m3Cd();

          this.r2m3Show = false;
          this.r2m3RestShow = true;
          this.r2m3Showc = false;
          this.r2m3RestShowc = true;
          this.updateIonContentClass();
          this.startr2m3Rest(specificWorkouts);
        }
      }, 1000);
    }
  }
  clearr2m3Cd() {
    if (this.cdr2m3Intval) {
      clearInterval(this.cdr2m3Intval);
    }
    this.cdr2m3Timer = undefined;
    this.isPr2m3Timer = false;
    this.remaincdr2m3 = undefined;
  }
  cdr2m3Rest: number | undefined = undefined;
  cdir2m3Rest: any;
  r2m3RestShow = false;
  startr2m3Rest(specificWorkouts: Workout) {
    if (specificWorkouts.r2rest) {
      this.cdr2m3Rest = specificWorkouts.r2rest;
      this.cdir2m3Rest = setInterval(() => {
        if (this.cdr2m3Rest && this.cdr2m3Rest > 0) {
          // Store remaining time
          this.cdr2m3Rest--;
        } else {
          clearInterval(this.cdir2m3Rest);
          this.r2m3RestShowc = false;
          this.r2m3Showc = true;
        this.updateIonContentClass();
          this.clearcdr2m3rest();
          if (this.r2sets !== specificWorkouts.r2sets) {
            this.r2sets++;
            this.r2m1Show = true;
            this.r2m3RestShow = false;
            this.cdr2m1Show = true;
            this.cdr2m2Show = true;
            this.r2m3srtbtn3Show = true;
            this.r2m2srtbtnShow = true;
            this.r2srtbtnShow = true;
            this.buttonDisabled = false;
            this.cdr2m3Show = true;
          } else {
            if (specificWorkouts.r3m1 !== '') {
              this.r3m1Show = true;
              this.r2m3RestShow = false;
            } else {
              this.donescrnShow = true;
              this.r2m3RestShow = false;
            }
          }
        }
      }, 1000);
    }
  }
  clearcdr2m3rest() {
    if (this.cdir2m3Rest) {
      clearInterval(this.cdir2m3Rest);
    }
    this.cdr2m3Rest = undefined;
  }

  //Round 3
  r3cd5Sec: number | undefined = undefined;
  r3cd5SecShow = true;
  r3srtbtnShow = true;
  r3strt5SecTimer(specificWorkouts: Workout) {
    this.r3cd5Sec = 5;
    this.r3srtbtnShow = false;
    this.r3cd5SecShow = true;
    const timerInterval = setInterval(() => {
      if (this.r3cd5Sec !== undefined && this.r3cd5Sec > 0) {
        this.r3cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr3m1Timer(specificWorkouts);
        this.r3cd5SecShow = false;
      }
    }, 1000); // Update the 5-second countdown every second
  }

  // movment1 timer
  r3RestShow = false;
  cdr3m1Timer: number | undefined = undefined;
  cdr3m1Show = true;
  isPr3m1Timer: boolean = false;
  remaincdr3m1: number | undefined = undefined;
  cdr3m1Intval: any;
  strtr3m1Timer(specificWorkouts: Workout) {
    if (specificWorkouts.r3move) {
      if (this.isPr3m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr3m1Timer = this.remaincdr3m1;
      } else if (this.cdr3m1Timer === undefined) {
        this.cdr3m1Timer = specificWorkouts.r3move;
      }
      this.cdr3m1Intval = setInterval(() => {
        if (this.cdr3m1Timer && this.cdr3m1Timer > 0) {
          this.remaincdr3m1 = this.cdr3m1Timer; // Store remaining time
          this.cdr3m1Timer--;
        } else {
          clearInterval(this.cdr3m1Intval);
          this.clearr3m1Cd();

          this.r3m1Show = false;
          this.r3RestShow = true;
          this.r3m1Showc = false;
          this.r3m1RestShowc = true;
          this.updateIonContentClass();
          this.startr3Rest(specificWorkouts);
        }
      }, 1000);
    }
  }

  clearr3m1Cd() {
    if (this.cdr3m1Intval) {
      clearInterval(this.cdr3m1Intval);
    }
    this.cdr3m1Timer = undefined;
    this.isPr3m1Timer = false;
    this.remaincdr3m1 = undefined;
  }
  r3m2Show = false;
  r4m1Show = false;
  cdr3Rest: number | undefined = undefined;
  cdir3Rest: any;
  r3sets: number = 1;
  startr3Rest(specificWorkouts: Workout) {
    if (specificWorkouts.r3rest) {
      this.cdr3Rest = specificWorkouts.r3rest;
      this.cdir3Rest = setInterval(() => {
        if (this.cdr3Rest && this.cdr3Rest > 0) {
          // Store remaining time
          this.cdr3Rest--;
        } else {
          clearInterval(this.cdr3Rest);
          this.r3m1RestShowc = false;
          this.r3m1Showc = true;
        this.updateIonContentClass();
          this.clearcdr3rest();
          if (specificWorkouts.r3m2 !== '') {
            this.r3RestShow = false;
            this.r3m2Show = true;
          } else {
            if (this.r3sets !== specificWorkouts.r3sets) {
              this.r3sets++;
              this.r3RestShow = false;
              this.r3m1Show = true;
              this.r3srtbtnShow = true;
              this.buttonDisabled = false;
              this.r3m2srtbtnShow = true;
              this.buttonDisabled = false;
            } else {
              if (specificWorkouts.r4m1 !== '') {
                this.r4m1Show = true;
                this.r3RestShow = false;
              } else {
                this.donescrnShow = true;
                this.r3RestShow = false;
              }
            }
          }
        }
      }, 1000);
    }
  }

  clearcdr3rest() {
    if (this.cdir3Rest) {
      clearInterval(this.cdir3Rest);
    }
    this.cdr3Rest = undefined;
  }

  r3m2cd5Sec: number | undefined = undefined;
  r3m2cd5SecShow = true;
  r3m2srtbtnShow = true;
  r3m2strt5SecTimer(specificWorkouts: Workout) {
    this.r3m2cd5Sec = 5;
    this.r3m2srtbtnShow = false;
    this.r3m2cd5SecShow = true;
    const timerInterval = setInterval(() => {
      if (this.r3m2cd5Sec !== undefined && this.r3m2cd5Sec > 0) {
        this.r3m2cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr3m2Timer(specificWorkouts);
        this.r3m2cd5SecShow = false;
      }
    }, 1000); // Update the 5-second countdown every second
  }
  r3m2RestShow = false;
  cdr3m2Timer: number | undefined = undefined;
  cdr3m2Show = true;
  isPr3m2Timer: boolean = false;
  remaincdr3m2: number | undefined = undefined;
  cdr3m2Intval: any;
  strtr3m2Timer(specificWorkouts: Workout) {
    if (specificWorkouts.r3move) {
      if (this.isPr3m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr3m2Timer = this.remaincdr3m2;
      } else if (this.cdr3m2Timer === undefined) {
        this.cdr3m2Timer = specificWorkouts.r3move;
      }
      this.cdr3m2Intval = setInterval(() => {
        if (this.cdr3m2Timer && this.cdr3m2Timer > 0) {
          this.remaincdr3m2 = this.cdr3m2Timer; // Store remaining time
          this.cdr3m2Timer--;
        } else {
          clearInterval(this.cdr3m2Intval);
          this.clearr3m2Cd();

          this.r3m2Show = false;
          this.r3m2RestShow = true;
          this.r3m2Showc = false;
          this.r3m2RestShowc = true;
          this.updateIonContentClass();
          this.startr3m2Rest(specificWorkouts);
        }
      }, 1000);
    }
  }

  clearr3m2Cd() {
    if (this.cdr3m2Intval) {
      clearInterval(this.cdr3m2Intval);
    }
    this.cdr3m2Timer = undefined;
    this.isPr3m2Timer = false;
    this.remaincdr3m2 = undefined;
  }

  r3m3Show = false;
  cdr3m2Rest: number | undefined = undefined;
  cdir3m2Rest: any;
  startr3m2Rest(specificWorkouts: Workout) {
    if (specificWorkouts.r3rest) {
      this.cdr3m2Rest = specificWorkouts.r3rest;
      this.cdir3m2Rest = setInterval(() => {
        if (this.cdr3m2Rest && this.cdr3m2Rest > 0) {
          // Store remaining time
          this.cdr3m2Rest--;
        } else {
          clearInterval(this.cdir3m2Rest);
          this.r3m2RestShowc = false;
          this.r3m2Showc = true;
        this.updateIonContentClass();
          this.clearcdr3m2rest();
          if (specificWorkouts.r3m3 !== '') {
            this.r3m3Show = true;
            this.r3m2RestShow = false;
          } else {
            if (this.r3sets !== specificWorkouts.r3sets) {
              this.r3sets++;
              this.r3m2RestShow = false;
              this.r3m1Show = true;

              this.cdr3m1Show = true;
              this.r3srtbtnShow = true;
              this.r3m2srtbtnShow = true;
              this.buttonDisabled = false;
              this.cdr3m2Show = true;
            } else {
              if (specificWorkouts.r4m1 !== '') {
                this.r4m1Show = true;
                this.r3m2RestShow = false;
              } else {
                this.donescrnShow = true;
                this.r3m2RestShow = false;
              }
            }
          }
        }
      }, 1000);
    }
  }

  clearcdr3m2rest() {
    if (this.cdir3m2Rest) {
      clearInterval(this.cdir3m2Rest);
    }
    this.cdr3m2Rest = undefined;
  }

  r3m3cd5Sec3Show = true;
  r3m3srtbtn3Show = true;
  cdr3m3Show = false;
  r3m3cd5Sec3: number | undefined = undefined;
  r3m3strt5Sec3Timer(specificWorkouts: Workout) {
    this.r3m3cd5Sec3 = 5;
    this.r3m3srtbtn3Show = false;
    this.r3m3cd5Sec3Show = true;
    const timerInterval = setInterval(() => {
      if (this.r3m3cd5Sec3 !== undefined && this.r3m3cd5Sec3 > 0) {
        this.r3m3cd5Sec3--;
      } else {
        clearInterval(timerInterval);
        this.strtr3m3Timer(specificWorkouts);
        this.r3m3cd5Sec3Show = false;
        this.cdr3m3Show = true;
      }
    }, 1000); // Update the 5-second countdown every second
  }

  cdr3m3Timer: number | undefined = undefined;
  cdr3m3Intval: any;
  remaincdr3m3: number | undefined = undefined;
  isPr3m3Timer: boolean = false;
  strtr3m3Timer(specificWorkouts: Workout) {
    if (specificWorkouts.r3move) {
      if (this.isPr3m3Timer) {
        // Resume the countdown with the remaining time
        this.cdr3m3Timer = this.remaincdr3m3;
      } else if (this.cdr3m3Timer === undefined) {
        this.cdr3m3Timer = specificWorkouts.r3move;
      }
      this.cdr3m3Intval = setInterval(() => {
        if (this.cdr3m3Timer && this.cdr3m3Timer > 0) {
          this.remaincdr3m3 = this.cdr3m3Timer; // Store remaining time
          this.cdr3m3Timer--;
        } else {
          clearInterval(this.cdr3m3Intval);
          this.clearr3m3Cd();

          this.r3m3Show = false;
          this.r3m3RestShow = true;
          this.r3m3Showc = false;
          this.r3m3RestShowc = true;
          this.updateIonContentClass();
          this.startr3m3Rest(specificWorkouts);
        }
      }, 1000);
    }
  }
  clearr3m3Cd() {
    if (this.cdr3m3Intval) {
      clearInterval(this.cdr3m3Intval);
    }
    this.cdr3m3Timer = undefined;
    this.isPr3m3Timer = false;
    this.remaincdr3m3 = undefined;
  }
  cdr3m3Rest: number | undefined = undefined;
  cdir3m3Rest: any;
  r3m3RestShow = false;
  startr3m3Rest(specificWorkouts: Workout) {
    if (specificWorkouts.r3rest) {
      this.cdr3m3Rest = specificWorkouts.r3rest;
      this.cdir3m3Rest = setInterval(() => {
        if (this.cdr3m3Rest && this.cdr3m3Rest > 0) {
          // Store remaining time
          this.cdr3m3Rest--;
        } else {
          clearInterval(this.cdir3m3Rest);
          this.r3m3RestShowc = false;
          this.r3m3Showc = true;
        this.updateIonContentClass();
          this.clearcdr3m3rest();
          if (this.r3sets !== specificWorkouts.r3sets) {
            this.r3sets++;
            this.r3m1Show = true;
            this.r3m3RestShow = false;
            this.cdr3m1Show = true;
            this.cdr3m2Show = true;
            this.r3m3srtbtn3Show = true;
            this.r3m2srtbtnShow = true;
            this.r3srtbtnShow = true;
            this.buttonDisabled = false;
            this.cdr3m3Show = true;
          } else {
            if (specificWorkouts.r4m1 !== '') {
              this.r4m1Show = true;
              this.r3m3RestShow = false;
            } else {
              this.donescrnShow = true;
              this.r3m3RestShow = false;
            }
          }
        }
      }, 1000);
    }
  }
  clearcdr3m3rest() {
    if (this.cdir3m3Rest) {
      clearInterval(this.cdir3m3Rest);
    }
    this.cdr3m3Rest = undefined;
  }

  //Round 4
  r4cd5Sec: number | undefined = undefined;
  r4cd5SecShow = true;
  r4srtbtnShow = true;

  r4strt5SecTimer(specificWorkouts: Workout) {
    this.r4cd5Sec = 5;
    this.r4srtbtnShow = false;
    this.r4cd5SecShow = true;
    const timerInterval = setInterval(() => {
      if (this.r4cd5Sec !== undefined && this.r4cd5Sec > 0) {
        this.r4cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr4m1Timer(specificWorkouts);
        this.r4cd5SecShow = false;
      }
    }, 1000); // Update the 5-second countdown every second
  }

  // movment1 timer
  r4RestShow = false;
  cdr4m1Timer: number | undefined = undefined;
  cdr4m1Show = true;
  isPr4m1Timer: boolean = false;
  remaincdr4m1: number | undefined = undefined;
  cdr4m1Intval: any;
  strtr4m1Timer(specificWorkouts: Workout) {
    if (specificWorkouts.r4move) {
      if (this.isPr4m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr4m1Timer = this.remaincdr4m1;
      } else if (this.cdr4m1Timer === undefined) {
        this.cdr4m1Timer = specificWorkouts.r4move;
      }
      this.cdr4m1Intval = setInterval(() => {
        if (this.cdr4m1Timer && this.cdr4m1Timer > 0) {
          this.remaincdr4m1 = this.cdr4m1Timer; // Store remaining time
          this.cdr4m1Timer--;
        } else {
          clearInterval(this.cdr4m1Intval);
          this.clearr4m1Cd();

          this.r4m1Show = false;
          this.r4RestShow = true;
          this.r4m1Showc = false;
          this.r4m1RestShowc = true;
          this.updateIonContentClass();
          this.startr4Rest(specificWorkouts);
        }
      }, 1000);
    }
  }

  clearr4m1Cd() {
    if (this.cdr4m1Intval) {
      clearInterval(this.cdr4m1Intval);
    }
    this.cdr4m1Timer = undefined;
    this.isPr4m1Timer = false;
    this.remaincdr4m1 = undefined;
  }

  r4m2Show = false;
  cdr4Rest: number | undefined = undefined;
  cdir4Rest: any;
  r4sets: number = 1;
  startr4Rest(specificWorkouts: Workout) {
    if (specificWorkouts.r4rest) {
      this.cdr4Rest = specificWorkouts.r4rest;
      this.cdir4Rest = setInterval(() => {
        if (this.cdr4Rest && this.cdr4Rest > 0) {
          // Store remaining time
          this.cdr4Rest--;
        } else {
          clearInterval(this.cdr4Rest);
          this.r4m1RestShowc = false;
          this.r4m1Showc = true;
        this.updateIonContentClass();
          this.clearcdr4rest();
          if (specificWorkouts.r4m2 !== '') {
            this.r4RestShow = false;
            this.r4m2Show = true;
          } else {
            if (this.r4sets !== specificWorkouts.r4sets) {
              this.r4sets++;
              this.r4RestShow = false;
              this.r4m1Show = true;
              this.r4srtbtnShow = true;
              this.buttonDisabled = false;
              this.r4m2srtbtnShow = true;
              this.buttonDisabled = false;
            } else {
              this.donescrnShow = true;
              this.r4RestShow = false;
            }
          }
        }
      }, 1000);
    }
  }

  clearcdr4rest() {
    if (this.cdir4Rest) {
      clearInterval(this.cdir4Rest);
    }
    this.cdr4Rest = undefined;
  }
  r4m2cd5Sec: number | undefined = undefined;
  r4m2cd5SecShow = true;
  r4m2srtbtnShow = true;
  r4m2strt5SecTimer(workout: Workout) {
    this.r4m2cd5Sec = 5;
    this.r4m2srtbtnShow = false;
    this.r4m2cd5SecShow = true;
    const timerInterval = setInterval(() => {
      if (this.r4m2cd5Sec !== undefined && this.r4m2cd5Sec > 0) {
        this.r4m2cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr4m2Timer(workout);
        this.r4m2cd5SecShow = false;
      }
    }, 1000); // Update the 5-second countdown every second
  }
  r4m2RestShow = false;
  cdr4m2Timer: number | undefined = undefined;
  cdr4m2Show = true;
  isPr4m2Timer: boolean = false;
  remaincdr4m2: number | undefined = undefined;
  cdr4m2Intval: any;
  strtr4m2Timer(specificWorkouts: Workout) {
    if (specificWorkouts.r4move) {
      if (this.isPr4m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr4m2Timer = this.remaincdr4m2;
      } else if (this.cdr4m2Timer === undefined) {
        this.cdr4m2Timer = specificWorkouts.r4move;
      }
      this.cdr4m2Intval = setInterval(() => {
        if (this.cdr4m2Timer && this.cdr4m2Timer > 0) {
          this.remaincdr4m2 = this.cdr4m2Timer; // Store remaining time
          this.cdr4m2Timer--;
        } else {
          clearInterval(this.cdr4m2Intval);
          this.clearr4m2Cd();

          this.r4m2Show = false;
          this.r4m2RestShow = true;
          this.r4m2Showc = false;
          this.r4m2RestShowc = true;
          this.updateIonContentClass();
          this.startr4m2Rest(specificWorkouts);
        }
      }, 1000);
    }
  }

  clearr4m2Cd() {
    if (this.cdr4m2Intval) {
      clearInterval(this.cdr4m2Intval);
    }
    this.cdr4m2Timer = undefined;
    this.isPr4m2Timer = false;
    this.remaincdr4m2 = undefined;
  }

  r4m3Show = false;
  cdr4m2Rest: number | undefined = undefined;
  cdir4m2Rest: any;
  startr4m2Rest(specificWorkouts: Workout) {
    if (specificWorkouts.r4rest) {
      this.cdr4m2Rest = specificWorkouts.r4rest;
      this.cdir4m2Rest = setInterval(() => {
        if (this.cdr4m2Rest && this.cdr4m2Rest > 0) {
          // Store remaining time
          this.cdr4m2Rest--;
        } else {
          clearInterval(this.cdir4m2Rest);
          this.r4m2RestShowc = false;
          this.r4m2Showc = true;
        this.updateIonContentClass();
          this.clearcdr4m2rest();
          if (specificWorkouts.r4m3 !== '') {
            this.r4m3Show = true;
            this.r4m2RestShow = false;
          } else {
            if (this.r4sets !== specificWorkouts.r4sets) {
              this.r4sets++;
              this.r4m2RestShow = false;
              this.r4m1Show = true;

              this.cdr4m1Show = true;
              this.r4srtbtnShow = true;
              this.r4m2srtbtnShow = true;
              this.buttonDisabled = false;
              this.cdr4m2Show = true;
            } else {
              this.donescrnShow = true;
              this.r4m2RestShow = false;
            }
          }
        }
      }, 1000);
    }
  }

  clearcdr4m2rest() {
    if (this.cdir4m2Rest) {
      clearInterval(this.cdir4m2Rest);
    }
    this.cdr4m2Rest = undefined;
  }

  r4m3cd5Sec3Show = true;
  r4m3srtbtn3Show = true;
  r4m3cd5Sec3: number | undefined = undefined;
  cdr4m3Show = false;
  r4m3strt5Sec3Timer(specificWorkouts: Workout) {
    this.r4m3cd5Sec3 = 5;
    this.r4m3srtbtn3Show = false;
    this.r4m3cd5Sec3Show = true;

    const timerInterval = setInterval(() => {
      if (this.r4m3cd5Sec3 !== undefined && this.r4m3cd5Sec3 > 0) {
        this.r4m3cd5Sec3--;
      } else {
        clearInterval(timerInterval);
        this.strtr4m3Timer(specificWorkouts);
        this.r4m3cd5Sec3Show = false;
        this.cdr4m3Show = true;
      }
    }, 1000); // Update the 5-second countdown every second
  }

  cdr4m3Timer: number | undefined = undefined;
  cdr4m3Intval: any;
  remaincdr4m3: number | undefined = undefined;
  isPr4m3Timer: boolean = false;
  strtr4m3Timer(specificWorkouts: Workout) {
    if (specificWorkouts.r4move) {
      if (this.isPr4m3Timer) {
        // Resume the countdown with the remaining time
        this.cdr4m3Timer = this.remaincdr4m3;
      } else if (this.cdr4m3Timer === undefined) {
        this.cdr4m3Timer = specificWorkouts.r4move;
      }
      this.cdr4m3Intval = setInterval(() => {
        if (this.cdr4m3Timer && this.cdr4m3Timer > 0) {
          this.remaincdr4m3 = this.cdr4m3Timer; // Store remaining time
          this.cdr4m3Timer--;
        } else {
          clearInterval(this.cdr4m3Intval);
        
          this.clearr4m3Cd();

          this.r4m3Show = false;
          this.r4m3RestShow = true;
          this.r4m3Showc = false;
          this.r4m3RestShowc = true;
          this.updateIonContentClass();
          this.startr4m3Rest(specificWorkouts);
        }
      }, 1000);
    }
  }
  clearr4m3Cd() {
    if (this.cdr4m3Intval) {
      clearInterval(this.cdr4m3Intval);
    }
    this.cdr4m3Timer = undefined;
    this.isPr4m3Timer = false;
    this.remaincdr4m3 = undefined;
  }
  cdr4m3Rest: number | undefined = undefined;
  cdir4m3Rest: any;
  r4m3RestShow = false;
  startr4m3Rest(specificWorkouts: Workout) {
    if (specificWorkouts.r4rest) {
      this.cdr4m3Rest = specificWorkouts.r4rest;
      this.cdir4m3Rest = setInterval(() => {
        if (this.cdr4m3Rest && this.cdr4m3Rest > 0) {
          // Store remaining time
          this.cdr4m3Rest--;
        } else {
          clearInterval(this.cdir4m3Rest);
          this.r4m3RestShowc = false;
          this.r4m3Showc = true;
        this.updateIonContentClass();
          this.clearcdr4m3rest();
          if (this.r4sets !== specificWorkouts.r4sets) {
            this.r4sets++;
            this.r4m1Show = true;
            this.r4m3RestShow = false;
            this.cdr4m1Show = true;
            this.cdr4m2Show = true;
            this.r4m3srtbtn3Show = true;
            this.r4m2srtbtnShow = true;
            this.r4srtbtnShow = true;
            this.buttonDisabled = false;
            this.cdr4m3Show = true;
          } else {
            this.donescrnShow = true;
            this.r4m3RestShow = false;
          }
        }
      }, 1000);
    }
  }
  clearcdr4m3rest() {
    if (this.cdir4m3Rest) {
      clearInterval(this.cdir4m3Rest);
    }
    this.cdr4m3Rest = undefined;
  }
  redirectToHome() {
    this.router.navigate(['/chome']); // Replace 'home' with the actual route name of your home page
  }

  ngOnDestroy() {
    this.clearr1m1Cd();
  }
}
