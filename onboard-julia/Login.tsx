import React = require('react');
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

function Login(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a) à Taqtile!</Text>
      <Text>E-mail</Text>
      <TextInput style={styles.input} />
      <Text>Senha</Text>
      <TextInput style={styles.input} secureTextEntry />
      <TouchableOpacity style={styles.button}>
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

export default Login;
