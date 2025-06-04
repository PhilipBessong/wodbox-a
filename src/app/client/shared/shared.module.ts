import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeVideoPlayerComponent } from '../native-video-player/native-video-player.component';


@NgModule({
  declarations: [NativeVideoPlayerComponent],
  imports: [
    CommonModule
  ],
    exports: [NativeVideoPlayerComponent] 
})
export class SharedModule { }
