package com.reactnativesavebase64image

import android.content.ContentValues
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import android.util.Base64
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import java.io.File
import java.io.FileOutputStream
import java.io.OutputStream


object Utils {
  /**
   * Given a base64 string, will return a bitmap
   */
  fun getBitmapForBase64String(base64String: String): Bitmap {
    val decodedBytes = Base64.decode(base64String, Base64.DEFAULT)
    return BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
  }

  /**
   * Saves the provided bitmap to the specified device directory
   * Supports Android 10+ and the legacy storage API
   */
  fun saveImageToStorage(bitmap: Bitmap, options: ReadableMap, context: ReactContext): Boolean {
    // Options
    val mimeType = options.getString("mimeType") ?: ""
    val fileName = options.getString("fileName") ?: "${System.currentTimeMillis()}"
    val quality = options.getInt("quality")
    val directory = getDirectory(options.getString("directory"))
    val fileNameWithExtension = "$fileName.${getFileExtensionForMimeType(mimeType)}"

    var outputStream: OutputStream? = null

    // Scoped storage API for Android >= Q
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
      context.contentResolver?.also { resolver ->
        val contentValues = ContentValues().apply {
          put(MediaStore.MediaColumns.DISPLAY_NAME, fileNameWithExtension)
          put(MediaStore.MediaColumns.MIME_TYPE, mimeType)
          put(MediaStore.MediaColumns.RELATIVE_PATH, directory)
        }

        val imageUri: Uri? = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, contentValues)
        outputStream = imageUri?.let { resolver.openOutputStream(it) }
      }
    } else {
      // Deprecated API for Android < Q
      val imagesDir = Environment.getExternalStoragePublicDirectory(directory)
      val image = File(imagesDir, fileNameWithExtension)
      outputStream = FileOutputStream(image)
    }

    outputStream?.use {
      bitmap.compress(getBitmapCompressFormatForMimeType(mimeType), quality, it)
    }

    return true
  }

  /**
   * Creates a share intent for the provided bitmap
   */
  fun startShareIntent(bitmap: Bitmap, options: ReadableMap, context: ReactContext): Boolean {
    // Options
    val mimeType = options.getString("mimeType") ?: ""
    val fileName = options.getString("fileName") ?: "${System.currentTimeMillis()}"
    val quality = options.getInt("quality")
    val shareText = options.getString("shareText") ?: ""

    val fileNameWithExtension = "$fileName.${getFileExtensionForMimeType(mimeType)}"

    val shareIntent = Intent(Intent.ACTION_SEND)
    shareIntent.type = mimeType

    var outputStream: OutputStream?
    var imageUri: Uri? = null

    context.contentResolver?.also { resolver ->
      val contentValues = ContentValues().apply {
        put(MediaStore.MediaColumns.DISPLAY_NAME, fileNameWithExtension)
        put(MediaStore.MediaColumns.MIME_TYPE, mimeType)
      }
      imageUri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, contentValues)
      outputStream = imageUri?.let { resolver.openOutputStream(it) }

      outputStream?.use {
        bitmap.compress(getBitmapCompressFormatForMimeType(mimeType), quality, it)
      }
    }

    if (imageUri == null) {
      return false
    }

    shareIntent.putExtra(Intent.EXTRA_STREAM, imageUri)
    context.startActivity(Intent.createChooser(shareIntent, shareText))
    return true
  }


  /**
   * File extension for mime type. Defaults to .png
   */
  private fun getFileExtensionForMimeType(mimeType: String): String {
    return when (mimeType) {
      "image/jpg" -> "jpg"
      "image/png" -> "png"
      else -> "png"
    }
  }

  /**
   * Bitmap compression for mime type. Defaults to PNG.
   */
  private fun getBitmapCompressFormatForMimeType(mimeType: String): Bitmap.CompressFormat {
    return when (mimeType) {
      "image/jpg" -> Bitmap.CompressFormat.JPEG
      "image/png" -> Bitmap.CompressFormat.PNG
      else -> Bitmap.CompressFormat.PNG
    }
  }

  /**
   * Save directories supported. Defaults to Pictures.
   */
  private fun getDirectory(directory: String?): String {
    return when (directory) {
      "DIRECTORY_PICTURES" -> Environment.DIRECTORY_PICTURES
      "DIRECTORY_DOWNLOADS" -> Environment.DIRECTORY_DOWNLOADS
      else -> Environment.DIRECTORY_PICTURES
    }
  }
}
