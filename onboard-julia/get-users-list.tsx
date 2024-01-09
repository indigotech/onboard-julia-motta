import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {client} from './apollo-client';

const GET_USERS = gql`
  query GetUsers {
    users {
      nodes {
        id
        name
        email
      }
    }
  }
`;

export const getUsersList = async () => {
  const token = await AsyncStorage.getItem('authToken');

  try {
    const {data} = await client.query({
      query: GET_USERS,
      context: {
        headers: {
          authorization: token,
        },
      },
    });

    return data?.users ?? [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
