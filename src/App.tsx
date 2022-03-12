import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Text,
  Platform,
} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import {buildHTML} from './iFrame';

const App = () => {
  const webRef = useRef<WebView>(null);
  const [time, setTime] = useState('00:00');

  const playVideo = () => {
    webRef.current?.injectJavaScript('play()');
  };

  const pauseVideo = () => {
    webRef.current?.injectJavaScript('pause()');
  };

  const restartVideo = () => {
    webRef.current?.injectJavaScript('seekTo(0)');
  };

  const onMessageRecieved = (message: WebViewMessageEvent) => {
    const responseJSON = JSON.parse(message.nativeEvent.data);
    const minutes = Math.round(responseJSON.currentDuration / 60);
    const seconds = Math.round(responseJSON.currentDuration % 60);
    const minutesText = minutes < 10 ? `0${minutes}` : minutes;
    const secondsText = seconds < 10 ? `0${seconds}` : seconds;
    setTime(`${minutesText}:${secondsText}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        <WebView
          ref={webRef}
          source={{html: buildHTML('hQJeGBYI3C8')}}
          allowsFullscreenVideo={false}
          allowsInlineMediaPlayback
          scalesPageToFit={false}
          onMessage={onMessageRecieved}
          mediaPlaybackRequiresUserAction={false}
        />
      </View>
      <View style={styles.buttonRow}>
        <Button title="Play" onPress={playVideo} />
        <Button title="Pause" onPress={pauseVideo} />
        <Button title="Restart" onPress={restartVideo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.timeLabel}>{time}</Text>
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
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeLabel: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default App;
