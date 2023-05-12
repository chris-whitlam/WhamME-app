import React, { useCallback } from 'react';
import { useBLE } from '../../../hooks';
import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../styles';

export const Searching = () => {
  const { stopScan } = useBLE();

  return (
    <>
      <MaterialIcons
        name="bluetooth-searching"
        style={styles.icon}
        size={200}
      />
      <Text style={styles.title}>Searching for devices...</Text>
      <Pressable style={styles.button} onPress={stopScan}>
        <Text style={styles.buttonText}>Stop Scanning</Text>
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
