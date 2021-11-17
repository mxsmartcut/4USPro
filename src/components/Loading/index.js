import React from 'react';
import { View,ActivityIndicator } from 'react-native';

 import styles from './styles';

const Loading = () => {
  return (
  <View style={styles.background}>

        <ActivityIndicator visible={true} size="large" color="#ff5555"  />

  </View>
  );
}

export default Loading;