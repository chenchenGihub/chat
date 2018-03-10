import React from 'react';
import {
  View, 
  Text, 
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Platform,
  TextInput,
  Button,
  ScrollView,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  BackHandler
} from 'react-native';
import FontAwesome from  'react-native-vector-icons/FontAwesome';
import EvilIcons from  'react-native-vector-icons/EvilIcons';
import Ionicons from  'react-native-vector-icons/Ionicons';
import Video from "react-native-video";
import ImagePicker from 'react-native-image-crop-picker';
const { width,height } = Dimensions.get('window');

import  VideoPLayer from './videoGallary/videopLayer.js';
import  VideoGallary from './videoGallary/videogallary';

export default class VideoRoll extends React.Component{

 state = {
    videos:[]
  };

 

  componentDidMount() {
      ImagePicker.openPicker({
      mediaType: "video",
    }).then((video) => {
      
        console.log(video);

    }).catch((error) => { 
      
      console.log(error) });


    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.operate('')
    });


  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", ()=>console.log("unmount"))
    this.props.operate('')
  }



  render() {
    return (<View><Text>123</Text></View>)
  }
}
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
   // backgroundColor: "red",
  },
  next: {
    justifyContent: 'center',
    alignItems: 'center',
    width:width*0.2,
    height:height*0.05,
    borderRadius:height*0.01,
    backgroundColor: "#e45250",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#000000",
    width:width,
    height:width*0.16
  },
  nextText:{
    fontSize: width*0.05,
    color:"#fff"
  },
  
});


