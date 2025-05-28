// src/screens/ProfileScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';
import { ChallengeContext } from '../context/ChallengeContext';

export default function ProfileScreen() {
  const { user } = useContext(UserContext);
  const { state } = useContext(ChallengeContext);

  const joinedCount = state.challenges.filter(c=>c.joined).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text>Kişisel İlgi Alanları: {user.interests.join(', ') || 'Yok'}</Text>
      <Text>Katıldığın Challenge Sayısı: {joinedCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#fff', padding:16 },
  title:{ fontSize:22, fontWeight:'600', marginBottom:16 }
});
