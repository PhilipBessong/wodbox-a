package io.ionic.starter;

import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.view.WindowManager;
import android.os.Build;
import android.os.Bundle;
import android.content.Context;
import android.webkit.WebView;
import android.webkit.WebSettings;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

 
 // Prevent screen from turning off
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    
   // ✅ Handle audio focus safely (Android O and up)
   if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    AudioManager audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);

    AudioAttributes playbackAttributes = new AudioAttributes.Builder()
      .setUsage(AudioAttributes.USAGE_MEDIA)
      .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
      .build();

    AudioFocusRequest audioFocusRequest = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
      .setAudioAttributes(playbackAttributes)
      .setOnAudioFocusChangeListener(focusChange -> {
        // No need to abandon here
      })
      .setWillPauseWhenDucked(false)
      .build();

    // 🚫 Requesting focus causes other audio to pause — avoid it
    // audioManager.requestAudioFocus(audioFocusRequest);

    // ✅ Abandon focus immediately to avoid interrupting other apps
    audioManager.abandonAudioFocusRequest(audioFocusRequest);
  }

  // ✅ Allow autoplay without gesture for media
  if (this.bridge != null) {
    WebView webView = (WebView) this.bridge.getWebView();
    WebSettings settings = webView.getSettings();
    settings.setMediaPlaybackRequiresUserGesture(false);
    // ✅ Try to suppress audio focus grabbing by WebView
    try {
      java.lang.reflect.Method method = WebView.class.getDeclaredMethod("setAudioFocusGain", int.class);
      method.setAccessible(true);
      method.invoke(webView, AudioManager.AUDIOFOCUS_NONE);
    } catch (Exception e) {
      e.printStackTrace(); // Fallback if method is not found
    }
  }
  }

  
}
