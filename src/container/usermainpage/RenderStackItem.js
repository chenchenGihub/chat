import React from 'react';
import { 
	View,
	Text,
	StyleSheet,
	Dimensions
} from 'react-native';

import Video from 'react-native-video'; 

const { width,height } = Dimensions.get('window'); 


export default class RenderStackedItem extends React.PureComponent{
  constructor(props) {
    super(props);
  
    this.state = {};

    this.loadStart=this.loadStart.bind(this);
    this.setDuration=this.setDuration.bind(this);
    this.setTime=this.setTime.bind(this);
    this.onEnd=this.onEnd.bind(this);
    this.videoError=this.videoError.bind(this);
    this.onBuffer=this.onBuffer.bind(this);
    this.onTimedMetadata=this.onTimedMetadata.bind(this);

  }
  
  loadStart(data){
    console.log(data)
  }
  setDuration(data){
    console.log(data)
  }
  onEnd(data){
    console.log(data)
  }
  videoError(data){
    console.log(data)
  }
  onBuffer(data){
    console.log(data)
  }
  onTimedMetadata(data){
    console.log(data)
  }
  setTime(data){
    console.log(data)
  }



    _playRef = (ref) => { this._VideoRef = ref; };
    
    render(){
      
        const {
          item,
          loadStart,
          setDuration,
          setTime,
          onEnd,
          videoError,
          onBuffer,
          onTimedMetadata,
        } = this.props;

       
        return (
          <View style={styles.stacked}>
           <Video source={{uri: item.body}}   // Can be a URL or a local file.
             poster={item.thumbnail}
             ref={this._playRef}                                      // Store reference
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
stacked: {
    flex:1,
    alignItems: 'center',
    backgroundColor: 'white',
    width:width,
    height:width*0.5
  },
  Video: {
    flex:1,
    width:width,
    height:width*0.5
  },
})

