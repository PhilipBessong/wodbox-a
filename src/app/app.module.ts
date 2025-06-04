import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage-angular';
import { SharedModule } from './client/shared/shared.module';
import { AngularFireModule } from '@angular/fire/compat';
import { VideoModalComponent } from './video-modal/video-modal.component'; // Import your VideoModalComponent
import { R1m1wComponent } from './vidmods/r1m1w/r1m1w.component';
import { R1m2Component } from './vidmods/r1m2/r1m2.component';
import { R1m2wComponent } from './vidmods/r1m2w/r1m2w.component';
import { R1m3Component } from './vidmods/r1m3/r1m3.component';
import { R1m3wComponent } from './vidmods/r1m3w/r1m3w.component';
import { R2m1Component } from './vidmods/r2m1/r2m1.component';
import { R2m1wComponent } from './vidmods/r2m1w/r2m1w.component';
import { R2m2Component } from './vidmods/r2m2/r2m2.component';
import { R2m2wComponent } from './vidmods/r2m2w/r2m2w.component';
import { R2m3Component } from './vidmods/r2m3/r2m3.component';
import { R2m3wComponent } from './vidmods/r2m3w/r2m3w.component';
import { R3m1Component } from './vidmods/r3m1/r3m1.component';
import { R3m1wComponent } from './vidmods/r3m1w/r3m1w.component';
import { R3m2Component } from './vidmods/r3m2/r3m2.component';
import { R3m2wComponent } from './vidmods/r3m2w/r3m2w.component';
import { R3m3Component } from './vidmods/r3m3/r3m3.component';
import { R3m3wComponent } from './vidmods/r3m3w/r3m3w.component';
import { R4m1Component } from './vidmods/r4m1/r4m1.component';
import { R4m1wComponent } from './vidmods/r4m1w/r4m1w.component';
import { R4m2Component } from './vidmods/r4m2/r4m2.component';
import { R4m2wComponent } from './vidmods/r4m2w/r4m2w.component';
import { R4m3Component } from './vidmods/r4m3/r4m3.component';
import { R4m3wComponent } from './vidmods/r4m3w/r4m3w.component';
import { T1m1Component } from './vidmods/t1m1/t1m1.component';
import { T1m2Component } from './vidmods/t1m2/t1m2.component';
import { T2m1Component } from './vidmods/t2m1/t2m1.component';
import { T2m2Component } from './vidmods/t2m2/t2m2.component';
import { T3m1Component } from './vidmods/t3m1/t3m1.component';
import { T3m2Component } from './vidmods/t3m2/t3m2.component';
import { T4m1Component } from './vidmods/t4m1/t4m1.component';
import { T4m2Component } from './vidmods/t4m2/t4m2.component';
import { T5m1Component } from './vidmods/t5m1/t5m1.component';
import { T5m2Component } from './vidmods/t5m2/t5m2.component';
import { T6m1Component } from './vidmods/t6m1/t6m1.component';
import { T6m2Component } from './vidmods/t6m2/t6m2.component';
import { T7m1Component } from './vidmods/t7m1/t7m1.component';
import { T7m2Component } from './vidmods/t7m2/t7m2.component';
import { T8m1Component } from './vidmods/t8m1/t8m1.component';
import { T8m2Component } from './vidmods/t8m2/t8m2.component';
import { T1m1wComponent } from './vidmods/t1m1w/t1m1w.component';
import { T1m2wComponent } from './vidmods/t1m2w/t1m2w.component';
import { T2m1wComponent } from './vidmods/t2m1w/t2m1w.component';
import { T2m2wComponent } from './vidmods/t2m2w/t2m2w.component';
import { T3m1wComponent } from './vidmods/t3m1w/t3m1w.component';
import { T3m2wComponent } from './vidmods/t3m2w/t3m2w.component';
import { T4m1wComponent } from './vidmods/t4m1w/t4m1w.component';
import { T4m2wComponent } from './vidmods/t4m2w/t4m2w.component';
import { T5m1wComponent } from './vidmods/t5m1w/t5m1w.component';
import { T5m2wComponent } from './vidmods/t5m2w/t5m2w.component';
import { T6m1wComponent } from './vidmods/t6m1w/t6m1w.component';
import { T6m2wComponent } from './vidmods/t6m2w/t6m2w.component';
import { T7m1wComponent } from './vidmods/t7m1w/t7m1w.component';
import { T7m2wComponent } from './vidmods/t7m2w/t7m2w.component';
import { T8m1wComponent } from './vidmods/t8m1w/t8m1w.component';
import { T8m2wComponent } from './vidmods/t8m2w/t8m2w.component';
import { L1m1Component } from './vidmods/l1m1/l1m1.component';
import { L1m2Component } from './vidmods/l1m2/l1m2.component';
import { L1m3Component } from './vidmods/l1m3/l1m3.component';
import { L1m4Component } from './vidmods/l1m4/l1m4.component';
import { L2m1Component } from './vidmods/l2m1/l2m1.component';
import { L2m2Component } from './vidmods/l2m2/l2m2.component';
import { L2m3Component } from './vidmods/l2m3/l2m3.component';
import { L2m4Component } from './vidmods/l2m4/l2m4.component';
import { L3m1Component } from './vidmods/l3m1/l3m1.component';
import { L3m2Component } from './vidmods/l3m2/l3m2.component';
import { L3m3Component } from './vidmods/l3m3/l3m3.component';
import { L3m4Component } from './vidmods/l3m4/l3m4.component';
import { L1m1wComponent } from './vidmods/l1m1w/l1m1w.component';
import { L1m2wComponent } from './vidmods/l1m2w/l1m2w.component';
import { L1m3wComponent } from './vidmods/l1m3w/l1m3w.component';
import { L1m4wComponent } from './vidmods/l1m4w/l1m4w.component';
import { L2m1wComponent } from './vidmods/l2m1w/l2m1w.component';
import { L2m2wComponent } from './vidmods/l2m2w/l2m2w.component';
import { L2m3wComponent } from './vidmods/l2m3w/l2m3w.component';
import { L2m4wComponent } from './vidmods/l2m4w/l2m4w.component';
import { L3m1wComponent } from './vidmods/l3m1w/l3m1w.component';
import { L3m2wComponent } from './vidmods/l3m2w/l3m2w.component';
import { L3m3wComponent } from './vidmods/l3m3w/l3m3w.component';
import { L3m4wComponent } from './vidmods/l3m4w/l3m4w.component';
import { E1m1Component } from './vidmods/e1m1/e1m1.component';
import { E1m2Component } from './vidmods/e1m2/e1m2.component';
import { E1m3Component } from './vidmods/e1m3/e1m3.component';
import { E1m4Component } from './vidmods/e1m4/e1m4.component';
import { E2m1Component } from './vidmods/e2m1/e2m1.component';
import { E2m2Component } from './vidmods/e2m2/e2m2.component';
import { E2m3Component } from './vidmods/e2m3/e2m3.component';
import { E2m4Component } from './vidmods/e2m4/e2m4.component';
import { E3m1Component } from './vidmods/e3m1/e3m1.component';
import { E3m2Component } from './vidmods/e3m2/e3m2.component';
import { E3m3Component } from './vidmods/e3m3/e3m3.component';
import { E3m4Component } from './vidmods/e3m4/e3m4.component';
import { E1m1wComponent } from './vidmods/e1m1w/e1m1w.component';
import { E1m2wComponent } from './vidmods/e1m2w/e1m2w.component';
import { E1m3wComponent } from './vidmods/e1m3w/e1m3w.component';
import { E1m4wComponent } from './vidmods/e1m4w/e1m4w.component';
import { E2m1wComponent } from './vidmods/e2m1w/e2m1w.component';
import { E2m2wComponent } from './vidmods/e2m2w/e2m2w.component';
import { E2m3wComponent } from './vidmods/e2m3w/e2m3w.component';
import { E2m4wComponent } from './vidmods/e2m4w/e2m4w.component';
import { E3m1wComponent } from './vidmods/e3m1w/e3m1w.component';
import { E3m2wComponent } from './vidmods/e3m2w/e3m2w.component';
import { E3m3wComponent } from './vidmods/e3m3w/e3m3w.component';
import { E3m4wComponent } from './vidmods/e3m4w/e3m4w.component';
import { A1m1Component } from './vidmods/a1m1/a1m1.component';
import { A1m2Component } from './vidmods/a1m2/a1m2.component';
import { A1m3Component } from './vidmods/a1m3/a1m3.component';
import { A1m4Component } from './vidmods/a1m4/a1m4.component';
import { A2m1Component } from './vidmods/a2m1/a2m1.component';
import { A2m2Component } from './vidmods/a2m2/a2m2.component';
import { A2m3Component } from './vidmods/a2m3/a2m3.component';
import { A2m4Component } from './vidmods/a2m4/a2m4.component';
import { A3m1Component } from './vidmods/a3m1/a3m1.component';
import { A3m2Component } from './vidmods/a3m2/a3m2.component';
import { A3m3Component } from './vidmods/a3m3/a3m3.component';
import { A3m4Component } from './vidmods/a3m4/a3m4.component';
import { A1m1wComponent } from './vidmods/a1m1w/a1m1w.component';
import { A1m2wComponent } from './vidmods/a1m2w/a1m2w.component';
import { A1m3wComponent } from './vidmods/a1m3w/a1m3w.component';
import { A1m4wComponent } from './vidmods/a1m4w/a1m4w.component';
import { A2m1wComponent } from './vidmods/a2m1w/a2m1w.component';
import { A2m2wComponent } from './vidmods/a2m2w/a2m2w.component';
import { A2m3wComponent } from './vidmods/a2m3w/a2m3w.component';
import { A2m4wComponent } from './vidmods/a2m4w/a2m4w.component';
import { A3m1wComponent } from './vidmods/a3m1w/a3m1w.component';
import { A3m2wComponent } from './vidmods/a3m2w/a3m2w.component';
import { A3m3wComponent } from './vidmods/a3m3w/a3m3w.component';
import { A3m4wComponent } from './vidmods/a3m4w/a3m4w.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { MsearchComponent } from './admin/msearch/msearch.component';
import { ProfileComponent } from './client/modals/profile/profile.component';
import { FriendsComponent } from './client/modals/modals/friends/friends.component';
import { share } from 'rxjs';


@NgModule({
  declarations: [
    AppComponent,
    SafeUrlPipe ,
    VideoModalComponent,
    R1m2Component,
    FriendsComponent,
    R1m3Component,
    R1m1wComponent,
    R1m2wComponent,
    R1m3wComponent,
    R2m1wComponent,
    R2m2wComponent,
    R2m3wComponent,
    R3m1wComponent,
    R3m2wComponent,
    R3m3wComponent,
    R4m1wComponent,
    R4m2wComponent,
    R4m3wComponent,
    ProfileComponent,
    R2m1Component,
    R2m2Component,
    R2m3Component,
    R3m1Component,
    R3m2Component,
    R3m3Component,
    R4m1Component,
    R4m2Component,
    R4m3Component,

    T1m1Component,
    T1m2Component,
    T2m1Component,
    T2m2Component,
    T3m1Component,
    T3m2Component,
    T4m1Component,
    T4m2Component,
    T5m1Component,
    T5m2Component,
    T6m1Component,
    T6m2Component,
    T7m1Component,
    T7m2Component,
    T8m1Component,
    T8m2Component,
    T1m1wComponent,
    T1m2wComponent,
    T2m1wComponent,
    T2m2wComponent,
    T3m1wComponent,
    T3m2wComponent,
    T4m1wComponent,
    T4m2wComponent,
    T5m1wComponent,
    T5m2wComponent,
    T6m1wComponent,
    T6m2wComponent,
    T7m1wComponent,
    T7m2wComponent,
    T8m1wComponent,
    T8m2wComponent,

    L1m1Component,
    L1m2Component,
    L1m3Component,
    L1m4Component,
    L2m1Component,
    L2m2Component,
    L2m3Component,
    L2m4Component,
    L3m1Component,
    L3m2Component,
    L3m3Component,
    L3m4Component,
    L1m1wComponent,
    L1m2wComponent,
    L1m3wComponent,
    L1m4wComponent,
    L2m1wComponent,
    L2m2wComponent,
    L2m3wComponent,
    L2m4wComponent,
    L3m1wComponent,
    L3m2wComponent,
    L3m3wComponent,
    L3m4wComponent,

    E1m1Component,
    E1m2Component,
    E1m3Component,
    E1m4Component,
    E2m1Component,
    E2m2Component,
    E2m3Component,
    E2m4Component,
    E3m1Component,
    E3m2Component,
    E3m3Component,
    E3m4Component,
    E1m1wComponent,
    E1m2wComponent,
    E1m3wComponent,
    E1m4wComponent,
    E2m1wComponent,
    E2m2wComponent,
    E2m3wComponent,
    E2m4wComponent,
    E3m1wComponent,
    E3m2wComponent,
    E3m3wComponent,
    E3m4wComponent,

    A1m1Component,
    A1m2Component,
    A1m3Component,
    A1m4Component,
    A2m1Component,
    A2m2Component,
    A2m3Component,
    A2m4Component,
    A3m1Component,
    A3m2Component,
    A3m3Component,
    A3m4Component,
    A1m1wComponent,
    A1m2wComponent,
    A1m3wComponent,
    A1m4wComponent,
    A2m1wComponent,
    A2m2wComponent,
    A2m3wComponent,
    A2m4wComponent,
    A3m1wComponent,
    A3m2wComponent,
    A3m3wComponent,
    A3m4wComponent,
    MsearchComponent,

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserModule,
    IonicModule.forRoot({
      swipeBackEnabled: true, // Ensure this is enabled
    }),
    AppRoutingModule,
    IonicStorageModule.forRoot()
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy } ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
