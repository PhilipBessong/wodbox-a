import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  ElementRef,
} from '@angular/core';
import {
  CapacitorVideoPlayer,
  capVideoPlayerOptions,
} from 'capacitor-video-player';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-native-video-player',
  templateUrl: './native-video-player.component.html',
  styleUrls: ['./native-video-player.component.scss'],
})
export class NativeVideoPlayerComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input() videoUrl!: string;
  @Input() playerId!: string;

  containerId = 'native-video-container';
  isFullscreen = false;
  private videoEndedListener: any;
  isNative = Capacitor.getPlatform() !== 'web';

  
  private onVideoEnd = async (ev: any) => {
    const info = ev.detail;
    if (info?.playerId === this.playerId) {
      await CapacitorVideoPlayer.play({ playerId: this.playerId });
    }
  };
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() { }

  async ngAfterViewInit() {
   if (Capacitor.getPlatform() !== 'web' && this.videoUrl && this.playerId) {
      const container = document.getElementById('native-video-container');
      await CapacitorVideoPlayer.initPlayer({
        mode: 'embedded',
        url: this.videoUrl,
        playerId: this.playerId,
        componentTag: 'app-native-video-player',
        width: 320,
        height: 220
      });
    }
}


  async ngOnDestroy() {
    if (Capacitor.getPlatform() !== 'web' && this.playerId) {
      await CapacitorVideoPlayer.stopAllPlayers();
    }
  }

  // Toggle fullscreen mode
  toggleFullscreen() {
    const videoContainer = this.el.nativeElement.querySelector(
      '#native-video-container'
    );

    if (this.isFullscreen) {
      this.renderer.removeClass(videoContainer, 'fullscreen');
    } else {
      this.renderer.addClass(videoContainer, 'fullscreen');
    }
    this.isFullscreen = !this.isFullscreen;
  }

  // Listen for fullscreen changes and update UI accordingly
  onClickFullscreen() {
    this.toggleFullscreen();
  }
  
}
