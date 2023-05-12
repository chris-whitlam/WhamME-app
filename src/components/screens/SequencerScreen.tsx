import React from 'react';
import { Text } from 'react-native';
import { useOrientation } from '../../hooks';

export const SequencerScreen = () => {
  useOrientation({ orientation: 'landscape', calledFrom: 'sequencer' });
  return <Text>Sequencer Screen</Text>;
};
