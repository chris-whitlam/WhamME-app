import React, { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useAppSelector } from '../../store/hooks';
import { colors } from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ConnectionStatus } from '../../store/slices/bluetoothSlice';

interface ConnectionBannerProps {
  children: ReactNode;
}

export const ConnectionBanner = ({ children }: ConnectionBannerProps) => {
  const navigation = useNavigation();
  const connectionStatus = useAppSelector(
    (state) => state.bluetooth.connectionStatus
  );

  if (connectionStatus === ConnectionStatus.CONNECTED) {
    return <>{children}</>;
  }

  return (
    <>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Setup')}>
        <Ionicons name="bluetooth-sharp" size={12} style={styles.icon} />
        <Text style={styles.buttonText}>Not Connected</Text>
      </Pressable>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3
  },
  buttonText: {
    color: colors.text
  },
  icon: {
    color: colors.text
  }
});
