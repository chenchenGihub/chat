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
//import { RNCamera } from 'react-native-camera';
import Camera from 'react-native-camera';  

import EditerVideo from './camera/editerVideo';


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
      aspect: Camera.constants.Aspect.fill, 
      type:Camera.constants.Type.back,
      time:null,
      isModalVisible: false,
      openEditor:false,
      videoUri:'',
      isRecording: false  
    };
  }


  takePicture = async function() {

    console.log(this.camera)
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
    },1000);

  try{
    if (this.camera) {
      //const options = { quality: RNCamera.Constants.VideoQuality['2160p'], maxDuration: 20,maxFileSize:1102410240,mute:false };
      const data = await this.camera.capture({mode: Camera.constants.CaptureMode.video})
      console.log(data);
      endTime=Date.now();
      clearInterval(timer)
      this.setState({
        //time:null,
        videoUri:data
      })
    }
  } catch(err){
    console.log(err)
  }finally{
    
  }
    
  };

  stopVideo = ()=>{
    
    // console.log(1213)
    // await this.camera.stopRecording()
    this.camera.stopCapture(); 
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

  next=(v)=>{
    console.log(this.state.openEditor)

    this.setState({
      openEditor:v
    })
  }

  

  renderEditor=()=>{
    if(this.state.openEditor){
      return (<EditerVideo 
                videoUri={this.state.videoUri}
                modalVisible={this.state.openEditor}
                toggle={this.next}
                publishVideo={this.props.publishVideo}
              />)
    }
    return null
    
  }

  render() {
   console.log(this.state.time)
    return (
      <View style={styles.container}>
      {this.renderEditor()}
        <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={this.state.type}
            flashMode={Camera.constants.FlashMode.auto}
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
        
        
          
        
       
        <Ionicons 
          name="ios-reverse-camera-outline" 
          size={40}
          style={styles.reverseCamera}
          onPress={this.toggleFacing}
        /> 
        {
          this.state.time?
           (<TouchableWithoutFeedback onPress={()=>this.next(true)}>
            <View style={styles.nextBox}>
            <Ionicons 
            name="ios-arrow-round-forward" 
            size={40}
            color="#fc434f"
            /> 
          </View> 
          </TouchableWithoutFeedback>)
           :
           null
        }

        
          {
          this.state.time>0?
        (<View style={styles.recordBox}>
          <View style={styles.progressBox}>
            <View style={[styles.progressBar,{width:(this.state.time/20)*width}]}/>
          </View>
          <Text style={styles.time}>{`${"🐶"}${this.state.time}${"😺"}`}</Text>
        </View>)
        : null
        }
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
    bottom:width*0.24,
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
},
recordBox:{
  position: 'absolute',
}
});


