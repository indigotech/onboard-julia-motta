import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {
  isValidBirthdate,
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPhone,
  isValidRole,
} from './user-validation';
import {CustomRadioButton} from './custom-radio-button';

export function AddUser(): React.JSX.Element {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleAddUserPress = () => {
    if (!isValidName(name)) {
      Alert.alert('Erro', 'Por favor, insira um nome válido.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    if (!isValidPhone(phone)) {
      Alert.alert('Erro', 'Por favor, insira um telefone válido.');
      return;
    }

    if (!isValidBirthdate(birthdate)) {
      Alert.alert('Erro', 'Por favor, insira uma data de nascimento válida.');
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
    }

    if (!isValidRole(role)) {
      Alert.alert('Erro', 'Por favor, insira um cargo válido.');
      return;
    }

    Alert.alert('Sucesso', 'Usuário adicionado com sucesso.');
    return;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.usersTitle}>Cadastro de Usuário</Text>

      <Text>Nome</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text>Telefone</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

      <Text>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={birthdate}
        onChangeText={setBirthdate}
      />

      <Text>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text>Cargo</Text>
      <View style={styles.radioGroup}>
        <CustomRadioButton
          label="Administrador"
          checked={role === 'admin'}
          onPress={() => setRole('admin')}
        />
        <CustomRadioButton
          label="Usuário"
          checked={role === 'user'}
          onPress={() => setRole('user')}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddUserPress}>
        <Text style={styles.buttonText}>Adicionar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}
