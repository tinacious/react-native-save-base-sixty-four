import { PermissionsAndroid } from 'react-native';
import DeviceInfo from 'react-native-device-info';

/**
 * Depending on the version of Android, we need to check different permissions
 * to enable this functionality.
 * Android Q and above only require read permission.
 * Older versions require both read and write.
 *
 * Also make sure you have the following permissions in your manifest.
 *
 *   <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
 *   <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
 *      android:maxSdkVersion="28" />
 */
export async function hasStoragePermissions() {
  const systemVersion = DeviceInfo.getSystemVersion();
  const androidVersion = Number(systemVersion.split('.')[0]);

  const readPermission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  const writePermission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  if (androidVersion < 10) {
    // Legacy Android
    const hasWritePermission = await PermissionsAndroid.check(writePermission);
    if (hasWritePermission) {
      return true;
    }

    const writeStatus = await PermissionsAndroid.request(writePermission);
    return writeStatus === 'granted';
  } else {
    // Android Q+
    const hasReadPermission = await PermissionsAndroid.check(readPermission);
    if (hasReadPermission) {
      return true;
    }

    const readStatus = await PermissionsAndroid.request(readPermission);
    return readStatus === 'granted';
  }
}
