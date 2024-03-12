# react-native-audio-file-duration-library

This library offers a straightforward solution for retrieving the duration of audio files within React Native applications.

Originally designed to complement the Expo Document Picker, it seamlessly integrates with any React Native project requiring audio file duration extraction. Its utility extends beyond Expo-based applications, accommodating any scenario with compatible file path formats.

An example app is included, showcasing its usage with detailed instructions below.

Note: Due to iOS simulator limitations with audio files, testing on a physical device is recommended for accurate results.

## Installation

```sh
npm install react-native-audio-file-duration-library
```

## Usage

```js
import { getAudioFileDuration } from 'react-native-audio-file-duration-library';
import * as DocumentPicker from 'expo-document-picker';

// ...

const expoDocumentPickerResult = await DocumentPicker.getDocumentAsync({
  type: 'audio/*',
});

const audioFile = expoDocumentPickerResult.assets[0];

const fileUri = audioFile.uri;

const duration = await getAudioFileDuration(fileUri);
```

## Platform Support

This library supports both iOS and Android platforms, with full functionality available on physical devices. Due to limitations within iOS simulators regarding audio file handling, it is recommended to test on physical iOS devices for accurate duration retrieval.

## Troubleshooting

Encountering issues? Check out the [Issues](https://github.com/austinzumbro/react-native-audio-file-duration-library/issues) section of our GitHub repository for known issues or to report a new one. For general questions or assistance, please ensure your file paths are correctly formatted as per the examples provided.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
