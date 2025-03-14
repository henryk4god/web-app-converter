import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { WEBSITE_URL } from './config';

const App = () => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: WEBSITE_URL }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
