import { Component, ViewChild } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


import { App } from '@capacitor/app';
import { KeepAwake } from '@capacitor-community/keep-awake';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet!: IonRouterOutlet;

  constructor(private router: Router,private platform: Platform) {
    
  }

  async ngOnInit() {
    this.platform.ready().then(() => {
    this.preventSleep();
  });
    // Monitor router events to enable or disable swipe gestures
   //this.router.events
     // .pipe(filter(event => event instanceof NavigationEnd))
     // .subscribe(async (event: NavigationEnd) => {
        //const swipeEnabledPages = ['/chome', '/ahome'];

        // Enable or disable swipe gestures based on the current route
       // this.routerOutlet.swipeGesture = swipeEnabledPages.includes(event.url);
        // Enable or disable animation based on the current route
       // this.routerOutlet.animated = swipeEnabledPages.includes(event.url);

        // Handle audio focus logic based on navigation
      //  if (event.url === '/ahome') {
      //    await this.requestAudioFocus();
      //  } else {
        //  await this.abandonAudioFocus();
      //  }
    //  });
  }

  async preventSleep() {
    try {
      await KeepAwake.keepAwake();
      console.log('Screen will stay awake.');
    } catch (error) {
      console.error('Failed to keep the screen awake:', error);
    }
  }
  

  

 // async initializeKeepAwake() {
  //  try {
    //  await KeepAwake.keepAwake();
     // console.log('Screen will stay awake.');
    ///} catch (error) {
    //  console.error('Failed to keep the screen awake:', error);
    //}
  //}

  //async allowScreenSleep() {
   // try {
    //  await KeepAwake.allowSleep();
     // console.log('Screen can now sleep.');
    //} catch (error) {
     // console.error('Failed to allow the screen to sleep:', error);
    //}
  //}
}
