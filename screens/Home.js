import { useWindowDimensions } from "react-native";
import { View, SafeAreaView, Animated, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Icon from 'react-native-vector-icons/Entypo';
import IconEv from 'react-native-vector-icons/EvilIcons';
import React, { useEffect, useRef, useState } from "react";
import Video from 'react-native-video';
import CommentsModal from '../components/comments';

import { comments } from '../util/comments';
import { styles } from "../util/styles";
import { videos } from '../util/videos';

export default () => {
  const [gState, setGState] = useState({
    volume: 1,
    muted: false,
    pause: false,
    resizeMode: "cover",
    duration: 0.0,
    currentTime: 0.0,
  });
  const [activeVid, setActiveVid] = useState(null)
  const [showComments, setShowComments] = useState(false)
  const [vpPos, setVpPos] = useState(0)
  const { height, width } = useWindowDimensions();
  const swipe = useRef(new Animated.Value(0)).current
  const vidRef = useRef(null)

  useEffect(() => {
    if (videos.length && !activeVid)
      setActiveVid(videos[0])
  }, [videos])

  function onLoad(data) {
    setGState((gs) => ({
      ...gs,
      duration: data.duration
    }));
  }

  function onProgress(data) {
    setGState((gs) => ({
      ...gs,
      currentTime: data.currentTime,
      duration: data.playableDuration
    }));
  }

  function getCurrentTimePercentage() {
    if (gState.currentTime > 0.00)
      return parseFloat(gState.currentTime) / parseFloat(gState.duration) * 100;
    else return 0;
  }

  function toggleMute() {
    setGState((gs) => ({
      ...gs,
      muted: !gs.muted
    }));
  }

  function tWidthAnim(tWidth) {
    return {
      width: `${tWidth}%`
    }
  }

  function animChecker(status) {
    const currentVidIndex = videos.findIndex(v => v.credits === activeVid.credits)
    const swipeNext =  status === 'SWIPE_UP'
    
    setGState(gs => ({
      ...gs,
      duration: 0.0,
      currentTime: 0.0,
    }))

    if (currentVidIndex !== -1) {
      if (swipeNext) {
        if (currentVidIndex === videos.length - 1) {
          Animated.timing(
            swipe,
            {
              toValue: 0,
              duration: 750,
              useNativeDriver: true,
            }
          ).start()
          setVpPos(0)
          setActiveVid(videos[0])
        } else {
          Animated.timing(
            swipe,
            {
              toValue: vpPos - height - 34,
              duration: 750,
              useNativeDriver: true,
            }
          ).start()
          setVpPos(vp => vp - height - 34)
          setActiveVid(videos[currentVidIndex + 1])
        }
      } else {
        if (currentVidIndex === 0) {
          Animated.timing(
            swipe,
            {
              toValue: -((height + 34) * (videos.length - 1)),
              duration: 750,
              useNativeDriver: true,
            }
          ).start()
          setVpPos(-((height + 34) * (videos.length - 1)))
          setActiveVid(videos[videos.length - 1])
        } else {
          Animated.timing(
            swipe,
            {
              toValue: vpPos + height + 34,
              duration: 750,
              useNativeDriver: true,
            }
          ).start()
          setVpPos(vp => vp + height + 34)
          setActiveVid(videos[currentVidIndex - 1])
        }
      }
    }
  }

  function onSwipeUp(state) {
    return animChecker('SWIPE_UP')
  }

  function onSwipeDown(state) {
    return animChecker('SWIPE_DOWN')
  }

  function toggleComments() {    
    setShowComments(c => !c)
  }

  function vidComments(video) {
    if (video)
      return comments.filter(c => c.videoID === video.id)
  }

  const tWidth = getCurrentTimePercentage();
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <KeyboardAvoidingView 
      style={{ position: 'relative', flex: 1 }}
      useNativeDriver={true}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* NOTE: VIDEO COMMENTS MODAL START */}
      <CommentsModal 
        comments={vidComments(activeVid) ?? []} 
        setPlayVideo={setGState}
        showComments={showComments}
        setShowComments={setShowComments}
      />
      {/* NOTE: VIDEO COMMENTS MODAL END */}
      {/* NOTE: VIDEO GESTURE CONTROL AND RENDER START */}
      {
        activeVid ? (
          <Animated.View 
            style={{
              transform: [{ translateY: swipe }],
            }}
            useNativeDriver={true}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <GestureRecognizer
                onSwipeUp={state => onSwipeUp(state)} 
                onSwipeDown={state => onSwipeDown(state)}
                config={config}
              >
                  {
                    videos?.map((v, i) => (
                      <Video
                        ref={ref => vidRef.current = ref}
                        source={v.path}
                        style={{ ...styles.backgroundVideo, height: height + 30, width }}
                        resizeMode="cover"
                        muted={gState.muted}
                        onLoad={e => onLoad(e)}
                        onProgress={v.credits === activeVid.credits ? e => onProgress(e) : () => {}}
                        onEnd={e => onSwipeUp(e)}
                        paused={gState.pause || v.credits !== activeVid.credits}
                        key={v.id}
                      />
                    ))
                  }
              </GestureRecognizer>
            </TouchableWithoutFeedback>
          </Animated.View>
        ) : <Text style={{ color: 'white', padding: 64, marginTop: 128 }}>Cannot play video, sorry...</Text>
      }
      {/* NOTE: VIDEO GESTURE CONTROL AND RENDER END */}
      {/* NOTE: VIDEO HUB START */}
      <View style={{ width, height: height + 34, position: 'absolute', flex: 1, alignItems: 'flex-end' }}>
        <View style={{ ...styles.hubContainer }}>
          <TouchableOpacity onPress={toggleMute} style={styles.IconWrapper}>
            <Icon name={gState.muted ? 'sound-mute' : 'sound'} size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleComments} style={styles.IconWrapper}>
            <IconEv name="comment" size={32} color="#fff" />
            <Text style={{ color: 'white', width: '100%', marginHorizontal: 8 }}>
              {
                activeVid && vidComments(activeVid).length
              }
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.contentDetails, width: width - 64, left: 0 }}>
          {
            activeVid ? (
              <View style={{ width: '100%' }}>
                <Text style={styles.title}>
                  {activeVid.title}
                </Text>
                <Text style={{ ...styles.text, ...styles.link }}>
                  by @{activeVid.credits}
                </Text>
              </View>
            ) : <View><Text>Sorry, no data to show...</Text></View>
          }
          <View style={{ width, backgroundColor: '#fff3' }}>
            <View style={{
              ...tWidthAnim(tWidth),
              height: 4,
              backgroundColor: "white",
              bottom: 0,
              left: 0,
              zIndex: 50,
            }} />
          </View>
        </View>
      </View>
      {/* NOTE: VIDEO HUB END */}
    </KeyboardAvoidingView>
  );
};
