import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WodonPageRoutingModule } from './wodon-routing.module';

import { WodonPage } from './wodon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WodonPageRoutingModule
  ],
  declarations: [WodonPage]
})
export class WodonPageModule {}
