import React from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  Button, 
  Alert, 
  Dimensions
} from 'react-native';
import { LineChart } from "react-native-chart-kit";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Text>Press "Start" to register your focus time!</Text>
        <View style={styles.button}>
          <Button
            title="Start"
            onPress={() => Alert.alert(
              "Ready, set, focus!",
              "Focus time registration started! Enjoy the serenity."
            )}
            color="#00cc99" />
        </View>
      </View>
      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              data: [
                1 + Math.random() * 12,
                1 + Math.random() * 12,
                1 + Math.random() * 12,
                1 + Math.random() * 12,
                1 + Math.random() * 12,
                2 + Math.random() * 12,
                2 + Math.random() * 12
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width-48} // from react-native
        height={220}
        yAxisSuffix="H"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#001278",
          backgroundGradientFrom: "#001188",
          backgroundGradientTo: "#0055DD",
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#005599"
          }
        }}
        bezier
        style={styles.graph} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  graph: {
    marginVertical: 24,
    borderRadius: 8
  },
  timer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: 24
  }
});
