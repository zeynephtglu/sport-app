// src/screens/ProfileScreen.js
import React, { useContext } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { ChallengeContext } from '../context/ChallengeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import commonStyles from '../styles/common';

const ICON_CONFIG = {
  '10K Adım Günü':               { name: 'walk',          color: '#f39c12' },
  'Haftalık Yoga':               { name: 'yoga',          color: '#8e44ad' },
  'Sabah Koşusu':                { name: 'run',           color: '#e74c3c' },
  'Haftada 4 Gün Fitness':       { name: 'dumbbell',      color: '#27ae60' },
  'Evde HIIT Challenge':         { name: 'fire',          color: '#c0392b' },
  'Pilates ve Core Güçlendirme': { name: 'weight-lifter', color: '#2980b9' },
  'Akşam Bisiklet Turu':         { name: 'bike',          color: '#16a085' },
  'Weekend Hike':                { name: 'hiking',        color: '#d35400' },
};

export default function ProfileScreen() {
  const { user } = useContext(UserContext);
  const { state } = useContext(ChallengeContext);
  const joined = Array.isArray(state.challenges)
    ? state.challenges.filter(c => c.joined)
    : [];

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <Text style={styles.welcome}>Merhaba, {user.name}!</Text>

      {/* Stats Row */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{user.interests.length}</Text>
          <Text style={styles.statLabel}>İlgi Alanları</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{joined.length}</Text>
          <Text style={styles.statLabel}>Katıldıkların</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Katıldığın Mücadeleler</Text>
      {joined.length === 0 ? (
        <Text style={styles.emptyText}>Henüz katıldığın mücadele yok.</Text>
      ) : (
        <FlatList
          data={joined}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const cfg = ICON_CONFIG[item.title] || { name: 'trophy-outline', color: '#555' };
            return (
              <View style={styles.challengeCard}>
                <MaterialCommunityIcons
                  name={cfg.name}
                  size={24}
                  color={cfg.color}
                  style={styles.challengeIcon}
                />
                <Text style={styles.challengeTitle}>{item.title}</Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 16px padding + 16px between cards

const styles = StyleSheet.create({
  welcome: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32
  },
  statCard: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    elevation: 3
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 14,
    color: '#666'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center'
  },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2
  },
  challengeIcon: {
    marginRight: 12
  },
  challengeTitle: {
    fontSize: 16,
    flexShrink: 1
  }
});
