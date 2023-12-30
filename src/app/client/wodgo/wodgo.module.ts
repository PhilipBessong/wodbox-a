import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WodgoPageRoutingModule } from './wodgo-routing.module';

import { WodgoPage } from './wodgo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WodgoPageRoutingModule
  ],
  declarations: [WodgoPage]
})
export class WodgoPageModule {}
