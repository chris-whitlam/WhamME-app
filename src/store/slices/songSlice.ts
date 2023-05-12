import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../types';

interface SongState {
  currentSong?: Song;
  isPlaying: boolean;
}

const initialState: SongState = {
  currentSong: undefined,
  isPlaying: false
};

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song | undefined>) => {
      state.currentSong = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    }
  }
});

export const { setCurrentSong, setIsPlaying } = songSlice.actions;
export default songSlice.reducer;
