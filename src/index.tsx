import { NativeModules } from 'react-native';

interface SaveBase64ImageOptions {
  mimeType?: 'image/png' | 'image/jpg';
  directory?: 'DIRECTORY_PICTURES' | 'DIRECTORY_DOWNLOADS' | 'DIRECTORY_DCIM';
  quality?: number;
  fileName?: string;
  shareText?: string;
}

interface SaveBase64ImageInterface {
  save(
    base64ImageString: string,
    options?: SaveBase64ImageOptions
  ): Promise<boolean>;

  share(
    base64ImageString: string,
    options?: SaveBase64ImageOptions
  ): Promise<boolean>;
}

const { SaveBase64Image } = NativeModules;

const defaultOptions: SaveBase64ImageOptions = {
  mimeType: 'image/png',
  directory: 'DIRECTORY_PICTURES',
  quality: 100,
  shareText: 'Share image',
};
const SaveBase64ImageWithDefaultOptions: SaveBase64ImageInterface = {
  save: (base64ImageString: string, options: SaveBase64ImageOptions = {}) =>
    SaveBase64Image.save(base64ImageString, {
      ...defaultOptions,
      ...options,
    }),

  share: (base64ImageString: string, options: SaveBase64ImageOptions = {}) =>
    SaveBase64Image.share(base64ImageString, {
      ...defaultOptions,
      ...options,
    }),
};

export default SaveBase64ImageWithDefaultOptions as SaveBase64ImageInterface;
