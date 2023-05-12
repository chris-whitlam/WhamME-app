import React from 'react';
import { Song } from '../../../types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../../../store/hooks';

interface SongListItemProps {
  song: Song;
  onPress: (song: Song) => void;
  onPressPlay: (song: Song) => void;
  onPressEdit: (song: Song) => void;
  onPressStop: (song: Song) => void;
}

export const SongListItem = ({
  song,
  onPress,
  onPressEdit,
  onPressPlay,
  onPressStop
}: SongListItemProps) => {
  const { currentSong, isPlaying: isCurrentSongPlaying } = useAppSelector(
    (state) => state.song
  );
  const isCurrentSong = currentSong?.name === song.name;
  const isPlaying = isCurrentSongPlaying && isCurrentSong;

  const buttonStyle = isCurrentSong
    ? styles.activeButton
    : styles.inactiveButton;

  return (
    <Pressable
      style={[styles.button, buttonStyle]}
      onPress={() => onPress(song)}>
      <Text style={styles.text}>{song.name}</Text>
      <View style={styles.buttonContainer}>
        {isPlaying ? (
          <Pressable onPress={() => onPressStop(song)}>
            <Ionicons style={styles.icon} name="stop-sharp" size={30} />
          </Pressable>
        ) : (
          <Pressable onPress={() => onPressPlay(song)}>
            <Ionicons style={styles.icon} name="play-sharp" size={30} />
          </Pressable>
        )}
        <Pressable onPress={() => onPressEdit(song)}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="dots-vertical"
            size={30}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15
  },
  activeButton: {
    backgroundColor: colors.primary
  },
  inactiveButton: {
    backgroundColor: colors.inactive
  },
  icon: {
    color: colors.text
  },
  text: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 16
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8
  }
});
