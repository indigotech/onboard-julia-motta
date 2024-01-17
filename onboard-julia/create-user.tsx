import {gql} from '@apollo/client';
import {client} from './apollo-client';

interface UserInput {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  password: string;
  role: 'admin' | 'user' | null;
}

const CREATE_USER = gql`
  mutation AddUser($userInput: UserInput!) {
    createUser(data: $userInput) {
      id
    }
  }
`;

export const createUser = async (userInput: UserInput) => {
  try {
    const {data} = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        userInput: userInput,
      },
    });
    return data?.createUser?.id ?? null;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
