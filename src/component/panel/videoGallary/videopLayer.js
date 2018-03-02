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
  TouchableWithoutFeedback
} from 'react-native';
import FontAwesome from  'react-native-vector-icons/FontAwesome';
import Entypo from  'react-native-vector-icons/Entypo';
import Ionicons from  'react-native-vector-icons/Ionicons';
import Video from "react-native-video";
const { width,height } = Dimensions.get('window');


export default class VideoPLayer extends React.Component{

 state = {
    
  };

  

  render() {

    console.log(this.props)
    return (
     <View style={styles.videoBox}>
       <Video 
       source={{uri:this.props.videoUri.path}}   // Can be a URL or a local file.
       //source={{uri:this.props.videoUri.path}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       rate={1.0}                              // 0 is paused, 1 is normal.
       volume={1.0}                            // 0 is muted, 1 is normal.
       muted={false}                           // Mutes the audio entirely.
       paused={false}                          // Pauses playback entirely.
       resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
       repeat={true}                           // Repeat forever.
       playInBackground={false}                // Audio continues to play when app entering background.
       playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
       ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
       progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
       onLoadStart={this.loadStart}            // Callback when video starts to load
       onLoad={this.setDuration}               // Callback when video loads
       onProgress={this.setTime}               // Callback every ~250ms with currentTime
       onEnd={this.onEnd}                      // Callback when playback finishes
       onError={this.videoError}               // Callback when video cannot be loaded
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
       style={styles.Video} />
     </View>
    );
  }
}
const styles = StyleSheet.create({
  
  videoBox:{
    width:width,
    height:height*0.5,
  },
  Video:{
    flex:1
    // width:width,
    // height:height*0.5,
  }
});


