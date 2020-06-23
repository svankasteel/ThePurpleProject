import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Press "Start" to register your focus time!</Text>
      <Button 
        title="Start"
        onPress={() => Alert.alert(
          "Ready, set, focus!",
          "Focus time registration started! Enjoy the serenity."
        )}
        color="#00cc99" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
