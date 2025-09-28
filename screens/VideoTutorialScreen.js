// screens/VideoTutorialScreen.js
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';

const SOURCE =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoTutorialScreen() {
  // Cria e configura o player
  const player = useVideoPlayer(SOURCE, (p) => {
    p.loop = true;   // loop
    p.play();        // já inicia tocando
  });

  // Estado reativo de play/pause via eventos do player
  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        contentFit="contain" // substitui o antigo ResizeMode
      />
      <Button
        title={isPlaying ? 'Pausar' : 'Reproduzir'}
        onPress={() => (isPlaying ? player.pause() : player.play())}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  video: { width: '100%', aspectRatio: 16 / 9, marginBottom: 12 },
});





