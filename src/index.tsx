import { NativeModules } from 'react-native';

type SaveBase64ImageType = {
  multiply(a: number, b: number): Promise<number>;
};

const { SaveBase64Image } = NativeModules;

export default SaveBase64Image as SaveBase64ImageType;
