import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  WorkoutsService,
  Style,
  Workout,
  Exercise
} from 'src/app/firebase/workouts.service';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tabata',
  templateUrl: './tabata.page.html',
  styleUrls: ['./tabata.page.scss'],
})
export class TabataPage implements OnInit {
  towodstyle(){
    this.router.navigate(['/ahome']);
  }
  constructor(private router: Router, private workoutsService: WorkoutsService,
    private navCtrl: NavController,
    private toastCtrl: ToastController) { }
  moves: Exercise[]=[];
  ngOnInit() {
    this.loadMoves();
  }
  loadMoves(){
    this.moves = this.workoutsService.getAllMoves();
  }

}
