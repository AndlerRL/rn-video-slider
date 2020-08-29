"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _reactNative = require("react-native");

var styles = _reactNative.StyleSheet.create({
  app: {
    marginHorizontal: 0,
    minWidth: "100%",
    maxWidth: 500,
    position: "relative",
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "#000",
    color: 'white'
  },
  logo: {
    height: 80,
    width: 80,
    bottom: 16,
    right: 0,
    position: "absolute",
    opacity: 0.25,
    zIndex: 0
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 8,
    color: 'white',
    letterSpacing: 1,
    padding: 4
  },
  text: {
    fontSize: 13,
    marginVertical: 8,
    letterSpacing: 1,
    padding: 4
  },
  link: {
    color: "#1B95E0"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  hubContainer: {
    flex: 1,
    flexBasis: 64,
    alignItems: 'center',
    justifyContent: 'flex-end',
    right: 0,
    width: 64,
    padding: 16,
    backgroundColor: '#0005',
    zIndex: 45,
    paddingBottom: '16.666%'
  },
  IconWrapper: {
    marginVertical: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentDetails: {
    backgroundColor: '#0005',
    bottom: 0,
    position: 'absolute',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    zIndex: 45
  },
  modalWrapper: {
    position: 'absolute',
    zIndex: 100
  },
  centeredView: {
    backgroundColor: 'white',
    flex: 1
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: '42%',
    width: '100%',
    position: 'absolute',
    bottom: -16
  },
  commentContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    marginBottom: 16,
    borderBottomColor: '#3333',
    borderBottomWidth: 1
  },
  commentsClose: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    margin: 16,
    zIndex: 100
  },
  inputWrapper: {
    borderColor: '#3333',
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 21,
    paddingBottom: 8
  }
});

exports.styles = styles;