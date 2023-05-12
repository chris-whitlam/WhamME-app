import React from 'react';
import { Dimensions, Pressable } from 'react-native';

import { StyleSheet, Text, View } from 'react-native';
import { Song } from '../../../types';
import { colors } from '../../../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../../../store/hooks';

interface CurrentSongProps {
  onPressPlay: (song: Song) => void;
  onPressEdit: (song: Song) => void;
  onPressStop: (song: Song) => void;
}

export const CurrentSong = ({
  onPressEdit,
  onPressPlay,
  onPressStop
}: CurrentSongProps) => {
  const { currentSong, isPlaying } = useAppSelector((state) => state.song);

  if (!currentSong) {
    return null;
  }

  const playStopAction = isPlaying ? onPressStop : onPressPlay;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{currentSong.name}</Text>
      <View style={styles.buttonsContainer}>
        {isPlaying ? (
          <Pressable onPress={() => playStopAction(currentSong)}>
            <Ionicons style={styles.icon} name="stop-sharp" size={30} />
          </Pressable>
        ) : (
          <Pressable onPress={() => onPressPlay(currentSong)}>
            <Ionicons style={styles.icon} name="play-sharp" size={30} />
          </Pressable>
        )}
        <Pressable onPress={() => onPressEdit(currentSong)}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="dots-vertical"
            size={30}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.primary,
    width: Dimensions.get('window').width,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 16
  },
  icon: {
    color: colors.text
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  }
});
