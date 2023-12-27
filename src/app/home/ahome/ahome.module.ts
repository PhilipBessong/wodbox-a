import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AhomePageRoutingModule } from './ahome-routing.module';

import { AhomePage } from './ahome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AhomePageRoutingModule
  ],
  declarations: [AhomePage]
})
export class AhomePageModule {}
