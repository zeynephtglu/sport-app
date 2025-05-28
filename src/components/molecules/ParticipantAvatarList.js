import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ParticipantAvatarList({ participants }) {
  return (
    <View style={styles.container}>
      {participants && participants.length > 0 ? (
        participants.map((p, i)=>(
          <Image
            key={i}
            source={{ uri: p.avatarUrl || 'https://via.placeholder.com/40' }}
            style={styles.avatar}
          />
        ))
      ) : (
        <Image
          source={{ uri: 'https://via.placeholder.com/40?text=?' }}
          style={styles.avatar}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flexDirection:'row' },
  avatar:{ width:40, height:40, borderRadius:20, marginRight:8 }
});
