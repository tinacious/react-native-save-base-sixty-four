import { NativeModules } from 'react-native';

type SaveBase64ImageOptionsType = {
  mimeType?: 'image/png' | 'image/jpg';
  directory?: 'DIRECTORY_PICTURES' | 'DIRECTORY_DOWNLOADS';
  quality?: number;
  fileName?: string;
  shareText?: string;
};

type SaveBase64ImageType = {
  save(
    base64ImageString: string,
    options?: SaveBase64ImageOptionsType
  ): Promise<boolean>;

  share(base64ImageString: string, options?: SaveBase64ImageOptionsType): void;
};

const { SaveBase64Image } = NativeModules;

const defaultOptions: SaveBase64ImageOptionsType = {
  mimeType: 'image/png',
  directory: 'DIRECTORY_PICTURES',
  quality: 100,
  shareText: 'Share image',
};
const SaveBase64ImageWithDefaultOptions: SaveBase64ImageType = {
  save: (base64ImageString: string, options: SaveBase64ImageOptionsType = {}) =>
    SaveBase64Image.save(base64ImageString, {
      ...defaultOptions,
      ...options,
    }),

  share: (
    base64ImageString: string,
    options: SaveBase64ImageOptionsType = {}
  ) =>
    SaveBase64Image.share(base64ImageString, {
      ...defaultOptions,
      ...options,
    }),
};

export default SaveBase64ImageWithDefaultOptions as SaveBase64ImageType;
