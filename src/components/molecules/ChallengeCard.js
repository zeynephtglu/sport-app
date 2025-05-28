// src/components/molecules/ChallengeCard.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function ChallengeCard({
  title,
  subtitle,
  image,
  joined,
  onPress
}) {
  // Eğer image boş veya geçersizse placeholder resmi kullan
  const uri = image && image.length
    ? image
    : 'https://via.placeholder.com/80?text=No+Image';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.status}>
        <Text style={[styles.joinText, joined && styles.joined]}>
          {joined ? 'Katıldın' : 'Katıl'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    marginBottom: 12,
    overflow: 'hidden'
  },
  image: {
    width: 80,
    height: 80
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  },
  status: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  joinText: {
    fontSize: 14,
    color: '#3366FF'
  },
  joined: {
    color: '#aaa'
  }
});
