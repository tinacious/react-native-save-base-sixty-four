# react-native-save-base64-image

Allows you to save an image in base64 format to the camera roll

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

### Android

Add this to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_MEDIA_LOCATION"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
    android:maxSdkVersion="28" />
```

## Usage

```js
import SaveBase64Image from "react-native-save-base64-image";

// ...

const result = await SaveBase64Image.multiply(3, 7);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
