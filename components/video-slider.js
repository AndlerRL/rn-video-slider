import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { styles } from "../util/styles";
import Video from "react-native-video";

export default () => {
  const [gState, setGState] = useState({
    volume: 1,
    muted: false,
    resizeMode: "cover",
    duration: 0.0,
    currentTime: 0.0
  });

  function onLoad(data) {
    setGState((gs) => ({
      ...gs,
      duration: data.duration
    }));
  }

  function onProgress(data) {
    setGState((gs) => ({
      ...gs,
      currentTime: data.currentTime
    }));
  }

  function getCurrentTimePercentage() {
    if (gState.currentTime > 0)
      return parseFloat(gState.currentTime) / parseFloat(gState.duration);
    else return 0;
  }

  function toggleMute() {
    setGState((gs) => ({
      ...gs,
      muted: !gs.muted
    }));
  }

  return (
    <View>
      <View
        style={{
          height: 3,
          backgroudColor: "white",
          width: `${getCurrentTimePercentage()}%`,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 50
        }}
      />
      <Video
        source={{ uri: "https://www.youtube.com/watch?v=Ht5NmRtWb88" }}
        style={styles.backgroundVideo}
        resizeMode="cover"
      />
    </View>
  );
};
