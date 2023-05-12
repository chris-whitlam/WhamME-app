import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useLayoutEffect } from 'react';
import OrientationHandler from 'react-native-orientation-locker';

export type Orientation = 'portrait' | 'landscape';

interface useOrientationOptions {
  orientation?: Orientation;
}

export const useOrientation = ({ orientation }: useOrientationOptions = {}) => {
  const navigation = useNavigation();

  const setOrientation = useCallback((newOrientation: Orientation) => {
    switch (newOrientation) {
      case 'portrait':
        OrientationHandler.lockToPortrait();
        break;
      case 'landscape':
        OrientationHandler.lockToLandscape();
        break;
      default:
        return;
    }
  }, []);

  useLayoutEffect(() => {
    if (!orientation) {
      return;
    }

    const unsubscribe = navigation.addListener('focus', () =>
      setOrientation(orientation)
    );

    return unsubscribe;
  }, [navigation, orientation, setOrientation]);

  useEffect(() => {
    return () => OrientationHandler.unlockAllOrientations();
  });

  return {
    setOrientation
  };
};
