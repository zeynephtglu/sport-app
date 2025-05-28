import React, { useContext, useState, useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity
} from 'react-native';
import { ChallengeContext } from '../context/ChallengeContext';
import ChallengeCard from '../components/molecules/ChallengeCard';
import FilterBar from '../components/molecules/FilterBar';
import commonStyles from '../styles/common';

const MOTIVATIONS = [
  "Her gün yeni bir başlangıçtır!",
  "Kendine meydan oku ve geliş!",
  "Her adımın seni ileri taşır.",
  "Bugün daha güçlü ol!",
  "Sağlık, en büyük zenginliktir."
];

export default function HomeScreen({ navigation }) {
  const { state, fetchChallenges } = useContext(ChallengeContext);
  const { challenges, loading, error } = state;

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('Tüm');
  const [motivation, setMotivation] = useState('');

  useEffect(() => {
    const idx = Math.floor(Math.random() * MOTIVATIONS.length);
    setMotivation(MOTIVATIONS[idx]);
  }, []);

  // challenges her zaman dizi olsun
  const list = Array.isArray(challenges) ? challenges : [];

  const filtered = useMemo(() => {
    let temp = list;

    if (search.trim()) {
      const term = search.toLowerCase();
      temp = temp.filter(c => c.title.toLowerCase().includes(term));
    }
    if (selectedCat === 'Yakınındaki') {
      temp = temp.slice(0, 5);
    } else if (selectedCat === 'Popüler') {
      temp = [...temp].sort((a, b) => b.participants.length - a.participants.length);
    }
    return temp;
  }, [list, search, selectedCat]);

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <ActivityIndicator size="large" color="#3b5998" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        <Text style={styles.error}>Veri yüklenirken bir sorun oluştu.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchChallenges}>
          <Text style={styles.retryText}>Tekrar Dene</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <Text style={styles.motivation}>{motivation}</Text>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        selectedCat={selectedCat}
        onCatChange={setSelectedCat}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ChallengeCard
            title={item.title}
            subtitle={`${item.participants?.length || 0} katılımcı`}
            image={item.imageUrl}
            joined={item.joined}
            onPress={() =>
              navigation.navigate('ChallengeDetail', { challengeId: item.id })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12
  },
  retryButton: {
    backgroundColor: '#3b5998',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center'
  },
  retryText: {
    color: '#fff',
    fontSize: 16
  },
  motivation: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    margin: 12,
    color: '#3b5998'
  },
  sep: {
    height: 12
  }
});
