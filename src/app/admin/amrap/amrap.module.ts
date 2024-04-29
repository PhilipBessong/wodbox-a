import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmrapPageRoutingModule } from './amrap-routing.module';

import { AmrapPage } from './amrap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmrapPageRoutingModule
  ],
  declarations: [AmrapPage]
})
export class AmrapPageModule {}
