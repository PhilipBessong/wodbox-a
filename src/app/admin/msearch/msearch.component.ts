import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Exercise } from 'src/app/firebase/workouts.service';
@Component({
  selector: 'app-msearch',
  templateUrl: './msearch.component.html',
  styleUrls: ['./msearch.component.scss'],
})
export class MsearchComponent  implements OnInit {

  moves: Exercise[] = [];
  filteredMoves: Exercise[] = [];
  searchTerm: string = '';

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.filteredMoves = this.moves; // Initialize filteredMoves with all moves
  }

  filterMoves() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredMoves = this.moves.filter((move) =>
      move.exeName.toLowerCase().includes(searchTermLower)
    );
  }

  selectMove(move: Exercise) {
    this.modalController.dismiss(move);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
