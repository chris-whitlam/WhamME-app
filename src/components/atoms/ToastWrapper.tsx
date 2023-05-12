import React, { FC, useState, useEffect, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '../../store/hooks';

interface ToastWrapperProps {
  children: ReactNode;
  onClose?: () => void;
}

const ToastWrapper: FC<ToastWrapperProps> = ({ children, onClose }) => {
  const {
    message,
    duration = 5000,
    time
  } = useAppSelector((state) => state.toast.toast) || {};
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (!message) {
      return;
    }

    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, duration);
    return () => clearTimeout(timeout);
  }, [duration, message, time, onClose]);

  return (
    <>
      {visible && (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <MaterialIcons name="error" size={30} />
            <Text style={styles.title}>Error</Text>
          </View>
          <Text style={styles.text}>{message}</Text>
        </View>
      )}
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'peru',
    borderRadius: 8,
    padding: 15,
    minWidth: 100,
    position: 'absolute',
    top: 50,
    right: 0,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 50
    },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 50
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  title: {
    fontSize: 15,
    color: colors.text,
    fontWeight: 'bold'
  },
  text: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '300'
  }
});

export default ToastWrapper;
