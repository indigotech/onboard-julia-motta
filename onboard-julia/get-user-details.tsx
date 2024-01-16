import {gql, useQuery} from '@apollo/client';

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

export const useUserDetails = (id: string, token: string | null) => {
  const {loading, error, data} = useQuery(GET_USER_DETAILS, {
    variables: {id},
    context: {
      headers: {
        authorization: token,
      },
    },
    skip: !token,
  });
  return {loading, error, user: data?.user ?? null};
};
