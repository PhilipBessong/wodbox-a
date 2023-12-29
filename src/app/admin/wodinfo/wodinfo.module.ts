import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WodinfoPageRoutingModule } from './wodinfo-routing.module';

import { WodinfoPage } from './wodinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WodinfoPageRoutingModule
  ],
  declarations: [WodinfoPage]
})
export class WodinfoPageModule {}
