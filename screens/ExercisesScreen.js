import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function ExercisesScreen() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://wger.de/api/v2/exercise/?language=2&limit=20')
      .then(response => response.json())
      .then(data => {
        setExercises(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>
              {item.description 
                ? item.description.replace(/<[^>]*>?/gm, '').trim() || 'Açıklama yok' 
                : 'Açıklama yok'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { marginBottom: 15, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
