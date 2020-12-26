package com.reactnativesavebase64image

import com.facebook.react.bridge.*


class SaveBase64ImageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  private val mContext: ReactApplicationContext = reactContext

  override fun getName(): String {
    return TAG
  }

  @ReactMethod
  fun save(base64ImageString: String, options: ReadableMap, promise: Promise) {
    try {
      val bitmap = Utils.getBitmapForBase64String(base64ImageString)
      val success = Utils.saveImageToStorage(bitmap, options, mContext)

      promise.resolve(success)
    } catch (e: Error) {
      promise.reject(e)
    }
  }

  @ReactMethod
  fun share(base64ImageString: String, options: ReadableMap, promise: Promise) {
    try {
      val bitmap = Utils.getBitmapForBase64String(base64ImageString)
      val success = Utils.startShareIntent(bitmap, options, mContext)

      promise.resolve(success)
    } catch (e: Error) {
      promise.reject(e)
    }
  }

  companion object {
    const val TAG = "SaveBase64Image"
  }
}
