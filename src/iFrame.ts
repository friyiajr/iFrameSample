import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const buildIFrame = (videoId: string) => `
        <div id="player"></div>
        <script>
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          var player;
          function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
              height: '100%',
              width: ${width},
              videoId: "${videoId}",
              playerVars: {
                'playsinline': 1,
                'modestbranding': 1,
                'controls': 0,
                'rel': 0,
              },
            });
            MessageInvoker.postMessage('YouTube has loaded');
          }
        </script>
        `;

const iFrameStyle = `
        <style>
          html {
            overflow-y: hidden;
            overflow-x: hidden;
            height: 100%;
          }
          body {
            background-color: black;
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }
        </style>
        `;

export const buildHTML = (videoId: string) => `
        <!DOCTYPE html>
        <html>
          <head>
            ${iFrameStyle}
            <meta name="viewport" content="initial-scale=0.95">
            <title>Navigation Delegate Example</title>
          </head>
          <body>${buildIFrame(videoId)}</body>
        </html>
        `;
