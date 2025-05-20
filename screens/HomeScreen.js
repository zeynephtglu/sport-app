import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>🏋️ Sport App'e Hoş Geldin!</Text>
      <Button title="Egzersizler" onPress={() => navigation.navigate('Exercises')} />
      <Button title="Beslenme" onPress={() => navigation.navigate('Nutrition')} />
    </View>
  );
}
