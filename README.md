# react-native-save-base64-image

Allows you to save an image in base64 format to the camera roll.

- [About this module](#about-this-module)
  - [Android support](#android-support)
  - [iOS support](#ios-support)
- [Installation](#installation)
  - [iOS](#ios)
  - [Android](#android)
- [Usage](#usage)
  - [`share(base64ImageString: string, options: SaveBase64ImageOptions)`](#sharebase64imagestring-string-options-savebase64imageoptions)
  - [`save(base64ImageString: string, options: SaveBase64ImageOptions)`](#savebase64imagestring-string-options-savebase64imageoptions)
  - [`base64ImageString: string`](#base64imagestring-string)
  - [`options: SaveBase64ImageOptions`](#options-savebase64imageoptions)
  - [Managing Permissions](#managing-permissions)
- [Contributing](#contributing)
- [License](#license)


## About this module

This module was developed specifically for working with base64 encoded images, with an emphasis on Android support.

If you are **only** looking for share sheet functionality, I would recommend using [react-native-share](https://github.com/react-native-share/react-native-share). It supports base64 strings out of the box with no additional work.

If you are looking for the ability to save a base64 string to the camera roll, specifically with support for the current version of Android as well as legacy versions of Android, this module will help you with that.


### Android support

This module provides support for:

- Scoped storage in Android Q
- Legacy storage in versions of Android older than Q

Please also note the permission checking in the example app as requesting and verifying permissions differs between Q and older versions of Android.

When a user does not accept permissions, a few things happen:

- On Android Q and above:
  - The user can share via the share sheet
  - Saving to device is successful
- On older versions of Android:
  - Sharing via the share sheet crashes due to lack of permission
  - Saving to device crashes due to lack of permission

For the above reasons, it's recommended to check for permissions on Android before performing any operations that require them, specifically on older versions of Android. See the **Managing Permissions** section below for an example.


### iOS support

When a user does not accept permissions:

- When attempting to share via the share sheet:
  - Sharing is successful (no permissions required for this action)
- When attempting to save:
  - The promise will resolve with a value of `false` so you can handle the failure as expected due to the user not granting permission


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

### `share(base64ImageString: string, options: SaveBase64ImageOptions)`

```js
import SaveBase64Image from 'react-native-save-base64-image';

// Native share sheet
//    with async await
try {
  const success = await SaveBase64Image.share(base64ImageString, options);
  if (!success) {
    // 😭 user did not grant permission
  }
} catch (error) {
  // 💥 there was a crash
}

//    with promises
SaveBase64Image
  .share(base64ImageString, options)
  .then((success) => {
    if (!success) {
      // 😭 user did not grant permission
    }
  })
  .catch((error) => {
    // 💥 there was a crash
  });
```

### `save(base64ImageString: string, options: SaveBase64ImageOptions)`

```js
import SaveBase64Image from 'react-native-save-base64-image';

// Save to device
//    with async await
try {
  const success = await SaveBase64Image.save(base64ImageString, options);
  if (!success) {
    // 😭 user did not grant permission
  }
} catch (error) {
  // 💥 there was a crash
}

//    with promises
SaveBase64Image
  .save(base64ImageString, options)
  .then((success) => {
    if (!success) {
      // 😭 user did not grant permission
    }
  })
  .catch((error) => {
    // 💥 there was a crash
  });
```

**Note**: Promises are resolved for both methods on iOS but on Android the promise is only resolved for the `save()` method and **not** for the `share()` method.


### `base64ImageString: string`

The base64 encoded string should **not** have the header, i.e. `data:image/png;base64,` (or similar) should be removed.


### `options: SaveBase64ImageOptions`

The options below are used in the Android module:

```ts
interface SaveBase64ImageOptions {
  mimeType?: 'image/png' | 'image/jpg';
  quality?: number;
  fileName?: string;
}
```

- **`mimeType`** `(default: 'image/png')`: Android configuration of mime type for bitmap compression and for the share intent. Currently only supporting `'image/png' | 'image/jpg'`
- **`quality`** `(default: 100)`: Bitmap compression quality on Android
- **`fileName`** `(default: <generated-timestamp>`): The filename for Android. This will be visible in the Photos app when saving and as the file name when sharing.


### Managing Permissions

Here's an example implementation that uses the permissions code in the example app:

```js
const handleBase64Image = async (base64ImageString, fileName) => {
  const imageWithoutHeader = base64ImageString.replace('data:image/png;base64,', '');

  if (Platform.OS === 'android') {
    const hasPermission = await hasStoragePermissions();
    if (!hasPermission) {
      Alert.alert('Fail', 'You need to give the app permission');
      return;
    }
  }

  const success = await SaveBase64Image.save(imageWithoutHeader, { fileName });
  Alert.alert(success ? '😄 Success' : '😞 Fail');
};
```


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
