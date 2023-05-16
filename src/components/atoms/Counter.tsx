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
    if (onChange) {
      onChange(localValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValue]);

  const decrement = useCallback(
    () =>
      setLocalValue((currentValue) => {
        const newValue = currentValue - 1;
        return newValue < min ? currentValue : newValue;
      }),
    [min]
  );

  const increment = useCallback(
    () =>
      setLocalValue((currentValue) => {
        const newValue = currentValue + 1;
        return max !== undefined && newValue > max ? currentValue : newValue;
      }),
    [max]
  );

  const handlePressOut = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  }, [intervalId]);

  const handleDecrementPressIn = useCallback(() => {
    handlePressOut();

    const id = setInterval(decrement, 80);
    setIntervalId(id);
  }, [decrement, handlePressOut]);

  const handleIncrementPressIn = useCallback(() => {
    handlePressOut();

    const id = setInterval(increment, 80);
    setIntervalId(id);
  }, [handlePressOut, increment]);

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
