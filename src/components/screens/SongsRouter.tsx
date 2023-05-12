import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SongsScreen } from './SongsScreen';
import { EditSongScreen } from './EditSongScreen';
import { CurrentSong } from '../molecules/songs';
import { useOrientation, useSong } from '../../hooks';

const Stack = createNativeStackNavigator();

export const SongsRouter = () => {
  useOrientation({ orientation: 'portrait' });
  const { currentSong, onEditSong, onPlaySong, onStopSong } = useSong();

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SongList" component={SongsScreen} />
        <Stack.Screen name="EditSong" component={EditSongScreen} />
      </Stack.Navigator>
      <CurrentSong
        song={currentSong}
        onPressEdit={onEditSong}
        onPressPlay={onPlaySong}
        onPressStop={onStopSong}
      />
    </>
  );
};
