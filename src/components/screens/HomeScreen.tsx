import React from 'react';
import { useOrientation, useControls } from '../../hooks';

import { chordsPrograms } from '../../data';
import { Button, VerticalSlider } from '../atoms';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../styles';

export const HomeScreen = () => {
  useOrientation({ orientation: 'portrait' });
  const { program, expression, setProgram, setExpression } = useControls();

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <View style={styles.harmonySection}>
          {chordsPrograms.harmony.map((button: any) => {
            const isActive = program === button.programIds.active;
            const programId = isActive
              ? button.programIds.bypass
              : button.programIds.active;

            return (
              <Button
                key={button.name}
                text={button.name}
                onPress={() => setProgram(programId)}
                style={styles.button}
                isActive={isActive}
              />
            );
          })}
        </View>
        <View style={styles.rightSection}>
          <View style={styles.whammySection}>
            {chordsPrograms.whammy.map((button: any) => {
              const isActive = program === button.programIds.active;
              const programId = isActive
                ? button.programIds.bypass
                : button.programIds.active;

              return (
                <Button
                  key={button.name}
                  text={button.name}
                  onPress={() => setProgram(programId)}
                  style={[styles.button]}
                  isActive={isActive}
                />
              );
            })}
          </View>

          <View style={styles.expressionSection}>
            <VerticalSlider
              min={0}
              max={127}
              width={80}
              height={670}
              value={expression}
              shadowProps={{ elevation: 4 }}
              borderRadius={15}
              onChange={(value: number) => setExpression(value)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: colors.background
  },
  controls: {
    flex: 3,
    flexDirection: 'row'
  },
  button: {
    marginBottom: 18,
    width: '90%',
    height: 45
  },
  harmonySection: {
    width: '40%'
  },
  rightSection: {
    width: '60%',
    flex: 1,
    flexDirection: 'row'
  },
  whammySection: {
    width: '65%'
  },
  expressionSection: {
    width: '35%'
  },
  activeButton: {
    width: '155%',
    height: 48
  },
  connectedButton: {
    backgroundColor: colors.bluetooth,
    width: 150
  }
});
