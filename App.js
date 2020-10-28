import React from 'react';
import { Button, Text, View, FlatList, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Loading from './screens/Loading.js';
import MainScreen from './screens/MainScreen.js';
import UserScreen from './screens/UserScreen.js';
import ErrorScreen from './screens/ErrorScreen.js';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name="Loading"
          component={Loading}
          headerMode="none"
          options={({ navigation }) => ({
            headerShown: false,
            header: null,
          })}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            title: 'Главная',
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          options={UserScreen.navigationOptions}
        />
        <Stack.Screen
          name="Error"
          component={ErrorScreen}
          options={{
            title: 'Error',
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
