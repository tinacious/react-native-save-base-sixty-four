import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Vibration,
  Button,
  Alert,
  TextInput,
  Platform,
} from 'react-native';
import SaveBase64Image from 'react-native-save-base64-image';
import { dachshund, pomeranian, frenchie } from './images';
import { hasStoragePermissions } from './permissions';

export default function App() {
  const [directory, setDirectory] = React.useState<
    'DIRECTORY_DOWNLOADS' | 'DIRECTORY_PICTURES'
  >('DIRECTORY_PICTURES');
  const [hasPermissions, setHasPermissions] = React.useState<boolean>(false);
  const [customShareText, setCustomShareText] = React.useState<string>(
    'Share puppy'
  );

  const showPermissionsRequired = React.useCallback(() => {
    const title = 'Permissions Required';
    const message =
      'Unable to perform this operation until you accept the permissions';

    Alert.alert(title, message, undefined, { cancelable: true });
  }, []);

  const showFailure = React.useCallback(() => {
    const title = 'Fail 😭';
    const message = 'The image failed to save to your gallery';

    Alert.alert(title, message, undefined, { cancelable: true });
  }, []);

  const handlePress = React.useCallback(
    (image: string, fileName: string) => () => {
      if (!hasPermissions && Platform.OS === 'android') {
        return showPermissionsRequired();
      }

      Vibration.vibrate(100);

      try {
        SaveBase64Image.share(image, {
          fileName,
          shareText: customShareText,
        });
      } catch (e) {
        showFailure();
      }
    },
    [hasPermissions, showFailure, showPermissionsRequired, customShareText]
  );

  const handleLongPress = React.useCallback(
    (image: string, fileName: string) => () => {
      if (!hasPermissions && Platform.OS === 'android') {
        return showPermissionsRequired();
      }

      SaveBase64Image.save(image, {
        fileName,
        directory,
      }).then((success) => {
        if (success) {
          Alert.alert(
            'Success 😄',
            `The image was successfully saved to your ${
              directory === 'DIRECTORY_DOWNLOADS' ? 'Downloads' : 'Pictures'
            }`,
            undefined,
            { cancelable: true }
          );
        } else {
          showFailure();
        }
      });
      Vibration.vibrate(200);
    },
    [hasPermissions, showFailure, showPermissionsRequired, directory]
  );

  React.useEffect(function askForPermissionsOnMount() {
    if (Platform.OS === 'ios') {
      return;
    }

    hasStoragePermissions().then((result) => {
      setHasPermissions(result);
    });
  }, []);

  const activeButtonColour = '#ff365f';

  return (
    <View style={styles.container}>
      <View>
        <Text>Custom share text</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Custom share text"
          value={customShareText}
          onChangeText={setCustomShareText}
        />
      </View>
      <View style={styles.buttonLayout}>
        <View style={styles.button}>
          <Button
            title="Downloads"
            color={
              directory === 'DIRECTORY_DOWNLOADS' ? activeButtonColour : '#000'
            }
            onPress={() => setDirectory('DIRECTORY_DOWNLOADS')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Pictures"
            color={
              directory === 'DIRECTORY_PICTURES' ? activeButtonColour : '#000'
            }
            onPress={() => setDirectory('DIRECTORY_PICTURES')}
          />
        </View>
      </View>

      <Text style={styles.text}>Tap to see the share sheet.</Text>
      <Text style={styles.text}>
        Long press to save to your{' '}
        <Text style={styles.strong}>
          {directory === 'DIRECTORY_DOWNLOADS' ? 'Downloads' : 'Pictures'}
        </Text>{' '}
        directory
      </Text>

      <View style={styles.imageWrapper}>
        <TouchableHighlight
          onPress={handlePress(dachshund, 'Dachshund')}
          onLongPress={handleLongPress(dachshund, 'Dachshund')}
        >
          <Image
            style={styles.image}
            source={{ uri: `data:image/png;base64,${dachshund}` }}
          />
        </TouchableHighlight>

        <TouchableHighlight
          onPress={handlePress(pomeranian, 'Pomeranian')}
          onLongPress={handleLongPress(pomeranian, 'Pomeranian')}
        >
          <Image
            style={styles.image}
            source={{ uri: `data:image/png;base64,${pomeranian}` }}
          />
        </TouchableHighlight>

        <TouchableHighlight
          onPress={handlePress(frenchie, 'French Bulldog')}
          onLongPress={handleLongPress(frenchie, 'French Bulldog')}
        >
          <Image
            style={styles.image}
            source={{ uri: `data:image/png;base64,${frenchie}` }}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#fff',
    padding: 8,
  },
  buttonLayout: {
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    padding: 10,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  strong: {
    fontWeight: '700',
  },
  image: {
    width: 100,
    height: 150,
    margin: 8,
  },
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fc6',
  },
  imageWrapper: {
    marginTop: 10,
    flexDirection: 'row',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
