import {gql} from '@apollo/client';
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
  try {
    const {data} = await client.query({
      query: GET_USERS,
      variables: {
        offset: offset,
      },
    });

    return data?.users ?? null;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
