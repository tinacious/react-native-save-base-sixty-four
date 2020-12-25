package com.reactnativesavebase64image

import android.util.Log
import com.facebook.common.logging.FLog
import com.facebook.react.bridge.*

class SaveBase64ImageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return TAG
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  fun multiply(a: Int, b: Int, promise: Promise) {
    promise.resolve(a * b)
  }

  @ReactMethod
  fun saveToGallery(base64ImageString: String, options: ReadableMap, promise: Promise) {
    FLog.d(TAG, "Save to gallery: $base64ImageString")
    Log.d(TAG, "Save to gallery: $base64ImageString")
//    Log.d(TAG, base64ImageString)
  }

  @ReactMethod
  fun saveToShareSheet(base64ImageString: String, options: ReadableMap, promise: Promise) {
    FLog.d(TAG, "Save to share sheet: $base64ImageString")
    Log.d(TAG, "Save to share sheet: $base64ImageString")
  }

  companion object {
    const val TAG = "SaveBase64Image"
  }
}
