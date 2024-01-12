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
import {UsersList} from './users-list';
import {AddUser} from './add-user';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Users List" component={UsersList} />
        <Stack.Screen name="Add User" component={AddUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
