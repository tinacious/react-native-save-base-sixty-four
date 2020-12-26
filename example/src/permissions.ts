import { PermissionsAndroid } from 'react-native';

export async function hasStoragePermissions() {
  const readPermission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  const hasReadPermission = await PermissionsAndroid.check(readPermission);
  if (hasReadPermission) {
    return true;
  }

  const readStatus = await PermissionsAndroid.request(readPermission);
  return readStatus === 'granted';
}
