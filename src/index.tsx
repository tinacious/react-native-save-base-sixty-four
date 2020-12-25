import { NativeModules } from 'react-native';

type SaveBase64ImageOptionsType = {
  mimeType?: 'image/png' | 'image/jpg';
  directory?: 'DIRECTORY_PICTURES' | 'DIRECTORY_DOWNLOADS';
  quality?: number;
};

type SaveBase64ImageType = {
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

const defaultOptions: SaveBase64ImageOptionsType = {
  mimeType: 'image/png',
  directory: 'DIRECTORY_PICTURES',
  quality: 100,
};
const SaveBase64ImageWithDefaultOptions: SaveBase64ImageType = {
  saveToGallery: (
    base64ImageString: string,
    options: SaveBase64ImageOptionsType = {}
  ) =>
    SaveBase64Image.saveToGallery(base64ImageString, {
      ...defaultOptions,
      options,
    }),

  saveToShareSheet: (
    base64ImageString: string,
    options: SaveBase64ImageOptionsType = {}
  ) =>
    SaveBase64Image.saveToShareSheet(base64ImageString, {
      ...defaultOptions,
      options,
    }),
};

export default SaveBase64ImageWithDefaultOptions as SaveBase64ImageType;
