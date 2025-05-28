

import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',               // Ekran arka planı rengi
    // Android üst durum çubuğu (status bar) yüksekliğini boşluk olarak ekle
    paddingTop: Platform.OS === 'android'
      ? StatusBar.currentHeight
      : 0
  }
});
