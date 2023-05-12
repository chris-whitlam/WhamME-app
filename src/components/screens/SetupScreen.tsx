import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useBLE, useOrientation } from '../../hooks';
import { colors } from '../../styles';

import { Connected, NotConnected, Searching, Connecting } from '../molecules';
import { ConnectionStatus } from '../../store/slices/bluetoothSlice';

export const SetupScreen = () => {
  useOrientation({ orientation: 'portrait' });
  const { connectionStatus } = useBLE(true);

  const componentMap = {
    [ConnectionStatus.SEARCHING]: <Searching />,
    [ConnectionStatus.CONNECTED]: <Connected />,
    [ConnectionStatus.CONNECTING]: <Connecting />,
    [ConnectionStatus.DISCONNECTED]: <NotConnected />
  };

  return <View style={styles.container}>{componentMap[connectionStatus]}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '50%',
    paddingLeft: '20%',
    paddingRight: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: colors.text,
    textAlign: 'center',
    marginTop: 10
  }
});
