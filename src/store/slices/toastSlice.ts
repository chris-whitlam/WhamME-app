import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Toast } from '../../types';

interface ToastState {
  toast?: Toast;
}

const initialState: ToastState = {
  toast: undefined
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<Toast | undefined>) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = undefined;
    }
  }
});

export const { setToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
