import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../types';

interface SongState {
  songs: Song[];
  currentSong?: Song;
  isPlaying: boolean;
}

const initialState: SongState = {
  songs: [],
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
    },
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    }
  }
});

export const { setCurrentSong, setIsPlaying, setSongs } = songSlice.actions;
export default songSlice.reducer;
