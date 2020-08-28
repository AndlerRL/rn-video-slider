import React from "react";
import { StatusBar } from 'expo-status-bar';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from "react-native";
import { styles } from "./util/styles";
import VideoSlider from "./components/video-slider";

const App = () => {
  return (
    <View style={styles.app}>
      <StatusBar style="auto" />
      <VideoSlider />
      <View>
        <Text>
          Test...
        </Text>
      </View>
      <Image
        source={{ uri: require('./assets/images/new_logo.png')}}
        resizeMode="contain"
        style={styles.logo}
      />
    </View>
  )
}

export default App;
