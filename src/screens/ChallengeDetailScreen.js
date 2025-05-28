import React, { useContext } from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChallengeContext } from '../context/ChallengeContext';
import ParticipantAvatarList from '../components/molecules/ParticipantAvatarList';

export default function ChallengeDetailScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { challengeId } = route.params;
  const { state, dispatch } = useContext(ChallengeContext);
  const challenge = state.challenges.find(
    c => c.id.toString() === challengeId.toString()
  );

  if (!challenge) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Bu challenge bulunamadı.</Text>
      </SafeAreaView>
    );
  }

  const handleJoin = () => {
    if (challenge.joined) {
      Alert.alert('Challenge’a katıldınız.');
      return;
    }
    dispatch({ type: 'JOIN', payload: challenge.id });
    Alert.alert('Challenge’a başarıyla katıldınız!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        // insets.top kadar boşluk + 8px ekstra
        style={[styles.backButton, { top: insets.top + 8 }]}
      >
        <Text style={styles.backText}>← Geri</Text>
      </TouchableOpacity>

      {challenge.imageUrl ? (
        <Image source={{ uri: challenge.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage} />
      )}

      <Text style={styles.title}>{challenge.title}</Text>
      {challenge.startDate && challenge.endDate && (
        <Text style={styles.date}>
          {challenge.startDate} – {challenge.endDate}
        </Text>
      )}
      {challenge.description && (
        <Text style={styles.description}>{challenge.description}</Text>
      )}

      <TouchableOpacity
        style={[styles.button, challenge.joined && styles.buttonJoined]}
        onPress={handleJoin}
      >
        <Text style={styles.buttonText}>
          {challenge.joined ? 'Katıldınız' : 'Katıl'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.partTitle}>Katılımcılar</Text>
      <ParticipantAvatarList participants={challenge.participants} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 10
  },
  backText: {
    color: '#3366FF',
    fontSize: 16
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 48,
    marginBottom: 16
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
    borderRadius: 12,
    marginTop: 48,
    marginBottom: 16
  },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 },
  date: { fontSize: 14, color: '#666', marginBottom: 12 },
  description: { fontSize: 16, lineHeight: 22, marginBottom: 20 },
  button: {
    backgroundColor: '#3b5998',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24
  },
  buttonJoined: { backgroundColor: '#aaa' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  partTitle: { fontSize: 18, fontWeight: '500', marginBottom: 8 }
});
