import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {client} from './apollo-client';

const CREATE_USER = gql`
  mutation AddUser(
    $name: String!
    $email: String!
    $phone: String!
    $birthDate: DateTime!
    $password: String!
    $role: UserRole!
  ) {
    createUser(
      data: {
        name: $name
        email: $email
        phone: $phone
        birthDate: $birthDate
        password: $password
        role: $role
      }
    ) {
      id
    }
  }
`;

export const createUser = async (
  name: string,
  email: string,
  phone: string,
  birthDate: string,
  password: string,
  role: string,
) => {
  const token = await AsyncStorage.getItem('authToken');

  try {
    const {data} = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        name: name,
        email: email,
        phone: phone,
        birthDate: birthDate,
        password: password,
        role: role,
      },
      context: {
        headers: {
          authorization: token,
        },
      },
    });
    console.log(data.createUser.id);
    return data?.createUser?.id ?? null;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
