import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  findNodeHandle,
  NativeModules
} from 'react-native'; 
import Popover, { PopoverTouchable } from 'react-native-modal-popover';
import Icon from 'react-native-vector-icons/FontAwesome'

import Button from '../topheader/Button';
const { width,height } = Dimensions.get('window');

export default class RightComponent extends React.Component{

  state = {
    showPopover: false,
    popoverAnchor: { x: 0, y: 0, width: 0, height: 0 },
  };

  setButton = (e) => {
   // console.log(e.nativeEvent.layout)
    //const { x,y,width,height } = e.nativeEvent.layout;
    //this.setState({ popoverAnchor: { x, y, width, height } });
    const handle = findNodeHandle(this.button);
    if (handle) {
      NativeModules.UIManager.measure(handle, (x0, y0, xwidth, xheight, x, y) => {
       // console.log(x0, y0, xwidth, xheight, x, y)
        this.setState({ popoverAnchor: { x:width*0.8, y:width*0.15, width:xwidth, height: xheight} });
      });
    }
  };

  openPopover = () => {
    this.setState({ showPopover: true })
  };

  closePopover = (v) =>{
    this.setState({ showPopover: false });
    setTimeout(()=>{
      this.props.operate(v)
    },100)
  } 
  
  render(){
    const { openModal } = this.props
    return(
      <View style={styles.app}>
                <Button
                  ref={r => {this.button = r}} icon="plus" onPress={this.openPopover} onLayout={this.setButton}/>
                <Popover
                  visible={this.state.showPopover}
                  fromRect={this.state.popoverAnchor}
                  onClose={this.closePopover}
                  placement="bottom"
                  contentStyle={styles.content}
                  arrowStyle={styles.arrow}
                  duration={80}
                >
                <View>
                  
                </View>
              <TouchableOpacity onPress={()=>{this.closePopover("picOrtext")}}>
                <View style={styles.label}>
                  <Icon style={styles.icon} name={"file-text"} size={20} color='#245bff'/>
                  <Text style={styles.textLabel}>发图文</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.closePopover("capatureVideo")}}>
                <View style={[styles.label,{marginVertical: width*0.04,}]}>
                  <Icon style={styles.icon} name={"video-camera"} size={20} color='#fc4b0d'/>
                  <Text style={styles.textLabel}>拍视频</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.closePopover("uploadVideo")}}>
                <View style={styles.label}>
                  <Icon style={styles.icon} name={"file-video-o"} size={20} color='#116c02'/>
                  <Text style={styles.textLabel}>上传视频</Text>
                </View>
              </TouchableOpacity>
                  
                </Popover>
              </View>

      )
  }
}

const styles=StyleSheet.create({
  app: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginTop: -10,
   // marginLeft: 200,
  },
  arrow: {
    borderTopColor: '#eee',
    marginTop: -10,
    marginLeft: width*0.06,
  
  },
  label:{
  flexDirection: 'row',
  alignItems: 'center',
 },
 textLabel:{
  marginLeft: width*0.04,
 },
 icon:{
  marginLeft:width*0.03
 },
})


