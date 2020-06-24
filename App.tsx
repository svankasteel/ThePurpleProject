import React, { useState } from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  Alert, 
  Dimensions,
  TouchableHighlight
} from 'react-native';
import { LineChart } from "react-native-chart-kit";
import AppController from './controller/AppController';

const controller: AppController = new AppController()

export default function App() {
  const [weekData, setWeekData] = useState(controller.getData())
  const [isTracking, setTracking] = useState(false)

  function fetchData() {
    setWeekData(controller.getData())
  }

  function getIntroText(): string {
    if (isTracking) {
      return "Press \"Stop\" to end focus time registration."
    }
    return "Press \"Start\" to begin focus time registration."
  }

  function start() {
    try {
      const time = controller.startTimer()
      setTracking(true)
      Alert.alert(
        "Ready, set, focus!",
        `Focus time registration started at ${time}. Enjoy the serenity!`
      )
    } catch (e) {
      Alert.alert(
        "Invalid action",
        e.toString()
      )
    }
  }

  function stop() {
    try {
      const summary = controller.stopTimer()
      setTracking(false)
      Alert.alert(
        "Focus session ended",
        summary.render()
      )
      fetchData()
    } catch (e) {
      Alert.alert(
        "Invalid action",
        e.toString()
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Text style={{color: "#fff"}}>{ getIntroText() }</Text>
        <View style={{ marginTop: 24, flexDirection:"row" }}>
          <TouchableHighlight
            style={styles.button}
            onPress={ start }>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonRed}
            onPress={ stop }>
            <Text style={styles.buttonRedText}>Stop</Text>
          </TouchableHighlight>
        </View>
      </View>
      <LineChart
        data={weekData}
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
    width: 364,
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2f9090",
  },
  button: {
    paddingHorizontal: 12,
    marginHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2
  },
  buttonRed: {
    paddingHorizontal: 12,
    marginHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#c16464",
    borderRadius: 8,
    elevation: 2
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#2f9090",
  },
  buttonRedText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  }
});
