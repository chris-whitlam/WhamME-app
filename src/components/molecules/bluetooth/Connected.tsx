import React from 'react';
import { useBLE } from '../../../hooks';
import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../styles';

export const Connected = () => {
  const { disconnect } = useBLE();

  return (
    <>
      <MaterialIcons
        name="bluetooth-connected"
        style={styles.icon}
        size={200}
      />
      <Text style={styles.title}>Connected</Text>
      <Pressable style={styles.button} onPress={disconnect}>
        <Text style={styles.buttonText}>Disconnect</Text>
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
