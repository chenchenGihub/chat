
'use strict';

import React from 'react';
import {
	View, 
	Text, 
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Platform,
  CameraRoll
} from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Modal from "react-native-modal";

import axios from 'axios';
import Video from 'react-native-video';
import Popover, { PopoverTouchable } from 'react-native-modal-popover';
import CameraRollPicker from 'react-native-camera-roll-picker';
import GallaryList from './gallarylist/gallarylist';
import { saveDatas } from '../../redux/saveimage.redux';

const { width,height } = Dimensions.get('window');

@connect(
  state=>state,
  {saveDatas}
  )
export default class ImageGallary extends React.Component{
	

 state = {
    isModalVisible: this.props.visibleModal,
    num:[]
  };


 componentWillMount() {
   if(this.props.saveResource.pictures.length==0){
      this.props.saveDatas(50,"Photos")
    }
 }

getSelectedImages(current) {
    

    console.log(current)
    this.setState({
      num:current
    })

    
  }

    renderChoosePanel(){
      return (<View style={styles.choosePanel}>
              <GallaryList
                data={this.props.saveResource.pictures}
                columns={4}
                dataType={this.props.saveResource.dataType}
                disableSwipeDown={this.disableSwipeDown}
                showtotal={this.getSelectedImages.bind(this)}
                nums={this.state.num}
              />
      </View>)
    }


  render() {

    //console.log(this.props.saveResource.pictures)

    const counts=this.props.saveResource.pictures.length

    console.log("selected",this.state)

    const { num } = this.state;
 
    if(this.props.visibleModal){
      return (
      <Modal
          isVisible={!this.state.visibleModal}
          onBackdropPress={()=>this.setState({visibleModal:false})}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={500}
          animationOutTiming={500}
          onSwipe={()=>{this.props.closePic()}}
          swipeDirection={!this.state.swipeable?null:"down"}
          swipeThreshold={width*0.6}
          style={[styles.bottomModal,{ marginTop: Platform.OS==='ios' ? height*0.018 :0}]}
        >
          <View style={styles.modalContent}>
                   <View style={styles.modalHeader}>
                     <EvilIcons name="close" size={20} color="#242425" onPress={()=>{this.props.closePic()}}/>
                     <View style={styles.pictext}>
                       <Text>最近{counts}张图片</Text>
                     </View>
                     
                      
                      
                    <View style={styles.box}>
                      {this.state.num.length>0?
                        (<View style={styles.numBox}>
                            <Text>{this.state.num.length}</Text>
                        </View>):<View style={{width:width*0.06,
                        height:width*0.06, marginRight: width*0.02}}/>}
                        <TouchableOpacity onPress={()=>{this.props.closePic(this.state.num)}}>
                          <Text style={{marginHorizontal: width*0.01,color:!this.state.num.length?"#adb2b7":"#b5000b"}}>完成</Text>
                        </TouchableOpacity>
                      </View>
                   </View>
                   {this.renderChoosePanel()}
                    
          </View>

        </Modal>
     
      );
    }

    return null
    
  }
}

const styles = StyleSheet.create({
  
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
    flex:1
   
  },
  modalContent: {
    backgroundColor: "white",
    //padding: 22,
    //justifyContent: "center",
    //alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    flex:1
  },
  modalHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:width,
    height:width*0.1
  },
  choosePanel:{
    flex:1,
  },
  numBox:{
    backgroundColor: "#2de3e7",
    borderWidth: 1,
    borderColor: '#0b292a',
    borderStyle: 'solid',
    width:width*0.06,
    height:width*0.06,
    borderRadius:width*0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width*0.02,
  },
  numhandle:{
    width:width*0.1,
    height:width*0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },box:{
    width:width*0.2,
    height:width*0.08,
    flexDirection: 'row',
    alignItems: 'center'
  }
});


