import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

const categories = ['Tüm', 'Yakınındaki', 'Popüler'];

export default function FilterBar({ search, onSearchChange, selectedCat, onCatChange }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Challenge ara..."
        value={search}
        onChangeText={onSearchChange}
      />
      <View style={styles.cats}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.catBtn,
              selectedCat === cat && styles.catBtnActive
            ]}
            onPress={() => onCatChange(cat)}
          >
            <Text style={[
              styles.catText,
              selectedCat === cat && styles.catTextActive
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: '#fff'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 8
  },
  cats: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  catBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3366FF'
  },
  catBtnActive: {
    backgroundColor: '#3366FF'
  },
  catText: {
    fontSize: 12,
    color: '#3366FF'
  },
  catTextActive: {
    color: '#fff'
  }
});
