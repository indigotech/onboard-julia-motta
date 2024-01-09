import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {styles} from './styles';
import {getUsersList} from './get-users-list';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserItem: React.FC<{user: User}> = ({user}) => {
  return (
    <View style={styles.usersContainer}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
};

export function UsersList(): React.JSX.Element {
  const [usersList, setUsersList] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersListData = await getUsersList();
        if (usersListData && usersListData.nodes) {
          setUsersList(usersListData.nodes);
        } else {
          console.error('Error: usersListData.nodes is missing.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

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
}
