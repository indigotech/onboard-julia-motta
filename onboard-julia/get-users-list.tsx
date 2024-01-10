import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {client} from './apollo-client';

const GET_USERS = gql`
  query GetUsers($offset: Int!) {
    users(data: {offset: $offset}) {
      nodes {
        id
        name
        email
      }
      count
      pageInfo {
        limit
        hasNextPage
      }
    }
  }
`;

export const getUsersList = async (offset: number) => {
  const token = await AsyncStorage.getItem('authToken');

  try {
    const {data} = await client.query({
      query: GET_USERS,
      variables: {
        offset: offset,
      },
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
