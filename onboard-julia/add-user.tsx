import React, {useState} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import {Title, styles} from './styles';
import {
  isValidBirthdate,
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPhone,
} from './user-validation';
import {CustomRadioButton} from './custom-radio-button';
import {useNavigation} from '@react-navigation/native';
import {createUser} from './create-user';
import {FormField, FormLabel} from './form-field';
import {MyButton} from './my-button';

export function AddUser(): React.JSX.Element {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [birthDateError, setBirthDateError] = useState(false);

  const handleAddUserPress = async () => {
    if (!isValidName(name)) {
      setNameError(true);
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError(true);
      return;
    }

    if (!isValidPhone(phone)) {
      setPhoneError(true);
      return;
    }

    if (!isValidBirthdate(birthdate)) {
      setBirthDateError(true);
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

    if (!role) {
      Alert.alert('Erro', 'Por favor, selecione um cargo.');
      return;
    }
    setLoading(true);
    await createUser({
      name: name,
      email: email,
      phone: phone,
      birthDate: birthdate,
      password: password,
      role: role,
    });

    Alert.alert('Sucesso', 'Usuário criado com sucesso');
    navigation.navigate('Users List');

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Title>Cadastro de Usuário</Title>

      <FormField
        label="Nome"
        value={name}
        onChangeText={text => {
          setName(text);
          setNameError(false);
        }}
        error={nameError}
        captionText="Nome inválido. Por favor, insira um nome válido."
      />

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
        label="Telefone"
        value={phone}
        onChangeText={text => {
          setPhone(text);
          setPhoneError(false);
        }}
        error={phoneError}
        captionText="Telefone inválido. Por favor, insira um telefone válido."
      />

      <FormField
        label="Data de Nascimento"
        value={birthdate}
        onChangeText={text => {
          setBirthdate(text);
          setBirthDateError(false);
        }}
        error={birthDateError}
        captionText="Data de nascimento inválida. Por favor, insira uma data válida."
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

      <FormLabel>Cargo</FormLabel>
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

      <MyButton onPress={handleAddUserPress} disabled={loading}>
        Adicionar Usuário
      </MyButton>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}
