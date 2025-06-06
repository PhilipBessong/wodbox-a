import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WarmupPageRoutingModule } from './warmup-routing.module';
import { WarmupPage } from './warmup.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WarmupPageRoutingModule,

    SharedModule // Import the SharedModule here
  ],
  declarations: [WarmupPage]
})
export class WarmupPageModule {}
