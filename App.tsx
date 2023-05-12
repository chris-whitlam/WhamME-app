import React from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  HomeScreen,
  SequencerScreen,
  SettingsScreen,
  SetupScreen,
  SongsRouter
} from './src/components/screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from './src/styles';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { ConnectionBanner } from './src/components/organisms/ConnectionBanner';
import { ToastWrapper } from './src/components/atoms';

const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background
  }
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ToastWrapper>
        <NavigationContainer theme={theme}>
          <ConnectionBanner>
            <Drawer.Navigator
              screenOptions={{
                headerShown: true,
                headerStyle: styles.header,
                headerShadowVisible: false,
                headerTitleStyle: styles.headerText,
                headerTintColor: colors.text,
                drawerStyle: styles.drawer,
                drawerType: 'back',
                drawerActiveBackgroundColor: colors.primary,
                drawerActiveTintColor: colors.text,
                drawerInactiveTintColor: colors.text
              }}>
              <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  drawerIcon: () => (
                    <Ionicons name="home-sharp" color={colors.text} size={15} />
                  )
                }}
              />
              <Drawer.Screen
                name="Songs"
                component={SongsRouter}
                options={{
                  drawerIcon: () => (
                    <Ionicons
                      name="musical-notes-sharp"
                      color={colors.text}
                      size={15}
                    />
                  )
                }}
              />
              <Drawer.Screen
                name="Sequencer"
                component={SequencerScreen}
                options={{
                  drawerIcon: () => (
                    <Ionicons
                      name="bar-chart-sharp"
                      color={colors.text}
                      size={15}
                    />
                  )
                }}
              />
              <Drawer.Screen
                name="Setup"
                component={SetupScreen}
                options={{
                  drawerIcon: () => (
                    <Ionicons
                      name="bluetooth-sharp"
                      color={colors.text}
                      size={15}
                    />
                  )
                }}
              />
            </Drawer.Navigator>
          </ConnectionBanner>
        </NavigationContainer>
      </ToastWrapper>
    </Provider>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent'
  },
  headerText: {
    color: colors.text
  },
  drawer: {
    backgroundColor: colors.background
  },
  drawerContent: {
    tintColor: colors.text
  }
});

export default App;
