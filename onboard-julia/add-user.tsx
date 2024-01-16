import React, {useState} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import {
  ButtonText,
  FormCaption,
  FormLabel,
  FormTextField,
  MyButton,
  Title,
  styles,
} from './styles';
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

      <FormLabel error={nameError}>Nome</FormLabel>
      <FormTextField
        value={name}
        onChangeText={text => {
          setName(text);
          setNameError(false);
        }}
        error={nameError}
      />
      {nameError && (
        <FormCaption error>
          Nome inválido. Por favor, insira um nome válido.
        </FormCaption>
      )}

      <FormLabel error={emailError}>E-mail</FormLabel>
      <FormTextField
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError(false);
        }}
        autoCapitalize="none"
        error={emailError}
      />
      {emailError && (
        <FormCaption error>
          Email inválido. Por favor, insira um e-mail válido.
        </FormCaption>
      )}

      <FormLabel error={phoneError}>Telefone</FormLabel>
      <FormTextField
        value={phone}
        onChangeText={text => {
          setPhone(text);
          setPhoneError(false);
        }}
        error={phoneError}
      />
      {phoneError && (
        <FormCaption error>
          Telefone inválido. Por favor, insira um telefone válido.
        </FormCaption>
      )}

      <FormLabel error={birthDateError}>Data de Nascimento</FormLabel>
      <FormTextField
        placeholder="YYYY-MM-DD"
        value={birthdate}
        onChangeText={text => {
          setBirthdate(text);
          setBirthDateError(false);
        }}
        error={birthDateError}
      />
      {birthDateError && (
        <FormCaption error>
          Data de nascimento inválida. Por favor, insira uma data válida.
        </FormCaption>
      )}

      <FormLabel error={passwordError}>Senha</FormLabel>
      <FormTextField
        value={password}
        onChangeText={text => {
          setPassword(text);
          setPasswordError(false);
        }}
        secureTextEntry
        error={passwordError}
      />
      {passwordError && (
        <FormCaption error>
          A senha deve ter no mínimo 7 caracteres e conter uma letra e um
          número.
        </FormCaption>
      )}

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

      <MyButton onPress={handleAddUserPress}>
        <ButtonText>Adicionar Usuário</ButtonText>
      </MyButton>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}
