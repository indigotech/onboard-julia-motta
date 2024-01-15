import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {styles} from './styles';
import {RouteProp, useRoute} from '@react-navigation/native';
import {getUserDetails} from './get-user-details';

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
  const [user, setUser] = useState<UserDetailsProps>();
  const route = useRoute<UserDetailsRouteProp>();
  const userId = route.params?.paramKey;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await getUserDetails(userId);

        if (userDetails) {
          setUser(userDetails);
        } else {
          console.error('Error: userDetails is missing.');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, [userId]);

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.usersTitle}>Detalhes do Usuário {userId}</Text>
      </View>

      <Details user={user.user} />
    </View>
  );
}
