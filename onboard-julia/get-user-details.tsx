import {gql, useQuery} from '@apollo/client';
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

export const useUserDetails = (id: string) => {
  const {loading, error, data} = useQuery(GET_USER_DETAILS, {
    variables: {id},
    client: client,
  });
  return {loading, error, user: data?.user ?? null};
};
