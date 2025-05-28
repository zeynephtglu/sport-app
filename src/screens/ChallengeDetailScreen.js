// src/screens/ChallengeDetailScreen.js
import React, { useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
  Image,
  StatusBar
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChallengeContext } from '../context/ChallengeContext';
import ParticipantAvatarList from '../components/molecules/ParticipantAvatarList';
import commonStyles from '../styles/common';

// HomeScreen ile tutarlı görseller için aynı konfigürasyonu kullanıyoruz
const IMAGE_CONFIG = {
  '10K Adım Günü':
    'https://images.pexels.com/photos/618612/pexels-photo-618612.jpeg',
  'Haftalık Yoga':
    'https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg',
  'Sabah Koşusu':
    'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg',
  'Haftada 4 Gün Fitness':
    'https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg',
  'Evde HIIT Challenge':
    'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg',
  'Pilates ve Core Güçlendirme':
    'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg',
  'Akşam Bisiklet Turu':
    'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg',
  'Weekend Hike':
    'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg'
};

export default function ChallengeDetailScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { challengeId } = route.params;
  const { state, dispatch } = useContext(ChallengeContext);

  const challenge = state.challenges.find(
    c => c.id.toString() === challengeId.toString()
  );

  if (!challenge) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
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

  const img = IMAGE_CONFIG[challenge.title] || challenge.imageUrl;

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={commonStyles.safeArea.backgroundColor} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backButton, { top: insets.top + 8 }]}
      >
        <Text style={styles.backText}>← Geri</Text>
      </TouchableOpacity>

      <Image source={{ uri: img }} style={styles.image} />

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
