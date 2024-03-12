package com.audiofiledurationlibrary

import android.media.MediaPlayer
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.io.IOException

class AudioFileDurationLibraryModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

@ReactMethod
fun getAudioFileDuration(filePath: String, promise: Promise) {
    val player = MediaPlayer()
    try {
        player.setDataSource(filePath)
        player.setOnPreparedListener { mp ->
            val duration = mp.duration
            mp.release()
            promise.resolve(duration.toDouble() / 1000)
        }
        player.prepareAsync()
    } catch (e: IOException) {
        promise.reject("Error", "Error retrieving duration", e)
    }
}

  companion object {
    const val NAME = "AudioFileDurationLibrary"
  }
}
