import React from 'react';
import {
	View, 
	Text, 
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Platform,
  Image,
 
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import shallowCompare from 'react-addons-shallow-compare';
import CheckCircle from './checkcircle';
import PreviewImage from './previewimage';

const { width,height } = Dimensions.get('window');


export default class MyListItem extends React.PureComponent{
	

constructor(props) {
  super(props);

  this.state = {
   modalVisible:true
  };
}

// shouldComponentUpdate(nextProps, nextState) {
//   return !shallowCompare(nextProps,this.props);
// }
renderResource=(type,item)=>{
  if(type==='Videos'){
    return ( <Video source={{uri:item.uri}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       rate={1.0}                              // 0 is paused, 1 is normal.
       volume={1.0}                            // 0 is muted, 1 is normal.
       muted={true}                           // Mutes the audio entirely.
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
     )
  }

  return (<Image
          source={{uri:item.uri}}
          style={{width:this.props.imgWidth,height:this.props.imgWidth}}
        />)
}

  render() {
   // console.log(this.props)
    return (
      
        <View style={[styles.imgBox,{width:this.props.imgWidth,height:this.props.imgWidth}]}>
          {this.renderResource(this.props.dataType,this.props.itemData.image)}
          

        <CheckCircle 
          BoxStyle={styles.circleBox} 
          checkedStyle={styles.checked} 
          checked={this.props.checked}
          madeCheck={()=>{this.props.onPressItem(this.props.id)}}
        />
        
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  
  
  pic:{
    height:width*0.1,
    width:width,
   
  },
  imgBox:{
    marginRight: 2,
    
  },
  circleBox:{
    borderWidth: width*0.002,
    borderColor: '#fff',
    borderStyle: 'solid',
    width:width*0.06,
    height:width*0.06,
    borderRadius: width*0.05,
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    top:width*0.01,
    left:width*0.01,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checked:{
    width:width*0.017,
    height:width*0.035,
    borderRightWidth: width*0.004,
    borderRightColor: '#0d085a',
    borderStyle: 'solid',
    borderBottomWidth: width*0.004,
    borderBottomColor: '#0d085a',
    borderStyle: 'solid',
    transform:[{rotateZ:"45deg"}],
    marginBottom: width*0.010,
  }
});


