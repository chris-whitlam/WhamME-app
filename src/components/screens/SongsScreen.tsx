import React, { useCallback, useEffect } from 'react';

import { SongListItem } from '../molecules/songs';
import { Song } from '../../types';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSong } from '../../hooks';

// const songs: Song[] = [
//   {
//     id: 1,
//     name: 'Map of the Problematic',
//     bpm: 120,
//     canOpenInSequencer: false
//   },
//   {
//     id: 2,
//     name: 'Unsustainable',
//     bpm: 120,
//     canOpenInSequencer: false
//   }
// ];

export const SongsScreen = () => {
  const {
    songs,
    onSelectSong,
    onEditSong,
    onPlaySong,
    onStopSong,
    fetchSongs
  } = useSong();

  useEffect(() => {
    fetchSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Seperator = useCallback(() => <View style={styles.seperator} />, []);

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled
        keyExtractor={(song) => `${song.id}`}
        data={songs}
        ItemSeparatorComponent={Seperator}
        renderItem={(song) => (
          <SongListItem
            song={song.item}
            onPress={onSelectSong}
            onPressEdit={onEditSong}
            onPressPlay={onPlaySong}
            onPressStop={onStopSong}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    height: '100%'
  },
  seperator: {
    height: 15
  }
});
