import React from 'react';
import {
	View, 
	Text, 
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Platform,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";

import axios from 'axios';
import Video from 'react-native-video';
import Popover, { PopoverTouchable } from 'react-native-modal-popover';


const { width,height } = Dimensions.get('window');


export default class EditerVideo extends React.Component{
	

 state = {
    isModalVisible: false
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerBox}>
          
        </View>


      </View>
     
    );
  }
}

const styles = StyleSheet.create({
  
  container:{
  	flex:1
  },
  headerBox:{
    height:width*0.1,
    width:width,
    backgroundColor: "#454647",
  }
});


