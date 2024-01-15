import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {client} from './apollo-client';

const GET_USER_DETAILS = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;

export const getUserDetails = async (id: string) => {
  const token = await AsyncStorage.getItem('authToken');

  try {
    const {data} = await client.query({
      query: GET_USER_DETAILS,
      variables: {
        id: id,
      },
      context: {
        headers: {
          authorization: token,
        },
      },
    });

    return data ?? null;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};
