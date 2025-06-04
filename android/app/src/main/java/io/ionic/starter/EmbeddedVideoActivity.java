package io.ionic.starter;

import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.view.View;
import android.webkit.WebChromeClient.CustomViewCallback;

import android.content.Context;
import android.util.AttributeSet;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.widget.FrameLayout;
import android.widget.VideoView;
import android.widget.MediaController;
import android.view.ViewGroup.LayoutParams;

public class EmbeddedVideoActivity extends Activity   {
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        VideoView videoView = new VideoView(this);
        setContentView(videoView);

        String videoUrl = getIntent().getStringExtra("videoUrl");

        if (videoUrl != null && !videoUrl.isEmpty()) {
            Uri uri = Uri.parse(videoUrl);
            videoView.setVideoURI(uri);
            videoView.setMediaController(new MediaController(this));
            videoView.setOnPreparedListener(mp -> videoView.start());
        }
    }
}
