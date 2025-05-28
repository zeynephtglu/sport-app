import React, { useContext } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  View,
  StatusBar
} from 'react-native';
import { ChallengeContext } from '../context/ChallengeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import commonStyles from '../styles/common';

const ICON_CONFIG = {
  '10K Adım Günü':        { name: 'walk',             color: '#f39c12' },
  'Haftalık Yoga':        { name: 'yoga',             color: '#8e44ad' },
  'Sabah Koşusu':         { name: 'run',              color: '#e74c3c' },
  'Haftada 4 Gün Fitness':{ name: 'dumbbell',         color: '#27ae60' },
  'Evde HIIT Challenge':  { name: 'fire',             color: '#c0392b' },
  'Pilates ve Core Güçlendirme':   { name: 'weight-lifter',    color: '#2980b9' },
  'Akşam Bisiklet Turu':  { name: 'bike',             color: '#16a085' },
  'Weekend Hike':         { name: 'hiking',           color: '#d35400' },
};

export default function LeaderboardScreen() {
  const { state } = useContext(ChallengeContext);
  const sorted = Array.isArray(state.challenges)
    ? [...state.challenges].sort((a, b) => b.participants.length - a.participants.length)
    : [];

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <Text style={styles.header}>🏆 Liderlik Tablosu</Text>
      <FlatList
        data={sorted}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => {
          const config = ICON_CONFIG[item.title] || { name: 'trophy-outline', color: '#7f8c8d' };
          return (
            <View style={styles.row}>
              <MaterialCommunityIcons
                name={config.name}
                size={24}
                color={config.color}
                style={styles.icon}
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.count}>{item.participants.length} katılımcı</Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff'
  },
  icon: {
    marginRight: 12
  },
  title: {
    flex: 1,
    fontSize: 16
  },
  count: {
    fontSize: 14,
    color: '#555'
  },
  separator: {
    height: 1,
    backgroundColor: '#ecf0f1',
    marginLeft: 52  
  }
});
