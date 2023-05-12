import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CounterProps {
  value?: number;
  label?: string;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

const Counter = ({
  value = 0,
  min = 0,
  max,
  label,
  onChange
}: CounterProps) => {
  const [localValue, setLocalValue] = useState(value);
  const [intervalId, setIntervalId] = useState<number | undefined>();

  useEffect(() => {
    onChange && onChange(localValue);
  }, [localValue, onChange]);

  const decrement = () =>
    setLocalValue((currentValue) => {
      const newValue = currentValue - 1;
      return newValue < min ? currentValue : newValue;
    });

  const increment = () =>
    setLocalValue((currentValue) => {
      const newValue = currentValue + 1;
      return max !== undefined && newValue > max ? currentValue : newValue;
    });

  const handleDecrementPressIn = () => {
    handlePressOut();

    const id = setInterval(decrement, 80);
    setIntervalId(id);
  };

  const handleIncrementPressIn = () => {
    handlePressOut();

    const id = setInterval(increment, 80);
    setIntervalId(id);
  };

  const handlePressOut = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  };

  return (
    <>
      {label && <Text>{label}</Text>}
      <View style={styles.container}>
        <Pressable
          onPressIn={handleDecrementPressIn}
          onPressOut={handlePressOut}>
          <MaterialCommunityIcons name="minus-circle" size={30} />
        </Pressable>
        <Text style={styles.text}>{value}</Text>
        <Pressable
          onPressIn={handleIncrementPressIn}
          onPressOut={handlePressOut}>
          <MaterialCommunityIcons name="plus-circle" size={30} />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30
  },
  text: {
    fontSize: 25
  }
});

export default Counter;
