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
import Home from "./screens/Home";

const App = () => {
  const logoURI = require('./assets/images/new_logo.png')

  return (
    <View style={styles.app}>
      <StatusBar style="auto" />
      <Home />
      {
        logoURI !== '' ? (
          <View>
            <Image
              source={logoURI}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
        ) : null
      }
    </View>
  )
}

export default App;
