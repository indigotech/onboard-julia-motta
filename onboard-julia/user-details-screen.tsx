import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {styles} from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useUserDetails} from './get-user-details';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserDetailsProps {
  user: {
    id: string;
    name: string;
    phone: string;
    birthDate: string;
    email: string;
    role: string;
  };
}

const Details: React.FC<UserDetailsProps> = ({user}) => {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsRow}>
        <Text style={styles.detailsTitle}>Nome: </Text>
        <Text style={styles.details}>{user.name}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailsTitle}>Telefone: </Text>
        <Text style={styles.details}>{user.phone}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailsTitle}>Data de Nascimento: </Text>
        <Text style={styles.details}>{user.birthDate}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailsTitle}>E-mail: </Text>
        <Text style={styles.details}>{user.email}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailsTitle}>Cargo: </Text>
        <Text style={styles.details}>{user.role}</Text>
      </View>
    </View>
  );
};

type RootStackParamList = {
  UserDetails: {paramKey: string};
};

type UserDetailsRouteProp = RouteProp<RootStackParamList, 'UserDetails'>;

export function UserDetails(): React.JSX.Element {
  const route = useRoute<UserDetailsRouteProp>();
  const userId = route.params?.paramKey;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken');
        setToken(authToken);
      } catch (fetchTokenError) {
        console.error('Error fetching user details:', fetchTokenError);
      }
    };
    fetchToken();
  }, [userId]);

  const {loading, error, user} = useUserDetails(userId, token);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (error || !user) {
    return <Text>Error loading user details.</Text>;
  }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.usersTitle}>Detalhes do Usuário {userId}</Text>
      </View>

      {user && user.id ? (
        <Details user={user} />
      ) : (
        <Text>Error loading user details.</Text>
      )}
    </View>
  );
}
