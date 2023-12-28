import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddwodPageRoutingModule } from './addwod-routing.module';

import { AddwodPage } from './addwod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddwodPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddwodPage]
})
export class AddwodPageModule {}
