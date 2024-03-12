// src/__tests__/index.test.tsx
// import { LINKING_ERROR } from '../index';

// Mock react-native globally
jest.mock('react-native', () => ({
  NativeModules: {
    AudioFileDurationLibrary: {
      getAudioFileDuration: jest.fn(),
    },
  },
  Platform: {
    ...jest.requireActual('react-native').Platform,
    select: jest.fn(),
  },
}));

describe('AudioFileDurationLibrary', () => {
  const { NativeModules, Platform } = require('react-native');

  beforeEach(() => {
    // Reset mocks to their initial mocked state
    NativeModules.AudioFileDurationLibrary.getAudioFileDuration
      .mockReset()
      .mockImplementation(() => Promise.resolve(120));
    Platform.select.mockImplementation(() => '');
    Platform.OS = 'ios'; // Reset to default
  });

  it('should return the duration when the native module resolves', async () => {
    const expectedDuration = 120;
    const filePath = '/path/to/mock/audio/file.mp3';
    const { getAudioFileDuration } = require('../index');

    await expect(getAudioFileDuration(filePath)).resolves.toBe(
      expectedDuration
    );
  });

  it('should throw an error when the native module rejects', async () => {
    const { getAudioFileDuration } = require('../index');
    const mockError = new Error('Mock error');
    NativeModules.AudioFileDurationLibrary.getAudioFileDuration.mockRejectedValue(
      mockError
    );

    const filePath = '/path/to/mock/audio/file.mp3';

    await expect(getAudioFileDuration(filePath)).rejects.toThrow('Mock error');
  });

  it('should throw an error when the platform is unsupported', async () => {
    Platform.OS = 'web'; // Simulate unsupported platform

    const filePath = '/path/to/mock/audio/file.mp3';
    const { getAudioFileDuration } = require('../index');

    await expect(getAudioFileDuration(filePath)).rejects.toThrow(
      'Unsupported platform'
    );
  });

  // it('should throw a linking error when the native module is undefined', async () => {
  //   jest.doMock('react-native', () => ({
  //     NativeModules: {},
  //     Platform: {
  //       ...jest.requireActual('react-native').Platform,
  //       select: jest.fn(),
  //     },
  //   }));

  //   const { getAudioFileDuration } = require('../index');

  //   const filePath = '/path/to/mock/audio/file.mp3';
  //   await expect(getAudioFileDuration(filePath)).rejects.toThrow(
  //     new RegExp(LINKING_ERROR)
  //   );
  // });
});
