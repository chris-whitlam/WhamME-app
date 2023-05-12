import React, { ReactElement } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';
import { colors } from '../../styles';

type ButtonProps = {
  text?: string;
  style?: StyleProp<ViewStyle>;
  isActive?: boolean;
  Icon?: React.ReactNode;
} & PressableProps &
  React.RefAttributes<View>;

export default function Button({
  text,
  style,
  isActive = true,
  Icon = null,
  onPress
}: ButtonProps) {
  let buttonStyles = [styles.button, style];

  if (isActive) {
    buttonStyles = [...buttonStyles, styles.active];
  }

  return (
    <Pressable style={buttonStyles} onPress={onPress}>
      {Icon}
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    elevation: 4,
    backgroundColor: colors.inactive,
    display: 'flex',
    flexDirection: 'row',
    gap: 5
  },
  active: {
    backgroundColor: colors.primary
  },
  text: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  }
});
