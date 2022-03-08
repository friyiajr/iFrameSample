import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';
import {buildHTML} from './iFrame';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        <WebView
          source={{html: buildHTML('hQJeGBYI3C8')}}
          allowsFullscreenVideo={false}
          allowsInlineMediaPlayback
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  videoContainer: {
    height: 250,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
});

export default App;
