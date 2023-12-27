import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChomePageRoutingModule } from './chome-routing.module';

import { ChomePage } from './chome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChomePageRoutingModule
  ],
  declarations: [ChomePage]
})
export class ChomePageModule {}
