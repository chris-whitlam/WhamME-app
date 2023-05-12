import React, { useCallback } from 'react';
import { useBLE } from '../../../hooks';
import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../styles';

export const NotConnected = () => {
  const { startScan } = useBLE();

  const handleConnection = useCallback(async () => {
    startScan();
  }, [startScan]);

  return (
    <>
      <MaterialIcons name="bluetooth-disabled" style={styles.icon} size={200} />
      <Text style={styles.title}>Not Connected</Text>
      <Pressable style={styles.button} onPress={handleConnection}>
        <Text style={styles.buttonText}>Scan for devices</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 12,
    marginBottom: 50,
    fontWeight: '300'
  },
  icon: {
    color: colors.bluetooth,
    marginBottom: 4
  },
  button: {
    width: '100%',
    backgroundColor: colors.bluetooth,
    borderRadius: 15,
    padding: 10,
    elevation: 4
  },
  buttonText: {
    textAlign: 'center',
    color: colors.text,
    fontWeight: 'bold'
  }
});
