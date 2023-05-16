import { useCallback, useEffect, useState, useRef } from 'react';
import BleManager, { Peripheral } from 'react-native-ble-manager';
import { TextDecoder, TextEncoder } from 'text-encoding';

import {
  NativeEventEmitter,
  NativeModules,
  Permission,
  PermissionsAndroid,
  Platform
} from 'react-native';
import { WHAMME_SERVICE_UUID } from '../constants';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  ConnectionStatus,
  setConnectedDevice,
  setConnectionStatus,
  disconnectFromDevice
} from '../store/slices/bluetoothSlice';
import { useToast } from './useToast';
import { byteArrayToString } from '../utils';
import { useNavigation } from '@react-navigation/native';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const useBLE = (setupListeners = false) => {
  const { showError } = useToast();
  const textEncoder = useRef(new TextEncoder());
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { connectionStatus, connectedDevice, isConnected } = useAppSelector(
    (state) => state.bluetooth
  );
  const isScanning = connectionStatus === ConnectionStatus.SEARCHING;

  const handlePermissions = useCallback(async () => {
    await handlePermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    await handlePermission(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
    await handlePermission(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
  }, []);

  const handlePermission = async (permission: Permission) => {
    if (Platform.OS === 'android') {
      const alreadyGranted = await PermissionsAndroid.check(permission);

      if (alreadyGranted) {
        console.log(`${permission} already granted`);
        return alreadyGranted;
      }

      const grantedStatus = await PermissionsAndroid.request(permission);

      console.log(`${permission} is ${grantedStatus}`);
      if (!grantedStatus) {
        throw new Error('Permission not given');
      }
    } else {
      return true;
    }
  };

  const setup = useCallback(async () => {
    console.log('enabling bluetooth');
    await BleManager.enableBluetooth();
    console.log('bluetooth enabled');

    console.log('requesting permimssions');
    await handlePermissions();
    console.log('permimssions handled');

    await BleManager.start();
    console.log('Blemanger started');
  }, [handlePermissions]);

  const startScan = async () => {
    if (isScanning) {
      return;
    }

    await setup();

    dispatch(setConnectionStatus(ConnectionStatus.SEARCHING));
    await BleManager.scan([], 5, true);
  };

  const handleScanStopped = useCallback(async () => {
    const discoveredDevices = await BleManager.getDiscoveredPeripherals();
    const whammyDevice = discoveredDevices.find(
      (peripheral) =>
        peripheral.name === 'WhamME' && peripheral.advertising.isConnectable
    );

    if (!whammyDevice) {
      console.log('Whammy not found');
      dispatch(setConnectionStatus(ConnectionStatus.DISCONNECTED));
      return;
    }
    console.log('Whammy found');
    dispatch(setConnectionStatus(ConnectionStatus.CONNECTING));

    try {
      await BleManager.connect(whammyDevice.id);
      console.log('is connected');

      console.log('retrieveServices');

      await BleManager.retrieveServices(whammyDevice.id);

      dispatch(setConnectedDevice(whammyDevice));
    } catch (error) {
      console.log(error);
      showError('Failed to connect to device');
      dispatch(setConnectionStatus(ConnectionStatus.DISCONNECTED));
    }
  }, [dispatch, showError]);

  const sendMessage = useCallback(
    async (
      message: string,
      characteristicId: string,
      shouldNotWait: boolean = false
    ) => {
      if (!connectedDevice) {
        throw new Error('Must be connected to device');
      }

      const payloadUint8 = textEncoder.current.encode(message);
      const byteArray = Array.from(payloadUint8);

      try {
        if (shouldNotWait) {
          await BleManager.writeWithoutResponse(
            connectedDevice.id,
            WHAMME_SERVICE_UUID,
            characteristicId,
            byteArray
          );
        } else {
          await BleManager.write(
            connectedDevice.id,
            WHAMME_SERVICE_UUID,
            characteristicId,
            byteArray
          );
        }
      } catch (e) {
        console.log(JSON.stringify(e));
        throw new Error('Something went wrong');
      }
    },
    [connectedDevice]
  );

  const fetchData = useCallback(
    async (characteristicId: string) => {
      if (!connectedDevice) {
        throw new Error('Must be connected to device');
      }

      try {
        const result: any = await BleManager.read(
          connectedDevice.id,
          WHAMME_SERVICE_UUID,
          characteristicId
        );

        return byteArrayToString(result);
      } catch (e) {
        console.log('error', JSON.stringify(e));
        throw new Error('Something went wrong');
      }
    },
    [connectedDevice]
  );

  const disconnect = useCallback(async () => {
    if (!connectedDevice) {
      console.log('sdfsdfsdf');
      return;
    }

    await BleManager.disconnect(connectedDevice.id);
    dispatch(disconnectFromDevice());
  }, [connectedDevice, dispatch]);

  const stopScan = useCallback(async () => {
    if (!isScanning) {
      return;
    }
    await BleManager.stopScan();
  }, [isScanning]);

  useEffect(() => {
    if (!setupListeners) {
      return;
    }

    let stopScanListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => handleScanStopped()
    );

    return () => {
      if (stopScanListener) {
        stopScanListener.remove();
      }
    };
  }, [dispatch, handleScanStopped, setupListeners]);

  return {
    isScanning,
    isConnected,
    connectedDevice,
    connectionStatus,
    startScan,
    stopScan,
    sendMessage,
    disconnect,
    fetchData
  };
};

export default useBLE;
