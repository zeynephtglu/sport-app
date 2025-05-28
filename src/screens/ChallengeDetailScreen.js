// src/screens/ChallengeDetailScreen.js
import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native';
import { ChallengeContext } from '../context/ChallengeContext';
import ParticipantAvatarList from '../components/molecules/ParticipantAvatarList';

export default function ChallengeDetailScreen({ route, navigation }) {
  const { challengeId } = route.params;
  const { state, dispatch } = useContext(ChallengeContext);
  const challenge = state.challenges.find(c=>c.id.toString()===challengeId.toString());

  if (!challenge) {
    return <View style={styles.center}><Text>Challenge bulunamadı.</Text></View>;
  }

  const handleJoin = () => {
    if (challenge.joined) {
      Alert.alert('Zaten katıldınız!');
    } else {
      dispatch({ type: 'JOIN', payload: challenge.id });
      Alert.alert('Challenge’a katıldınız!');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← Geri</Text>
      </TouchableOpacity>
      {challenge.imageUrl
        ? <Image source={{ uri: challenge.imageUrl }} style={styles.image}/>
        : <View style={styles.placeholderImage}/>}
      <Text style={styles.title}>{challenge.title}</Text>
      {challenge.startDate && challenge.endDate && (
        <Text style={styles.date}>{challenge.startDate} – {challenge.endDate}</Text>
      )}
      {challenge.description && (
        <Text style={styles.description}>{challenge.description}</Text>
      )}
      <TouchableOpacity
        style={[styles.button, challenge.joined && styles.buttonJoined]}
        onPress={handleJoin}
      >
        <Text style={styles.buttonText}>
          {challenge.joined ? 'Katıldın ✔' : 'Katıl'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.partTitle}>Katılımcılar</Text>
      <ParticipantAvatarList participants={challenge.participants} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#fff', padding:16 },
  center:{ flex:1, justifyContent:'center', alignItems:'center' },
  back:{ marginBottom:12 },
  backText:{ color:'#3366FF', fontSize:16 },
  image:{ width:'100%', height:200, borderRadius:12, marginBottom:16 },
  placeholderImage:{ width:'100%', height:200, backgroundColor:'#eee', borderRadius:12, marginBottom:16 },
  title:{ fontSize:22, fontWeight:'600', marginBottom:8 },
  date:{ fontSize:14, color:'#666', marginBottom:12 },
  description:{ fontSize:16, lineHeight:22, marginBottom:20 },
  button:{ backgroundColor:'#3366FF', padding:12, borderRadius:12, alignItems:'center', marginBottom:24 },
  buttonJoined:{ backgroundColor:'#aaa' },
  buttonText:{ color:'#fff', fontSize:16, fontWeight:'500' },
  partTitle:{ fontSize:18, fontWeight:'500', marginBottom:8 }
});
