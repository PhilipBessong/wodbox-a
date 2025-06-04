import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WodgotwoPageRoutingModule } from './wodgotwo-routing.module';

import { WodgotwoPage } from './wodgotwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WodgotwoPageRoutingModule
  ],
  declarations: [WodgotwoPage]
})
export class WodgotwoPageModule {}
