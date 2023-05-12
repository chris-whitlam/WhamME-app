import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Peripheral } from 'react-native-ble-manager';

export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  SEARCHING = 'searching'
}

interface BluetoothState {
  connectedDevice: Peripheral | null;
  connectionStatus: ConnectionStatus;
  isConnected: boolean;
}

const initialState: BluetoothState = {
  connectedDevice: null,
  connectionStatus: ConnectionStatus.DISCONNECTED,
  isConnected: false
};

const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    setConnectedDevice: (state, action: PayloadAction<Peripheral | null>) => {
      const isConnected = !!action.payload;
      state.connectedDevice = action.payload;
      state.connectionStatus = isConnected
        ? ConnectionStatus.CONNECTED
        : ConnectionStatus.DISCONNECTED;
      state.isConnected = isConnected;
    },
    setConnectionStatus: (state, action: PayloadAction<ConnectionStatus>) => {
      state.connectionStatus = action.payload;
      state.isConnected = action.payload === ConnectionStatus.CONNECTED;
    },
    disconnectFromDevice: (state) => {
      state.connectionStatus = ConnectionStatus.DISCONNECTED;
      state.connectedDevice = null;
    }
  }
});

export const { setConnectedDevice, setConnectionStatus, disconnectFromDevice } =
  bluetoothSlice.actions;
export default bluetoothSlice.reducer;
