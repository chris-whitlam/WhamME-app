import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Song } from '../types';
import { useNavigation } from '@react-navigation/native';
import useBLE from './useBLE';
import { useToast } from './useToast';
import { setCurrentSong, setIsPlaying } from '../store/slices/songSlice';
import { PLAYING_SONG_CHARACTERISTIC_UUID } from '../constants';

export const useSong = () => {
  const { isConnected, sendMessage } = useBLE();
  const { showError } = useToast();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { currentSong } = useAppSelector((state) => state.song);

  const onSelectSong = useCallback(
    (song: Song) => {
      if (currentSong?.id === song.id) {
        dispatch(setCurrentSong(undefined));
        return;
      }

      dispatch(setCurrentSong(song));
    },
    [currentSong?.id, dispatch]
  );

  const onEditSong = useCallback(
    (song: Song) => {
      navigation.navigate('EditSong', {
        song
      });
    },
    [navigation]
  );

  const onPlaySong = useCallback(
    async (song: Song) => {
      if (!isConnected) {
        showError('Must be connected to device');
        return;
      }
      dispatch(setCurrentSong(song));
      dispatch(setIsPlaying(true));

      await sendMessage('test', PLAYING_SONG_CHARACTERISTIC_UUID);
    },
    [dispatch, isConnected, sendMessage, showError]
  );

  const onStopSong = useCallback(async () => {
    if (!isConnected) {
      showError('Must be connected to device');
      return;
    }
    dispatch(setIsPlaying(false));
    await sendMessage('', PLAYING_SONG_CHARACTERISTIC_UUID);
  }, [dispatch, isConnected, sendMessage, showError]);

  return {
    currentSong,
    onSelectSong,
    onPlaySong,
    onStopSong,
    onEditSong
  };
};
