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
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header,SearchBar } from 'react-native-elements';
//import Geolocation from 'Geolocation';
import Modal from "react-native-modal";

import axios from 'axios';
import autobind from 'autobind-decorator';
import Drawer from 'react-native-drawer';
import { RNCamera } from 'react-native-camera';
import Video from 'react-native-video';
import Popover, { PopoverTouchable } from 'react-native-modal-popover';
import { loadData } from '../../redux/data.redux'
import Avatar from '../../component/topheader/avatar'
import Title from '../../component/topheader/title'
import RightComponent from '../../component/header/rightcomponent'
import { shallowEqual } from '../../utils/utils'
import Mine from '../mine/mine'
import DataContainer from "../../component/datas/datacontainer"
import Panel from "../../component/panel/panel"
import MyCamera from "../../component/panel/camera"
import VideoRoll from "../../component/panel/videoRoll"


const { width,height } = Dimensions.get('window');


export default class Test extends React.Component{
	

 state = {
    isModalVisible: false
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={{ flex: 1,justifyContent: 'center',alignItems: 'center' }}>
        <TouchableOpacity onPress={this._toggleModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}
        onSwipe={() => this.setState({ isModalVisible: false })}
        	swipeDirection={"down"}
        >
          <View style={{height:100,width:100,backgroundColor: "red", }}>
            <Text>Hello!</Text>
            <TouchableOpacity onPress={this._toggleModal}>
              <Text>Hide me!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  container:{
  	flex:1
  },
});


