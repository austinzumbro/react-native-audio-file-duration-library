import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { getAudioFileDuration } from 'react-native-audio-file-duration-library';
import * as DocumentPicker from 'expo-document-picker';

export default function App() {
  const [duration, setDuration] = React.useState<number | undefined>();
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const handleSelectFile = async () => {
    try {
      setIsFetching(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });

      console.log('Result from DocumentPicker: ', result);

      if (!result.canceled && result.assets) {
        const firstAsset = result.assets[0];
        // console.log('First asset: ', firstAsset);
        if (firstAsset) {
          // console.log('First asset URI: ', firstAsset.uri);
          // console.log('Calling handleGetDuration...');
          handleGetDuration(firstAsset.uri);
        } else {
          setIsFetching(false);
        }
      } else {
        setIsFetching(false);
      }
    } catch (error) {
      console.error(error);
      setIsFetching(false);
    }
  };

  const handleGetDuration = async (uri: string) => {
    try {
      const fileDuration = await getAudioFileDuration(uri);
      // console.log(fileDuration);
      setDuration(fileDuration);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select an Audio File" onPress={handleSelectFile} />
      {isFetching ? (
        <Text>Fetching duration...</Text>
      ) : (
        <Text>Duration: {duration ? `${duration} seconds` : 'N/A'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
