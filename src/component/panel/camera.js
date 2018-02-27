import React from 'react';
import {
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
  Modal,
  TextInput,
  Button,
  PermissionsAndroid,
  TouchableWithoutFeedback
} from 'react-native';
import Svg,{
    Circle,
} from 'react-native-svg';

import FontAwesome from  'react-native-vector-icons/FontAwesome';
import Entypo from  'react-native-vector-icons/Entypo';
import Ionicons from  'react-native-vector-icons/Ionicons';
import SimpleLineIcons from  'react-native-vector-icons/SimpleLineIcons';
import { RNCamera } from 'react-native-camera';

import EditerVideo from './editerVideo';


const { width,height } = Dimensions.get('window');

const flashModeOrder = {

  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',

};

let startTime=0;
let endTime=0;

export default class MyCamera extends React.Component{


  constructor(props) {
    super(props);
    this.state = {
      type:"back",
      time:null,
      isModalVisible: false,
      openEditor:false,
      videoUri:''
    };
  }


  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
    }
  };

  recordVideo = async ()=> {
    startTime=Date.now();
    console.log(startTime)
  let timer = setInterval(()=>{
      this.setState({
        time:Number(((Date.now()-startTime)/1000)).toFixed(2)
      })
    },1000)
    if (this.camera) {
      const options = { quality: RNCamera.Constants.VideoQuality['2160p'], maxDuration: 20,maxFileSize:1102410240,mute:false };
      const data = await this.camera.recordAsync(options)
      console.log(data);
      endTime=Date.now();
      clearInterval(timer)
      // this.setState({
      //   time:null,
      //   videoUri:data
      // })
    }
  };

  stopVideo = async ()=>{
    
    console.log(1213)
    await this.camera.stopRecording()
    
  }

  toggleFacing=()=> {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  renderCircle=()=>{
    return (
      
        <Svg
                height={`${width*0.5}`}
                width={`${width*0.5}`}
            >
                <Circle
                    cx={`${width*0.11}`}
                    cy={`${width*0.11}`}
                    r={`${width*0.1}`}
                    stroke="#d3de10"
                    strokeWidth={`${width*0.01}`}
                    fill="transparent"
                />
            </Svg>
      
            
        );
  }

  renerText=()=>{
    return (<Text style={styles.text}>长按摄像</Text>)
  }

  next=()=>{
    this.setState({
      openEditor:!this.state.openEditor
    })
  }

  renderNext=()=>{
    
      return (
        <TouchableOpacity onPress={this.next}>
          <View style={styles.nextBox}>
          <Ionicons 
          name="ios-arrow-round-forward" 
          size={40}
          color="#fc434f"
          onPress={this.toggleFacing}
        /> 
        </View> 
        </TouchableOpacity>
        )
   

    
  }

  renderEditor=()=>{
    if(this.state.openEditor){
      return (<EditerVideo 
                videoUri={this.state.videoUri}

              />)
    }
    return null
    
  }

  render() {
   
    return (
      <View style={styles.container}>
      {this.renderEditor()}
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={this.state.type}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        {this.renerText()}
        <TouchableWithoutFeedback onPressIn={this.recordVideo} onPressOut={this.stopVideo}>
        <View style={styles.cameraButtonBox}>
           
          
          <View style={styles.cameraButton}/>
          
          {this.renderCircle()}

        </View>
        </TouchableWithoutFeedback>
        <SimpleLineIcons 
        style={styles.close} 
        name="arrow-down" 
        size={30} 
        color="#fff" 
        onPress={()=>this.props.operate('picOrtext')}/>
        
        <TouchableWithoutFeedback>
          <View style={styles.nextBox}>
            <Ionicons 
              name="ios-arrow-round-forward" 
              size={40}
              color="#fc434f"
            /> 
          </View>
        </TouchableWithoutFeedback>  
          
        
       
        <Ionicons 
          name="ios-reverse-camera-outline" 
          size={40}
          style={styles.reverseCamera}
          onPress={this.toggleFacing}
        /> 
        {this.renderNext()}
        
        <View style={styles.progressBox}>
          <View style={[styles.progressBar,{width:(this.state.time/20)*width}]}/>
        </View>
        <Text style={styles.time}>{this.state.time}</Text>
      </View>
    );
     
    }
  }

 
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  preview: {
    flex: 1
  },
  cameraButton:{
    width:width*0.2,
    height:width*0.2,
    borderWidth: 4,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderRadius: width*0.1,
    
    position: 'absolute',
    backgroundColor: "red",
    left:width*0.01,
    top:width*0.01
   //right:0
    
  },
  text:{
    fontSize: width*0.04,
    color:"#fcffff",
    bottom: width*0.5,
    left: width*0.4,
    right:width*0.4,
    position: 'absolute',
    width:width*0.4,
    height:width*0.1
  },
  cameraButtonBox:{
    position: 'absolute',
    bottom:-width*0.1,
    left: width*0.4,
    right:width*0.4,
    width:width*0.5,
    height:width*0.5,
  },
  close:{
    position: 'absolute',
    bottom:width*0.25,
    left:width*0.15
  },
  reverseCamera:{
    position: 'absolute',
    top:width*0.08,
    right:width*0.08,
    color:"#fff"
  },
  nextBox:{
    position: 'absolute',
    bottom:width*0.1,
    right:width*0.08,
    justifyContent: 'center',
    alignItems: 'center',
    height: width*0.12,
    width:width*0.12,
    borderWidth: 1,
    borderColor: '#a4abb1',
    borderStyle: 'solid',
    borderRadius: width*0.06,
    backgroundColor: "#a4abb1",
  },
svgCircle:{
  position: 'absolute',
   width:width*0.6,
    height:width*0.6,
},
progressBox:{
  width:width,
  height:width*0.01,
  backgroundColor: "#d4d4d4",
  position: 'absolute',
},
progressBar:{
  height:width*0.01,
  backgroundColor: "#d10816",
},
time:{
  fontSize: width*0.04,
  position: 'absolute',
  color:"#fff",
  left:width*0.45,
  top:width*0.08
}
});


