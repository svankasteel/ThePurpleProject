import React from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  Button, 
  Alert, 
  Dimensions,
  TouchableHighlight
} from 'react-native';
import { LineChart } from "react-native-chart-kit";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Text style={{color: "#fff"}}>Press "Start" to register your focus time!</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => Alert.alert(
            "Ready, set, focus!",
            "Focus time registration started! Enjoy the serenity."
          )}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableHighlight>
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
          backgroundColor: "#2f9090",
          backgroundGradientFrom: "#2f9090",
          backgroundGradientTo: "#2f9090",
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#006060"
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
    backgroundColor: '#65C1C0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  graph: {
    marginVertical: 24,
    borderRadius: 8
  },
  timer: {
    width: 366,
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2f9090",
  },
  button: {
    marginTop: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#2f9090",
  }
});
