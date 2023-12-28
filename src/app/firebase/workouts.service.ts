import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Timestamp } from '@firebase/firestore';

export interface Workout {
  id?: string;
  wodCat: string;
  wodStyle: string;
  rounds: number;
  mpr: number;
  r1m1: string;
  r1m2: string;
  r1m3: string;
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

  constructor(private readonly firestore: AngularFirestore) {
    this.workoutCollection = this.firestore.collection<Workout>(
      this.collectionName
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

  // Get a specific workout by ID
  getWorkoutById(workoutId: string): Observable<Workout | undefined> {
    return this.workoutCollection.doc<Workout>(workoutId).valueChanges();
  }

  // Update a workout
  updateWorkout(workoutId: string, updatedWorkout: Workout): Promise<void> {
    return this.workoutCollection.doc(workoutId).update(updatedWorkout);
  }

  // Delete a workout
  deleteWorkout(workoutId: string): Promise<void> {
    return this.workoutCollection.doc(workoutId).delete();
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
      'Alternates high-intensity exercise with rest (X number of rounds, Y amount of sec work and Z amount of rest)'
    ),
    new Style(
      'FGB (Fight gone bad)',
      '17-minute HIIT WOD 5 x exercises. Rotate stations, maximum reps per station. (3 rounds 5 min work. You have 1 minute rest after the first and second 5 min of work) total time 17 min'
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

  //Moves
  private moves: Exercise[] = [
    new Exercise(
      1,
      'Weighted WodBox Step-ups',
      '/assets/videos/41 WodBox Weighted Step-up.mp4',
      '/assets/videos/WodBox Weighted Step-up.mp4'
    ),
    new Exercise(
      2,
      'WodBox Jumps',
      '/assets/videos/40 WodBox Jumps.mp4',
      '/assets/videos/WodBox Jumps.mp4'
    ),
    new Exercise(
      3,
      'WodBox Step Overs',
      '/assets/videos/37 WodBox Step Overs.mp4',
      '/assets/videos/WodBox Step Overs.mp4'
    ),
    new Exercise(
      4,
      'DB Front Rack Reverse Lunges',
      '/assets/videos/10 DB Front Rack Reverse Lunges.mp4',
      '/assets/videos/DB Front Rack Reverse Lunges.mp4'
    ),
    new Exercise(
      5,
      'Single Arm DB Push-Press',
      '/assets/videos/9 Single Arm DB Push-Press.mp4',
      '/assets/videos/Single Arm DB Push-Press.mp4'
    ),
    new Exercise(
      6,
      'Dumbbell Front Rack Squat',
      '/assets/videos/8 DB Front Rack Squat.mp4',
      '/assets/videos/DB Front Rack Squat.mp4'
    ),
    new Exercise(
      7,
      'High Plank Dumbbell Drag Across',
      '/assets/videos/15 High Plank DB Drag Across.mp4',
      '/assets/videos/High Plank Drag Across.mp4'
    ),
    new Exercise(
      8,
      'KB Single Leg Romanian Deadlift',
      '/assets/videos/16 KB Single Leg Romanian Deadlift.mp4',
      '/assets/videos/KB Single Leg Romanian Deadlift.mp4'
    ),
    new Exercise(
      9,
      'Russian Twists with Dumbell',
      '/assets/videos/17 Russian twists with DB.mp4',
      '/assets/videos/Russian twists with DB.mp4'
    ),
    new Exercise(
      10,
      'Upright KB Row',
      '/assets/videos/18 Upright KB Row.mp4',
      '/assets/videos/Upright KB Row.mp4'
    ),
    new Exercise(
      11,
      'Burpee',
      '/assets/videos/19 Burpee.mp4',
      '/assets/videos/Burpee.mp4'
    ),
    new Exercise(
      12,
      'Mountain Climbers',
      '/assets/videos/20 Mountain climbers.mp4',
      '/assets/videos/Mountain Climbers.mp4'
    ),
    new Exercise(
      13,
      'Glute Bridges',
      '/assets/videos/21 Glute bridges.mp4',
      '/assets/videos/Glute bridges.mp4'
    ),
    new Exercise(
      14,
      'Pike Push-ups (Feet on Box)',
      '/assets/videos/22 Pike Push-ups',
      '/assets/videos/Pike Push-ups.mp4'
    ),
    new Exercise(
      15,
      'Burpee WodBox Jump',
      '/assets/videos/23 Burpee WodBox Jump',
      '/assets/videos/Burpee WodBox Jump.mp4'
    ),
    new Exercise(
      16,
      'Bulgarian Split Squats',
      '/assets/videos/24 Bulgarian Split squats',
      '/assets/videos/Bulgarian Split Squats.mp4'
    ),
    new Exercise(
      17,
      'Single Arm Rows on Box',
      '/assets/videos/11 Single arm Rows on Box',
      '/assets/videos/Single Arm Rows on Box.mp4'
    ),
    new Exercise(
      18,
      'Thrusters Single Arm DB',
      '/assets/videos/42 DB Thrusters Single Arm',
      '/assets/videos/DB Thrusters Single Arm.mp4'
    ),
    new Exercise(
      19,
      'Clean and Jerk with Dumbbells',
      '/assets/videos/26 Clean and Jerk Single Arm',
      '/assets/videos/Clean and Jerk Single Arm.mp4'
    ),
    new Exercise(
      20,
      'Weighted Sit-ups (Single Hand DB)',
      '/assets/videos/27 Weighted Sit-ups',
      '/assets/videos/Weighted Sit-ups.mp4'
    ),
    new Exercise(
      21,
      'Sumo Deadlift',
      'https://localhost:7013/api/videos/21.mp4',
      'https://localhost:7013/api/videos/21mbl.mp4'
    ),
    new Exercise(
      22,
      'Sumo Deadlift High Pull',
      'https://localhost:7013/api/videos/22.mp4',
      'https://localhost:7013/api/videos/22mbl.mp4'
    ),
    new Exercise(
      23,
      'Triceps Overhead Extension',
      'https://localhost:7013/api/videos/23.mp4',
      'https://localhost:7013/api/videos/23mbl.mp4'
    ),
    new Exercise(
      24,
      'Dumbbell Snatches Alternating',
      'https://localhost:7013/api/videos/24.mp4',
      'https://localhost:7013/api/videos/24mbl.mp4'
    ),
    new Exercise(
      25,
      'Push-up Kick Through',
      'https://localhost:7013/api/videos/25.mp4',
      'https://localhost:7013/api/videos/25mbl.mp4'
    ),
    new Exercise(
      26,
      'Plank',
      'https://localhost:7013/api/videos/26.mp4',
      'https://localhost:7013/api/videos/26mbl.mp4'
    ),
    new Exercise(
      27,
      'Shoulder Taps',
      'https://localhost:7013/api/videos/27.mp4',
      'https://localhost:7013/api/videos/27mbl.mp4'
    ),
    new Exercise(
      28,
      'Box Jump Over',
      'https://localhost:7013/api/videos/84.mp4',
      'https://localhost:7013/api/videos/28mbl.mp4'
    ),
    new Exercise(
      29,
      'WodBox Dips',
      'https://localhost:7013/api/videos/29.mp4',
      'https://localhost:7013/api/videos/29mbl.mp4'
    ),
    new Exercise(
      30,
      'Elevated WodBox Push-ups',
      'https://localhost:7013/api/videos/30.mp4',
      'https://localhost:7013/api/videos/30mbl.mp4'
    ),
    new Exercise(
      31,
      'WodBox Toe Taps',
      'https://localhost:7013/api/videos/31.mp4',
      'https://localhost:7013/api/videos/31mbl.mp4'
    ),
    new Exercise(
      32,
      'WodBox Leg Tucks',
      'https://localhost:7013/api/videos/32.mp4',
      'https://localhost:7013/api/videos/32mbl.mp4'
    ),
    new Exercise(
      33,
      'Hang Clean & Jerk',
      'https://localhost:7013/api/videos/33.mp4',
      'https://localhost:7013/api/videos/33mbl.mp4'
    ),
    new Exercise(
      34,
      'Man Makers (Single Arm)',
      'https://localhost:7013/api/videos/34.mp4',
      'https://localhost:7013/api/videos/34mbl.mp4'
    ),
    new Exercise(
      35,
      'Kettlebell Swings',
      'https://localhost:7013/api/videos/35.mp4',
      'https://localhost:7013/api/videos/35mbl.mp4'
    ),
    new Exercise(
      36,
      'Goblet Squat',
      'https://localhost:7013/api/videos/36.mp4',
      'https://localhost:7013/api/videos/36mbl.mp4'
    ),
    new Exercise(
      37,
      'Kettlebell Bicep Curl',
      'https://localhost:7013/api/videos/37.mp4',
      'https://localhost:7013/api/videos/37mbl.mp4'
    ),
    new Exercise(
      38,
      'Overhead Reverse Lunges',
      'https://localhost:7013/api/videos/38.mp4',
      'https://localhost:7013/api/videos/38mbl.mp4'
    ),
    new Exercise(
      39,
      'Push-ups',
      'https://localhost:7013/api/videos/39.mp4',
      'https://localhost:7013/api/videos/39mbl.mp4'
    ),
    new Exercise(
      40,
      'Sit-ups',
      'https://localhost:7013/api/videos/40.mp4',
      'https://localhost:7013/api/videos/40mbl.mp4'
    ),
    new Exercise(
      41,
      'Squat Jump',
      'https://localhost:7013/api/videos/41.mp4',
      'https://localhost:7013/api/videos/41mbl.mp4'
    ),
    new Exercise(
      42,
      'Jumping Jacks',
      'https://localhost:7013/api/videos/42.mp4',
      'https://localhost:7013/api/videos/42mbl.mp4'
    ),
  ];
  getAllMoves(): Exercise[] {
    return this.moves;
  }
}
