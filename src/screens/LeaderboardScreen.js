// src/screens/LeaderboardScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ChallengeContext } from '../context/ChallengeContext';

export default function LeaderboardScreen() {
  const { state } = useContext(ChallengeContext);
  const sorted = [...state.challenges].sort((a,b)=>(b.participants.length - a.participants.length));

  return (
    <View style={styles.container}>
      <FlatList
        data={sorted}
        keyExtractor={item=>item.id.toString()}
        renderItem={({ item, index })=>(
          <View style={styles.row}>
            <Text style={styles.rank}>{index+1}.</Text>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.score}>{item.participants.length}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#fff', padding:16 },
  row:{ flexDirection:'row', alignItems:'center', marginBottom:12 },
  rank:{ width:24, fontSize:16, fontWeight:'600' },
  name:{ flex:1, fontSize:16 },
  score:{ fontSize:16, fontWeight:'500' }
});
