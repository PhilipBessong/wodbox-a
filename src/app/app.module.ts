import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { VideoModalComponent } from './video-modal/video-modal.component'; // Import your VideoModalComponent
import { R1m2Component } from './vidmods/r1m2/r1m2.component';
import { R1m3Component } from './vidmods/r1m3/r1m3.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { FriendsComponent } from './client/modals/modals/friends/friends.component';
@NgModule({
  declarations: [AppComponent,VideoModalComponent,R1m2Component, FriendsComponent,R1m3Component ],
  imports: [
    ReactiveFormsModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
