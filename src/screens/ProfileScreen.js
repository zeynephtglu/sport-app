import React, { useContext } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { ChallengeContext } from '../context/ChallengeContext';
import ProfileStatCard from '../components/molecules/ProfileStatCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import commonStyles from '../styles/common';


const ICON_CONFIG = {
  '10K Adım Günü':                 { name: 'walk',             color: '#f39c12' },
  'Haftalık Yoga':                 { name: 'yoga',             color: '#8e44ad' },
  'Sabah Koşusu':                  { name: 'run',              color: '#e74c3c' },
  'Haftada 4 Gün Fitness':         { name: 'dumbbell',         color: '#27ae60' },
  'Evde HIIT Challenge':           { name: 'fire',             color: '#c0392b' },
  'Pilates ve Core Güçlendirme':   { name: 'weight-lifter',    color: '#2980b9' },
  'Akşam Bisiklet Turu':           { name: 'bike',             color: '#16a085' },
  'Weekend Hike':                  { name: 'hiking',           color: '#d35400' },
};

export default function ProfileScreen() {
  const { user } = useContext(UserContext);
  const { state } = useContext(ChallengeContext);

  const joined = Array.isArray(state.challenges)
    ? state.challenges.filter(c => c.joined)
    : [];

  const stats = [
    { label: 'İlgi Alanları', value: user.interests.length },
    { label: 'Katıldıkların', value: joined.length }
  ];

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <Text style={styles.welcome}>Merhaba, {user.name}!</Text>

      <FlatList
        data={stats}
        horizontal
        keyExtractor={item => item.label}
        renderItem={({ item }) => (
          <ProfileStatCard label={item.label} value={item.value} />
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.statsList}
      />

      <Text style={styles.subHeader}>Katıldığın Mücadeleler</Text>

      <FlatList
        data={joined}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          const cfg = ICON_CONFIG[item.title] || { name: 'trophy-outline', color: '#7f8c8d' };
          return (
            <View style={styles.joinedRow}>
              <MaterialCommunityIcons
                name={cfg.name}
                size={20}
                color={cfg.color}
                style={styles.joinedIcon}
              />
              <Text style={styles.joinedText}>{item.title}</Text>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>Henüz katıldığın mücadele yok.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12
  },
  statsList: {
    marginBottom: 16
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  joinedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  joinedIcon: {
    marginRight: 12
  },
  joinedText: {
    fontSize: 16
  },
  empty: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20
  }
});
