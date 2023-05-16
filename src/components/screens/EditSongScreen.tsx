import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Song } from '../../types';
import { Button, Counter, FormField } from '../atoms';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSong } from '../../hooks';

interface EditSongScreenProps {
  route: {
    params: {
      song: Song;
    };
  };
}

export const EditSongScreen = ({ route }: EditSongScreenProps) => {
  const { song } = route.params;
  const navigation = useNavigation();
  const { updateSongDetails, fetchSongs } = useSong();
  const [updatedSong, setUpdatedSong] = useState<Song>(song);
  const [isUpdatingSong, setIsUpdatingSong] = useState<boolean>(false);

  const saveSong = useCallback(async () => {
    if (!song?.id || !updatedSong) {
      return;
    }
    setIsUpdatingSong(true);
    await updateSongDetails(updatedSong);
    await fetchSongs();
    setIsUpdatingSong(false);
    navigation.goBack();
  }, [fetchSongs, navigation, song?.id, updateSongDetails, updatedSong]);

  const updateSongValue = (key: string, value: any) => {
    setUpdatedSong((state) => ({ ...state, [key]: value }));
  };

  if (!song) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FormField
        label="Name"
        type="alphanumeric"
        value={updatedSong?.name}
        onChangeText={(text) => updateSongValue('name', text)}
        maxLength={30}
      />
      <Counter
        value={updatedSong?.bpm}
        min={80}
        max={150}
        label="Bpm"
        onChange={(value) => updateSongValue('bpm', value)}
      />
      <View style={styles.buttonsContainer}>
        <Button
          text="Back"
          isActive={false}
          style={styles.buttons}
          Icon={<Ionicons name="arrow-back-sharp" size={20} />}
          onPress={navigation.goBack}
        />
        <Button
          style={styles.buttons}
          text="Save"
          Icon={<Ionicons name="save-sharp" size={20} />}
          onPress={saveSong}
          isLoading={isUpdatingSong}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: 'flex',
    gap: 20
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100%',
    justifyContent: 'space-between',
    gap: 30
  },
  buttons: {
    flexGrow: 1
  },
  bpm: {
    width: 20 * 3 // font size times characters
  }
});
