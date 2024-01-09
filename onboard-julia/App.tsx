/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './login-page';
import {View, Text} from 'react-native';

const Stack = createNativeStackNavigator();

function NewScreen() {
  return (
    <View>
      <Text>New Screen</Text>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Blank" component={NewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
