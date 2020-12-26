# react-native-save-base64-image

Allows you to save an image in base64 format to the camera roll.

- [About & Similar modules](#about--similar-modules)
- [Installation](#installation)
  - [iOS](#ios)
  - [Android](#android)
- [Usage](#usage)
  - [Base 64 encoded string](#base-64-encoded-string)
  - [Options](#options)
- [Contributing](#contributing)
- [License](#license)


## About & Similar modules

This module was developed specifically for working with base64 encoded images. When providing a base64 string, do not provide the header with the mime type.

If you are only looking for share sheet functionality, [react-native-share](https://github.com/react-native-share/react-native-share) works perfectly and is more mature. I would recommend using that.

If you are looking for the ability to save to camera roll, specifically with support for the current version of Android, this module will help you. At the time of writing, the existing solutions do not implement scoped storage for target SDK 30, the current version of Android, but this does.


## Installation

```sh
npm install react-native-save-base64-image
```

### iOS

Add this to your `Info.plist`:

```xml
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Save photo to device</string>
```

The `<string>` value above can be anything you like—this will be the message that shows up when the user is prompted to allow photo access.

### Android

Add this to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_MEDIA_LOCATION"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
    android:maxSdkVersion="28" />
```

## Usage

Call either the `share` or `save` method with the base64 encoded string and optional options for Android.

```js
import SaveBase64Image from "react-native-save-base64-image";

// Native share sheet
const success = await SaveBase64Image.share(base64ImageString, options);

// Save to device
const success = await SaveBase64Image.save(base64ImageString, options);
```

**Note**: Promises are resolved for both methods on iOS but on Android the promise is only resolved for the `save()` method and **not** for the `share()` method.


### Base 64 encoded string

The base64 encoded string should **not** have the header, i.e. `data:image/png;base64,` (or similar) should be removed.


### Options

The options below are used in the Android module:

```ts
interface SaveBase64ImageOptions {
  mimeType?: 'image/png' | 'image/jpg';
  directory?: 'DIRECTORY_PICTURES' | 'DIRECTORY_DOWNLOADS' | 'DIRECTORY_DCIM';
  quality?: number;
  fileName?: string;
  shareText?: string;
}
```

- **`mimeType`** `(default: 'image/png')`: Android configuration of mime type for bitmap compression and for the share intent. Currently only supporting `'image/png' | 'image/jpg'`
- **`directory`** `(default: 'DIRECTORY_PICTURES')`: The specified save directory for Android. Currently supporting only `'DIRECTORY_PICTURES' | 'DIRECTORY_DOWNLOADS' | 'DIRECTORY_DCIM'`
- **`quality`** `(default: 100)`: Bitmap compression quality on Android
- **`fileName`** `(default: <generated-timestamp>`): The filename for Android. This will be visible in the Photos app when saving and as the file name when sharing.
- **`shareText`** `(default: 'Share image')`: The text that will show up on the Android share sheet.


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
