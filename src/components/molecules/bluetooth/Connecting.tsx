import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../styles';

export const Connecting = () => {
  return (
    <>
      <MaterialIcons
        name="bluetooth-searching"
        style={styles.icon}
        size={200}
      />
      <Text style={styles.title}>Connecting to device...</Text>
      <Pressable style={styles.button} disabled>
        <ActivityIndicator color={colors.text} />
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
