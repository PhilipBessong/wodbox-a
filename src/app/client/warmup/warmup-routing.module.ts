import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarmupPage } from './warmup.page';

const routes: Routes = [
  {
    path: '',
    component: WarmupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarmupPageRoutingModule {}
