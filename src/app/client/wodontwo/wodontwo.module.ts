import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WodontwoPageRoutingModule } from './wodontwo-routing.module';

import { WodontwoPage } from './wodontwo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WodontwoPageRoutingModule
  ],
  declarations: [WodontwoPage]
})
export class WodontwoPageModule {}
