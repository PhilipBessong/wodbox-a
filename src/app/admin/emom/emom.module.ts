import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmomPageRoutingModule } from './emom-routing.module';

import { EmomPage } from './emom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmomPageRoutingModule
  ],
  declarations: [EmomPage]
})
export class EmomPageModule {}
