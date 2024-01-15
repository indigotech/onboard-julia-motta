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
  const [offset, setOffset] = useState<number>(0);
  let limit = 20;
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

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
        setIsRefreshing(false);
      }
    };
    fetchData();
  }, [offset, isRefreshing]);

  const handleEndReached = () => {
    if (hasNextPage) {
      setOffset(prevOffset => prevOffset + limit);
    }
  };

  const handleRefresh = () => {
    setOffset(0);
    setIsRefreshing(true);
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.usersTitle}>Lista de Usuários</Text>
      </View>

      <FlatList
        data={usersList}
        keyExtractor={(user, index) => `${user.id}_${index}`}
        renderItem={({item}) => <UserItem user={item} />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
      />
    </View>
  );
}
