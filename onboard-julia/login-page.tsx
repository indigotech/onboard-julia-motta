import React, {useState} from 'react';
import {isValidEmail, isValidPassword} from './login-validation';
import {gql} from '@apollo/client';
import {client} from './apollo-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

export function Login(): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(data: {email: $email, password: $password}) {
        token
      }
    }
  `;

  const handleLoginPress = () => {
    if (!isValidEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    if (password.length < 7) {
      Alert.alert('Erro', 'As senhas devem ter no mínimo 7 caracteres.');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(
        'Erro',
        'As senhas devem ter no mínimo uma letra e um número',
      );
      return;
    } else {
      client
        .mutate({
          mutation: LOGIN_USER,
          variables: {
            email,
            password,
          },
        })
        .then(async response => {
          if (response.data === null) {
            const error = response.errors ? response.errors[0] : null;
            if (error) {
              console.error('GraphQL Error:', error.message);
              Alert.alert(`GraphQL Error: ${error.message}`);
            }
          } else {
            const token = response.data.login.token;
            await AsyncStorage.setItem('authToken', token);
            console.log('Token: ', token);
            Alert.alert('Sucesso', 'Login efetuado com sucesso.');
          }
        })
        .catch(error => console.error(error));
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a) à Taqtile!</Text>

      <Text>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    width: '80%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '10%',
    marginBottom: '20%',
  },
  button: {
    width: '80%',
    backgroundColor: '#BC8F8F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
