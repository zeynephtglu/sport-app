// src/screens/HomeScreen.js
import React, { useContext, useState, useMemo } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet
} from 'react-native';
import { ChallengeContext } from '../context/ChallengeContext';
import ChallengeCard from '../components/molecules/ChallengeCard';
import FilterBar from '../components/molecules/FilterBar';

export default function HomeScreen({ navigation }) {
  const { state } = useContext(ChallengeContext);
  const { challenges, loading, error } = state;

  // Filtreleme için local state
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('Tüm');

  // Memoize’lenmiş filtreli liste
  const filtered = useMemo(() => {
    let list = challenges;

    // Metin bazlı arama
    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter(c => c.title.toLowerCase().includes(term));
    }

    // Kategori bazlı filtre (örnek mantık: yurttaşın konumuna göre)
    if (selectedCat === 'Yakınındaki') {
      // demo: first 5
      list = list.slice(0, 5);
    } else if (selectedCat === 'Popüler') {
      list = [...list].sort((a, b) => b.participants.length - a.participants.length);
    }

    return list;
  }, [challenges, search, selectedCat]);

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#3366FF" /></View>;
  }
  if (error) {
    return <View style={styles.center}><Text style={styles.errorText}>Hata: {error}</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        selectedCat={selectedCat}
        onCatChange={setSelectedCat}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item })=>(
          <ChallengeCard
            title={item.title}
            subtitle={`${item.participants.length} katılımcı`}
            image={item.imageUrl}
            joined={item.joined}
            onPress={()=>navigation.navigate('ChallengeDetail',{ challengeId: item.id })}
          />
        )}
        ItemSeparatorComponent={()=><View style={styles.separator}/>}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#fff' },
  center:{ flex:1, justifyContent:'center', alignItems:'center' },
  errorText:{ color:'red' },
  separator:{ height:12 }
});
