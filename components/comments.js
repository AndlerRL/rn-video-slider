import React from "react";
import { View, Text, Modal } from "react-native";
import { styles } from "../util/styles";
import comments from "../util/comments.json";

const Link = (props) => (
  <Text
    {...props}
    accessibilityRole="link"
    style={StyleSheet.compose(styles.link, props.style)}
  />
);

export default ({ showComments, setPlayVideo }) => {
  console.log(comments);
  return (
    <View>
      <Modal
        onRequestClose={() => setPlayVideo(true)}
        animationType="slide"
        visible={showComments}
      >
        <View style={styles.centeredView}>
          <View>
            <Text>
              <Text>Some text here!</Text>
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};
