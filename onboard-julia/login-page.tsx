import React, {useState} from 'react';
import {isValidEmail, isValidPassword} from './user-validation';
import {Title, styles} from './styles';
import {gql, useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import {View, Alert, ActivityIndicator} from 'react-native';
import {FormField} from './form-field';
import {MyButton} from './my-button';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(data: {email: $email, password: $password}) {
      token
    }
  }
`;

export function Login(): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  const [loginUserMutation] = useMutation(LOGIN_USER);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLoginPress = async () => {
    if (!isValidEmail(email)) {
      setEmailError(true);
      return;
    }

    if (password.length < 7) {
      setPasswordError(true);
      return;
    }

    if (!isValidPassword(password)) {
      setPasswordError(true);
      return;
    }

    setLoading(true);

    try {
      const response = await loginUserMutation({
        variables: {email, password},
      });

      const token = response.data.login.token;
      await AsyncStorage.setItem('authToken', token);
      console.log('Token: ', token);
      Alert.alert('Sucesso', 'Login efetuado com sucesso.');
      navigation.navigate('Users List');
    } catch (error) {
      console.error('GraphQL Error:', error);
      Alert.alert(`GraphQL Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Bem-vindo(a) à Taqtile!</Title>

      <FormField
        label="E-mail"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError(false);
        }}
        error={emailError}
        captionText="Email inválido. Por favor, insira um e-mail válido."
        autoCapitalize="none"
      />

      <FormField
        label="Senha"
        value={password}
        onChangeText={text => {
          setPassword(text);
          setPasswordError(false);
        }}
        error={passwordError}
        captionText="A senha deve ter no mínimo 7 caracteres e conter uma letra e um
        número."
        secureTextEntry={true}
      />

      <MyButton onPress={handleLoginPress} disabled={loading}>
        Entrar
      </MyButton>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}
