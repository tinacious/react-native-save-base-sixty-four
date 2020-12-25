import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Vibration,
} from 'react-native';
import SaveBase64Image from 'react-native-save-base64-image';
import { useAlerts } from './alert-hooks';
import {
  logoPinkBlackOnWhite,
  logoPinkWhiteOnBlack,
  logoWhiteOnPink,
} from './images';
import { hasStoragePermissions } from './permissions';

export default function App() {
  const [hasPermissions, setHasPermissions] = React.useState<boolean>(false);
  const { showSuccess, showFailure, showPermissionsRequired } = useAlerts();

  /*   const handlePress = React.useCallback(
    (image: string) => () => {
      if (!hasPermissions) {
        return showPermissionsRequired();
      }

      Vibration.vibrate(100);
      SaveBase64Image.saveToShareSheet(image).then((success) => {
        if (success) {
          showSuccess();
        } else {
          showFailure();
        }
      });
    },
    [hasPermissions, showSuccess, showFailure, showPermissionsRequired]
  ); */

  const handleLongPress = React.useCallback(
    (image: string) => () => {
      if (!hasPermissions) {
        return showPermissionsRequired();
      }

      SaveBase64Image.saveToGallery(image).then((success) => {
        if (success) {
          showSuccess();
        } else {
          showFailure();
        }
      });
      Vibration.vibrate(200);
    },
    [hasPermissions, showSuccess, showFailure, showPermissionsRequired]
  );

  React.useEffect(function askForPermissionsOnMount() {
    hasStoragePermissions().then((result) => {
      setHasPermissions(result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Tap to see the share sheet, long press to save to your camera roll
      </Text>
      <TouchableHighlight
        // onPress={handlePress(logoPinkBlackOnWhite)}
        onLongPress={handleLongPress(logoPinkBlackOnWhite)}
      >
        <Image
          style={styles.image}
          source={{ uri: `data:image/png;base64,${logoPinkBlackOnWhite}` }}
        />
      </TouchableHighlight>

      <TouchableHighlight
        // onPress={handlePress(logoPinkWhiteOnBlack)}
        onLongPress={handleLongPress(logoPinkWhiteOnBlack)}
      >
        <Image
          style={styles.image}
          source={{ uri: `data:image/png;base64,${logoPinkWhiteOnBlack}` }}
        />
      </TouchableHighlight>

      <TouchableHighlight
        // onPress={handlePress(logoWhiteOnPink)}
        onLongPress={handleLongPress(logoWhiteOnPink)}
      >
        <Image
          style={styles.image}
          source={{ uri: `data:image/png;base64,${logoWhiteOnPink}` }}
        />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    width: 160,
    height: 160,
    margin: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b3b3d4',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
