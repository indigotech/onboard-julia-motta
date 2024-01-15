import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {getUsersList} from './get-users-list';
import {useNavigation} from '@react-navigation/native';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserItem: React.FC<{user: User; navigation: any}> = ({
  user,
  navigation,
}) => {
  const handlePress = () => {
    navigation.navigate('User Details', {
      paramKey: user.id,
    });
  };
  return (
    <TouchableOpacity style={styles.usersContainer} onPress={handlePress}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </TouchableOpacity>
  );
};

export function UsersList(): React.JSX.Element {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const limit = 20;
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  const navigateToAddUser = () => {
    navigation.navigate('Add User');
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={navigateToAddUser} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add User</Text>
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const usersListData = await getUsersList(offset);

        if (usersListData && usersListData.nodes && usersListData.pageInfo) {
          setUsersList(prevUsers => [...prevUsers, ...usersListData.nodes]);
          setHasNextPage(usersListData.pageInfo.hasNextPage);
        } else {
          console.error('Error: usersListData is missing.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [offset]);

  const handleEndReached = () => {
    if (hasNextPage) {
      setOffset(offset + limit);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.usersTitle}>Lista de Usuários</Text>
      </View>

      <FlatList
        data={usersList}
        keyExtractor={(user, index) => `${user.id}_${index}`}
        renderItem={({item}) => (
          <UserItem user={item} navigation={navigation} />
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </View>
  );
}
