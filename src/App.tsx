import React, {useRef} from 'react';
import {StyleSheet, View, SafeAreaView, Button} from 'react-native';
import WebView from 'react-native-webview';
import {buildHTML} from './iFrame';

const App = () => {
  const webRef = useRef<WebView>(null);

  const playVideo = () => {
    webRef.current?.injectJavaScript('play()');
  };

  const pauseVideo = () => {
    webRef.current?.injectJavaScript('pause()');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        <WebView
          ref={webRef}
          source={{html: buildHTML('JzS96auqau0')}}
          allowsFullscreenVideo={false}
          allowsInlineMediaPlayback
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Play" onPress={playVideo} />
        <Button title="Pause" onPress={pauseVideo} />
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
