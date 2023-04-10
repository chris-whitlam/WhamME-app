import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {
  HomeScreen,
  SequencerScreen,
  SettingsScreen,
  SongsScreen,
} from './src/components/screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeScreen} />
        <Tabs.Screen name="Sequencer" component={SequencerScreen} />
        <Tabs.Screen name="Songs" component={SongsScreen} />
        <Tabs.Screen name="Settings" component={SettingsScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

export default App;
