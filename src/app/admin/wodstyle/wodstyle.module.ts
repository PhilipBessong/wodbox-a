import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WodstylePageRoutingModule } from './wodstyle-routing.module';

import { WodstylePage } from './wodstyle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WodstylePageRoutingModule
  ],
  declarations: [WodstylePage]
})
export class WodstylePageModule {}
