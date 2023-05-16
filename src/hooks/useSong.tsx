import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Song } from '../types';
import { useNavigation } from '@react-navigation/native';
import useBLE from './useBLE';
import { useToast } from './useToast';
import {
  setCurrentSong,
  setIsPlaying,
  setSongs
} from '../store/slices/songSlice';
import {
  PLAYING_SONG_CHARACTERISTIC_UUID,
  SONGS_CHARACTERISTIC_UUID,
  UPDATE_SONG_CHARACTERISTIC_UUID
} from '../constants';

export const useSong = () => {
  const { isConnected, sendMessage, fetchData } = useBLE();
  const { showError } = useToast();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { currentSong, songs } = useAppSelector((state) => state.song);

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

      await sendMessage(song.id, PLAYING_SONG_CHARACTERISTIC_UUID);
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

  const fetchSongs = useCallback(async () => {
    if (!isConnected) {
      showError('Must be connected to device');
      return;
    }

    const songsString = await fetchData(SONGS_CHARACTERISTIC_UUID);
    const songsData = JSON.parse(songsString);

    dispatch(setSongs(songsData));
  }, [dispatch, fetchData, isConnected, showError]);

  const updateSongDetails = useCallback(
    async (updatedSong: Song) => {
      const str = JSON.stringify(updatedSong);

      try {
        await sendMessage(str, UPDATE_SONG_CHARACTERISTIC_UUID);
      } catch (e) {
        showError('Failed to update song');
      }
    },
    [sendMessage, showError]
  );

  return {
    currentSong,
    songs,
    onSelectSong,
    onPlaySong,
    onStopSong,
    onEditSong,
    fetchSongs,
    updateSongDetails
  };
};
