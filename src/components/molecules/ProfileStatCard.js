import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileStatCard({ label, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    padding: 16,
    alignItems: 'center',
    margin: 8,
    flex: 1
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4
  },
  label: {
    fontSize: 14,
    color: '#666'
  }
});
