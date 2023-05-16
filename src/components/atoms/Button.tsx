import React from 'react';
import {
  ActivityIndicator,
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
  isLoading?: boolean;
} & PressableProps &
  React.RefAttributes<View>;

export default function Button({
  text,
  style,
  isActive = true,
  Icon = null,
  isLoading = false,
  onPress
}: ButtonProps) {
  let buttonStyles = [styles.button, style];

  if (isActive && !isLoading) {
    buttonStyles = [...buttonStyles, styles.active];
  }

  if (isLoading) {
    Icon = <ActivityIndicator size="small" color={colors.text} />;
  }

  return (
    <Pressable style={buttonStyles} onPress={onPress} disabled={isLoading}>
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
