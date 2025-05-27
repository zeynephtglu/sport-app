import React, { useContext } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet
} from 'react-native';
import { ChallengeContext } from '../context/ChallengeContext';
import ChallengeCard from '../components/molecules/ChallengeCard';

export default function HomeScreen({ navigation }) {
  const { state } = useContext(ChallengeContext);
  const { challenges, loading, error } = state;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3366FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={challenges}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ChallengeCard
            title={item.title}
            subtitle={`${item.participants.length} katılımcı`}
            image={item.imageUrl}
            joined={item.joined}
            onPress={() => navigation.navigate('ChallengeDetail', { challengeId: item.id })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  center:    { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
