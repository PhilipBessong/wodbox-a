import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent  implements OnInit {

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {}

}
