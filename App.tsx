import React from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  Alert, 
  Dimensions,
  TouchableHighlight
} from 'react-native';
import { LineChart } from "react-native-chart-kit";
import Session from './data/Session';

export default function App() {
  var currentSession: Session

  function start() {
    if (currentSession?.isRunning()) {
      Alert.alert(
        "Invalid action",
        "You already have a session running."
      )
      return
    }
    var t = new Date()
    currentSession = new Session()
    currentSession.start(t)
      Alert.alert(
        "Ready, set, focus!",
        `Focus time registration started at ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}. Enjoy the serenity!`
      )
  }

  function stop() {
    if (currentSession === undefined || !currentSession.isRunning()) {
      Alert.alert(
        "Invalid action",
        "You must start a session first."
      )
      return
    }
    var t = new Date()
    currentSession.stop(t)

    var timeFormat = ""
    const hours = Math.floor(currentSession.getDuration() / (60 * 60 * 1000))
    const hRest = currentSession.getDuration() % (60 * 60 * 1000)
    const minutes = Math.floor(hRest / (60 * 1000))
    const mRest = hRest % (60 * 1000)
    const seconds = Math.floor(mRest / 1000)

    if (hours > 0) {
      timeFormat = timeFormat + `${hours} hours, `
    }

    if (minutes > 0) {
      timeFormat = timeFormat + `${minutes} minutes, and `
    }

    timeFormat = timeFormat + `${seconds} seconds`

    Alert.alert(
      "Focus session ended",
      `Your session ended at ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}. You enjoyed ${timeFormat} of serenity.`
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <Text style={{color: "#fff"}}>Press "Start" to begin registering your focus time.</Text>
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
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              data: [
                1 + Math.random() * 6,
                1 + Math.random() * 6,
                1 + Math.random() * 6,
                1 + Math.random() * 6,
                1 + Math.random() * 6,
                2 + Math.random() * 6,
                2 + Math.random() * 6
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
