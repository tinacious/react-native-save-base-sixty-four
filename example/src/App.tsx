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
import {
  logoPinkBlackOnWhite,
  logoPinkWhiteOnBlack,
  logoWhiteOnPink,
} from './images';

export default function App() {
  const handlePress = React.useCallback(
    (image: string) => () => {
      Vibration.vibrate(100);
      SaveBase64Image.saveToShareSheet(image).then((result) => {
        console.log(result);
      });
    },
    []
  );
  const handleLongPress = React.useCallback(
    (image: string) => () => {
      SaveBase64Image.saveToGallery(image).then((result) => {
        console.log(result);
      });
      Vibration.vibrate(200);
    },
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Tap to see the share sheet, long press to save to your camera roll
      </Text>
      <TouchableHighlight
        onPress={handlePress(logoPinkBlackOnWhite)}
        onLongPress={handleLongPress(logoPinkBlackOnWhite)}
      >
        <Image
          style={styles.image}
          source={{ uri: `data:image/png;base64,${logoPinkBlackOnWhite}` }}
        />
      </TouchableHighlight>

      <TouchableHighlight
        onPress={handlePress(logoPinkWhiteOnBlack)}
        onLongPress={handleLongPress(logoPinkWhiteOnBlack)}
      >
        <Image
          style={styles.image}
          source={{ uri: `data:image/png;base64,${logoPinkWhiteOnBlack}` }}
        />
      </TouchableHighlight>

      <TouchableHighlight
        onPress={handlePress(logoWhiteOnPink)}
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
