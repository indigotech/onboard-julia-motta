import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {
  isValidBirthdate,
  isValidEmail,
  isValidName,
  isValidPhone,
  isValidRole,
} from './user-validation';

export function AddUser(): React.JSX.Element {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const handleAddUserPress = () => {
    if (!isValidName(name)) {
      Alert.alert('Erro', 'Por favor, insira um nome válido.');
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

    if (!isValidEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    if (!isValidRole(role)) {
      Alert.alert('Erro', 'Por favor, insira um role válido.');
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

      <Text>Telefone</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

      <Text>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={birthdate}
        onChangeText={setBirthdate}
      />

      <Text>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text>Role</Text>
      <TextInput
        style={styles.input}
        value={role}
        onChangeText={setRole}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddUserPress}>
        <Text style={styles.buttonText}>Adicionar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}
