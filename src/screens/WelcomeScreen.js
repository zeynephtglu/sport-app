import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { UserContext } from '../context/UserContext';
import commonStyles from '../styles/common';

export default function WelcomeScreen({ navigation }) {
  const interestsList = ['Koşu','Bisiklet','Yoga','Salon','Yüzme','Diğer'];
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState('');
  const { setUser } = useContext(UserContext);

  const toggle = item => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const goMain = () => {
    setUser(u => ({ ...u, name, interests: selected }));
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.title}>Spor Challenge’e Hoşgeldin!</Text>
        <Text style={styles.subtitle}>
          İlgi alanlarını seçerek kendine en uygun spor mücadelelerini keşfet.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Kullanıcı adınızı giriniz"
          placeholderTextColor="#ddd"
          value={name}
          onChangeText={setName}
        />

        <View style={styles.grid}>
          {interestsList.map(i => (
            <TouchableOpacity
              key={i}
              style={[styles.tag, selected.includes(i) && styles.tagSelected]}
              onPress={() => toggle(i)}
            >
              <Text
                style={[
                  styles.tagText,
                  selected.includes(i) && styles.tagTextSelected
                ]}
              >
                {i}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            !(name && selected.length) && styles.buttonDisabled
          ]}
          onPress={goMain}
          disabled={!(name && selected.length)}
        >
          <Text style={styles.buttonText}>Devam Et ▶</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3b5998',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    height: 48,
    borderColor: '#3b5998',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    color: '#000',
    marginBottom: 24
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    justifyContent: 'center'
  },
  tag: {
    borderWidth: 1,
    borderColor: '#3b5998',
    borderRadius: 20,
    padding: 8,
    margin: 4
  },
  tagSelected: {
    backgroundColor: '#3b5998'
  },
  tagText: {
    color: '#3b5998'
  },
  tagTextSelected: {
    color: '#fff'
  },
  button: {
    backgroundColor: '#3b5998',
    padding: 14,
    borderRadius: 24,
    alignItems: 'center'
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
