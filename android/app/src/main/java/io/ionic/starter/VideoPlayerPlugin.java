package io.ionic.starter;

import android.content.Intent;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import com.getcapacitor.annotation.CapacitorPlugin;


@CapacitorPlugin(name = "VideoPlayer")
public class VideoPlayerPlugin extends Plugin {

    @PluginMethod
    public void play(PluginCall call) {
        String url = call.getString("url");
        if (url == null || url.isEmpty()) {
            call.reject("Video URL is missing");
            return;
        }

        Intent intent = new Intent(getActivity(), EmbeddedVideoActivity.class);
        intent.putExtra("videoUrl", url);
        getActivity().startActivity(intent);

        call.resolve();
    }
}
