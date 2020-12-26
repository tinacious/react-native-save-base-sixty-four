import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Vibration,
  Button,
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
  const [directory, setDirectory] = React.useState<
    'DIRECTORY_DOWNLOADS' | 'DIRECTORY_PICTURES'
  >('DIRECTORY_PICTURES');
  const [hasPermissions, setHasPermissions] = React.useState<boolean>(false);
  const { showSuccess, showFailure, showPermissionsRequired } = useAlerts();

  const handlePress = React.useCallback(
    (image: string, fileName: string) => () => {
      if (!hasPermissions) {
        return showPermissionsRequired();
      }

      Vibration.vibrate(100);

      try {
        SaveBase64Image.share(image, { fileName, shareText: 'Share Logo' });
        showSuccess();
      } catch (e) {
        showFailure();
      }
    },
    [hasPermissions, showSuccess, showFailure, showPermissionsRequired]
  );

  const handleLongPress = React.useCallback(
    (image: string, fileName: string) => () => {
      if (!hasPermissions) {
        return showPermissionsRequired();
      }

      SaveBase64Image.save(image, {
        fileName,
        directory,
      }).then((success) => {
        if (success) {
          showSuccess();
        } else {
          showFailure();
        }
      });
      Vibration.vibrate(200);
    },
    [
      hasPermissions,
      showSuccess,
      showFailure,
      showPermissionsRequired,
      directory,
    ]
  );

  React.useEffect(function askForPermissionsOnMount() {
    hasStoragePermissions().then((result) => {
      setHasPermissions(result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonLayout}>
        <View style={styles.button}>
          <Button
            title="Downloads"
            color="#00d364"
            onPress={() => setDirectory('DIRECTORY_DOWNLOADS')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Pictures"
            color="#c6f"
            onPress={() => setDirectory('DIRECTORY_PICTURES')}
          />
        </View>
      </View>

      <Text style={styles.text}>
        Tap to see the share sheet, long press to save to your{' '}
        {directory === 'DIRECTORY_DOWNLOADS' ? 'Downloads' : 'Pictures'}{' '}
        directory
      </Text>
      <TouchableHighlight
        onPress={handlePress(
          logoPinkBlackOnWhite,
          'white-background-pink-black'
        )}
        onLongPress={handleLongPress(
          logoPinkBlackOnWhite,
          'white-background-pink-black'
        )}
      >
        <Image
          style={styles.image}
          source={{ uri: `data:image/png;base64,${logoPinkBlackOnWhite}` }}
        />
      </TouchableHighlight>

      <TouchableHighlight
        onPress={handlePress(
          logoPinkWhiteOnBlack,
          'black-background-pink-white'
        )}
        onLongPress={handleLongPress(
          logoPinkWhiteOnBlack,
          'black-background-pink-white'
        )}
      >
        <Image
          style={styles.image}
          source={{ uri: `data:image/png;base64,${logoPinkWhiteOnBlack}` }}
        />
      </TouchableHighlight>

      <TouchableHighlight
        onPress={handlePress(logoWhiteOnPink, 'pink-background-white')}
        onLongPress={handleLongPress(logoWhiteOnPink, 'pink-background-white')}
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
  buttonLayout: {
    flexDirection: 'row',
    padding: 20,
  },
  button: {
    padding: 10,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 140,
    height: 140,
    margin: 10,
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
