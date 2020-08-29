import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { styles } from "../util/styles";
import IconsEv from 'react-native-vector-icons/EvilIcons'
import PostComment from "./post-comment";
import { users } from '../util/users'

const PROFILE_INFO = {
  id: 5,
  name: 'Another Doe',
}

export default ({ setShowComments, showComments, setPlayVideo, comments }) => {
  const [videoComments, setVideoComments] = useState([])

  useEffect(() => {
    if (!videoComments.length || comments[0].videoID !== videoComments[0].videoID)
      setVideoComments(comments)
  }, [comments])

  function closeComments() {
    setShowComments(false)
  }

  function postCommentHandler(comment) {
    const digestedComment = {
      ...comments[0],
      id: videoComments.length + 2,
      body: comment,
      userID: PROFILE_INFO.id,
    }

    setVideoComments(vc => [...vc, digestedComment])
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalWrapper}>
        <Modal
          onRequestClose={() => setPlayVideo(gs => ({ ...gs, pause: true }))}
          animationType="slide"
          visible={showComments}
          style={styles.centeredView}
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeComments} style={styles.commentsClose}>
              <IconsEv size={32} name="close" />
            </TouchableOpacity>
            <ScrollView style={{
              paddingHorizontal: 16,
              marginTop: 35,
              width: '100%',
            }}
            
            >
              {
                videoComments?.map(c => (
                  <View key={c.id}
                    style={styles.commentContainer}
                  >
                    <Text style={{ textAlign: 'left', fontWeight: 'bold' }}>
                      {users.find(u => u.id === c.userID)?.name ?? PROFILE_INFO.name}
                    </Text>
                    <Text style={{ textAlign: 'left' }}>
                      {c.body}
                    </Text>
                  </View>
                ))
              }
            </ScrollView>
            <PostComment setVideoComments={postCommentHandler} />
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};
