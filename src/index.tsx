// src/index.tsx
import { NativeModules, Platform } from 'react-native';

type AudioFileDurationType = {
  getAudioFileDuration: (filePath: string) => Promise<number>;
};

export const LINKING_ERROR =
  `The package 'react-native-audio-file-duration-library' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AudioFileDurationLibrary = NativeModules.AudioFileDurationLibrary as
  | AudioFileDurationType
  | undefined;

export const getAudioFileDuration = (filePath: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    if (!AudioFileDurationLibrary) {
      reject(new Error(LINKING_ERROR));
    } else {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        AudioFileDurationLibrary.getAudioFileDuration(filePath)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error('Unsupported platform'));
      }
    }
  });
};
