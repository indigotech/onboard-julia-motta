import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo-client';
import {Login} from './login-page';
import {UsersList} from './users-list';
import {AddUser} from './add-user';
import {UserDetails} from './user-details-screen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Users List" component={UsersList} />
          <Stack.Screen name="Add User" component={AddUser} />
          <Stack.Screen name="User Details" component={UserDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
