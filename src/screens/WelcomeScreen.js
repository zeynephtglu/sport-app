// src/screens/WelcomeScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { UserContext } from '../context/UserContext';

export default function WelcomeScreen({ navigation }) {
  const interestsList = ['Koşu','Bisiklet','Yoga','Spor Salonu','Yüzme','Diğer'];
  const [selected, setSelected] = useState([]);
  const { setUser } = useContext(UserContext);

  const toggle = item => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i=>i!==item) : [...prev, item]
    );
  };
  const goMain = () => {
    setUser(u=>({ ...u, interests: selected }));
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spor Challenge’e Hoşgeldin!</Text>
      <View style={styles.grid}>
        {interestsList.map(i=>(
          <TouchableOpacity
            key={i}
            style={[styles.tag, selected.includes(i)&&styles.tagSelected]}
            onPress={()=>toggle(i)}
          >
            <Text style={styles.tagText}>{i}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={goMain}>
        <Text style={styles.buttonText}>Devam Et ▶</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, justifyContent:'center' },
  title:{ fontSize:24, fontWeight:'600', marginBottom:20 },
  grid:{ flexDirection:'row', flexWrap:'wrap', marginBottom:30 },
  tag:{ borderWidth:1, borderColor:'#666', borderRadius:20, padding:8, margin:5 },
  tagSelected:{ backgroundColor:'#3366FF' },
  tagText:{ color:'#000' },
  button:{ backgroundColor:'#3366FF', padding:12, borderRadius:12, alignItems:'center' },
  buttonText:{ color:'#fff', fontSize:16 }
});
