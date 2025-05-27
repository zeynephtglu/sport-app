import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';

export default function WelcomeScreen({ navigation }) {
  const interestsList = ['Koşu','Bisiklet','Yoga','Spor Salonu','Yüzme','Diğer'];
  const [selected, setSelected] = useState([]);
  const { setUser } = useContext(UserContext);

  function toggle(item) {
    setSelected(prev =>
      prev.includes(item)
        ? prev.filter(i => i!==item)
        : [...prev, item]
    );
  }
  function goMain() {
    setUser(u=>({ ...u, interests: selected }));
    navigation.replace('Main');
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Spor Challenge’e Hoşgeldin!</Text>
      <View style={s.grid}>
        {interestsList.map(i=>(
          <TouchableOpacity
            key={i}
            style={[s.tag, selected.includes(i)&&s.tagSel]}
            onPress={()=>toggle(i)}
          >
            <Text style={s.tagTxt}>{i}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={s.btn} onPress={goMain}>
        <Text style={s.btnTxt}>Devam Et ▶</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1,padding:20,justifyContent:'center'},
  title:{fontSize:24,fontWeight:'600',marginBottom:20},
  grid:{flexDirection:'row',flexWrap:'wrap',marginBottom:30},
  tag:{borderWidth:1,borderColor:'#666',borderRadius:20,padding:8,margin:5},
  tagSel:{backgroundColor:'#3366FF'},
  tagTxt:{color:'#000'},
  btn:{backgroundColor:'#3366FF',padding:12,borderRadius:12,alignItems:'center'},
  btnTxt:{color:'#fff',fontSize:16}
});
