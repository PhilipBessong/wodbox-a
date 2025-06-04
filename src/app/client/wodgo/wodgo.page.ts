import { Component, OnInit, ViewChild, ElementRef, Inject, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Observable, BehaviorSubject,of, firstValueFrom } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/compat/firestore';
import { ModalController, ToastController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/firebase/auth/firebase-auth.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { FriendsComponent } from '../modals/modals/friends/friends.component';
import {
  Workout,
  Tabata,
  Ladder,
  Emom,
  Exercise,
  Amrap,
  WorkoutsService,
} from 'src/app/firebase/workouts.service';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { VideoModalComponent } from 'src/app/video-modal/video-modal.component';
import { R1m2Component } from 'src/app/vidmods/r1m2/r1m2.component';
import { R1m3Component } from 'src/app/vidmods/r1m3/r1m3.component';

import { R2m1Component } from 'src/app/vidmods/r2m1/r2m1.component';
import { R2m2Component } from 'src/app/vidmods/r2m2/r2m2.component';
import { R2m3Component } from 'src/app/vidmods/r2m3/r2m3.component';

import { R3m1Component } from 'src/app/vidmods/r3m1/r3m1.component';
import { R3m2Component } from 'src/app/vidmods/r3m2/r3m2.component';
import { R3m3Component } from 'src/app/vidmods/r3m3/r3m3.component';

import { R4m1Component } from 'src/app/vidmods/r4m1/r4m1.component';
import { R4m2Component } from 'src/app/vidmods/r4m2/r4m2.component';
import { R4m3Component } from 'src/app/vidmods/r4m3/r4m3.component';

import { T1m1Component } from 'src/app/vidmods/t1m1/t1m1.component';
import { T1m2Component } from 'src/app/vidmods/t1m2/t1m2.component';
import { T2m1Component } from 'src/app/vidmods/t2m1/t2m1.component';
import { T2m2Component } from 'src/app/vidmods/t2m2/t2m2.component';
import { T3m1Component } from 'src/app/vidmods/t3m1/t3m1.component';
import { T3m2Component } from 'src/app/vidmods/t3m2/t3m2.component';
import { T4m1Component } from 'src/app/vidmods/t4m1/t4m1.component';
import { T4m2Component } from 'src/app/vidmods/t4m2/t4m2.component';
import { T5m1Component } from 'src/app/vidmods/t5m1/t5m1.component';
import { T5m2Component } from 'src/app/vidmods/t5m2/t5m2.component';
import { T6m1Component } from 'src/app/vidmods/t6m1/t6m1.component';
import { T6m2Component } from 'src/app/vidmods/t6m2/t6m2.component';
import { T7m1Component } from 'src/app/vidmods/t7m1/t7m1.component';
import { T7m2Component } from 'src/app/vidmods/t7m2/t7m2.component';
import { T8m1Component } from 'src/app/vidmods/t8m1/t8m1.component';
import { T8m2Component } from 'src/app/vidmods/t8m2/t8m2.component';
import { Plugin } from '@capacitor/core';
import { Howl } from 'howler';
import firebase from 'firebase/compat/app';
import { FriendsService } from 'src/app/firebase/friends.service';
@Component({
  selector: 'app-wodgo',
  templateUrl: './wodgo.page.html',
  styleUrls: ['./wodgo.page.scss'],
})
export class WodgoPage implements OnInit {
  backtoWarmUp() {
    this.clearr1m1Cd();
    this.clearcdr1rest();
    this.clearr1m2Cd();
    this.clearcdr1m2rest();
    this.clearr1m3Cd();
    this.clearcdr1m3rest();
    this.clearr2m1Cd();
    this.clearcdr2rest();
    this.clearr2m2Cd();
    this.clearcdr2m2rest();
    this.clearr2m3Cd();
    this.clearcdr2m3rest();
    this.clearr3m1Cd();
    this.clearcdr3rest();
    this.clearr3m2Cd();
    this.clearcdr3m2rest();
    this.clearr3m3Cd();
    this.clearcdr3m3rest();
    this.clearr4m1Cd();
    this.clearcdr4rest();
    this.clearr4m2Cd();
    this.clearcdr4m2rest();
    this.clearr4m3Cd();
    this.clearcdr4m3rest();
    this.clearcdr8m2rest();
    this.clearr8m2Cd();
    this.clearcdr8rest();
    this.clearr8m1Cd();
    this.clearcdr7m2rest();
    this.clearr7m2Cd();
    this.clearcdr7rest();
    this.clearr7m1Cd();
    this.clearcdr6m2rest();
    this.clearr6m2Cd();
    this.clearcdr6rest();
    this.clearr6m1Cd();
    this.clearcdr5m2rest();
    this.clearr5m2Cd();
    this.clearcdr5rest();
    this.clearr5m1Cd();
    this.stopAllSounds();
    this.stopAllTimers();
    Howler.stop();
    this.router.navigate(['/warmup']);
  }
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  loading = true;

  onVideoLoaded() {
    this.loading = false;
  }

  specificWorkouts: Workout[] = [];
  stabatas: Tabata[] = [];
  sladders: Ladder[] = [];
  semoms: Emom[] = [];
  samraps: Amrap[] = [];
  exercises: Exercise[] = [];
  videoSources: string[] = [
    'assets/videos/done.mp4',
    'assets/videos/five.mp4',
    'assets/videos/basebump.mp4',
    'assets/videos/oscarwoo.mp4',
    'assets/videos/thubsup.mp4',
    'assets/videos/yessir.mp4',

    // Add more video URLs as needed
  ];

  selectedVideoSource: string = '';
  users: Observable<any[]>;
  private searchTermSubject = new BehaviorSubject<string>('');
  videoUrl: SafeResourceUrl | undefined;
  videoHeight = '280px'; // Adjust the height as needed
  videoWidth = '400px';

  //Audio elements
  audio: HTMLAudioElement;
  audio2: HTMLAudioElement;
  restmp3: HTMLAudioElement;
  rest2mp3: HTMLAudioElement;
  finmp3: HTMLAudioElement;
  donmp3: HTMLAudioElement;
  beepmp3: HTMLAudioElement;
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    @Inject(ModalController) private modalController: ModalController,
    private workoutsService: WorkoutsService,
    private location: Location,
    private toastController: ToastController,
    private firestore: AngularFirestore,
     private friendsService: FriendsService,
    private authService: FirebaseAuthService
  ) {
    this.audio = new Audio('assets/go.mp3');
    this.audio2 = new Audio('assets/lego.mp3');
    this.restmp3 = new Audio('assets/restnb.mp3');
    this.rest2mp3 = new Audio('assets/re.mp3');
    this.finmp3 = new Audio('assets/finmp3.mp3');
    this.donmp3 = new Audio('assets/donzo.mp3');
    this.beepmp3 = new Audio('assets/beep.mp3');
    this.users = this.firestore.collection('users').valueChanges();
    this.selectedVideoSource = this.getRandomVideo();

  }
  getRandomVideo(): string {
    const randomIndex = Math.floor(Math.random() * this.videoSources.length);
    return this.videoSources[randomIndex];
  }



  ngOnInit() {
    // Preload audio files
    this.audio = new Audio('assets/go.mp3');
    this.audio.preload = 'auto';
    this.audio.load();

    this.audio2 = new Audio('assets/lego.mp3');
    this.audio2.preload = 'auto';
    this.audio2.load();

    this.restmp3 = new Audio('assets/restnb.mp3');
    this.restmp3.preload = 'auto';
    this.restmp3.load();

    this.rest2mp3 = new Audio('assets/re.mp3');
    this.rest2mp3.preload = 'auto';
    this.rest2mp3.load();

    this.finmp3 = new Audio('assets/finmp3.mp3');
    this.finmp3.preload = 'auto';
    this.finmp3.load();

    this.donmp3 = new Audio('assets/donzo.mp3');
    this.donmp3.preload = 'auto';
    this.donmp3.load();

    this.beepmp3 = new Audio('assets/beep.mp3');
    this.beepmp3.preload = 'auto';
    this.beepmp3.load();

    this.loadFriends()
    this.getSpecificWorkout();
    this.getSpecificTabataWod();
    this.getIonContentClass();
    this.getSLadderWU();
    this.getSpecificEmomWarmup();
    this.getSpecificAmrapWarmup();
    this.users = this.searchTermSubject.pipe(
      switchMap((searchTerm) => {
        if (searchTerm && searchTerm.trim() !== '') {
          return this.firestore
            .collection('users', (ref) =>
              ref
                .where('email', '>=', searchTerm)
                .where('email', '<=', searchTerm + '\uf8ff')
            )
            .snapshotChanges()
            .pipe(
              map((actions) =>
                actions.map((a) => {
                  const id = a.payload.doc.id;
                  const data: any = a.payload.doc.data();
                  return { id, ...data };
                })
              )
            );
        } else {
          return []; // Return an empty array if searchTerm is empty
        }
      })
    );
  }

  loadSounds() {
    this.audio = new Audio('assets/go.mp3');
    this.audio2 = new Audio('assets/lego.mp3');
    this.restmp3 = new Audio('assets/restnb.mp3');
    this.rest2mp3 = new Audio('assets/re.mp3');
    this.finmp3 = new Audio('assets/finmp3.mp3');
    this.donmp3 = new Audio('assets/donzo.mp3');
    this.beepmp3 = new Audio('assets/beep.mp3');
     // Optional: preload audio
     [this.beepmp3, this.donmp3, this.finmp3, this.rest2mp3, this.restmp3, this.audio2,this.audio].forEach(sound => {
      sound.load();
    });
  }

  startSound = new Howl({ src: ['assets/go.mp3'], html5: false,preload: true, });
  halfwaySound = new Howl({ src: ['assets/beep.mp3'], html5: false, preload: true,});
  endSound = new Howl({ src: ['assets/finmp3.mp3'], html5: false, preload: true, });
  doneSound = new Howl({ src: ['assets/donzo.mp3'], html5: false, preload: true, });

 

  playOnly(sound: HTMLAudioElement) {
    this.stopAllSounds();
    sound.play().catch(err => console.error('Audio play error:', err));
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
          }
          if (stabatas.t8m1) {
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

  getSLadderWU(): void {
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

  r5m1Showc: boolean = false;
  r5m2Showc: boolean = false;

  r6m1Showc: boolean = false;
  r6m2Showc: boolean = false;

  r7m1Showc: boolean = false;
  r7m2Showc: boolean = false;

  r8m1Showc: boolean = false;
  r8m2Showc: boolean = false;

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

  r5m1RestShowc: boolean = false;
  r5m2RestShowc: boolean = false;

  r6m1RestShowc: boolean = false;
  r6m2RestShowc: boolean = false;

  r7m1RestShowc: boolean = false;
  r7m2RestShowc: boolean = false;

  r8m1RestShowc: boolean = false;
  r8m2RestShowc: boolean = false;

  lFinishShowc: boolean = false;
  woddonec: boolean = false;

  ionContentClass: string = ''; // Property to hold the class for ion-content
  lococon: string = '';
  backbtnclr: string = '';
  // Logic to determine the class based on variables
  getIonContentClass(): void {
    if (this.cdr1m1Showc) {
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
      this.backbtnclr = 'backbtnclrG';
    } else if (this.r1RestShowc) {
      this.ionContentClass = 'blue-content';
      this.backbtnclr = 'backbtnclrB';
      this.lococon = 'logocona';
    } else if (this.r1m2Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r1m2RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r1m3Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r1m3RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r2m1Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r2m1RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r2m2Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r2m2RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r2m3Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r2m3RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } //r3
    else if (this.r3m1Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r3m1RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r3m2Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r3m2RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r3m3Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r3m3RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    }
    //r4
    else if (this.r4m1Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r4m1RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r4m2Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r4m2RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r4m3Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r4m3RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.woddonec) {
      this.ionContentClass = 'home-content';
      this.lococon = 'logoconc';
    } else if (this.lFinishShowc) {
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    }
    //t5
    else if (this.r5m1Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r5m1RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r5m2Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r5m2RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r6m1Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r6m1RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r6m2Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r6m2RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r7m1Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r7m1RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r7m2Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r7m2RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r8m1Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r8m1RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    } else if (this.r8m2Showc) {
      this.backbtnclr = 'backbtnclrG';
      this.ionContentClass = 'red-content';
      this.lococon = 'logocon';
    } else if (this.r8m2RestShowc) {
      this.backbtnclr = 'backbtnclrB';
      this.ionContentClass = 'blue-content';
      this.lococon = 'logocona';
    }
  }
  updateIonContentClass() {
    // Method to update the ion-content class based on variables
    this.getIonContentClass();
    // Apply ion-content class or update a property bound to ngClass in the template
  }
  playSound() {
    this.audio
      .play()
      .then(() => {
        console.log('Audio is playing');
      })
      .catch((error) => {
        console.log('Error playing audio', error);
      });
  }

  playbeep() {
    this.beepmp3
      .play()
      .then(() => {
        console.log('Audio is playing');
      })
      .catch((error) => {
        console.log('Error playing audio', error);
      });
  }
  playSound2() {
    this.audio2
      .play()
      .then(() => {
        console.log('Audio is playing');
      })
      .catch((error) => {
        console.log('Error playing audio', error);
      });
  }
  playrest() {
    this.restmp3
      .play()
      .then(() => {
        console.log('Audio is playing');
      })
      .catch((error) => {
        console.log('Error playing audio', error);
      });
  }
  playrest2() {
    this.rest2mp3
      .play()
      .then(() => {
        console.log('Audio is playing');
      })
      .catch((error) => {
        console.log('Error playing audio', error);
      });
  }
  playfin() {
    this.finmp3
      .play()
      .then(() => {
        console.log('Audio is playing');
      })
      .catch((error) => {
        console.log('Error playing audio', error);
      });
  }
  playdon() {
    this.donmp3
      .play()
      .then(() => {
        console.log('Audio is playing');
      })
      .catch((error) => {
        console.log('Error playing audio', error);
      });
  }

  stopAllSounds() {
    const sounds = [this.audio, this.beepmp3, this.audio2, this.restmp3, this.rest2mp3, this.finmp3, this.donmp3];

    sounds.forEach((sound) => {
      if (sound && !sound.paused) {
        sound.pause();
        sound.currentTime = 0;  // Reset the audio to the beginning
        console.log('Audio stopped');
      }
    });

    
  }
  stopAllTimers() {
    // Clear all interval timers
    if (this.cdr1m1Intval) {
      clearInterval(this.cdr1m1Intval);
      this.cdr1m1Intval = null;
    }
    if (this.cdr1m2Intval) {
      clearInterval(this.cdr1m2Intval);
      this.cdr1m2Intval = null;
    }

    if (this.cdr1m3Intval) {
      clearInterval(this.cdr1m3Intval);
      this.cdr1m3Intval = null;
    }



    if (this.cdr2m1Intval) {
      clearInterval(this.cdr2m1Intval);
      this.cdr2m1Intval = null;
    }
    if (this.cdr2m2Intval) {
      clearInterval(this.cdr2m2Intval);
      this.cdr2m2Intval = null;
    }

    if (this.cdr2m3Intval) {
      clearInterval(this.cdr2m3Intval);
      this.cdr2m3Intval = null;
    }


    if (this.cdr3m1Intval) {
      clearInterval(this.cdr3m1Intval);
      this.cdr3m1Intval = null;
    }
    if (this.cdr3m2Intval) {
      clearInterval(this.cdr3m2Intval);
      this.cdr3m2Intval = null;
    }

    if (this.cdr3m3Intval) {
      clearInterval(this.cdr3m3Intval);
      this.cdr3m3Intval = null;
    }


    if (this.cdr4m1Intval) {
      clearInterval(this.cdr4m1Intval);
      this.cdr4m1Intval = null;
    }
    if (this.cdr4m2Intval) {
      clearInterval(this.cdr4m2Intval);
      this.cdr4m2Intval = null;
    }

    if (this.cdr4m3Intval) {
      clearInterval(this.cdr4m3Intval);
      this.cdr4m3Intval = null;
    }

    if (this.cdr5m1Intval) {
      clearInterval(this.cdr5m1Intval);
      this.cdr5m1Intval = null;
    }
    if (this.cdr5m2Intval) {
      clearInterval(this.cdr5m2Intval);
      this.cdr5m2Intval = null;
    }
    if (this.cdr6m1Intval) {
      clearInterval(this.cdr6m1Intval);
      this.cdr6m1Intval = null;
    }
    if (this.cdr6m2Intval) {
      clearInterval(this.cdr6m2Intval);
      this.cdr6m2Intval = null;
    }
    if (this.cdr7m1Intval) {
      clearInterval(this.cdr7m1Intval);
      this.cdr7m1Intval = null;
    }
    if (this.cdr7m2Intval) {
      clearInterval(this.cdr7m2Intval);
      this.cdr7m2Intval = null;
    }
    if (this.cdr8m1Intval) {
      clearInterval(this.cdr8m1Intval);
      this.cdr8m1Intval = null;
    }
    if (this.cdr8m2Intval) {
      clearInterval(this.cdr8m2Intval);
      this.cdr8m2Intval = null;
    }

    // Reset countdown variables
    this.cd5Sec = undefined;
    this.r2cd5Sec = undefined;
    this.r3cd5Sec = undefined;
    this.r4cd5Sec = undefined;
    this.r5cd5Sec = undefined;
    this.r6cd5Sec = undefined;
    this.r7cd5Sec = undefined;
    this.r8cd5Sec = undefined;
    this.cdr1m1Timer = undefined;
    this.cdr1m2Timer = undefined;
    this.cdr1m3Timer = undefined;
    this.cdr2m1Timer = undefined;
    this.cdr2m2Timer = undefined;
    this.cdr2m3Timer = undefined;
    this.cdr3m1Timer = undefined;
    this.cdr3m2Timer = undefined;
    this.cdr3m3Timer = undefined;
    this.cdr4m1Timer = undefined;
    this.cdr4m2Timer = undefined;
    this.cdr4m3Timer = undefined;
    this.cdr5m1Timer = undefined;
    this.cdr5m2Timer = undefined;
    this.cdr6m1Timer = undefined;
    this.cdr6m2Timer = undefined;
    this.cdr7m1Timer = undefined;
    this.cdr7m2Timer = undefined;
    this.cdr8m1Timer = undefined;
    this.cdr8m2Timer = undefined;


    // Reset all cards
    this.buttonDisabled = false;
    this.cd5SecShow = true;
    this.r2cd5SecShow = true
    this.r3cd5SecShow = true
    this.r4cd5SecShow = true
    this.r5cd5SecShow = true
    this.r6cd5SecShow = true
    this.r7cd5SecShow = true
    this.r8cd5SecShow = true
    this.srtbtnShow = true;
    this.r2srtbtnShow = true;
    this.r3srtbtnShow = true;
    this.r4srtbtnShow = true;
    this.r5srtbtnShow = true;
    this.r6srtbtnShow = true;
    this.r7srtbtnShow = true;
    this.r8srtbtnShow = true;
    this.r2m2lbl = false;
    this.r2m3lbl = false;
    this.r3m2lbl = false;
    this.r3m3lbl = false;
    this.r4m2lbl = false;
    this.r4m3lbl = false;
    this.ir2lbls = false;
    this.ir3lbls = false;
    this.ir4lbls = false;
    this.paddingApplied = false; // New flag to track the button click
    this.r3padapplied = false;
    this.r4padapplied = false;
    this.ivl1Counter = 1;
    this.ivl2Counter = 1;
    this.ivl3Counter = 1;
    this.ivl4Counter = 1;
    this.prepimg = true;
    this.wvid = false;
    this.intervallbls = false;
    this.t1prepimg = true;
    this.t1wvid = false;
    this.t2prepimg = true;
    this.t2wvid = false;
    this.t3prepimg = true;
    this.t3wvid = false;
    this.t4prepimg = true;
    this.t4wvid = false;
    this.tabatalbls = false;
    this.tabatapadding = false;
    this.t1m2lbl = false;
    this.t2m2lbl = false;
    this.t3m2lbl = false;
    this.t4m2lbl = false;
    this.t5m2lbl = false;
    this.t6m2lbl = false;
    this.t7m2lbl = false;
    this.t8m2lbl = false;
    this.isFinalTlbl = false;


    this.buttonText = 'Start Timer'; // Variable to control button text
    this.ogt1m2 = '';
    this.ogt2m2 = '';
    this.ogt3m2 = '';
    this.ogt4m2 = '';
    this.ogt5m2 = '';
    this.ogt6m2 = '';
    this.ogt7m2 = '';
    this.ogt8m2 = '';
    this.tb1Counter = 1;
    this.tb2Counter = 1;
    this.tb3Counter = 1;
    this.tb4Counter = 1;
    this.tb5Counter = 1;
    this.tb6Counter = 1;
    this.tb7Counter = 1;
    this.tb8Counter = 1;
    this.cdr1m1Show = true;
    this.cdr1m1Showc = true;
    this.r1m2Show = false;
    this.r1m2Showc = false;
    this.r1m3Show = false;
    this.r1m3Showc = false;
    this.r1m4Show = false;
    this.r2m1Show = false;
    this.r2m1Showc = false;
    this.r2m2Show = false;
    this.r2m2Showc = false;
    this.r2m3Show = false;
    this.r2m3Showc = false;
    this.r3m1Show = false;
    this.r3m1Showc = false;
    this.r3m2Show = false;
    this.r3m2Showc = false;
    this.r3m3Show = false;
    this.r3m3Showc = false;
    this.r4m1Show = false;
    this.r4m1Showc = false;
    this.r4m2Show = false;
    this.r4m2Showc = false;
    this.r4m3Show = false;
    this.r4m3Showc = false;
    this.r5m1Show = false;
    this.r5m1Showc = false;
    this.r5m2Show = false;
    this.r5m2Showc = false;
    this.r6m1Show = false;
    this.r6m1Showc = false;
    this.r6m2Show = false;
    this.r6m2Showc = false;
    this.r7m1Show = false;
    this.r7m1Showc = false;
    this.r7m2Show = false;
    this.r7m2Showc = false;
    this.r8m1Show = false;
    this.r8m1Showc = false;
    this.r8m2Show = false;
    this.r8m2Showc = false;
    this.r1RestShowc = false;
    this.r1m2RestShowc = false;
    this.r1m3RestShowc = false;
    this.r2m1RestShowc = false;
    this.r2m2RestShowc = false;
    this.r2m3RestShowc = false;
    this.r3m1RestShowc = false;
    this.r3m2RestShowc = false;
    this.r3m3RestShowc = false;
    this.r4m1RestShowc = false;
    this.r4m2RestShowc = false;
    this.r4m3RestShowc = false;
    this.r5m1RestShowc = false;
    this.r5m2RestShowc = false;
    this.r6m1RestShowc = false;
    this.r6m2RestShowc = false;
    this.r7m1RestShowc = false;
    this.r7m2RestShowc = false;
    this.r8m1RestShowc = false;
    this.r8m2RestShowc = false;
    this.isFinalIlbl = false;
    this.isPaused = false;
    this.donebtn = false;
    this.ladderlbls = true;
    this.lFinishShow = false;

    this.updateIonContentClass();

  }
  formatTimer(timer: number | undefined): string {
    if (timer === undefined) return "00:00";

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  donebtn = false;
  ladderlbls = true;
  lFinishShow = false;





  //interval timers___________________________________________________________________________________

  hasOtherLabels(): boolean {
    return this.specificWorkouts.some(
      (workout) => workout.r1m2 || workout.r1m3
    );
  }
  onlyR1m2Exists(): boolean {
    return this.specificWorkouts.some(
      (workout) => workout.r1m2 && !workout.r1m3
    );
  }
  r2haslbls(): boolean {
    return this.specificWorkouts.some(
      (workout) => workout.r2m2 || workout.r2m3
    );
  }
  onlyR2m2Exists(): boolean {
    return this.specificWorkouts.some(
      (workout) => workout.r2m2 && !workout.r2m3
    );
  }
  r3haslbls(): boolean {
    return this.specificWorkouts.some(
      (workout) => workout.r3m2 || workout.r3m3
    );
  }
  onlyR3m2Exists(): boolean {
    return this.specificWorkouts.some(
      (workout) => workout.r3m2 && !workout.r3m3
    );
  }
  r4haslbls(): boolean {
    return this.specificWorkouts.some(
      (workout) => workout.r4m2 || workout.r4m3
    );
  }
  onlyR4m2Exists(): boolean {
    return this.specificWorkouts.some(
      (workout) => workout.r4m2 && !workout.r4m3
    );
  }

  cd5Sec: number | undefined = undefined;
  buttonDisabled = false;
  cd5SecShow = true;
  srtbtnShow = true;
  prepimg: boolean = true;
  wvid: boolean = false;
  intervallbls = false;
  isFinalIlbl = false;
  ir2lbls = false;
  ir3lbls = false;
  ir4lbls = false;
  paddingApplied = false; // New flag to track the button click
  r3padapplied = false;
  r4padapplied = false;
  ivl1Counter: number = 1;
  ivl2Counter: number = 1;
  ivl3Counter: number = 1;
  ivl4Counter: number = 1;
  strt5SecTimer(specificWorkouts: Workout) {
    this.buttonDisabled = true; // Disable the button
    this.cd5Sec = 10;
    this.buttonText = 'GET READY!!!';
    this.srtbtnShow = true;
    this.cd5SecShow = true;
    this.intervallbls = true;
    this.paddingApplied = true;
    const timerInterval = setInterval(() => {
      if (this.cd5Sec !== undefined && this.cd5Sec > 0) {
        this.cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr1m1Timer(specificWorkouts);
        this.cd5SecShow = false;
        this.prepimg = false;
        this.wvid = true;
        this.srtbtnShow = false;
        this.buttonText = 'Start Timer';
        this.buttonDisabled = false;
      }
      // Play sound when countdown is 3 seconds
      if (this.cd5Sec === 3) {
        this.startSound.play();
      }
    }, 1000); // Update the 5-second countdown every second
  }
  // movment1 timer
  r1RestShow = false;
  cdr1m1Timer: number | undefined = undefined;
  cdr1m1Show = true;
  isPr1m1Timer: boolean = false;
  isRestPaused: boolean = false;
  remaincdr1m1: number | undefined = undefined;
  remaincdr1rest: number | undefined = undefined;
  cdr1m1Intval: any;
  isPaused: boolean = false; // Added variable to track whether the timer is paused
  r1m2lbl = false;
  r1m3lbl = false;
  strtr1m1Timer(specificWorkouts: Workout) {
   // this.stopAllSounds();
    if (specificWorkouts.r1move) {
      if (this.isPr1m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr1m1Timer = this.remaincdr1m1;
      } else if (this.cdr1m1Timer === undefined) {
        this.cdr1m1Timer = specificWorkouts.r1move;
      }

      this.cdr1m1Intval = setInterval(() => {
        if (!this.isPaused) {
          // Check if the timer is not paused
          if (this.cdr1m1Timer && this.cdr1m1Timer > 0) {
            this.remaincdr1m1 = this.cdr1m1Timer; // Store remaining time
            this.cdr1m1Timer--;
          } else {
            if (
              specificWorkouts.r1m2 != '' &&
              this.r1sets != specificWorkouts.r1sets
            ) {
              clearInterval(this.cdr1m1Intval);
              this.clearr1m1Cd();
              this.cdr1m1Show = false;
              this.r1RestShow = true;
              this.cdr1m1Showc = false;
              this.r1RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.startr1Rest(specificWorkouts);
            } else if (
              this.r1sets == specificWorkouts.r1sets &&
              specificWorkouts.r1m2 != ''
            ) {
              clearInterval(this.cdr1m1Intval);
              this.clearr1m1Cd();
              this.cdr1m1Show = false;
              this.r1RestShow = true;
              this.cdr1m1Showc = false;
              this.r1RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.startr1Rest(specificWorkouts);
            } else if (
              this.r1sets == specificWorkouts.r1sets && specificWorkouts.r1m2 == '' &&
              specificWorkouts.r2m1 != ''
            ) {
              clearInterval(this.cdr1m1Intval);
              this.clearr1m1Cd();
              this.cdr1m1Show = false;
              this.cdr1m1Showc = false;
              this.r2m1Show = true;
              this.r2m1Showc = true;
              this.prepimg = true;
              this.wvid = false;
              this.intervallbls = false;
              this.paddingApplied = false;
              this.buttonDisabled = false;
            } else if (
              specificWorkouts.r1m2 == '' &&
              this.r1sets != specificWorkouts.r1sets
            ) {
              clearInterval(this.cdr1m1Intval);
              this.clearr1m1Cd();
              this.cdr1m1Show = false;
              this.r1RestShow = true;
              this.cdr1m1Showc = false;
              this.r1RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.startr1Rest(specificWorkouts);
            } else {
              clearInterval(this.cdr1m1Intval);
              this.clearr1m1Cd();
              this.cdr1m1Show = false;
              this.r1RestShow = true;
              this.cdr1m1Showc = false;
              this.r1RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalIlbl = true;
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr1m1Timer !== undefined && this.cdr1m1Timer === 3) {
          this.halfwaySound.play();;
        }
      }, 1000);
    }
  }

  togglePauseResume() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.videoElement.nativeElement.pause();
    } else {
      this.videoElement.nativeElement.play();
    }
  }
  togglePauseTimer() {
    this.isRestPaused = !this.isRestPaused;
  }
  // Add a pause and resume button in your template and call the toggle function

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
    this.stopAllSounds();
    if (specificWorkouts.r1rest) {
      if (this.isRestPaused) {
        this.cdr1Rest = this.remaincdr1rest;
      } else if (this.cdr1Rest === undefined) {
        this.cdr1Rest = specificWorkouts.r1rest;
      }

      this.cdir1Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr1Rest && this.cdr1Rest > 0) {
            // Store remaining time
            this.cdr1Rest--;
          } else {
            clearInterval(this.cdir1Rest);
            this.r1RestShowc = false;

            this.updateIonContentClass(); // Call a method to update the ion-content class
            this.clearcdr1rest();
            if (specificWorkouts.r1m2 !== '') {
              this.r1m2Show = true;
              this.r1RestShow = false;
              this.r1m2Showc = true;
              this.r1RestShowc = false;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.cdr1m2Show = true;
              this.strtr1m2Timer(specificWorkouts);
              this.buttonDisabled = true;
              this.srtbtn2Show = false;
            } else {
              if (this.r1sets !== specificWorkouts.r1sets) {
                this.r1sets++;
                this.ivl1Counter++;
                this.r1RestShow = false;
                this.cdr1m1Show = true;
                this.srtbtnShow = false;
                this.srtbtn2Show = true;
                this.buttonDisabled = false;

                this.cdr1m1Showc = true;
                this.updateIonContentClass(); // Call a method to update the ion-content class
                this.strtr1m1Timer(specificWorkouts);
              } else {
                if (specificWorkouts.r2m1 !== '') {
                  this.r2m1Show = true;
                  this.r1RestShow = false;
                  // Call a method to update the ion-content class
                  this.r2m1Showc = true;
                  this.r1RestShowc = false;
                  this.updateIonContentClass();
                  this.srtbtn2Show = false;
                  this.prepimg = true;
                  this.wvid = false;
                  this.cdr2m1Show = true;
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                }
              }
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr1Rest === 3) {
          this.halfwaySound.play();
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
    this.stopAllSounds();
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
    //this.stopAllSounds();
    if (specificWorkouts.r1move) {
      if (this.isPr1m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr1m2Timer = this.remaincdr1m2;
      } else if (this.cdr1m2Timer === undefined) {
        this.cdr1m2Timer = specificWorkouts.r1move;
      }
      this.cdr1m2Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr1m2Timer && this.cdr1m2Timer > 0) {
            this.remaincdr1m2 = this.cdr1m2Timer; // Store remaining time
            this.cdr1m2Timer--;
          } else {
            if (
              specificWorkouts.r1m3 != '' &&
              this.r1sets != specificWorkouts.r1sets
            ) {
              clearInterval(this.cdr1m2Intval);
              this.clearr1m2Cd();

              this.r1m2Show = false;
              this.r1m2RestShow = true;
              this.r1m2Showc = false;
              this.r1m2RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.startr1m2Rest(specificWorkouts);
            } else if (
              this.r1sets == specificWorkouts.r1sets &&
              specificWorkouts.r1m3 != ''
            ) {
              clearInterval(this.cdr1m1Intval);
              this.clearr1m2Cd();
              this.r1m2Show = false;
              this.r1m2RestShow = true;
              this.r1m2Showc = false;
              this.r1m2RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.startr1m2Rest(specificWorkouts);
            } else if (
              this.r1sets == specificWorkouts.r1sets &&
              specificWorkouts.r1m3 == '' &&
              specificWorkouts.r2m1 != ''
            ) {
              clearInterval(this.cdr1m2Intval);
              this.clearr1m2Cd();
              this.r1m2Showc = false;
              this.r1m2Show = false;
              this.r2m1Showc = true;
              this.r2m1Show = true;
              this.prepimg = true;
              this.wvid = false;
              this.intervallbls = false;
              this.paddingApplied = false;
              this.buttonDisabled = false;
            } else if (
              specificWorkouts.r1m3 == '' &&
              this.r1sets != specificWorkouts.r1sets
            ) {
              clearInterval(this.cdr1m2Intval);
              this.clearr1m2Cd();
              this.r1m2Show = false;
              this.r1m2RestShow = true;
              this.r1m2Showc = false;
              this.r1m2RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.startr1m2Rest(specificWorkouts);
            } else {
              clearInterval(this.cdr1m2Intval);
              this.clearr1m2Cd();
              this.r1m2Showc = false;
              this.r1m2Show = false;
              this.r1m2RestShow = true;
              this.r1m2RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalIlbl = true;
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr1m2Timer === 3) {
          this.halfwaySound.play();
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
    this.stopAllSounds();
    if (specificWorkouts.r1rest) {
      if (this.isRestPaused) {
        this.cdr1m2Rest = this.remaincdr1rest;
      } else if (this.cdr1m2Rest === undefined) {
        this.cdr1m2Rest = specificWorkouts.r1rest;
      }

      this.cdir1m2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr1m2Rest && this.cdr1m2Rest > 0) {
            // Store remaining time
            this.cdr1m2Rest--;
          } else {
            clearInterval(this.cdir1m2Rest);
            this.r1m2RestShowc = false;

            this.updateIonContentClass(); // Call a method to update the ion-content class
            this.clearcdr1m2rest();
            if (specificWorkouts.r1m3 !== '') {
              this.r1m3Show = true;
              this.r1m2RestShow = false;
              this.r1m3Showc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.cdr1m3Show = true;
              this.strtr1m3Timer(specificWorkouts);
              this.buttonDisabled = true;
              this.srtbtn3Show = false;
            } else {
              if (this.r1sets !== specificWorkouts.r1sets) {
                this.r1sets++;
                this.ivl1Counter++;
                this.r1m2RestShow = false;
                this.cdr1m1Show = true;
                this.srtbtnShow = false;
                this.srtbtn2Show = true;
                this.buttonDisabled = false;
                this.cdr1m1Show = true;
                this.cdr1m1Showc = true;
                this.updateIonContentClass(); // Call a method to update the ion-content class
                this.strtr1m1Timer(specificWorkouts);
              } else {
                if (specificWorkouts.r2m1 !== '') {
                  this.r2m1Show = true;
                  this.r1m2RestShow = false;
                  this.r2m1Showc = true;
                  this.prepimg = true;
                  this.wvid = false;
                  this.buttonDisabled = false;
                  this.r1m2RestShowc = false;
                  this.updateIonContentClass(); // Call a method to update the ion-content class
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                }
              }
            }
          }
        } // Play sound when countdown is 3 seconds
        if (this.cdr1m2Rest === 3) {
          this.halfwaySound.play();
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
    //this.stopAllSounds();
    if (specificWorkouts.r1move) {
      if (this.isPr1m3Timer) {
        // Resume the countdown with the remaining time
        this.cdr1m3Timer = this.remaincdr1m3;
      } else if (this.cdr1m3Timer === undefined) {
        this.cdr1m3Timer = specificWorkouts.r1move;
      }
      this.cdr1m3Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr1m3Timer && this.cdr1m3Timer > 0) {
            this.remaincdr1m3 = this.cdr1m3Timer; // Store remaining time
            this.cdr1m3Timer--;
          } else {
            if (this.r1sets != specificWorkouts.r1sets
            ) {
              clearInterval(this.cdr1m3Intval);
              this.clearr1m3Cd();

              this.r1m3Show = false;
              this.r1m3RestShow = true;
              this.r1m3Showc = false;
              this.r1m3RestShowc = true;
              this.updateIonContentClass();

              this.startr1m3Rest(specificWorkouts);
            }
            else if (
              this.r1sets == specificWorkouts.r1sets &&
              specificWorkouts.r2m1 != ''
            ) {
              clearInterval(this.cdr1m3Intval);
              this.clearr1m3Cd();
              this.r1m3Show = false;
              this.r1m3Showc = false;
              this.r2m1Show = true;
              this.r2m1Showc = true;
              this.prepimg = true;
              this.wvid = false;
              this.intervallbls = false;
              this.paddingApplied = false;
              this.buttonDisabled = false;
            } else {
              this.endSound.play();
              clearInterval(this.cdr1m3Intval);
              this.clearr1m3Cd();
              this.r1m3Show = false;
              this.r1m3Showc = false;
              this.r1m3RestShow = true;
              this.r1m3RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.isFinalIlbl = true;
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr1m3Timer === 3) {
          this.halfwaySound.play();
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
    this.stopAllSounds();
    if (specificWorkouts.r1rest) {
      if (this.isRestPaused) {
        this.cdr1m3Rest = this.remaincdr1rest;
      } else if (this.cdr1m3Rest === undefined) {
        this.cdr1m3Rest = specificWorkouts.r1rest;
      }

      this.cdir1m3Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr1m3Rest && this.cdr1m3Rest > 0) {
            // Store remaining time
            this.cdr1m3Rest--;
          } else {
            clearInterval(this.cdir1m3Rest);
            this.r1m3RestShowc = false;

            this.updateIonContentClass(); // Call a method to update the ion-content class
            this.clearcdr1m3rest();

            if (this.r1sets !== specificWorkouts.r1sets) {
              this.r1sets++;
              this.ivl1Counter++;
              this.r1m3RestShow = false;
              this.cdr1m1Show = true;
              this.cdr1m2Show = true;
              this.srtbtn3Show = true;
              this.srtbtn2Show = true;
              this.srtbtnShow = false;
              this.buttonDisabled = true;
              this.cdr1m3Show = false;
              this.cdr1m1Showc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.cdr1m1Show = true;
              this.strtr1m1Timer(specificWorkouts);
            } else {
              if (specificWorkouts.r2m1 !== '') {
                this.r2m1Show = true;
                this.r1m3RestShow = false;
                this.r2m1Showc = true;
                this.prepimg = true;
                this.wvid = false;
                this.buttonDisabled = false;
                this.r1m3RestShowc = false;
                this.updateIonContentClass(); // Call a method to update the ion-content class
              } else {
                this.r4m3restlbl = false;
                this.r4m3restfinbtn = true;
                this.endSound.play();
              }
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr1m3Rest === 3) {
          this.halfwaySound.play();
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
  r2m2lbl = false;
  r2m3lbl = false;
  r2strt5SecTimer(specificWorkouts: Workout) {
    this.stopAllSounds();
    this.buttonDisabled = true; // Disable the button
    this.r2cd5Sec = 10;
    this.r2srtbtnShow = true;
    this.r2cd5SecShow = true;
    this.intervallbls = true;
    this.paddingApplied = true;

    this.buttonText = 'GET READY!!!';
    const timerInterval = setInterval(() => {
      if (this.r2cd5Sec !== undefined && this.r2cd5Sec > 0) {
        this.r2cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr2m1Timer(specificWorkouts);
        this.r2cd5SecShow = false;
        this.prepimg = false;
        this.wvid = true;
        this.r2srtbtnShow = false;
        this.cdr2m1Show = true;
        this.buttonText = 'Start Timer';
      }
      // Play sound when countdown is 3 seconds
      if (this.r2cd5Sec === 3) {
        this.startSound.play();
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
   // this.stopAllSounds();
    if (specificWorkouts.r2move) {
      if (this.isPr2m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr2m1Timer = this.remaincdr2m1;
      } else if (this.cdr2m1Timer === undefined) {
        this.cdr2m1Timer = specificWorkouts.r2move;
      }
      this.cdr2m1Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr2m1Timer && this.cdr2m1Timer > 0) {
            this.remaincdr2m1 = this.cdr2m1Timer; // Store remaining time
            this.cdr2m1Timer--;
          } else {
            if (
              specificWorkouts.r2m2 != '' &&
              this.r2sets != specificWorkouts.r2sets
            ) {
              clearInterval(this.cdr2m1Intval);
              this.clearr2m1Cd();
              this.r2m1Show = false;
              this.r2RestShow = true;
              this.r2m1Showc = false;
              this.r2m1RestShowc = true;
              this.updateIonContentClass();
              this.startr2Rest(specificWorkouts);
            } else if (
              this.r2sets == specificWorkouts.r2sets &&
              specificWorkouts.r2m2 != ''
            ) {
              clearInterval(this.cdr2m1Intval);
              this.clearr2m1Cd();
              this.r2m1Show = false;
              this.r2RestShow = true;
              this.r2m1Showc = false;
              this.r2m1RestShowc = true;
              this.updateIonContentClass();
              this.startr2Rest(specificWorkouts);
            } else if (
              this.r2sets == specificWorkouts.r2sets && specificWorkouts.r2m2 == '' &&
              specificWorkouts.r3m1 != ''
            ) {
              clearInterval(this.cdr2m1Intval);
              this.clearr2m1Cd();
              this.r2m1Show = false;
              this.r2m1Showc = false;
              this.r3m1Show = true;
              this.r3m1Showc = true;
              this.prepimg = true;
              this.wvid = false;
              this.intervallbls = false;
              this.paddingApplied = false;
              this.buttonDisabled = false;
            } else if (
              specificWorkouts.r2m2 == '' &&
              this.r2sets != specificWorkouts.r2sets
            ) {
              clearInterval(this.cdr2m1Intval);
              this.clearr2m1Cd();
              this.r2m1Show = false;
              this.r2RestShow = true;
              this.r2m1Showc = false;
              this.r2m1RestShowc = true;
              this.updateIonContentClass();
              this.startr2Rest(specificWorkouts);
            } else {
              clearInterval(this.cdr2m1Intval);
              this.clearr2m1Cd();
              this.r2RestShow = true;
              this.r2m1RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalIlbl = true;
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr2m1Timer === 3) {
          this.halfwaySound.play();
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
    this.stopAllSounds();
    if (specificWorkouts.r2rest) {
      if (this.isRestPaused) {
        this.cdr2Rest = this.remaincdr1rest;
      } else if (this.cdr2Rest === undefined) {
        this.cdr2Rest = specificWorkouts.r2rest;
      }

      this.cdir2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr2Rest && this.cdr2Rest > 0) {
            // Store remaining time
            this.cdr2Rest--;
          } else {
            clearInterval(this.cdir2Rest); // Use cdir2Rest, not cdr2Rest
            this.r2m1RestShowc = false;

            this.updateIonContentClass(); // Call a method to update the ion-content class
            this.clearcdr2rest();
            if (specificWorkouts.r2m2 !== '') {
              this.r2RestShow = false;
              this.r2m2Show = true;
              this.r2m2Showc = true;
              this.r2m1RestShowc = false;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.cdr2m2Show = true;
              this.strtr2m2Timer(specificWorkouts);
              this.buttonDisabled = true;
              this.r2m2srtbtnShow = false;
            } else {
              if (this.r2sets !== specificWorkouts.r2sets) {
                this.playrest2();
                this.r2sets++;
                this.ivl2Counter++;
                this.r2RestShow = false;
                this.r2m1Show = true;
                this.r2srtbtnShow = false;
                this.buttonDisabled = false;

                this.buttonDisabled = false;
                this.r2m1Showc = true;
                this.updateIonContentClass();
                this.cdr2m1Show = true;
                this.strtr2m1Timer(specificWorkouts);
              } else {
                if (specificWorkouts.r3m1 !== '') {
                  this.ir2lbls = false;
                  this.paddingApplied = false;
                  this.r3m1Show = true;
                  this.r2RestShow = false;
                  this.updateIonContentClass(); // Call a method to update the ion-content class
                  this.r3m1Showc = true;
                  this.updateIonContentClass();
                  this.r2m1RestShowc = false;
                  this.prepimg = true;
                  this.wvid = false;
                  this.buttonDisabled = false;
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                }
              }
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr2Rest === 3) {
          this.halfwaySound.play();
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
    //this.stopAllSounds();
    if (specificWorkouts.r2move) {
      if (this.isPr2m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr2m2Timer = this.remaincdr2m2;
      } else if (this.cdr2m2Timer === undefined) {
        this.cdr2m2Timer = specificWorkouts.r2move;
      }
      this.cdr2m2Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr2m2Timer && this.cdr2m2Timer > 0) {
            this.remaincdr2m2 = this.cdr2m2Timer; // Store remaining time
            this.cdr2m2Timer--;
          } else {
            if (
              specificWorkouts.r2m3 != '' &&
              this.r2sets != specificWorkouts.r2sets
            ) {
              clearInterval(this.cdr2m2Intval);
              this.clearr2m2Cd();
              this.r2m2Show = false;
              this.r2m2RestShow = true;
              this.r2m2Showc = false;
              this.r2m2RestShowc = true;
              this.updateIonContentClass();
              this.startr2m2Rest(specificWorkouts);
            } else if (
              this.r2sets == specificWorkouts.r2sets &&
              specificWorkouts.r2m3 != ''
            ) {
              clearInterval(this.cdr2m2Intval);
              this.clearr2m2Cd();
              this.r2m2Show = false;
              this.r2m2RestShow = true;
              this.r2m2Showc = false;
              this.r2m2RestShowc = true;
              this.updateIonContentClass();
              this.startr2m2Rest(specificWorkouts);
            } else if (
              this.r2sets == specificWorkouts.r2sets &&
              specificWorkouts.r2m3 == '' &&
              specificWorkouts.r3m1 != ''
            ) {
              clearInterval(this.cdr2m2Intval);
              this.clearr2m2Cd();
              this.r2m2Show = false;
              this.r2m2Showc = false;
              this.r3m1Show = true;
              this.r3m1Showc = true;
              this.prepimg = true;
              this.wvid = false;
              this.intervallbls = false;
              this.paddingApplied = false;
              this.buttonDisabled = false;
            } else if (
              specificWorkouts.r2m3 == '' &&
              this.r2sets != specificWorkouts.r2sets
            ) {
              clearInterval(this.cdr2m2Intval);
              this.clearr2m2Cd();
              this.r2m2Show = false;
              this.r2m2RestShow = true;
              this.r2m2Showc = false;
              this.r2m2RestShowc = true;
              this.updateIonContentClass();
              this.startr2m2Rest(specificWorkouts);
            } else {
              clearInterval(this.cdr2m2Intval);
              this.clearr2m2Cd();
              this.r2m2Show = false;
              this.r2m2Showc = false;
              this.r2m2RestShow = true;
              this.r2m2RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalIlbl = true;
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr2m2Timer === 3) {
          this.halfwaySound.play();
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
    this.stopAllSounds();
    if (specificWorkouts.r2rest) {
      if (this.isRestPaused) {
        this.cdr2m2Rest = this.remaincdr1rest;
      } else if (this.cdr2m2Rest === undefined) {
        this.cdr2m2Rest = specificWorkouts.r2rest;
      }

      this.cdir2m2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr2m2Rest && this.cdr2m2Rest > 0) {
            // Store remaining time
            this.cdr2m2Rest--;
          } else {
            clearInterval(this.cdir2m2Rest);
            this.r2m2RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr2m2rest();
            if (specificWorkouts.r2m3 !== '') {
              this.r2m3Show = true;
              this.r2m2RestShow = false;
              this.r2m3Showc = true;
              this.r2m2RestShowc = false;
              this.updateIonContentClass();
              this.cdr2m3Show = true;
              this.strtr2m3Timer(specificWorkouts);
              this.buttonDisabled = true;
              this.r2m3srtbtn3Show = false;
            } else {
              if (this.r2sets !== specificWorkouts.r2sets) {
                this.playrest2();
                this.r2sets++;
                this.ivl2Counter++;
                this.r2m2RestShow = false;
                this.r2m1Show = true;
                this.r2m1Showc = true;
                this.cdr2m1Show = true;
                this.r2srtbtnShow = false;
                this.r2m2srtbtnShow = true;
                this.buttonDisabled = false;

                this.cdr2m1Show = true;
                this.updateIonContentClass();
                this.cdr2m1Show = true;
                this.strtr2m1Timer(specificWorkouts);
              } else {
                if (specificWorkouts.r3m1 !== '') {
                  this.r3m1Show = true;
                  this.r2m2RestShow = false;
                  // Call a method to update the ion-content class
                  this.r3m1Showc = true;
                  this.r2m2RestShowc = false;
                  this.prepimg = true;
                  this.wvid = false;
                  this.buttonDisabled = false;
                  this.updateIonContentClass();
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                }
              }
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr2m2Rest === 3) {
          this.halfwaySound.play();
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
   // this.stopAllSounds();
    if (specificWorkouts.r2move) {
      if (this.isPr2m3Timer) {
        // Resume the countdown with the remaining time
        this.cdr2m3Timer = this.remaincdr2m3;
      } else if (this.cdr2m3Timer === undefined) {
        this.cdr2m3Timer = specificWorkouts.r2move;
      }
      this.cdr2m3Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr2m3Timer && this.cdr2m3Timer > 0) {
            this.remaincdr2m3 = this.cdr2m3Timer; // Store remaining time
            this.cdr2m3Timer--;
          } else {
            if (this.r2sets != specificWorkouts.r2sets
            ) {
              clearInterval(this.cdr2m3Intval);
              this.clearr2m3Cd();

              this.r2m3Show = false;
              this.r2m3RestShow = true;
              this.r2m3Showc = false;
              this.r2m3RestShowc = true;
              this.updateIonContentClass();
              this.startr2m3Rest(specificWorkouts);
            } else if (
              this.r2sets == specificWorkouts.r2sets &&
              specificWorkouts.r3m1 != ''
            ) {
              clearInterval(this.cdr2m3Intval);
              this.clearr2m3Cd();
              this.r2m3Show = false;
              this.r2m3Showc = false;
              this.r3m1Show = true;
              this.r3m1Showc = true;
              this.prepimg = true;
              this.wvid = false;
              this.intervallbls = false;
              this.paddingApplied = false;
              this.buttonDisabled = false;
            } else {
              clearInterval(this.cdr2m3Intval);
              this.clearr2m3Cd();
              this.r2m3Show = false;
              this.r2m3Showc = false;
              this.r2m3RestShow = true;
              this.r2m3RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalIlbl = true;
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr2m3Timer === 3) {
          this.halfwaySound.play();
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
    this.stopAllSounds();
    if (specificWorkouts.r2rest) {
      if (this.isRestPaused) {
        this.cdr2m3Rest = this.remaincdr1rest;
      } else if (this.cdr2Rest === undefined) {
        this.cdr2m3Rest = specificWorkouts.r2rest;
      }

      this.cdir2m3Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr2m3Rest && this.cdr2m3Rest > 0) {
            // Store remaining time
            this.cdr2m3Rest--;
          } else {
            clearInterval(this.cdir2m3Rest);
            this.r2m3RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr2m3rest();
            if (this.r2sets !== specificWorkouts.r2sets) {
              this.r2sets++;
              this.ivl2Counter++;
              this.r2m1Show = true;
              this.r2m3RestShow = false;
              this.cdr2m1Show = true;

              this.r2m3srtbtn3Show = false;
              this.r2m2srtbtnShow = false;
              this.r2srtbtnShow = false;
              this.buttonDisabled = true;
              this.cdr2m1Show = true;
              this.r2m1Showc = true;
              this.updateIonContentClass();
              this.cdr2m1Show = true;
              this.strtr2m1Timer(specificWorkouts);
            } else {
              if (specificWorkouts.r3m1 !== '') {
                this.r3m1Show = true;
                this.r2m3RestShow = false;
                // Call a method to update the ion-content class
                this.r3m1Showc = true;
                this.r2m3RestShowc = false;
                this.prepimg = true;
                this.wvid = false;
                this.buttonDisabled = false;
                this.updateIonContentClass();
              } else {
                this.r4m3restlbl = false;
                this.r4m3restfinbtn = true;
                this.endSound.play();
              }
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr2m3Rest === 3) {
          this.halfwaySound.play();
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
  r3m2lbl = false;
  r3m3lbl = false;
  r3strt5SecTimer(specificWorkouts: Workout) {
    this.stopAllSounds();
    this.buttonDisabled = true; // Disable the button
    this.r3cd5Sec = 10;
    this.r3srtbtnShow = true;
    this.r3cd5SecShow = true;
    this.intervallbls = true;
    this.paddingApplied = true;
    this.buttonText = 'GET READY!!!';
    const timerInterval = setInterval(() => {
      if (this.r3cd5Sec !== undefined && this.r3cd5Sec > 0) {
        this.r3cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr3m1Timer(specificWorkouts);
        this.r3cd5SecShow = false;
        this.prepimg = false;
        this.wvid = true;
        this.r3srtbtnShow = false;
        this.buttonText = 'Start Timer';
      }
      // Play sound when countdown is 3 seconds
      if (this.r3cd5Sec === 3) {
        this.startSound.play();
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
    //this.stopAllSounds();
    if (specificWorkouts.r3move) {
      if (this.isPr3m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr3m1Timer = this.remaincdr3m1;
      } else if (this.cdr3m1Timer === undefined) {
        this.cdr3m1Timer = specificWorkouts.r3move;
      }
      this.cdr3m1Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr3m1Timer && this.cdr3m1Timer > 0) {
            this.remaincdr3m1 = this.cdr3m1Timer; // Store remaining time
            this.cdr3m1Timer--;
          } else {
            if (
              specificWorkouts.r3m2 != '' &&
              this.r3sets != specificWorkouts.r3sets
            ) {
              clearInterval(this.cdr3m1Intval);
              this.clearr3m1Cd();
              this.r3m1Show = false;
              this.r3RestShow = true;
              this.r3m1Showc = false;
              this.r3m1RestShowc = true;
              this.updateIonContentClass();
              this.startr3Rest(specificWorkouts);
            } else if (
              this.r3sets == specificWorkouts.r3sets &&
              specificWorkouts.r3m2 != ''
            ) {
              clearInterval(this.cdr3m1Intval);
              this.clearr3m1Cd();
              this.r3m1Show = false;
              this.r3RestShow = true;
              this.r3m1Showc = false;
              this.r3m1RestShowc = true;
              this.updateIonContentClass();
              this.startr3Rest(specificWorkouts);
            } else if (
              this.r3sets == specificWorkouts.r3sets && specificWorkouts.r3m2 == '' &&
              specificWorkouts.r4m1 != ''
            ) {
              clearInterval(this.cdr3m1Intval);
              this.clearr3m1Cd();
              this.r3m1Show = false;
              this.r3m1Showc = false;
              this.r4m1Show = true;
              this.r4m1Showc = true;
              this.prepimg = true;
              this.wvid = false;
              this.intervallbls = false;
              this.paddingApplied = false;
              this.buttonDisabled = false;
            } else if (
              specificWorkouts.r3m2 == '' &&
              this.r3sets != specificWorkouts.r3sets
            ) {
              clearInterval(this.cdr3m1Intval);
              this.clearr3m1Cd();
              this.r3m1Show = false;
              this.r3RestShow = true;
              this.r3m1Showc = false;
              this.r3m1RestShowc = true;
              this.updateIonContentClass();
              this.startr3Rest(specificWorkouts);
            } else {
              clearInterval(this.cdr3m1Intval);
              this.clearr3m1Cd();
              this.r3m1Show = false;
              this.r3RestShow = true;
              this.r3m1Showc = false;
              this.r3m1RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalIlbl = true;
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr3m1Timer === 3) {
          this.halfwaySound.play();
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
    this.stopAllSounds();
    if (specificWorkouts.r3rest) {
      if (this.isRestPaused) {
        this.cdr3Rest = this.remaincdr1rest;
      } else if (this.cdr3Rest === undefined) {
        this.cdr3Rest = specificWorkouts.r3rest;
      }

      this.cdir3Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr3Rest && this.cdr3Rest > 0) {
            // Store remaining time
            this.cdr3Rest--;
          } else {
            clearInterval(this.cdr3Rest);
            this.r3m1RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr3rest();
            if (specificWorkouts.r3m2 !== '') {
              this.r3RestShow = false;
              this.r3m2Show = true;
              this.r3m2Showc = true;
              this.cdr3m2Show = true;
              this.r3m1RestShowc = false;
              this.updateIonContentClass();
              this.strtr3m2Timer(specificWorkouts);
              this.buttonDisabled = true;
              this.r3m2srtbtnShow = false;
            } else {
              if (this.r3sets !== specificWorkouts.r3sets) {
                this.r3sets++;
                this.ivl3Counter++;
                this.r3RestShow = false;
                this.r3m1Show = true;
                this.r3srtbtnShow = false;
                this.buttonDisabled = true;
                this.r3m2srtbtnShow = false;
                this.buttonDisabled = true;
                this.r3m1Showc = true;
                this.updateIonContentClass();
                this.strtr3m1Timer(specificWorkouts);
                this.cdr3m1Show = true;
              } else {
                if (specificWorkouts.r4m1 !== '') {
                  this.ir3lbls = false;
                  this.r3padapplied = false;
                  this.r4m1Show = true;
                  this.r3RestShow = false;
                  this.r4m1Showc = true;
                  this.r3m1RestShowc = false;
                  this.prepimg = true;
                  this.wvid = false;
                  this.buttonDisabled = false;
                  this.updateIonContentClass(); // Call a method to update the ion-content class
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                }
              }
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr3Rest === 3) {
          this.halfwaySound.play();
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
    //this.stopAllSounds();
    if (specificWorkouts.r3move) {
      if (this.isPr3m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr3m2Timer = this.remaincdr3m2;
      } else if (this.cdr3m2Timer === undefined) {
        this.cdr3m2Timer = specificWorkouts.r3move;
      }
      this.cdr3m2Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr3m2Timer && this.cdr3m2Timer > 0) {
            this.remaincdr3m2 = this.cdr3m2Timer; // Store remaining time
            this.cdr3m2Timer--;
          } else {
            if (
              specificWorkouts.r3m3 != '' &&
              this.r3sets != specificWorkouts.r3sets
            ) {
              clearInterval(this.cdr3m2Intval);
              this.clearr3m2Cd();

              this.r3m2Show = false;
              this.r3m2RestShow = true;
              this.r3m2Showc = false;
              this.r3m2RestShowc = true;
              this.updateIonContentClass();
              this.startr3m2Rest(specificWorkouts);
            } else if (
              this.r3sets == specificWorkouts.r3sets &&
              specificWorkouts.r3m3 != ''
            ) {
              clearInterval(this.cdr3m2Intval);
              this.clearr3m2Cd();

              this.r3m2Show = false;
              this.r3m2RestShow = true;
              this.r3m2Showc = false;
              this.r3m2RestShowc = true;
              this.updateIonContentClass();
              this.startr3m2Rest(specificWorkouts);
            } else if (
              this.r3sets == specificWorkouts.r3sets &&
              specificWorkouts.r3m3 == '' &&
              specificWorkouts.r4m1 != ''
            ) {
              clearInterval(this.cdr3m2Intval);
              this.clearr3m2Cd();
              this.r3m2Show = false;
              this.r3m2Showc = false;
              this.r4m1Show = true;
              this.r4m1Showc = true;
              this.prepimg = true;
              this.wvid = false;
              this.intervallbls = false;
              this.paddingApplied = false;
              this.buttonDisabled = false;
            } else if (
              specificWorkouts.r3m3 == '' &&
              this.r3sets != specificWorkouts.r3sets
            ) {
              clearInterval(this.cdr3m2Intval);
              this.clearr3m2Cd();

              this.r3m2Show = false;
              this.r3m2RestShow = true;
              this.r3m2Showc = false;
              this.r3m2RestShowc = true;
              this.updateIonContentClass();
              this.startr3m2Rest(specificWorkouts);
            } else {
              clearInterval(this.cdr3m2Intval);
              this.clearr3m2Cd();
              this.r3m2Show = false;
              this.r3m2Showc = false;
              this.r3m2RestShow = true;
              this.r3m2RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalIlbl = true;
            }

          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr3m2Timer === 3) {
          this.halfwaySound.play();
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
    this.stopAllSounds();
    if (specificWorkouts.r3rest) {
      if (this.isRestPaused) {
        this.cdr3m2Rest = this.remaincdr1rest;
      } else if (this.cdr3m2Rest === undefined) {
        this.cdr3m2Rest = specificWorkouts.r3rest;
      }

      this.cdir3m2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr3m2Rest && this.cdr3m2Rest > 0) {
            // Store remaining time
            this.cdr3m2Rest--;
          } else {
            clearInterval(this.cdir3m2Rest);
            this.r3m2RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr3m2rest();
            if (specificWorkouts.r3m3 !== '') {
              this.r3m3Show = true;
              this.r3m2RestShow = false;
              this.r3m3Showc = true;
              this.r3m2RestShowc = false;
              this.updateIonContentClass();
              this.r3m3srtbtn3Show = false;
              this.cdr3m3Show = true;
              this.strtr3m3Timer(specificWorkouts);
            } else {
              if (this.r3sets !== specificWorkouts.r3sets) {
                this.r3sets++;
                this.ivl3Counter++;
                this.r3m2RestShow = false;
                this.r3m1Show = true;
                this.r3m2RestShowc = false;
                this.r3m1Showc = true;

                this.r3srtbtnShow = false;
                this.r3m2srtbtnShow = false;
                this.buttonDisabled = true;
                this.cdr3m1Show = true;
                this.strtr3m1Timer(specificWorkouts);
                this.updateIonContentClass();
              } else {
                if (specificWorkouts.r4m1 !== '') {
                  this.r4m1Show = true;
                  this.r3m2RestShow = false;
                  this.r4m1Showc = true;
                  this.r3m2RestShowc = false;
                  this.prepimg = true;
                  this.wvid = false;
                  this.buttonDisabled = false;
                  this.updateIonContentClass(); // Call a method to update the ion-content class
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                }
              }
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr3m2Rest === 3) {
          this.halfwaySound.play();
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
  //  this.stopAllSounds();
    if (specificWorkouts.r3move) {
      if (this.isPr3m3Timer) {
        // Resume the countdown with the remaining time
        this.cdr3m3Timer = this.remaincdr3m3;
      } else if (this.cdr3m3Timer === undefined) {
        this.cdr3m3Timer = specificWorkouts.r3move;
      }
      this.cdr3m3Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr3m3Timer && this.cdr3m3Timer > 0) {
            this.remaincdr3m3 = this.cdr3m3Timer; // Store remaining time
            this.cdr3m3Timer--;
          } else {
            if (this.r3sets != specificWorkouts.r3sets
            ) {
              clearInterval(this.cdr3m3Intval);
              this.clearr3m3Cd();
              this.r3m3Show = false;
              this.r3m3RestShow = true;
              this.r3m3Showc = false;
              this.r3m3RestShowc = true;
              this.updateIonContentClass();
              this.startr3m3Rest(specificWorkouts);
            } else if (
              this.r3sets == specificWorkouts.r3sets &&
              specificWorkouts.r4m1 != ''
            ) {
              clearInterval(this.cdr3m3Intval);
              this.clearr3m3Cd();
              this.r3m3Show = false;
              this.r3m3Showc = false;
              this.r4m1Show = true;
              this.r4m1Showc = true;
              this.prepimg = true;
              this.wvid = false;
              this.intervallbls = false;
              this.paddingApplied = false;
              this.buttonDisabled = false;
            } else {
              clearInterval(this.cdr3m3Intval);
              this.clearr3m3Cd();
              this.r3m3Show = false;
              this.r3m3Showc = false;
              this.r3m3RestShow = true;
              this.r3m3RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalIlbl = true;
            }

          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr3m3Timer === 3) {
          this.halfwaySound.play();
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
    this.stopAllSounds();
    if (specificWorkouts.r3rest) {
      if (this.isRestPaused) {
        this.cdr3m3Rest = this.remaincdr1rest;
      } else if (this.cdr3m3Rest === undefined) {
        this.cdr3m3Rest = specificWorkouts.r3rest;
      }

      this.cdir3m3Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr3m3Rest && this.cdr3m3Rest > 0) {
            // Store remaining time
            this.cdr3m3Rest--;
          } else {
            clearInterval(this.cdir3m3Rest);
            this.r3m3RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr3m3rest();
            if (this.r3sets !== specificWorkouts.r3sets) {
              this.r3sets++;
              this.ivl3Counter++;
              this.r3m1Show = true;
              this.r3m3RestShow = false;
              this.cdr3m1Show = true;
              this.r3m3srtbtn3Show = false;
              this.r3m2srtbtnShow = false;
              this.r3srtbtnShow = false;
              this.buttonDisabled = true;
              this.r3m1Showc = true;
              this.updateIonContentClass();
              this.strtr3m1Timer(specificWorkouts);
            } else {
              if (specificWorkouts.r4m1 !== '') {
                this.r4m1Show = true;
                this.r3m3RestShow = false;
                this.r4m1Showc = true;
                this.r3m3RestShowc = false;
                this.prepimg = true;
                this.wvid = false;
                this.buttonDisabled = false;
                this.updateIonContentClass();
              } else {
                this.r4m3restlbl = false;
                this.r4m3restfinbtn = true;
                this.endSound.play();
              }
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr3m3Rest === 3) {
          this.halfwaySound.play();
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
  r4m2lbl = false;
  r4m3lbl = false;
  r4strt5SecTimer(specificWorkouts: Workout) {
    this.stopAllSounds();
    this.buttonDisabled = true; // Disable the button
    this.r4cd5Sec = 10;
    this.r4srtbtnShow = true;
    this.r4cd5SecShow = true;
    this.intervallbls = true;
    this.paddingApplied = true;
    this.buttonText = 'GET READY!!!';
    const timerInterval = setInterval(() => {
      if (this.r4cd5Sec !== undefined && this.r4cd5Sec > 0) {
        this.r4cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr4m1Timer(specificWorkouts);
        this.r4cd5SecShow = false;
        this.prepimg = false;
        this.wvid = true;
        this.r4srtbtnShow = false;
        this.buttonText = 'Start Timer';
      }
      // Play sound when countdown is 3 seconds
      if (this.r4cd5Sec === 3) {
        this.startSound.play();
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
   // this.stopAllSounds();
    if (specificWorkouts.r4move) {
      if (this.isPr4m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr4m1Timer = this.remaincdr4m1;
      } else if (this.cdr4m1Timer === undefined) {
        this.cdr4m1Timer = specificWorkouts.r4move;
      }
      this.cdr4m1Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr4m1Timer && this.cdr4m1Timer > 0) {
            this.remaincdr4m1 = this.cdr4m1Timer; // Store remaining time
            this.cdr4m1Timer--;
          } else {
            if (
              specificWorkouts.r4m2 != '' &&
              this.r4sets != specificWorkouts.r4sets
            ) {
              clearInterval(this.cdr4m1Intval);
              this.clearr4m1Cd();

              this.r4m1Show = false;
              this.r4RestShow = true;
              this.r4m1Showc = false;
              this.r4m1RestShowc = true;
              this.updateIonContentClass();
              this.startr4Rest(specificWorkouts);
            } else if (
              this.r4sets == specificWorkouts.r4sets &&
              specificWorkouts.r4m2 != ''
            ) {
              clearInterval(this.cdr4m1Intval);
              this.clearr4m1Cd();

              this.r4m1Show = false;
              this.r4RestShow = true;
              this.r4m1Showc = false;
              this.r4m1RestShowc = true;
              this.updateIonContentClass();
              this.startr4Rest(specificWorkouts);
            } else if (
              specificWorkouts.r4m2 == '' &&
              this.r4sets != specificWorkouts.r4sets
            ) {
              clearInterval(this.cdr4m1Intval);
              this.clearr4m1Cd();

              this.r4m1Show = false;
              this.r4RestShow = true;
              this.r4m1Showc = false;
              this.r4m1RestShowc = true;
              this.updateIonContentClass();
              this.startr4Rest(specificWorkouts);
            } else {
              clearInterval(this.cdr4m1Intval);
              this.clearr4m1Cd();
              this.r4m1Show = false;
              this.r4RestShow = true;
              this.r4m1Showc = false;
              this.r4m1RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalIlbl = true;
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr4m1Timer === 3) {
          this.halfwaySound.play();
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
    this.stopAllSounds();
    if (specificWorkouts.r4rest) {
      if (this.isRestPaused) {
        this.cdr4Rest = this.remaincdr1rest;
      } else if (this.cdr4Rest === undefined) {
        this.cdr4Rest = specificWorkouts.r4rest;
      }

      this.cdir4Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr4Rest && this.cdr4Rest > 0) {
            // Store remaining time
            this.cdr4Rest--;
          } else {
            clearInterval(this.cdr4Rest);
            this.r4m1RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr4rest();
            if (specificWorkouts.r4m2 !== '') {
              this.r4RestShow = false;
              this.r4m2Show = true;
              this.r4m2Showc = true;
              this.r4m1RestShowc = false;
              this.updateIonContentClass();
              this.r4m2srtbtnShow = false;
              this.cdr4m2Show = true;
              this.strtr4m2Timer(specificWorkouts);
            } else {
              if (this.r4sets !== specificWorkouts.r4sets) {
                this.r4sets++;
                this.ivl4Counter++;
                this.r4RestShow = false;
                this.r4m1Show = true;
                this.r4m1Showc = true;
                this.cdr4m1Show = true;
                this.r4srtbtnShow = false;
                this.buttonDisabled = false;

                this.updateIonContentClass();
                this.strtr4m1Timer(specificWorkouts);
              } else {
                this.ir4lbls = false;
                this.r4padapplied = false;
                this.r4m3restlbl = false;
                this.r4m3restfinbtn = true;
                this.endSound.play();
              }
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr4Rest === 3) {
          this.halfwaySound.play();
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
  //  this.stopAllSounds();
    if (specificWorkouts.r4move) {
      if (this.isPr4m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr4m2Timer = this.remaincdr4m2;
      } else if (this.cdr4m2Timer === undefined) {
        this.cdr4m2Timer = specificWorkouts.r4move;
      }
      this.cdr4m2Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr4m2Timer && this.cdr4m2Timer > 0) {
            this.remaincdr4m2 = this.cdr4m2Timer; // Store remaining time
            this.cdr4m2Timer--;
          } else {
            if (
              specificWorkouts.r4m3 != '' &&
              this.r4sets != specificWorkouts.r4sets
            ) {
              clearInterval(this.cdr4m2Intval);
              this.clearr4m2Cd();

              this.r4m2Show = false;
              this.r4m2RestShow = true;
              this.r4m2Showc = false;
              this.r4m3srtbtn3Show = false;
              this.r4m2RestShowc = true;
              this.updateIonContentClass();
              this.startr4m2Rest(specificWorkouts);
            } else if (
              this.r4sets == specificWorkouts.r4sets &&
              specificWorkouts.r4m3 != ''
            ) {
              clearInterval(this.cdr4m2Intval);
              this.clearr4m2Cd();

              this.r4m2Show = false;
              this.r4m2RestShow = true;
              this.r4m2Showc = false;
              this.r4m3srtbtn3Show = false;
              this.r4m2RestShowc = true;
              this.updateIonContentClass();
              this.startr4m2Rest(specificWorkouts);
            } else if (
              specificWorkouts.r4m3 == '' &&
              this.r4sets != specificWorkouts.r4sets
            ) {
              clearInterval(this.cdr4m2Intval);
              this.clearr4m2Cd();

              this.r4m2Show = false;
              this.r4m2RestShow = true;
              this.r4m2Showc = false;
              this.r4m3srtbtn3Show = false;
              this.r4m2RestShowc = true;
              this.updateIonContentClass();
              this.startr4m2Rest(specificWorkouts);
            } else {
              clearInterval(this.cdr4m2Intval);
              this.clearr4m2Cd();
              this.r4m2Show = false;
              this.r4m2RestShow = true;
              this.r4m2RestShowc = true;
              this.r4m2Showc = false;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalIlbl = true;
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr4m2Timer === 3) {
          this.halfwaySound.play();
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
    this.stopAllSounds();
    if (specificWorkouts.r4rest) {
      if (this.isRestPaused) {
        this.cdr4m2Rest = this.remaincdr1rest;
      } else if (this.cdr4m2Rest === undefined) {
        this.cdr4m2Rest = specificWorkouts.r4rest;
      }

      this.cdir4m2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr4m2Rest && this.cdr4m2Rest > 0) {
            // Store remaining time
            this.cdr4m2Rest--;
          } else {
            clearInterval(this.cdir4m2Rest);
            this.r4m2RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr4m2rest();
            if (specificWorkouts.r4m3 !== '') {
              this.r4m3Show = true;
              this.r4m2RestShow = false;
              this.r4m3Showc = true;
              this.r4m2RestShowc = false;
              this.updateIonContentClass();
              this.cdr4m3Show = true;
              this.strtr4m3Timer(specificWorkouts);
            } else {
              if (this.r4sets !== specificWorkouts.r4sets) {
                this.r4sets++;
                this.ivl4Counter++;
                this.r4m2RestShow = false;
                this.r4m1Show = true;
                this.r4m1Showc = true;
                this.cdr4m1Show = true;
                this.r4srtbtnShow = false;
                this.r4m2srtbtnShow = false;

                this.buttonDisabled = false;
                this.cdr4m2Show = true;
                this.cdr4m3Show = true;
                this.updateIonContentClass();
                this.strtr4m1Timer(specificWorkouts);
              } else {
                this.r4m3restlbl = false;
                this.r4m3restfinbtn = true;
                this.endSound.play();
              }
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr4m2Rest === 3) {
          this.halfwaySound.play();
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
  //  this.stopAllSounds();
    if (specificWorkouts.r4move) {
      if (this.isPr4m3Timer) {
        // Resume the countdown with the remaining time
        this.cdr4m3Timer = this.remaincdr4m3;
      } else if (this.cdr4m3Timer === undefined) {
        this.cdr4m3Timer = specificWorkouts.r4move;
      }
      this.cdr4m3Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr4m3Timer && this.cdr4m3Timer > 0) {
            this.remaincdr4m3 = this.cdr4m3Timer; // Store remaining time
            this.cdr4m3Timer--;
          } else {
            if (this.r4sets != specificWorkouts.r4sets
            ) {
              clearInterval(this.cdr4m3Intval);

              this.clearr4m3Cd();

              this.r4m3Show = false;
              this.r4m3RestShow = true;
              this.r4m3Showc = false;
              this.r4m3RestShowc = true;
              this.updateIonContentClass();
              this.startr4m3Rest(specificWorkouts);
            } else {
              clearInterval(this.cdr4m3Intval);

              this.clearr4m3Cd();

              this.r4m3Show = false;
              this.r4m3RestShow = true;
              this.r4m3Showc = false;
              this.r4m3RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalIlbl = true;
            }

          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr4m3Timer === 3) {
          this.halfwaySound.play();
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
  r4m3restfinbtn = false;
  r4m3restlbl = true;
  startr4m3Rest(specificWorkouts: Workout) {
    this.stopAllSounds();
    if (specificWorkouts.r4rest) {
      if (this.isRestPaused) {
        this.cdr4m3Rest = this.remaincdr1rest;
      } else if (this.cdr4m3Rest === undefined) {
        this.cdr4m3Rest = specificWorkouts.r4rest;
      }

      this.cdir4m3Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr4m3Rest && this.cdr4m3Rest > 0) {
            // Store remaining time
            this.cdr4m3Rest--;
          } else {
            clearInterval(this.cdir4m3Rest);
            this.r4m3RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr4m3rest();
            if (this.r4sets !== specificWorkouts.r4sets) {
              this.r4sets++;
              this.ivl4Counter++;
              this.r4m1Show = true;
              this.r4m1Showc = true;

              this.r4m3RestShow = false;
              this.cdr4m1Show = true;
              this.cdr4m2Show = false;

              this.r4srtbtnShow = false;
              this.buttonDisabled = false;
              this.cdr4m3Show = true;
              this.updateIonContentClass();
              this.strtr4m1Timer(specificWorkouts);
            } else {
              // Call a method to update the ion-content class
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
            }
          }
        }
        // Play sound when countdown is 3 seconds
        if (this.cdr4m3Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }

  wedoner4m3() {
    this.doneSound.play();
    this.woddonec = true;
    this.cdr1m1Showc = false;
    this.r2m1Showc = false;
    this.r3m1Showc = false;
    this.r8m2RestShowc = false;
    this.r8m1RestShowc = false;
    this.r7m2RestShowc = false;
    this.r7m1RestShowc = false;
    this.r6m2RestShowc = false;
    this.r6m1RestShowc = false;
    this.r5m2RestShowc = false;
    this.r5m1RestShowc = false;
    this.r4m3RestShowc = false;
    this.r4m2RestShowc = false;
    this.r4m1RestShowc = false;
    this.r3m3RestShowc = false;
    this.r3m2RestShowc = false;
    this.r3m1RestShowc = false;
    this.r2m3RestShowc = false;
    this.r2m2RestShowc = false;
    this.r2m1RestShowc = false;
    this.r1m3RestShowc = false;
    this.r1m2RestShowc = false;
    this.r1RestShowc = false;
    this.donescrnShow = true;
    this.woddonec = true;
    this.r8m2RestShow = false;
    this.r8RestShow = false;
    this.r7m2RestShow = false;
    this.r7RestShow = false;
    this.r6m2RestShow = false;
    this.r6RestShow = false;
    this.r5m2RestShow = false;
    this.r5RestShow = false;
    this.r4m3RestShow = false;
    this.r4m2RestShow = false;
    this.r4RestShow = false;
    this.r3m3RestShow = false;
    this.r3m2RestShow = false;
    this.r3RestShow = false;
    this.r2m3RestShow = false;
    this.r2m2RestShow = false;
    this.r2RestShow = false;
    this.r1m3RestShow = false;
    this.r1m2RestShow = false;
    this.r1RestShow = false;
    this.lFinishShow = false;
    this.updateIonContentClass();
  }
  //Tabata funtions
  t1prepimg: boolean = true;
  t1wvid: boolean = false;
  t2prepimg: boolean = true;
  t2wvid: boolean = false;
  t3prepimg: boolean = true;
  t3wvid: boolean = false;
  t4prepimg: boolean = true;
  t4wvid: boolean = false;
  tabatalbls = false;
  tabatapadding = false;
  t1m2lbl = false;
  t2m2lbl = false;
  t3m2lbl = false;
  t4m2lbl = false;
  t5m2lbl = false;
  t6m2lbl = false;
  t7m2lbl = false;
  t8m2lbl = false;
  isFinalTlbl: boolean = false;


  buttonText: string = 'Start Timer'; // Variable to control button text
  ogt1m2: string = '';
  ogt2m2: string = '';
  ogt3m2: string = '';
  ogt4m2: string = '';
  ogt5m2: string = '';
  ogt6m2: string = '';
  ogt7m2: string = '';
  ogt8m2: string = '';
  tb1Counter: number = 1;
  tb2Counter: number = 1;
  tb3Counter: number = 1;
  tb4Counter: number = 1;
  tb5Counter: number = 1;
  tb6Counter: number = 1;
  tb7Counter: number = 1;
  tb8Counter: number = 1;
  onlyT1m2Exists(): boolean {
    return this.stabatas.some((tabata) => tabata.t1m2);
  }
  onlyT2m2Exists(): boolean {
    return this.stabatas.some((tabata) => tabata.t2m2);
  }
  onlyT3m2Exists(): boolean {
    return this.stabatas.some((tabata) => tabata.t3m2);
  }
  onlyT4m2Exists(): boolean {
    return this.stabatas.some((tabata) => tabata.t4m2);
  }
  onlyT5m2Exists(): boolean {
    return this.stabatas.some((tabata) => tabata.t5m2);
  }
  onlyT6m2Exists(): boolean {
    return this.stabatas.some((tabata) => tabata.t6m2);
  }
  onlyT7m2Exists(): boolean {
    return this.stabatas.some((tabata) => tabata.t7m2);
  }
  onlyT8m2Exists(): boolean {
    return this.stabatas.some((tabata) => tabata.t8m2);
  }
  strt5SecTimertab(stabatas: Tabata) {
    //this.stopAllSounds();
    this.buttonDisabled = true; // Disable the button
    this.cd5Sec = 10;
    this.buttonText = 'GET READY!!!';
    this.srtbtnShow = true;
    this.cd5SecShow = true;

    this.tabatalbls = true;
    this.tabatapadding = true;

    const timerInterval = setInterval(() => {
      if (this.cd5Sec !== undefined && this.cd5Sec > 0) {
        this.cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr1m1Timertab(stabatas);
        this.cd5SecShow = false;
        this.t1prepimg = false;
        this.t1wvid = true;
        this.srtbtnShow = false;
        this.buttonText = 'Start Timer';
      }
      // Play sound when countdown is 3 seconds
      if (this.cd5Sec === 3) {
        this.startSound.play();
     
      }
    }, 1000); // Update the 5-second countdown every second
  }
  strtr1m1Timertab(stabatas: Tabata) {
  //  this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr1m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr1m1Timer = this.remaincdr1m1;
      } else if (this.cdr1m1Timer === undefined) {
        this.cdr1m1Timer = stabatas.move;
      }

      this.cdr1m1Intval = setInterval(() => {
        if (!this.isPaused) {
          // Check if the timer is not paused
          if (this.cdr1m1Timer && this.cdr1m1Timer > 0) {
            this.remaincdr1m1 = this.cdr1m1Timer; // Store remaining time
            this.cdr1m1Timer--;
          } else {
            if (this.tb1Counter != stabatas.sets) {
              clearInterval(this.cdr1m1Intval);
              this.clearr1m1Cd();
              this.buttonDisabled = false;
              this.cdr1m1Show = false;
              this.r1RestShow = true;
              this.cdr1m1Showc = false;
              this.r1RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.startr1Resttab(stabatas);
            } else if (
              this.tb1Counter == stabatas.sets &&
              stabatas.t2m1 != ''
            ) {
              clearInterval(this.cdr1m1Intval);
              this.clearr1m1Cd();
              this.buttonDisabled = false;
              this.cdr1m1Show = false;
              this.r2m1Show = true;
              this.cdr1m1Showc = false;
              this.r2m1Showc = true;
            } else {
              clearInterval(this.cdr1m1Intval);
              this.clearr1m1Cd();
              this.buttonDisabled = false;
              this.cdr1m1Show = false;
              this.r1RestShow = true;
              this.cdr1m1Showc = false;
              this.r1RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class

              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr1m1Timer === 3) {
          this.halfwaySound.play();
        }
        
      }, 1000);

      // Add the new condition and actions here
    }
  }

  startr1Resttab(stabatas: Tabata) {
    //this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr1Rest = this.remaincdr1rest;
      } else if (this.cdr1Rest === undefined) {
        this.cdr1Rest = stabatas.rest;
      }

      this.cdir1Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr1Rest && this.cdr1Rest > 0) {
            // Store remaining time
            this.cdr1Rest--;
          } else {
            clearInterval(this.cdir1Rest);
            this.r1RestShowc = false;

            this.updateIonContentClass(); // Call a method to update the ion-content class
            this.clearcdr1rest();
            if (stabatas.t1m2 !== '') {
              this.r1m2Show = true;
              this.r1RestShow = false;
              this.r1m2Showc = true;
              this.r1RestShowc = false;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.cdr1m2Show = true;
              this.strtr1m2Timertab(stabatas);
              this.buttonDisabled = true;
              this.srtbtn2Show = false;
              this.tb1Counter++;
            } else {
              if (this.r1sets !== stabatas.sets) {
                this.r1sets++;
                this.tb1Counter++;
                this.r1RestShow = false;
                this.cdr1m1Show = true;
                this.srtbtnShow = false;
                this.srtbtn2Show = true;
                this.buttonDisabled = false;

                this.cdr1m1Showc = true;
                this.updateIonContentClass(); // Call a method to update the ion-content class
                this.strtr1m1Timertab(stabatas);
              } else {
                if (stabatas.t2m1 !== '') {
                  this.r2m1Show = true;
                  this.r1RestShow = false;
                  // Call a method to update the ion-content class
                  this.r2m1Showc = true;
                  this.r1RestShowc = false;
                  this.updateIonContentClass();
                  this.srtbtn2Show = false;
                  this.cdr2m1Show = true;
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                }
              }
            }
          }
        }
        if (this.cdr1Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  strtr1m2Timertab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr1m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr1m2Timer = this.remaincdr1m2;
      } else if (this.cdr1m2Timer === undefined) {
        this.cdr1m2Timer = stabatas.move;
      }
      this.cdr1m2Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr1m2Timer && this.cdr1m2Timer > 0) {
            this.remaincdr1m2 = this.cdr1m2Timer; // Store remaining time
            this.cdr1m2Timer--;
          } else {
            if (this.tb1Counter != stabatas.sets) {
              clearInterval(this.cdr1m2Intval);
              this.clearr1m2Cd();
              this.r1m2Show = false;
              this.r1m2RestShow = true;
              this.r1m2Showc = false;
              this.r1m2RestShowc = true;
              this.updateIonContentClass();
              this.startr1m2Resttab(stabatas);
            } else if (
              this.tb1Counter == stabatas.sets &&
              stabatas.t2m1 != ''
            ) {
              clearInterval(this.cdr1m2Intval);
              this.clearr1m2Cd();
              this.r1m2Show = false;
              this.r1m2Showc = false;
              this.r2m1Show = true;
              this.r2m1Showc = true;
              this.tabatalbls = false;
              this.tabatapadding = false;
              this.buttonDisabled = false;
            } else {
              this.endSound.play();
              clearInterval(this.cdr1m2Intval);
              this.clearr1m2Cd();
              this.r1m2Show = false;
              this.r1m2RestShow = true;
              this.r1m2Showc = false;
              this.r1m2RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr1m2Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  checktsets4t1m2(stabatas: Tabata) {
    if (this.r1sets < 4) {
      this.r1sets++;
      clearInterval(this.cdr1m2Intval);
      this.clearr1m2Cd();
      this.r1m2Show = false;
      this.r1m2RestShow = true;
      this.r1m2Showc = false;
      this.r1m2RestShowc = true;
      this.updateIonContentClass(); // Call a method to update the ion-content class
      this.startr1m2Resttab(stabatas);
    } else {
      clearInterval(this.cdr1m2Intval);
      this.clearr1m2Cd();
      this.r1m2Show = false;
      this.r1m2RestShow = true;
      this.r1m2Showc = false;
      this.r1m2RestShowc = true;
      this.updateIonContentClass();
      this.r4m3restlbl = false;
      this.r4m3restfinbtn = true;
      this.playfin();
    }
  }
  startr1m2Resttab(stabatas: Tabata) {
    //this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr1m2Rest = this.remaincdr1rest;
      } else if (this.cdr1m2Rest === undefined) {
        this.cdr1m2Rest = stabatas.rest;
      }

      this.cdir1m2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr1m2Rest && this.cdr1m2Rest > 0) {
            // Store remaining time
            this.cdr1m2Rest--;
          } else {
           
            clearInterval(this.cdir1m2Rest);
            this.r1m2RestShowc = false;
            this.updateIonContentClass(); // Call a method to update the ion-content class
            this.clearcdr1m2rest();

            if (this.r1sets !== 4) {
              this.r1sets++;
              this.tb1Counter++;
              this.r1m2RestShow = false;
              this.cdr1m1Show = true;
              this.srtbtnShow = false;
              this.srtbtn2Show = true;
              this.buttonDisabled = false;
              this.cdr1m1Show = true;
              this.cdr1m1Showc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.strtr1m1Timertab(stabatas);
            } else {
              if (stabatas.t2m1 !== '') {
                this.tabatalbls = false;
                this.tabatapadding = false;
                this.r2m1Show = true;
                this.r1m2RestShow = false;
                this.r2m1Showc = true;
                this.buttonDisabled = false;
                this.r1m2RestShowc = false;

                this.updateIonContentClass(); // Call a method to update the ion-content class
              } else {
                this.endSound.play();
                this.r4m3restlbl = false;
                this.r4m3restfinbtn = true;
              }
            }
          }
        }
        if (this.cdr1m2Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  r2strt5SecTimertab(stabatas: Tabata) {
    //this.stopAllSounds();
    this.buttonDisabled = true; // Disable the button
    this.r2cd5Sec = 10;
    this.r2srtbtnShow = true;
    this.r2cd5SecShow = true;
    this.buttonText = 'GET READY!!!';
    this.tabatalbls = true;
    this.tabatapadding = true;

    const timerInterval = setInterval(() => {
      if (this.r2cd5Sec !== undefined && this.r2cd5Sec > 0) {
        this.r2cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr2m1Timertab(stabatas);
        this.r2cd5SecShow = false;
        this.r2srtbtnShow = false;
        this.t2prepimg = false;
        this.t2wvid = true;
        this.buttonText = 'Start Timer';
      }
      // Play sound when countdown is 3 seconds
      if (this.r2cd5Sec === 3) {
        this.startSound.play();
      }
    }, 1000); // Update the 5-second countdown every second
  }
  strtr2m1Timertab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr2m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr2m1Timer = this.remaincdr2m1;
      } else if (this.cdr2m1Timer === undefined) {
        this.cdr2m1Timer = stabatas.move;
      }
      this.cdr2m1Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr2m1Timer && this.cdr2m1Timer > 0) {
            this.remaincdr2m1 = this.cdr2m1Timer; // Store remaining time
            this.cdr2m1Timer--;
          } else {
            if (this.tb2Counter != stabatas.sets) {
              clearInterval(this.cdr2m1Intval);
              this.clearr2m1Cd();

              this.r2m1Show = false;
              this.r2RestShow = true;
              this.r2m1Showc = false;
              this.r2m1RestShowc = true;
              this.updateIonContentClass();
              this.startr2Resttab(stabatas);
            } else if (
              this.tb2Counter == stabatas.sets &&
              stabatas.t3m1 != ''
            ) {
              clearInterval(this.cdr2m1Intval);
              this.clearr2m1Cd();

              this.r2m1Show = false;
              this.r3m1Show = true;
              this.r2m1Showc = false;
              this.r3m1Showc = true;
            } else {
              clearInterval(this.cdr2m1Intval);
              this.clearr2m1Cd();
              this.r2m1Show = false;
              this.r2RestShow = true;
              this.r2m1Showc = false;
              this.r2m1RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr2m1Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  startr2Resttab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr2Rest = this.remaincdr1rest;
      } else if (this.cdr2Rest === undefined) {
        this.cdr2Rest = stabatas.rest;
      }

      this.cdir2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr2Rest && this.cdr2Rest > 0) {
            // Store remaining time
            this.cdr2Rest--;
          } else {
            clearInterval(this.cdir2Rest); // Use cdir2Rest, not cdr2Rest
            this.r2m1RestShowc = false;

            this.updateIonContentClass(); // Call a method to update the ion-content class
            this.clearcdr2rest();
            if (stabatas.t2m2 !== '') {
              this.tb2Counter++;
              this.r2RestShow = false;
              this.r2m2Show = true;
              this.r2m2Showc = true;
              this.r2m1RestShowc = false;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.cdr2m2Show = true;
              this.strtr2m2Timertab(stabatas);
              this.buttonDisabled = true;
              this.r2m2srtbtnShow = false;
            } else {
              if (this.r2sets !== stabatas.sets) {
                this.r2sets++;
                this.tb2Counter++;
                this.r2RestShow = false;
                this.r2m1Show = true;
                this.r2srtbtnShow = false;
                this.buttonDisabled = false;

                this.buttonDisabled = false;
                this.r2m1Showc = true;
                this.updateIonContentClass();
                this.cdr2m1Show = true;
                this.strtr2m1Timertab(stabatas);
              } else {
                if (stabatas.t3m1 !== '') {
                  this.tabatalbls = false;
                  this.tabatapadding = false;
                  this.buttonDisabled = false;
                  this.r3m1Show = true;
                  this.r2RestShow = false;
                  this.updateIonContentClass(); // Call a method to update the ion-content class
                  this.r3m1Showc = true;
                  this.updateIonContentClass();
                  this.r2m1RestShowc = false;
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                }
              }
            }
          }
        }
        if (this.cdr2Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  strtr2m2Timertab(stabatas: Tabata) {
  //  this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr2m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr2m2Timer = this.remaincdr2m2;
      } else if (this.cdr2m2Timer === undefined) {
        this.cdr2m2Timer = stabatas.move;
      }
      this.cdr2m2Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr2m2Timer && this.cdr2m2Timer > 0) {
            this.remaincdr2m2 = this.cdr2m2Timer; // Store remaining time
            this.cdr2m2Timer--;
          } else {
            if (this.tb2Counter != stabatas.sets) {
              clearInterval(this.cdr2m2Intval);
              this.clearr2m2Cd();
              this.r2m2Show = false;
              this.r2m2RestShow = true;
              this.r2m2Showc = false;
              this.r2m2RestShowc = true;
              this.updateIonContentClass();
              this.startr2m2Resttab(stabatas);
            } else if (
              this.tb2Counter == stabatas.sets &&
              stabatas.t3m1 != ''
            ) {
              clearInterval(this.cdr2m2Intval);
              this.clearr2m2Cd();
              this.r2m2Show = false;
              this.r2m2Showc = false;
              this.r3m1Show = true;
              this.r3m1Showc = true;
              this.tabatalbls = false;
              this.tabatapadding = false;
              this.buttonDisabled = false;
            } else {
              clearInterval(this.cdr2m2Intval);
              this.clearr2m2Cd();
              this.r2m2Show = false;
              this.r2m2RestShow = true;
              this.r2m2Showc = false;
              this.r2m2RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr2m2Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  startr2m2Resttab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr2m2Rest = this.remaincdr1rest;
      } else if (this.cdr2m2Rest === undefined) {
        this.cdr2m2Rest = stabatas.rest;
      }

      this.cdir2m2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr2m2Rest && this.cdr2m2Rest > 0) {
            // Store remaining time
            this.cdr2m2Rest--;
          } else {
            clearInterval(this.cdir2m2Rest);
            this.r2m2RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr2m2rest();

            if (this.r2sets !== 4) {
              this.r2sets++;
              this.tb2Counter++;
              this.r2m2RestShow = false;
              this.r2m1Show = true;
              this.r2m1Showc = true;
              this.cdr2m1Show = true;
              this.r2srtbtnShow = false;
              this.r2m2srtbtnShow = true;
              this.buttonDisabled = false;
              this.updateIonContentClass();
              this.strtr2m1Timertab(stabatas);
            } else {
              if (stabatas.t3m1 !== '') {
                this.tabatalbls = false;
                this.tabatapadding = false;
                this.r3m1Show = true;
                this.r2m2RestShow = false;
                this.buttonDisabled = false;
                // Call a method to update the ion-content class
                this.r3m1Showc = true;
                this.r2m2RestShowc = false;
                this.updateIonContentClass();
              } else {
                this.r4m3restlbl = false;
                this.r4m3restfinbtn = true;
                this.endSound.play();
              }
            }
          }
        }
        if (this.cdr2m2Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  r3strt5SecTimertab(stabatas: Tabata) {
   // this.stopAllSounds();
    this.buttonDisabled = true; // Disable the button
    this.r3cd5Sec = 10;
    this.r3srtbtnShow = true;
    this.r3cd5SecShow = true;
    this.buttonText = 'GET READY!!!';
    this.tabatalbls = true;
    this.tabatapadding = true;
    const timerInterval = setInterval(() => {
      if (this.r3cd5Sec !== undefined && this.r3cd5Sec > 0) {
        this.r3cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr3m1Timertab(stabatas);
        this.r3cd5SecShow = false;
        this.t3prepimg = false;
        this.r3srtbtnShow = false;
        this.t3wvid = true;
        this.buttonText = 'Start Timer';
      } // Play sound when countdown is 3 seconds
      if (this.r3cd5Sec === 3) {
        this.startSound.play();
      }
    }, 1000); // Update the 5-second countdown every second
  }
  strtr3m1Timertab(stabatas: Tabata) {
  //  this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr3m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr3m1Timer = this.remaincdr3m1;
      } else if (this.cdr3m1Timer === undefined) {
        this.cdr3m1Timer = stabatas.move;
      }
      this.cdr3m1Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr3m1Timer && this.cdr3m1Timer > 0) {
            this.remaincdr3m1 = this.cdr3m1Timer; // Store remaining time
            this.cdr3m1Timer--;
          } else {
            if (this.tb3Counter != stabatas.sets) {
              clearInterval(this.cdr3m1Intval);
              this.clearr3m1Cd();

              this.r3m1Show = false;
              this.r3RestShow = true;
              this.r3m1Showc = false;
              this.r3m1RestShowc = true;
              this.updateIonContentClass();
              this.startr3Resttab(stabatas);
            } else if (
              this.tb3Counter == stabatas.sets &&
              stabatas.t4m1 != ''
            ) {
              clearInterval(this.cdr3m1Intval);
              this.clearr3m1Cd();

              this.r3m1Show = false;
              this.r4m1Show = true;
              this.r3m1Showc = false;
              this.r4m1Showc = true;
            } else {
              clearInterval(this.cdr3m1Intval);
              this.clearr3m1Cd();
              this.r3m1Show = false;
              this.r3RestShow = true;
              this.r3m1Showc = false;
              this.r3m1RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr3m1Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  startr3Resttab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr3Rest = this.remaincdr1rest;
      } else if (this.cdr3Rest === undefined) {
        this.cdr3Rest = stabatas.rest;
      }

      this.cdir3Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr3Rest && this.cdr3Rest > 0) {
            // Store remaining time
            this.cdr3Rest--;
          } else {
            clearInterval(this.cdir3Rest); // Use cdir2Rest, not cdr2Rest
            this.r3m1RestShowc = false;

            this.updateIonContentClass(); // Call a method to update the ion-content class
            this.clearcdr3rest();
            if (stabatas.t3m2 !== '') {
              this.tb3Counter++;
              this.r3RestShow = false;
              this.r3m2Show = true;
              this.r3m2Showc = true;
              this.r3m1RestShowc = false;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.cdr3m2Show = true;
              this.strtr3m2Timertab(stabatas);
              this.buttonDisabled = true;
              this.r3m2srtbtnShow = false;
            } else {
              if (this.r3sets !== stabatas.sets) {
                this.r3sets++;
                this.tb3Counter++;
                this.r3RestShow = false;
                this.r3m1Show = true;
                this.r3srtbtnShow = false;
                this.buttonDisabled = false;

                this.buttonDisabled = false;
                this.r3m1Showc = true;
                this.updateIonContentClass();
                this.cdr3m1Show = true;
                this.strtr3m1Timertab(stabatas);
              } else {
                if (stabatas.t4m1 !== '') {
                  this.tabatalbls = false;
                  this.tabatapadding = false;
                  this.r4m1Show = true;
                  this.r3RestShow = false;
                  this.buttonDisabled = false;
                  this.r4m1Showc = true;
                  this.r3m1RestShowc = false;
                  this.updateIonContentClass(); // Call a method to update the ion-content class
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                }
              }
            }
          }
        }
        if (this.cdr3Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  strtr3m2Timertab(stabatas: Tabata) {
  //  this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr3m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr3m2Timer = this.remaincdr3m2;
      } else if (this.cdr3m2Timer === undefined) {
        this.cdr3m2Timer = stabatas.move;
      }
      this.cdr3m2Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr3m2Timer && this.cdr3m2Timer > 0) {
            this.remaincdr3m2 = this.cdr3m2Timer; // Store remaining time
            this.cdr3m2Timer--;
          } else {
            if (this.tb3Counter != stabatas.sets) {
              clearInterval(this.cdr3m2Intval);
              this.clearr3m2Cd();
              this.r3m2Show = false;
              this.r3m2RestShow = true;
              this.r3m2Showc = false;
              this.r3m2RestShowc = true;
              this.updateIonContentClass();
              this.startr3m2Resttab(stabatas);
            } else if (
              this.tb3Counter == stabatas.sets &&
              stabatas.t4m1 != ''
            ) {
              clearInterval(this.cdr3m2Intval);
              this.clearr3m2Cd();
              this.r3m2Show = false;
              this.r3m2Showc = false;
              this.r4m1Show = true;
              this.r4m1Showc = true;
              this.tabatalbls = false;
              this.tabatapadding = false;
              this.buttonDisabled = false;
            } else {
              clearInterval(this.cdr3m2Intval);
              this.clearr3m2Cd();
              this.r3m2Show = false;
              this.r3m2RestShow = true;
              this.r3m2Showc = false;
              this.r3m2RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr3m2Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  startr3m2Resttab(stabatas: Tabata) {
    //this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr3m2Rest = this.remaincdr1rest;
      } else if (this.cdr3m2Rest === undefined) {
        this.cdr3m2Rest = stabatas.rest;
      }

      this.cdir3m2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr3m2Rest && this.cdr3m2Rest > 0) {
            // Store remaining time
            this.cdr3m2Rest--;
          } else {
            clearInterval(this.cdir3m2Rest);
            this.r3m2RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr3m2rest();

            if (this.r3sets !== 4) {
              this.r3sets++;
              this.tb3Counter++;
              this.r3m2RestShow = false;
              this.r3m1Show = true;
              this.r3m1Showc = true;
              this.cdr3m1Show = true;
              this.r3srtbtnShow = false;
              this.r3m2srtbtnShow = true;
              this.buttonDisabled = false;
              this.cdr3m1Show = true;
              this.updateIonContentClass();
              this.cdr3m1Show = true;
              this.strtr3m1Timertab(stabatas);
            } else {
              if (stabatas.t4m1 !== '') {
                this.tabatalbls = false;
                this.tabatapadding = false;
                this.r4m1Show = true;
                this.r3m2RestShow = false;
                this.r4srtbtnShow = true;
                this.buttonDisabled = false;
                // Call a method to update the ion-content class
                this.r4m1Showc = true;
                this.r3m2RestShowc = false;
                this.updateIonContentClass();
              } else {
                this.r4m3restlbl = false;
                this.r4m3restfinbtn = true;
                this.endSound.play();
                this.isFinalTlbl = true;
              }
            }
          }
        }
        if (this.cdr3m2Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  r4strt5SecTimertab(stabatas: Tabata) {
    //this.stopAllSounds();
    this.buttonDisabled = true; // Disable the button
    this.r4cd5Sec = 10;
    this.r4srtbtnShow = true;
    this.r4cd5SecShow = true;
    this.buttonText = 'GET READY!!!';
    this.tabatalbls = true;
    this.tabatapadding = true;
    const timerInterval = setInterval(() => {
      if (this.r4cd5Sec !== undefined && this.r4cd5Sec > 0) {
        this.r4cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr4m1Timertab(stabatas);
        this.r4cd5SecShow = false;
        this.r4srtbtnShow = false;
        this.t4prepimg = false;
        this.t4wvid = true;
        this.buttonText = 'Start Timer';
      }
      // Play sound when countdown is 3 seconds
      if (this.r4cd5Sec === 3) {
        this.startSound.play();
      }
    }, 1000); // Update the 5-second countdown every second
  }
  strtr4m1Timertab(stabatas: Tabata) {
 //   this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr4m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr4m1Timer = this.remaincdr4m1;
      } else if (this.cdr4m1Timer === undefined) {
        this.cdr4m1Timer = stabatas.move;
      }
      this.cdr4m1Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr4m1Timer && this.cdr4m1Timer > 0) {
            this.remaincdr4m1 = this.cdr4m1Timer; // Store remaining time
            this.cdr4m1Timer--;
          } else {
            if (this.tb4Counter != stabatas.sets) {
              clearInterval(this.cdr4m1Intval);
              this.clearr4m1Cd();

              this.r4m1Show = false;
              this.r4RestShow = true;
              this.r4m1Showc = false;
              this.r4m1RestShowc = true;
              this.updateIonContentClass();
              this.startr4Resttab(stabatas);
            } else if (
              this.tb4Counter == stabatas.sets &&
              stabatas.t5m1 != ''
            ) {
              clearInterval(this.cdr4m1Intval);
              this.clearr4m1Cd();

              this.r4m1Show = false;
              this.r5m1Show = true;
              this.r4m1Showc = false;
              this.r5m1Showc = true;
            } else {
              clearInterval(this.cdr4m1Intval);
              this.clearr4m1Cd();
              this.r4m1Show = false;
              this.r4RestShow = true;
              this.r4m1Showc = false;
              this.r4m1RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr4m1Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  startr4Resttab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr4Rest = this.remaincdr1rest;
      } else if (this.cdr4Rest === undefined) {
        this.cdr4Rest = stabatas.rest;
      }

      this.cdir4Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr4Rest && this.cdr4Rest > 0) {
            // Store remaining time
            this.cdr4Rest--;
          } else {
            clearInterval(this.cdir4Rest); // Use cdir2Rest, not cdr2Rest
            this.r4m1RestShowc = false;

            this.updateIonContentClass(); // Call a method to update the ion-content class
            this.clearcdr4rest();
            if (stabatas.t4m2 !== '') {
              this.tb4Counter++;
              this.r4RestShow = false;
              this.r4m2Show = true;
              this.r4m2Showc = true;
              this.r4m1RestShowc = false;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.cdr4m2Show = true;
              this.strtr4m2Timertab(stabatas);
              this.buttonDisabled = true;
              this.r4m2srtbtnShow = false;
            } else {
              if (this.r4sets !== stabatas.sets) {
                this.r4sets++;
                this.tb4Counter++;
                this.r4RestShow = false;
                this.r4m1Show = true;
                this.r4srtbtnShow = false;
                this.buttonDisabled = false;

                this.buttonDisabled = false;
                this.r4m1Showc = true;
                this.updateIonContentClass();
                this.cdr4m1Show = true;
                this.strtr4m1Timertab(stabatas);
              } else {
                if (stabatas.t5m1 !== '') {
                  this.tabatalbls = false;
                  this.tabatapadding = false;
                  this.r5m1Show = true;
                  this.r4RestShow = false;
                  this.buttonDisabled = false;
                  this.r5m1Showc = true;
                  this.r4m1RestShowc = false;
                  this.updateIonContentClass(); // Call a method to update the ion-content class
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                  this.isFinalTlbl = true;
                }
              }
            }
          }
        }
        if (this.cdr4Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  strtr4m2Timertab(stabatas: Tabata) {
  //  this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr4m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr4m2Timer = this.remaincdr4m2;
      } else if (this.cdr4m2Timer === undefined) {
        this.cdr4m2Timer = stabatas.move;
      }
      this.cdr4m2Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr4m2Timer && this.cdr4m2Timer > 0) {
            this.remaincdr4m2 = this.cdr4m2Timer; // Store remaining time
            this.cdr4m2Timer--;
          } else {
            if (this.tb4Counter != stabatas.sets) {
              clearInterval(this.cdr4m2Intval);
              this.clearr4m2Cd();
              this.r4m2Show = false;
              this.r4m2RestShow = true;
              this.r4m2Showc = false;
              this.r4m2RestShowc = true;
              this.updateIonContentClass();
              this.startr4m2Resttab(stabatas);
            } else if (
              this.tb4Counter == stabatas.sets &&
              stabatas.t5m1 != ''
            ) {
              clearInterval(this.cdr4m2Intval);
              this.clearr4m2Cd();
              this.r4m2Show = false;
              this.r4m2Showc = false;
              this.r5m1Show = true;
              this.r5m1Showc = true;
              this.tabatalbls = false;
              this.tabatapadding = false;
              this.buttonDisabled = false;
            } else {
              clearInterval(this.cdr4m2Intval);
              this.clearr4m2Cd();
              this.r4m2Show = false;
              this.r4m2RestShow = true;
              this.r4m2Showc = false;
              this.r4m2RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr4m2Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  startr4m2Resttab(stabatas: Tabata) {
    //this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr4m2Rest = this.remaincdr1rest;
      } else if (this.cdr4m2Rest === undefined) {
        this.cdr4m2Rest = stabatas.rest;
      }

      this.cdir4m2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr4m2Rest && this.cdr4m2Rest > 0) {
            // Store remaining time
            this.cdr4m2Rest--;
          } else {
            clearInterval(this.cdir4m2Rest);
            this.r4m2RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr4m2rest();

            if (this.r4sets !== 4) {
              this.r4sets++;
              this.tb4Counter++;
              this.r4m2RestShow = false;
              this.r4m1Show = true;
              this.r4m1Showc = true;
              this.cdr4m1Show = true;
              this.r4srtbtnShow = false;
              this.r4m2srtbtnShow = true;
              this.buttonDisabled = false;
              this.cdr4m1Show = true;
              this.updateIonContentClass();
              this.cdr4m1Show = true;
              this.strtr4m1Timertab(stabatas);
            } else {
              if (stabatas.t5m1 !== '') {
                this.tabatalbls = false;
                this.tabatapadding = false;
                this.r5m1Show = true;
                this.r4m2RestShow = false;
                this.r5srtbtnShow = true;
                this.buttonDisabled = false;
                // Call a method to update the ion-content class
                this.r5m1Showc = true;
                this.r4m2RestShowc = false;
                this.updateIonContentClass();
              } else {
                this.r4m3restlbl = false;
                this.r4m3restfinbtn = true;
                this.endSound.play();
                this.isFinalTlbl = true;
              }
            }
          }
        }
        if (this.cdr4m2Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  r5cd5Sec: number | undefined = undefined;
  r5cd5SecShow = true;
  r5srtbtnShow = true;
  t5prepimg: boolean = true;
  t5wvid: boolean = false;
  isPr5m1Timer: boolean = false;
  isPr5m2Timer: boolean = false;
  cdr5m1Timer: number | undefined = undefined;
  cdr5m2Timer: number | undefined = undefined;
  remaincdr5m1: number | undefined = undefined;
  remaincdr5m2: number | undefined = undefined;
  cdr5m1Intval: any;
  cdr5m2Intval: any;
  r5m1Show = false;
  r5RestShow = false;
  cdr5Rest: number | undefined = undefined;
  cdir5Rest: any;
  cdr5m2Rest: number | undefined = undefined;
  cdir5m2Rest: any;
  r5m2Show = false;
  r5m2RestShow = false;
  cdr5m2Show = true;
  r5sets: number = 1;
  cdr5m1Show = true;
  r6m1Show = false;
  r6RestShow = false;
  r6cd5Sec: number | undefined = undefined;
  r6cd5SecShow = true;
  r6srtbtnShow = true;
  t6prepimg: boolean = true;
  t6wvid: boolean = false;
  isPr6m1Timer: boolean = false;
  isPr6m2Timer: boolean = false;
  cdr6m1Timer: number | undefined = undefined;
  cdr6m2Timer: number | undefined = undefined;
  remaincdr6m1: number | undefined = undefined;
  remaincdr6m2: number | undefined = undefined;
  cdr6m1Intval: any;
  cdr6m2Intval: any;
  r7m1Show = false;
  r7RestShow = false;
  cdr6Rest: number | undefined = undefined;
  cdir6Rest: any;
  cdr6m2Rest: number | undefined = undefined;
  cdir6m2Rest: any;
  r6m2Show = false;
  r6m2RestShow = false;
  cdr6m2Show = true;
  r6sets: number = 1;
  cdr6m1Show = true;
  r8m1Show = false;
  r8RestShow = false;
  r7cd5Sec: number | undefined = undefined;
  r7cd5SecShow = true;
  r7srtbtnShow = true;
  t7prepimg: boolean = true;
  t7wvid: boolean = false;
  isPr7m1Timer: boolean = false;
  isPr7m2Timer: boolean = false;
  cdr7m1Timer: number | undefined = undefined;
  cdr7m2Timer: number | undefined = undefined;
  remaincdr7m1: number | undefined = undefined;
  remaincdr7m2: number | undefined = undefined;
  cdr7m1Intval: any;
  cdr7m2Intval: any;
  cdr7Rest: number | undefined = undefined;
  cdir7Rest: any;
  cdr7m2Rest: number | undefined = undefined;
  cdir7m2Rest: any;
  r7m2Show = false;
  r7m2RestShow = false;
  cdr7m2Show = true;
  r7sets: number = 1;
  cdr7m1Show = true;
  r8cd5Sec: number | undefined = undefined;
  r8cd5SecShow = true;
  r8srtbtnShow = true;
  t8prepimg: boolean = true;
  t8wvid: boolean = false;
  isPr8m1Timer: boolean = false;
  isPr8m2Timer: boolean = false;
  cdr8m1Timer: number | undefined = undefined;
  cdr8m2Timer: number | undefined = undefined;
  remaincdr8m1: number | undefined = undefined;
  remaincdr8m2: number | undefined = undefined;
  cdr8m1Intval: any;
  cdr8m2Intval: any;
  cdr8Rest: number | undefined = undefined;
  cdir8Rest: any;
  cdr8m2Rest: number | undefined = undefined;
  cdir8m2Rest: any;
  r8m2Show = false;
  r8m2RestShow = false;
  cdr8m2Show = true;
  r8sets: number = 1;
  cdr8m1Show = true;

  //t5
  r5strt5SecTimertab(stabatas: Tabata) {
  //  this.stopAllSounds();
    this.buttonDisabled = true; // Disable the button
    this.r5cd5Sec = 10;
    this.r5srtbtnShow = true;
    this.r5cd5SecShow = true;
    this.buttonText = 'GET READY!!!';
    this.tabatalbls = true;
    this.tabatapadding = true;
    const timerInterval = setInterval(() => {
      if (this.r5cd5Sec !== undefined && this.r5cd5Sec > 0) {
        this.r5cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr5m1Timertab(stabatas);
        this.r5cd5SecShow = false;
        this.r5srtbtnShow = false;
        this.t5prepimg = false;
        this.t5wvid = true;
        this.buttonText = 'Start Timer';
      }
      // Play sound when countdown is 3 seconds
      if (this.r5cd5Sec === 3) {
        this.startSound.play();
      }
    }, 1000); // Update the 5-second countdown every second
  }
  clearr5m1Cd() {
    if (this.cdr5m1Intval) {
      clearInterval(this.cdr5m1Intval);
    }
    this.cdr5m1Timer = undefined;
    this.isPr5m1Timer = false;
    this.remaincdr5m1 = undefined;
  }
  strtr5m1Timertab(stabatas: Tabata) {
  //  this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr5m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr5m1Timer = this.remaincdr5m1;
      } else if (this.cdr5m1Timer === undefined) {
        this.cdr5m1Timer = stabatas.move;
      }
      this.cdr5m1Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr5m1Timer && this.cdr5m1Timer > 0) {
            this.remaincdr5m1 = this.cdr5m1Timer; // Store remaining time
            this.cdr5m1Timer--;
          } else {
            if (this.tb5Counter != stabatas.sets) {
              clearInterval(this.cdr5m1Intval);
              this.clearr5m1Cd();

              this.r5m1Show = false;
              this.r5RestShow = true;
              this.r5m1Showc = false;
              this.r5m1RestShowc = true;
              this.updateIonContentClass();
              this.startr5Resttab(stabatas);
            } else if (
              this.tb5Counter == stabatas.sets &&
              stabatas.t6m1 != ''
            ) {
              clearInterval(this.cdr5m1Intval);
              this.clearr5m1Cd();

              this.r5m1Show = false;
              this.r6m1Show = true;
              this.r5m1Showc = false;
              this.r6m1Showc = true;
            } else {
              clearInterval(this.cdr5m1Intval);
              this.clearr5m1Cd();
              this.r5m1Show = false;
              this.r5RestShow = true;
              this.r5m1Showc = false;
              this.r5m1RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr5m1Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  clearcdr5rest() {
    if (this.cdir5Rest) {
      clearInterval(this.cdir5Rest);
    }
    this.cdr5Rest = undefined;
  }
  startr5Resttab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr5Rest = this.remaincdr1rest;
      } else if (this.cdr5Rest === undefined) {
        this.cdr5Rest = stabatas.rest;
      }

      this.cdir5Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr5Rest && this.cdr5Rest > 0) {
            // Store remaining time
            this.cdr5Rest--;
          } else {
            clearInterval(this.cdir5Rest); // Use cdir2Rest, not cdr2Rest
            this.r5m1RestShowc = false;

            this.updateIonContentClass(); // Call a method to update the ion-content class
            this.clearcdr5rest();
            if (stabatas.t5m2 !== '') {
              this.tb5Counter++;
              this.r5RestShow = false;
              this.r5m2Show = true;
              this.r5m2Showc = true;
              this.r5m1RestShowc = false;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.cdr5m2Show = true;
              this.strtr5m2Timertab(stabatas);
              this.buttonDisabled = true;
            } else {
              if (this.r5sets !== stabatas.sets) {
                this.r5sets++;
                this.tb5Counter++;
                this.r5RestShow = false;
                this.r5m1Show = true;
                this.r5srtbtnShow = false;
                this.buttonDisabled = false;

                this.buttonDisabled = false;
                this.r5m1Showc = true;
                this.updateIonContentClass();
                this.cdr5m1Show = true;
                this.strtr5m1Timertab(stabatas);
              } else {
                if (stabatas.t6m1 !== '') {
                  this.tabatalbls = false;
                  this.tabatapadding = false;
                  this.r6m1Show = true;
                  this.r5RestShow = false;
                  this.buttonDisabled = false;
                  this.r6m1Showc = true;
                  this.r5m1RestShowc = false;
                  this.updateIonContentClass(); // Call a method to update the ion-content class
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                  this.isFinalTlbl = true;
                }
              }
            }
          }
        }
        if (this.cdr5Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  clearr5m2Cd() {
    if (this.cdr5m2Intval) {
      clearInterval(this.cdr5m2Intval);
    }
    this.cdr5m2Timer = undefined;
    this.isPr5m2Timer = false;
    this.remaincdr5m2 = undefined;
  }
  strtr5m2Timertab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr5m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr5m2Timer = this.remaincdr5m2;
      } else if (this.cdr5m2Timer === undefined) {
        this.cdr5m2Timer = stabatas.move;
      }
      this.cdr5m2Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr5m2Timer && this.cdr5m2Timer > 0) {
            this.remaincdr5m2 = this.cdr5m2Timer; // Store remaining time
            this.cdr5m2Timer--;
          } else {
            if (this.tb5Counter != stabatas.sets) {
              clearInterval(this.cdr5m2Intval);
              this.clearr5m2Cd();
              this.r5m2Show = false;
              this.r5m2RestShow = true;
              this.r5m2Showc = false;
              this.r5m2RestShowc = true;
              this.updateIonContentClass();
              this.startr5m2Resttab(stabatas);
            } else if (
              this.tb5Counter == stabatas.sets &&
              stabatas.t6m1 != ''
            ) {
              clearInterval(this.cdr5m2Intval);
              this.clearr5m2Cd();
              this.r5m2Show = false;
              this.r5m2Showc = false;
              this.r6m1Show = true;
              this.r6m1Showc = true;
              this.tabatalbls = false;
              this.tabatapadding = false;
              this.buttonDisabled = false;
            } else {
              clearInterval(this.cdr5m2Intval);
              this.clearr5m2Cd();
              this.r5m2Show = false;
              this.r5m2RestShow = true;
              this.r5m2Showc = false;
              this.r5m2RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr5m2Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  clearcdr5m2rest() {
    if (this.cdir5m2Rest) {
      clearInterval(this.cdir5m2Rest);
    }
    this.cdr5m2Rest = undefined;
  }
  startr5m2Resttab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr5m2Rest = this.remaincdr1rest;
      } else if (this.cdr5m2Rest === undefined) {
        this.cdr5m2Rest = stabatas.rest;
      }

      this.cdir5m2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr5m2Rest && this.cdr5m2Rest > 0) {
            // Store remaining time
            this.cdr5m2Rest--;
          } else {
            clearInterval(this.cdir5m2Rest);
            this.r5m2RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr5m2rest();

            if (this.r5sets !== 4) {
              this.r5sets++;
              this.tb5Counter++;
              this.r5m2RestShow = false;
              this.r5m1Show = true;
              this.r5m1Showc = true;
              this.cdr5m1Show = true;
              this.r5srtbtnShow = false;
              this.buttonDisabled = false;
              this.cdr5m1Show = true;
              this.updateIonContentClass();
              this.cdr5m1Show = true;
              this.strtr5m1Timertab(stabatas);
            } else {
              if (stabatas.t6m1 !== '') {
                this.tabatalbls = false;
                this.tabatapadding = false;
                this.r6m1Show = true;
                this.r5m2RestShow = false;
                //this.r6srtbtnShow = true;
                this.buttonDisabled = false;
                // Call a method to update the ion-content class
                this.r6m1Showc = true;
                this.r5m2RestShowc = false;
                this.updateIonContentClass();
              } else {
                this.r4m3restlbl = false;
                this.r4m3restfinbtn = true;
                this.endSound.play();
                this.isFinalTlbl = true;
              }
            }
          }
        }
        if (this.cdr5m2Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  //t6
  r6strt5SecTimertab(stabatas: Tabata) {
    //this.stopAllSounds();
    this.buttonDisabled = true; // Disable the button
    this.r6cd5Sec = 10;
    this.r6srtbtnShow = true;
    this.r6cd5SecShow = true;
    this.buttonText = 'GET READY!!!';
    this.tabatalbls = true;
    this.tabatapadding = true;
    const timerInterval = setInterval(() => {
      if (this.r6cd5Sec !== undefined && this.r6cd5Sec > 0) {
        this.r6cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr6m1Timertab(stabatas);
        this.r6cd5SecShow = false;
        this.r6srtbtnShow = false;
        this.t6prepimg = false;
        this.t6wvid = true;
        this.buttonText = 'Start Timer';
      }
      // Play sound when countdown is 3 seconds
      if (this.r6cd5Sec === 3) {
        this.startSound.play();
      }
    }, 1000); // Update the 5-second countdown every second
  }
  clearr6m1Cd() {
    if (this.cdr6m1Intval) {
      clearInterval(this.cdr6m1Intval);
    }
    this.cdr6m1Timer = undefined;
    this.isPr6m1Timer = false;
    this.remaincdr6m1 = undefined;
  }
  strtr6m1Timertab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr6m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr6m1Timer = this.remaincdr6m1;
      } else if (this.cdr6m1Timer === undefined) {
        this.cdr6m1Timer = stabatas.move;
      }
      this.cdr6m1Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr6m1Timer && this.cdr6m1Timer > 0) {
            this.remaincdr6m1 = this.cdr6m1Timer; // Store remaining time
            this.cdr6m1Timer--;
          } else {
            if (this.tb6Counter != stabatas.sets) {
              clearInterval(this.cdr6m1Intval);
              this.clearr6m1Cd();

              this.r6m1Show = false;
              this.r6RestShow = true;
              this.r6m1Showc = false;
              this.r6m1RestShowc = true;
              this.updateIonContentClass();
              this.startr6Resttab(stabatas);
            } else if (
              this.tb6Counter == stabatas.sets &&
              stabatas.t7m1 != ''
            ) {
              clearInterval(this.cdr6m1Intval);
              this.clearr6m1Cd();

              this.r6m1Show = false;
              this.r7m1Show = true;
              this.r6m1Showc = false;
              this.r7m1Showc = true;
            } else {
              clearInterval(this.cdr6m1Intval);
              this.clearr6m1Cd();
              this.r6m1Show = false;
              this.r6RestShow = true;
              this.r6m1Showc = false;
              this.r6m1RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr6m1Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  clearcdr6rest() {
    if (this.cdir6Rest) {
      clearInterval(this.cdir6Rest);
    }
    this.cdr6Rest = undefined;
  }
  startr6Resttab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr6Rest = this.remaincdr1rest;
      } else if (this.cdr6Rest === undefined) {
        this.cdr6Rest = stabatas.rest;
      }

      this.cdir6Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr6Rest && this.cdr6Rest > 0) {
            // Store remaining time
            this.cdr6Rest--;
          } else {
            clearInterval(this.cdir6Rest); // Use cdir2Rest, not cdr2Rest
            this.r6m1RestShowc = false;

            this.updateIonContentClass(); // Call a method to update the ion-content class
            this.clearcdr6rest();
            if (stabatas.t6m2 !== '') {
              this.tb6Counter++;
              this.r6RestShow = false;
              this.r6m2Show = true;
              this.r6m2Showc = true;
              this.r6m1RestShowc = false;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.cdr6m2Show = true;
              this.strtr6m2Timertab(stabatas);
              this.buttonDisabled = true;
            } else {
              if (this.r6sets !== stabatas.sets) {
                this.r6sets++;
                this.tb6Counter++;
                this.r6RestShow = false;
                this.r6m1Show = true;
                this.r6srtbtnShow = false;
                this.buttonDisabled = false;

                this.buttonDisabled = false;
                this.r6m1Showc = true;
                this.updateIonContentClass();
                this.cdr6m1Show = true;
                this.strtr6m1Timertab(stabatas);
              } else {
                if (stabatas.t7m1 !== '') {
                  this.tabatalbls = false;
                  this.tabatapadding = false;
                  this.r7m1Show = true;
                  this.r6RestShow = false;
                  this.buttonDisabled = false;
                  this.r7m1Showc = true;
                  this.r6m1RestShowc = false;
                  this.updateIonContentClass(); // Call a method to update the ion-content class
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                  this.isFinalTlbl = true;
                }
              }
            }
          }
        }
        if (this.cdr6Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  clearr6m2Cd() {
    if (this.cdr6m2Intval) {
      clearInterval(this.cdr6m2Intval);
    }
    this.cdr6m2Timer = undefined;
    this.isPr6m2Timer = false;
    this.remaincdr6m2 = undefined;
  }
  strtr6m2Timertab(stabatas: Tabata) {
    //this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr6m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr6m2Timer = this.remaincdr6m2;
      } else if (this.cdr6m2Timer === undefined) {
        this.cdr6m2Timer = stabatas.move;
      }
      this.cdr6m2Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr6m2Timer && this.cdr6m2Timer > 0) {
            this.remaincdr6m2 = this.cdr6m2Timer; // Store remaining time
            this.cdr6m2Timer--;
          } else {
            if (this.tb6Counter != stabatas.sets) {
              clearInterval(this.cdr6m2Intval);
              this.clearr6m2Cd();
              this.r6m2Show = false;
              this.r6m2RestShow = true;
              this.r6m2Showc = false;
              this.r6m2RestShowc = true;
              this.updateIonContentClass();
              this.startr6m2Resttab(stabatas);
            } else if (
              this.tb6Counter == stabatas.sets &&
              stabatas.t7m1 != ''
            ) {
              clearInterval(this.cdr6m2Intval);
              this.clearr6m2Cd();
              this.r6m2Show = false;
              this.r6m2Showc = false;
              this.r7m1Show = true;
              this.r7m1Showc = true;
              this.tabatalbls = false;
              this.tabatapadding = false;
              this.buttonDisabled = false;
            } else {
              clearInterval(this.cdr6m2Intval);
              this.clearr6m2Cd();
              this.r6m2Show = false;
              this.r6m2RestShow = true;
              this.r6m2Showc = false;
              this.r6m2RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr6m2Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  clearcdr6m2rest() {
    if (this.cdir6m2Rest) {
      clearInterval(this.cdir6m2Rest);
    }
    this.cdr6m2Rest = undefined;
  }
  startr6m2Resttab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr6m2Rest = this.remaincdr1rest;
      } else if (this.cdr6m2Rest === undefined) {
        this.cdr6m2Rest = stabatas.rest;
      }

      this.cdir6m2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr6m2Rest && this.cdr6m2Rest > 0) {
            // Store remaining time
            this.cdr6m2Rest--;
          } else {
            clearInterval(this.cdir6m2Rest);
            this.r6m2RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr6m2rest();

            if (this.r6sets !== 4) {
              this.r6sets++;
              this.tb6Counter++;
              this.r6m2RestShow = false;
              this.r6m1Show = true;
              this.r6m1Showc = true;
              this.cdr6m1Show = true;
              this.r6srtbtnShow = false;
              this.buttonDisabled = false;
              this.cdr6m1Show = true;
              this.updateIonContentClass();
              this.cdr6m1Show = true;
              this.strtr6m1Timertab(stabatas);
            } else {
              if (stabatas.t7m1 !== '') {
                this.tabatalbls = false;
                this.tabatapadding = false;
                this.r7m1Show = true;
                this.r6m2RestShow = false;
                //this.r6srtbtnShow = true;
                this.buttonDisabled = false;
                // Call a method to update the ion-content class
                this.r7m1Showc = true;
                this.r6m2RestShowc = false;
                this.updateIonContentClass();
              } else {
                this.r4m3restlbl = false;
                this.r4m3restfinbtn = true;
                this.endSound.play();
                this.isFinalTlbl = true;
              }
            }
          }
        }
        if (this.cdr6m2Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  //t7
  r7strt5SecTimertab(stabatas: Tabata) {
    //this.stopAllSounds();
    this.buttonDisabled = true; // Disable the button
    this.r7cd5Sec = 10;
    this.r7srtbtnShow = true;
    this.r7cd5SecShow = true;
    this.buttonText = 'GET READY!!!';
    this.tabatalbls = true;
    this.tabatapadding = true;
    const timerInterval = setInterval(() => {
      if (this.r7cd5Sec !== undefined && this.r7cd5Sec > 0) {
        this.r7cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr7m1Timertab(stabatas);
        this.r7cd5SecShow = false;
        this.r7srtbtnShow = false;
        this.t7prepimg = false;
        this.t7wvid = true;
        this.buttonText = 'Start Timer';
      }
      // Play sound when countdown is 3 seconds
      if (this.r7cd5Sec === 3) {
        this.startSound.play();
      }
    }, 1000); // Update the 5-second countdown every second
  }
  clearr7m1Cd() {
    if (this.cdr7m1Intval) {
      clearInterval(this.cdr7m1Intval);
    }
    this.cdr7m1Timer = undefined;
    this.isPr7m1Timer = false;
    this.remaincdr7m1 = undefined;
  }
  strtr7m1Timertab(stabatas: Tabata) {
  //  this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr7m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr7m1Timer = this.remaincdr7m1;
      } else if (this.cdr7m1Timer === undefined) {
        this.cdr7m1Timer = stabatas.move;
      }
      this.cdr7m1Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr7m1Timer && this.cdr7m1Timer > 0) {
            this.remaincdr7m1 = this.cdr7m1Timer; // Store remaining time
            this.cdr7m1Timer--;
          } else {
            if (this.tb7Counter != stabatas.sets) {
              clearInterval(this.cdr7m1Intval);
              this.clearr7m1Cd();

              this.r7m1Show = false;
              this.r7RestShow = true;
              this.r7m1Showc = false;
              this.r7m1RestShowc = true;
              this.updateIonContentClass();
              this.startr7Resttab(stabatas);
            } else if (
              this.tb7Counter == stabatas.sets &&
              stabatas.t8m1 != ''
            ) {
              clearInterval(this.cdr7m1Intval);
              this.clearr7m1Cd();

              this.r7m1Show = false;
              this.r8m1Show = true;
              this.r7m1Showc = false;
              this.r8m1Showc = true;
            } else {
              clearInterval(this.cdr7m1Intval);
              this.clearr7m1Cd();
              this.r7m1Show = false;
              this.r7RestShow = true;
              this.r7m1Showc = false;
              this.r7m1RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.playOnly(this.finmp3);
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr7m1Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  clearcdr7rest() {
    if (this.cdir7Rest) {
      clearInterval(this.cdir7Rest);
    }
    this.cdr7Rest = undefined;
  }
  startr7Resttab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr7Rest = this.remaincdr1rest;
      } else if (this.cdr7Rest === undefined) {
        this.cdr7Rest = stabatas.rest;
      }

      this.cdir7Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr7Rest && this.cdr7Rest > 0) {
            // Store remaining time
            this.cdr7Rest--;
          } else {
            clearInterval(this.cdir7Rest); // Use cdir2Rest, not cdr2Rest
            this.r7m1RestShowc = false;

            this.updateIonContentClass(); // Call a method to update the ion-content class
            this.clearcdr7rest();
            if (stabatas.t7m2 !== '') {
              this.tb7Counter++;
              this.r7RestShow = false;
              this.r7m2Show = true;
              this.r7m2Showc = true;
              this.r7m1RestShowc = false;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.cdr7m2Show = true;
              this.strtr7m2Timertab(stabatas);
              this.buttonDisabled = true;
            } else {
              if (this.r7sets !== stabatas.sets) {
                this.r7sets++;
                this.tb7Counter++;
                this.r7RestShow = false;
                this.r7m1Show = true;
                this.r7srtbtnShow = false;
                this.buttonDisabled = false;
                this.r7m1Showc = true;
                this.updateIonContentClass();
                this.cdr7m1Show = true;
                this.strtr7m1Timertab(stabatas);
              } else {
                if (stabatas.t8m1 !== '') {
                  this.tabatalbls = false;
                  this.tabatapadding = false;
                  this.r8m1Show = true;
                  this.r7RestShow = false;
                  this.buttonDisabled = false;
                  this.r8m1Showc = true;
                  this.r7m1RestShowc = false;
                  this.updateIonContentClass(); // Call a method to update the ion-content class
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                  this.isFinalTlbl = true;
                }
              }
            }
          }
        }
        if (this.cdr7Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  clearr7m2Cd() {
    if (this.cdr7m2Intval) {
      clearInterval(this.cdr7m2Intval);
    }
    this.cdr7m2Timer = undefined;
    this.isPr7m2Timer = false;
    this.remaincdr7m2 = undefined;
  }
  strtr7m2Timertab(stabatas: Tabata) {
    //this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr7m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr7m2Timer = this.remaincdr7m2;
      } else if (this.cdr7m2Timer === undefined) {
        this.cdr7m2Timer = stabatas.move;
      }
      this.cdr7m2Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr7m2Timer && this.cdr7m2Timer > 0) {
            this.remaincdr7m2 = this.cdr7m2Timer; // Store remaining time
            this.cdr7m2Timer--;
          } else {
            if (this.tb7Counter != stabatas.sets) {
              clearInterval(this.cdr7m2Intval);
              this.clearr7m2Cd();
              this.r7m2Show = false;
              this.r7m2RestShow = true;
              this.r7m2Showc = false;
              this.r7m2RestShowc = true;
              this.updateIonContentClass();
              this.startr7m2Resttab(stabatas);
            } else if (
              this.tb7Counter == stabatas.sets &&
              stabatas.t8m1 != ''
            ) {
              clearInterval(this.cdr7m2Intval);
              this.clearr7m2Cd();
              this.r7m2Show = false;
              this.r7m2Showc = false;
              this.r8m1Show = true;
              this.r8m1Showc = true;
              this.tabatalbls = false;
              this.tabatapadding = false;
              this.buttonDisabled = false;
            } else {
              clearInterval(this.cdr7m2Intval);
              this.clearr7m2Cd();
              this.r7m2Show = false;
              this.r7m2RestShow = true;
              this.r7m2Showc = false;
              this.r7m2RestShowc = true;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr7m2Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  clearcdr7m2rest() {
    if (this.cdir7m2Rest) {
      clearInterval(this.cdir7m2Rest);
    }
    this.cdr7m2Rest = undefined;
  }
  startr7m2Resttab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr7m2Rest = this.remaincdr1rest;
      } else if (this.cdr7m2Rest === undefined) {
        this.cdr7m2Rest = stabatas.rest;
      }

      this.cdir7m2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr7m2Rest && this.cdr7m2Rest > 0) {
            // Store remaining time
            this.cdr7m2Rest--;
          } else {
            clearInterval(this.cdir7m2Rest);
            this.r7m2RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr7m2rest();

            if (this.r7sets !== 4) {
              this.r7sets++;
              this.tb7Counter++;
              this.r7m2RestShow = false;
              this.r7m1Show = true;
              this.r7m1Showc = true;
              this.cdr7m1Show = true;
              this.r7srtbtnShow = false;
              this.buttonDisabled = false;
              this.cdr7m1Show = true;
              this.updateIonContentClass();
              this.cdr7m1Show = true;
              this.strtr7m1Timertab(stabatas);
            } else {
              if (stabatas.t8m1 !== '') {
                this.tabatalbls = false;
                this.tabatapadding = false;
                this.r8m1Show = true;
                this.r7m2RestShow = false;
                //this.r6srtbtnShow = true;
                this.buttonDisabled = false;
                // Call a method to update the ion-content class
                this.r8m1Showc = true;
                this.r7m2RestShowc = false;
                this.updateIonContentClass();
              } else {
                this.r4m3restlbl = false;
                this.r4m3restfinbtn = true;
                this.endSound.play();
                this.isFinalTlbl = true;
              }
            }
          }
        }
        if (this.cdr7m2Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  //t8
  r8strt5SecTimertab(stabatas: Tabata) {
   // this.stopAllSounds();
    this.buttonDisabled = true; // Disable the button
    this.r8cd5Sec = 10;
    this.r8srtbtnShow = true;
    this.r8cd5SecShow = true;
    this.buttonText = 'GET READY!!!';
    this.tabatalbls = true;
    this.tabatapadding = true;
    const timerInterval = setInterval(() => {
      if (this.r8cd5Sec !== undefined && this.r8cd5Sec > 0) {
        this.r8cd5Sec--;
      } else {
        clearInterval(timerInterval);
        this.strtr8m1Timertab(stabatas);
        this.r8cd5SecShow = false;
        this.r8srtbtnShow = false;
        this.t8prepimg = false;
        this.t8wvid = true;
        this.buttonText = 'Start Timer';
      }
      // Play sound when countdown is 3 seconds
      if (this.r8cd5Sec === 3) {
        this.startSound.play();
      }
    }, 1000); // Update the 5-second countdown every second
  }
  clearr8m1Cd() {
    if (this.cdr8m1Intval) {
      clearInterval(this.cdr8m1Intval);
    }
    this.cdr8m1Timer = undefined;
    this.isPr8m1Timer = false;
    this.remaincdr8m1 = undefined;
  }
  strtr8m1Timertab(stabatas: Tabata) {
  //  this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr8m1Timer) {
        // Resume the countdown with the remaining time
        this.cdr8m1Timer = this.remaincdr8m1;
      } else if (this.cdr8m1Timer === undefined) {
        this.cdr8m1Timer = stabatas.move;
      }
      this.cdr8m1Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr8m1Timer && this.cdr8m1Timer > 0) {
            this.remaincdr8m1 = this.cdr8m1Timer; // Store remaining time
            this.cdr8m1Timer--;
          } else if (this.r8sets === stabatas.sets) {
            clearInterval(this.cdr8m1Intval);
            this.clearr8m1Cd();
            this.isFinalTlbl = true;
            this.r8m1Show = false;
            this.r8RestShow = true;
            //bankai
            this.r8m1Showc = false;
            this.r8m1RestShowc = true;
            this.updateIonContentClass();
            this.r4m3restlbl = false;
            this.r4m3restfinbtn = true;
            this.endSound.play();
            this.isFinalTlbl = true;
          } else {
            clearInterval(this.cdr8m1Intval);
            this.clearr8m1Cd();

            this.r8m1Show = false;
            this.r8RestShow = true;
            //bankai
            this.r8m1Showc = false;
            this.r8m1RestShowc = true;
            this.updateIonContentClass();
            this.startr8Resttab(stabatas);
          }
        }
        if (this.cdr8m1Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  clearcdr8rest() {
    if (this.cdir8Rest) {
      clearInterval(this.cdir8Rest);
    }
    this.cdr8Rest = undefined;
  }
  startr8Resttab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr8Rest = this.remaincdr1rest;
      } else if (this.cdr8Rest === undefined) {
        this.cdr8Rest = stabatas.rest;
      }

      this.cdir8Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr8Rest && this.cdr8Rest > 0) {
            // Store remaining time
            this.cdr8Rest--;
          } else {
            clearInterval(this.cdir8Rest); // Use cdir2Rest, not cdr2Rest
            this.r8m1RestShowc = false;

            this.updateIonContentClass(); // Call a method to update the ion-content class
            this.clearcdr8rest();
            if (stabatas.t8m2 !== '') {
              this.tb8Counter++;
              this.r8RestShow = false;
              this.r8m2Show = true;
              this.r8m2Showc = true;
              this.r8m1RestShowc = false;
              this.updateIonContentClass(); // Call a method to update the ion-content class
              this.cdr8m2Show = true;
              this.strtr8m2Timertab(stabatas);
              this.buttonDisabled = true;
            } else {
              if (this.r8sets !== stabatas.sets) {
                this.r8sets++;
                this.tb8Counter++;
                this.r8RestShow = false;
                this.r8m1Show = true;
                this.r8srtbtnShow = false;
                this.buttonDisabled = false;
                this.r8m1Showc = true;
                this.updateIonContentClass();
                this.cdr8m1Show = true;
                this.strtr8m1Timertab(stabatas);
              } else {
                if (stabatas.t8m2 !== '') {
                  this.tabatalbls = false;
                  this.tabatapadding = false;
                  this.r8m2Show = true;
                  this.r8RestShow = false;

                  this.r8m2Showc = true;
                  this.r8m1RestShowc = false;
                  this.updateIonContentClass(); // Call a method to update the ion-content class
                } else {
                  this.r4m3restlbl = false;
                  this.r4m3restfinbtn = true;
                  this.endSound.play();
                  this.isFinalTlbl = true;
                }
              }
            }
          }
        }
        if (this.cdr8Rest === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  clearr8m2Cd() {
    if (this.cdr8m2Intval) {
      clearInterval(this.cdr8m2Intval);
    }
    this.cdr8m2Timer = undefined;
    this.isPr8m2Timer = false;
    this.remaincdr8m2 = undefined;
  }
  strtr8m2Timertab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.move) {
      if (this.isPr8m2Timer) {
        // Resume the countdown with the remaining time
        this.cdr8m2Timer = this.remaincdr8m2;
      } else if (this.cdr8m2Timer === undefined) {
        this.cdr8m2Timer = stabatas.move;
      }
      this.cdr8m2Intval = setInterval(() => {
        if (!this.isPaused) {
          if (this.cdr8m2Timer && this.cdr8m2Timer > 0) {
            this.remaincdr8m2 = this.cdr8m2Timer; // Store remaining time
            this.cdr8m2Timer--;
          } else {
            if (this.tb8Counter != stabatas.sets) {
              clearInterval(this.cdr8m2Intval);
              this.clearr8m2Cd();
              this.r8m2Show = false;
              this.r8m2RestShow = true;
              this.r8m2Showc = false;
              this.r8m2RestShowc = true;
              this.updateIonContentClass();
              this.startr8m2Resttab(stabatas);
            } else {
              clearInterval(this.cdr8m2Intval);
              this.clearr8m2Cd();
              this.r8m2Show = false;
              this.r8m2RestShow = true;
              this.r8m2Showc = false;
              this.r8m2RestShowc = true;
              this.updateIonContentClass();
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr8m2Timer === 3) {
          this.halfwaySound.play();
        }
      }, 1000);
    }
  }
  clearcdr8m2rest() {
    if (this.cdir8m2Rest) {
      clearInterval(this.cdir8m2Rest);
    }
    this.cdr8m2Rest = undefined;
  }
  startr8m2Resttab(stabatas: Tabata) {
   // this.stopAllSounds();
    if (stabatas.rest) {
      if (this.isRestPaused) {
        this.cdr8m2Rest = this.remaincdr1rest;
      } else if (this.cdr8m2Rest === undefined) {
        this.cdr8m2Rest = stabatas.rest;
      }

      this.cdir8m2Rest = setInterval(() => {
        if (!this.isRestPaused) {
          if (this.cdr8m2Rest && this.cdr8m2Rest > 0) {
            // Store remaining time
            this.cdr8m2Rest--;
          } else {
            clearInterval(this.cdir8m2Rest);
            this.r8m2RestShowc = false;

            this.updateIonContentClass();
            this.clearcdr8m2rest();

            if (this.r8sets !== 4) {
              this.r8sets++;
              this.tb8Counter++;
              this.r8m2RestShow = false;
              this.r8m1Show = true;
              this.r8m1Showc = true;
              this.cdr8m1Show = true;
              this.r8srtbtnShow = false;
              this.buttonDisabled = false;
              this.cdr8m1Show = true;
              this.updateIonContentClass();
              this.cdr8m1Show = true;
              this.strtr8m1Timertab(stabatas);
            } else {
              this.r4m3restlbl = false;
              this.r4m3restfinbtn = true;
              this.endSound.play();
              this.isFinalTlbl = true;
            }
          }
        }
        if (this.cdr8m2Rest === 3) {
          this.halfwaySound.play();
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
  async openFullscreenVideo(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.openVideoModal(videoUrl);
  }
  async openVideoModal(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: VideoModalComponent, // Create a separate component for the modal content
      canDismiss: true, // Enable swipe back
      backdropDismiss: true,
      presentingElement: await this.modalController.getTop(), // Needed for swipe to close to work
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvr1m2(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({ orientation: 'landscape' });

    // Open the video modal
    this.openr1m2vm(videoUrl);
  }
  async openr1m2vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: R1m2Component,
      canDismiss: true, // Enable swipe back
      backdropDismiss: true,
      presentingElement: await this.modalController.getTop(), // Needed for swipe to close to work // Create a separate component for the modal content
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    modal.onWillDismiss().then(async () => {
      await ScreenOrientation.unlock();
    });
  }
  async ofvr1m3(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.openr1m3vm(videoUrl);
  }
  async openr1m3vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: R1m3Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });

    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvr2m1(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.openr2m1vm(videoUrl);
  }
  async openr2m1vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: R2m1Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvr2m2(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.openr2m2vm(videoUrl);
  }
  async openr2m2vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: R2m2Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvr2m3(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.openr2m3vm(videoUrl);
  }
  async openr2m3vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: R2m3Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvr3m1(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.openr3m1vm(videoUrl);
  }
  async openr3m1vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: R3m1Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvr3m2(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.openr3m2vm(videoUrl);
  }
  async openr3m2vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: R3m2Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvr3m3(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.openr3m3vm(videoUrl);
  }
  async openr3m3vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: R3m3Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvr4m1(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.openr4m1vm(videoUrl);
  }
  async openr4m1vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: R4m1Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvr4m2(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.openr4m2vm(videoUrl);
  }
  async openr4m2vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: R4m2Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvr4m3(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.openr4m3vm(videoUrl);
  }
  async openr4m3vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: R4m3Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  //tabata video modals________________________________________________________________________________________________________________________________
  async ofvt1m1(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent1m1vm(videoUrl);
  }
  async opent1m1vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T1m1Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt1m2(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent1m2vm(videoUrl);
  }
  async opent1m2vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T1m2Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt2m1(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent2m1vm(videoUrl);
  }
  async opent2m1vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T2m1Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt2m2(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent2m2vm(videoUrl);
  }
  async opent2m2vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T2m2Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt3m1(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent3m1vm(videoUrl);
  }
  async opent3m1vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T3m1Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt3m2(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent3m2vm(videoUrl);
  }
  async opent3m2vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T3m2Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt4m1(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent4m1vm(videoUrl);
  }
  async opent4m1vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T4m1Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt4m2(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent4m2vm(videoUrl);
  }
  async opent4m2vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T4m2Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt5m1(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent5m1vm(videoUrl);
  }
  async opent5m1vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T5m1Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt5m2(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent5m2vm(videoUrl);
  }
  async opent5m2vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T5m2Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt6m1(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent6m1vm(videoUrl);
  }
  async opent6m1vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T6m1Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt6m2(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent6m2vm(videoUrl);
  }
  async opent6m2vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T6m2Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt7m1(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent7m1vm(videoUrl);
  }
  async opent7m1vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T7m1Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt7m2(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent7m2vm(videoUrl);
  }
  async opent7m2vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T7m2Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt8m1(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent8m1vm(videoUrl);
  }
  async opent8m1vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T8m1Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }
  async ofvt8m2(videoUrl: string) {
    // Lock screen orientation to landscape
    await ScreenOrientation.lock({
      orientation: 'landscape',
    });

    // Open the video modal
    this.opent8m2vm(videoUrl);
  }
  async opent8m2vm(videoUrl: string) {
    // Sanitize the video URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    const modal = await this.modalController.create({
      component: T8m2Component, // Create a separate component for the modal content
      canDismiss: true,
      backdropDismiss: true,
      componentProps: {
        videoUrl: videoUrl, // Pass the video URL to the modal component
      },
    });
    await modal.present();
    // Listen for modal dismissal and unlock the orientation
    await modal.onWillDismiss();
    await ScreenOrientation.unlock();
  }

  redirectToHome() {
    this.clearr1m1Cd();
    this.clearcdr1rest();
    this.clearr1m2Cd();
    this.clearcdr1m2rest();
    this.clearr1m3Cd();
    this.clearcdr1m3rest();
    this.clearr2m1Cd();
    this.clearcdr2rest();
    this.clearr2m2Cd();
    this.clearcdr2m2rest();
    this.clearr2m3Cd();
    this.clearcdr2m3rest();
    this.clearr3m1Cd();
    this.clearcdr3rest();
    this.clearr3m2Cd();
    this.clearcdr3m2rest();
    this.clearr3m3Cd();
    this.clearcdr3m3rest();
    this.clearr4m1Cd();
    this.clearcdr4rest();
    this.clearr4m2Cd();
    this.clearcdr4m2rest();
    this.clearr4m3Cd();
    this.clearcdr4m3rest();
    this.clearcdr8m2rest();
    this.clearr8m2Cd();
    this.clearcdr8rest();
    this.clearr8m1Cd();
    this.clearcdr7m2rest();
    this.clearr7m2Cd();
    this.clearcdr7rest();
    this.clearr7m1Cd();
    this.clearcdr6m2rest();
    this.clearr6m2Cd();
    this.clearcdr6rest();
    this.clearr6m1Cd();
    this.clearcdr5m2rest();
    this.clearr5m2Cd();
    this.clearcdr5rest();
    this.clearr5m1Cd();
    this.stopAllSounds();
    this.stopAllTimers();
    this.router.navigate(['/chome']); // Replace 'home' with the actual route name of your home page
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: FriendsComponent,
      componentProps: {},
      cssClass: 'half-modal', // Add a CSS class to customize modal positioning
    });
    return await modal.present();
  }
  searchUsers(event: any) {
    const searchTerm: string = event.target.value.toLowerCase();
    this.searchTermSubject.next(searchTerm);
  }
  targetUserUid: string = '';

 
  invfrmview: boolean = false;
  openinvfrm() {
    this.invfrmview = true;
  }
  closeinvfrm() {
    this.invfrmview = false;
  }

  ngOnDestroy() {
    this.clearr1m1Cd();
    const sounds = [this.audio, this.audio2, this.restmp3, this.rest2mp3, this.finmp3, this.donmp3, this.beepmp3];
    sounds.forEach((sound) => {
      if (sound) {
        sound.pause();
        sound.src = '';
        sound.load(); // clears memory
      }
    });
  }

  onVideoError() {
    // Handle any errors related to the video loading here
    console.error('Video failed to load');
  }
  showConfetti = false;

motivateFriends() {
  this.showMotivatedConfetti();

  this.authService.getCurrentUser().subscribe(async (user) => {
    if (!user) {
      this.showToast('You must be logged in to send motivation.');
      return;
    }

    try {
      const snapshot = await firstValueFrom(this.firestore.collection('users').doc(user.uid).get());
      if (!snapshot.exists) {
        this.showToast('Your user data was not found.');
        return;
      }

      const senderData: any = snapshot.data();
      const senderFname = senderData?.fName || 'Unknown';
      const senderLname = senderData?.lName || '';
      const senderDp = senderData?.dpImage || 'assets/default.jpg';

      const promises = this.friends.map(friend =>
        this.friendsService.sendMotivation(user.uid, friend.id, senderFname, senderLname, senderDp)
      );

      await Promise.all(promises);

      this.showToast('Motivation sent to all your friends!');
    } catch (error) {
      console.error('Error sending motivation:', error);
      this.showToast('Failed to send motivation.');
    }
  });
}


showMotivatedConfetti() {
  this.showConfetti = true;
  setTimeout(() => {
    this.showConfetti = false;
  }, 2000);
}
async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  friends: any[] = [];

  loadFriends() {
    this.authService.getCurrentUser().pipe(take(1)).subscribe((currentUser) => {
      if (currentUser?.uid) {
        this.firestore
          .doc(`users/${currentUser.uid}`)
          .valueChanges()
          .pipe(take(1))
          .subscribe((userData: any) => {
            const friendUIDs: string[] = userData?.friends || [];
            if (friendUIDs.length > 0) {
              this.firestore
                .collection('users', (ref) => ref.where(
                  firebase.firestore.FieldPath.documentId(), 'in', friendUIDs.slice(0, 10) // Firestore allows max 10 items for 'in'
                ))
                .valueChanges({ idField: 'id' })
                .subscribe((friendList: any[]) => {
                  this.friends = friendList;
                });
            } else {
              this.friends = [];
            }
          });
      }
    });
  }

}
