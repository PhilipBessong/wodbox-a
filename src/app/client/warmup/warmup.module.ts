import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WarmupPageRoutingModule } from './warmup-routing.module';

import { WarmupPage } from './warmup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WarmupPageRoutingModule
  ],
  declarations: [WarmupPage]
})
export class WarmupPageModule {}
