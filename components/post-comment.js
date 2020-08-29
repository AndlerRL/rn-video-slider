import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import IconFa from 'react-native-vector-icons/FontAwesome'
import { styles } from '../util/styles'

export default ({ setVideoComments }) => {
  const [comment, setComment] = useState('write your comment')

  function changeHandler(text) {
    setComment(text)
  }

  function submitComment() {
    setVideoComments(comment)
    setComment('')

    return Keyboard.dismiss
  }

  function inputHandler() {
    if (comment === 'write your comment')
      setComment('')
    else if (comment === '')
      setComment('write your comment')
  }

  return (
    <View style={styles.inputWrapper}>
      <TextInput 
        style={{
          height: 50,
          padding: 16,
          color: comment === 'write your comment' || comment === '' ? '#0005' : '#000'
        }}
        onChangeText={text => changeHandler(text)}
        onFocus={inputHandler}
        onBlur={inputHandler}
        value={comment}
      />
      <TouchableOpacity onPress={submitComment} style={{ ...styles.IconWrapper, margin: 0, height: 50, }}>
        <IconFa size={21} name="send-o" />
      </TouchableOpacity>
    </View>
  )
}