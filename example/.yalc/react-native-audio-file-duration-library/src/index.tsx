import { NativeModules, Platform } from 'react-native';

type AudioFileDurationType = {
  getAudioFileDuration: (filePath: string) => Promise<number>;
};

const LINKING_ERROR =
  `The package 'react-native-audio-file-duration-library' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AudioFileDurationLibrary = NativeModules.AudioFileDuration as
  | AudioFileDurationType
  | undefined;

if (!AudioFileDurationLibrary) {
  console.error(LINKING_ERROR);
  throw new Error(LINKING_ERROR);
}

export const getAudioFileDuration = (filePath: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      AudioFileDurationLibrary.getAudioFileDuration(filePath)
        .then(resolve)
        .catch(reject);
    } else {
      reject(new Error('Unsupported platform'));
    }
  });
};
