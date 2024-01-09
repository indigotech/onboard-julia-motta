import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {styles} from './styles';

interface User {
  id: number;
  name: string;
  email: string;
}

const usersList: User[] = [
  {id: 1, name: 'João', email: 'joao@mail.com.br'},
  {id: 2, name: 'Maria', email: 'maria@mail.com.br'},
  {id: 3, name: 'Ana', email: 'ana@mail.com.br'},
  {id: 4, name: 'Lucas', email: 'lucas@mail.com.br'},
];

const UserItem: React.FC<{user: User}> = ({user}) => {
  return (
    <View style={styles.usersContainer}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
};

export const UsersList: React.FC = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.usersTitle}>Lista de Usuários</Text>
      </View>
      <FlatList
        data={usersList}
        keyExtractor={user => user.id.toString()}
        renderItem={({item}) => <UserItem user={item} />}
      />
    </View>
  );
};
