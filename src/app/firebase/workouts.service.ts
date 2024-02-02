import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, map, of } from 'rxjs';
import { Timestamp } from '@firebase/firestore';

export interface Workout {
  id?: string;
  wodCat: string;
  wodStyle: string;
  rounds: number;
  mpr: number;
  r1m1: string;
  r1m2?: string;
  r1m3?: string;
  r1sets: number;
  r1move: number;
  r1rest: number;
  r2m1?: string;
  r2m2?: string;
  r2m3?: string;
  r2sets?: number;
  r2move?: number;
  r2rest?: number;
  r3m1?: string;
  r3m2?: string;
  r3m3?: string;
  r3sets?: number;
  r3move?: number;
  r3rest?: number;
  r4m1?: string;
  r4m2?: string;
  r4m3?: string;
  r4sets?: number;
  r4move?: number;
  r4rest?: number;
  daDate: string;
  styleName?: string;
  styleDescription?: string;
  exe?: Exercise;
  exeR1M2?: Exercise;
  exeR1M3?: Exercise;
  exeR2M1?: Exercise;
  exeR2M2?: Exercise;
  exeR2M3?: Exercise;
  exeR3M1?: Exercise;
  exeR3M2?: Exercise;
  exeR3M3?: Exercise;
  exeR4M1?: Exercise;
  exeR4M2?: Exercise;
  exeR4M3?: Exercise;
}
export interface Tabata{
  id: string;
    wodCat: string;
    wodStyle: string;
    tabataNum: number;
    mpt: number;
    t1m1: string;
    t1m2: string;
    t2m1: string;
    t2m2: string;
    t3m1: string;
    t3m2: string;
    t4m1: string;
    t4m2: string;
    t5m1: string;
    t5m2: string;
    move: number;
    rest: number;
    sets: number;
    daDate: string;
    styleName?: string;
  styleDescription?: string;
  exe?: Exercise;
  exet1m2?: Exercise;
  exet2m1?: Exercise;
  exet2m2?: Exercise;
  exet3m1?: Exercise;
  exet3m2?: Exercise;
  exet4m1?: Exercise;
  exet4m2?: Exercise;
  exet5m1?: Exercise;
  exet5m2?: Exercise;

  
}
export class Style {
  constructor(public styleName: string, public styleDescription: string) {}
}
export class Exercise {
  constructor(
    public exeId: number,
    public exeName: string,
    public videoUrl: string,
    public mobileUrl: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  private workoutCollection: AngularFirestoreCollection<Workout>;
  private readonly collectionName = 'workouts';
  private tabataCollection: AngularFirestoreCollection<Tabata>;
  private readonly tcollectionName = 'tabatas';
  constructor(private readonly firestore: AngularFirestore) {
    this.workoutCollection = this.firestore.collection<Workout>(
      this.collectionName
    );
    this.tabataCollection = this.firestore.collection<Tabata>(
      this.tcollectionName
    );
  }

  // Create a new workout
  createWorkout(workout: Workout): Promise<void> {
    const id = this.firestore.createId();
    return this.workoutCollection.doc(id).set({ id, ...workout });
  }

  // Get all workouts
  getAllWorkouts(): Observable<Workout[]> {
    return this.workoutCollection.valueChanges({ idField: 'id' });
  }
  getAllTabatas(): Observable<Tabata[]> {
    return this.tabataCollection.valueChanges({ idField: 'id' });
  }

  // Get a specific workout by ID
  getWorkoutById(id: string): Observable<Workout | undefined> {
    return this.workoutCollection.doc<Workout>(id).valueChanges();
  }

  // Update a workout
  updateWorkout(id: string | undefined, updatedWorkout: Workout): Promise<void> {
    return this.workoutCollection.doc(id).update(updatedWorkout);
  }

  // Delete a workout
  deleteWorkout(id: string| undefined): Promise<void> {
    return this.workoutCollection.doc(id).delete();
  }
  deleteTabata(id: string| undefined): Promise<void> {
    return this.tabataCollection.doc(id).delete();
  }

   // Get workouts with specific conditions (Warm Up and today's date)
  getSpecificWorkouts(): Observable<Workout[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.workoutCollection.valueChanges({ idField: 'id' }).pipe(
      map((workouts: Workout[]) =>
        workouts.filter(
          (workout: Workout) =>
            workout.wodCat === 'Warm Up' &&
            this.isSameDate(today, new Date(workout.daDate))
        )
      )
    );
  }
  getSpecificWOD(): Observable<Workout[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.workoutCollection.valueChanges({ idField: 'id' }).pipe(
      map((workouts: Workout[]) =>
        workouts.filter(
          (workout: Workout) =>
            workout.wodCat === 'WOD' &&
            this.isSameDate(today, new Date(workout.daDate))
        )
      )
    );
  }
  getSpecificTabata(): Observable<Tabata[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.tabataCollection.valueChanges({ idField: 'id' }).pipe(
      map((tabatas: Tabata[]) =>
      tabatas.filter(
          (tabata: Tabata) =>
          tabata.wodCat === 'WOD' &&
            this.isSameDate(today, new Date(tabata.daDate))
        )
      )
    );
  }
  getSpecificTabataWod(): Observable<Tabata[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.tabataCollection.valueChanges({ idField: 'id' }).pipe(
      map((tabatas: Tabata[]) =>
      tabatas.filter(
          (tabata: Tabata) =>
          tabata.wodCat === 'Warm Up' &&
            this.isSameDate(today, new Date(tabata.daDate))
        )
      )
    );
  }

  // Helper function to check if two dates are the same
  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  ///////////////wodstyle/////////////////
  private wodStyles: Style[] = [
    new Style(
      'EMOM',
      'Perform a specific movement for a duration of one minute, transition immediately to the next movement at the start of the following minute. Continue for x number of minutes.'
    ),
    new Style(
      'TABATA',
      'It consists of performing an exercise at maximum effort for 20 seconds, followed by a 10-second rest and repeating this cycle for a total of eight rounds.'
    ),
    new Style(
      'LADDER',
      'Start with a set number of repetitions for an exercise and increase it with each round until you reach a designated endpoint.'
    ),
    new Style(
      'INTERVAL',
      'INTERVAL WOD alternates high-intensity exercises for (X) rounds, with (Y) seconds of work and (Z) seconds of rest, performed for a set number of rounds.'
    ),
    new Style(
      'AMRAP',
      '(as many rounds as possible) As many rounds of specific movements as possible in a X amount of time'
    ),
  ];
  // Read all WorkoutStyles
  getAllWodStyles(): Style[] {
    return this.wodStyles;
  }
  getStyleByName(styleName: string): Observable<Style | undefined> {
    const style = this.wodStyles.find((s) => s.styleName === styleName);
    return of(style);
  }
  

  //Moves
  private moves: Exercise[] = [
    new Exercise(
      1,
      'Weighted WodBox Step-ups',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/1.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/1mbl.mp4'
    ),
    new Exercise(
      2,
      'WodBox Jumps',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/2.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/2mbl.mp4'
    ),
    new Exercise(
      3,
      'WodBox Step Overs',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/3.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/3mbl.mp4'
    ),
    new Exercise(
      4,
      'DB Front Rack Reverse Lunges',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/4.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/4mbl.mp4'
    ),
    new Exercise(
      5,
      'Single Arm DB Push-Press',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/5.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/5mbl.mp4',
    ),
    new Exercise(
      6,
      'Dumbbell Front Rack Squat',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/6.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/6mbl.mp4',
    ),
    new Exercise(
      7,
      'High Plank Dumbbell Drag Across',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/7.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/7mbl.mp4',
    ),
    new Exercise(
      8,
      'KB Single Leg Romanian Deadlift',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/8.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/8mbl.mp4'
    ),
    new Exercise(
      9,
      'Russian Twists with Dumbell',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/9.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/9mbl.mp4',
    ),
    new Exercise(
      10,
      'Upright KB Row',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/10.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/10mbl.mp4',
    ),
    new Exercise(
      11,
      'Burpee',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/11.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/11mbl.mp4',

    ),
    new Exercise(
      12,
      'Mountain Climbers',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/12.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/12mbl.mp4',
    ),
    new Exercise(
      13,
      'Glute Bridges',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/13.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/13mbl.mp4',
    ),
    new Exercise(
      14,
      'Pike Push-ups (Feet on Box)',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/14.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/14mbl.mp4',

    ),
    new Exercise(
      15,
      'Burpee WodBox Jump',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/15.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/15mbl.mp4',
    ),
    new Exercise(
      16,
      'Bulgarian Split Squats',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/16.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/16mbl.mp4',
    ),
    new Exercise(
      17,
      'Single Arm Rows on Box',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/17.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/17mbl.mp4',
    ),
    new Exercise(
      18,
      'Thrusters Single Arm DB',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/18.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/18mbl.mp4',
    ),
    new Exercise(
      19,
      'Clean and Jerk with Dumbbells',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/19.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/19mbl.mp4',
    ),
    new Exercise(
      20,
      'Weighted Sit-ups (Single Hand DB)',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/20.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/20mbl.mp4',
    ),
    new Exercise(
      21,
      'Sumo Deadlift',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/21.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/21mbl.mp4',
    ),
    new Exercise(
      22,
      'Sumo Deadlift High Pull',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/22.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/22mbl.mp4',
    ),
    new Exercise(
      23,
      'Triceps Overhead Extension',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/23.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/23mbl.mp4',
    ),
    new Exercise(
      24,
      'Dumbbell Snatches Alternating',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/24.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/24mbl.mp4',
    ),
    new Exercise(
      25,
      'Push-up Kick Through',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/25.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/25mbl.mp4',
    ),
    new Exercise(
      26,
      'Plank',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/26.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/26mbl.mp4',
    ),
    new Exercise(
      27,
      'Shoulder Taps',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/27.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/27mbl.mp4',

    ),
    new Exercise(
      28,
      'Box Jump Over',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/28.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/28mbl.mp4',
    ),
    new Exercise(
      29,
      'WodBox Dips',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/29.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/29mbl.mp4',
    ),
    new Exercise(
      30,
      'Elevated WodBox Push-ups',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/30.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/30mbl.mp4',
    ),
    new Exercise(
      31,
      'WodBox Toe Taps',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/31.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/31mbl.mp4',
    ),
    new Exercise(
      32,
      'WodBox Leg Tucks',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/32.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/32mbl.mp4',
    ),
    new Exercise(
      33,
      'Hang Clean & Jerk',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/33.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/33mbl.mp4',
    ),
    new Exercise(
      34,
      'Man Makers (Single Arm)',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/34.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/34mbl.mp4',
    ),
    new Exercise(
      35,
      'Kettlebell Swings',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/35.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/35mbl.mp4',
    ),
    new Exercise(
      36,
      'Goblet Squat',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/36.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/36mbl.mp4',
    ),
    new Exercise(
      37,
      'Kettlebell Bicep Curl',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/37.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/37mbl.mp4',
    ),
    new Exercise(
      38,
      'Overhead Reverse Lunges',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/38.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/38mbl.mp4',
    ),
    new Exercise(
      39,
      'Push-ups',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/39.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/39mbl.mp4',
    ),
    new Exercise(
      40,
      'Sit-ups',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/40.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/40mbl.mp4',
    ),
    new Exercise(
      41,
      'Squat Jump',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/41.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/41mbl.mp4',
    ),
    new Exercise(
      42,
      'Jumping Jacks',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/42.mp4',
      'https://storage.googleapis.com/wodbox-alpha.appspot.com/vids/42mbl.mp4',
    ),
  ];
  getAllMoves(): Exercise[] {
    return this.moves;
  }
  getExebyname(exeName: string): Observable<Exercise | undefined> {
    const exercise = this.moves.find((e) => e.exeName === exeName);
    return of(exercise);
  }
  
}
