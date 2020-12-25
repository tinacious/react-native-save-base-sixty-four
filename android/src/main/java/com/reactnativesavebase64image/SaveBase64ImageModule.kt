package com.reactnativesavebase64image

import android.util.Log
import com.facebook.common.logging.FLog
import com.facebook.react.bridge.*


class SaveBase64ImageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  private val mContext: ReactApplicationContext = reactContext

  override fun getName(): String {
    return TAG
  }

  @ReactMethod
  fun saveToGallery(base64ImageString: String, options: ReadableMap, promise: Promise) {
    try {
      val bitmap = Utils.getBitmapForBase64String(base64ImageString)
      val success = Utils.saveMediaToStorage(bitmap, options, mContext)
      promise.resolve(success)
    } catch (e: Error) {
      promise.reject(e)
    }
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
