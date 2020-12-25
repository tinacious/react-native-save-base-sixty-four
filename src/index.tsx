import { NativeModules } from 'react-native';

type SaveBase64ImageOptionsType = {};

type SaveBase64ImageType = {
  // multiply(a: number, b: number): Promise<number>;
  saveToGallery(
    base64ImageString: string,
    options?: SaveBase64ImageOptionsType
  ): Promise<boolean>;

  saveToShareSheet(
    base64ImageString: string,
    options?: SaveBase64ImageOptionsType
  ): Promise<boolean>;
};

const { SaveBase64Image } = NativeModules;

const withDefaultOptions: SaveBase64ImageType = {
  saveToGallery: (
    base64ImageString: string,
    options: SaveBase64ImageOptionsType = {}
  ) => SaveBase64Image.saveToGallery(base64ImageString, options),

  saveToShareSheet: (
    base64ImageString: string,
    options: SaveBase64ImageOptionsType = {}
  ) => SaveBase64Image.saveToShareSheet(base64ImageString, options),
};

export default withDefaultOptions as SaveBase64ImageType;
// export default SaveBase64Image as SaveBase64ImageType;
