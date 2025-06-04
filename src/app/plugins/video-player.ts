import { registerPlugin } from '@capacitor/core';

export interface VideoPlayerPlugin {
  play(options: { url: string }): Promise<void>;
}

const VideoPlayer = registerPlugin<VideoPlayerPlugin>('VideoPlayer');

export default VideoPlayer;