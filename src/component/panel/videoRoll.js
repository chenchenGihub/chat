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
  geolocation,
  PermissionsAndroid,
  TouchableWithoutFeedback
} from 'react-native';
import FontAwesome from  'react-native-vector-icons/FontAwesome';
import Entypo from  'react-native-vector-icons/Entypo';
import Ionicons from  'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
const { width,height } = Dimensions.get('window');

const BUTTONS = ['从手机相册选择', '拍摄', '取消'];

const iconArr=["qq","wechat","chrome"];

export default class VideoRoll extends React.Component{

 state = {
    isModalVisible: false
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._toggleModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity>
        <Modal 
        isVisible={this.state.isModalVisible}
        swipeDirection={"down"}
        
        onSwipe={() => this.setState({ isVisible: false })}
        >
          <View style={{ flex: 1 ,height:100,width:100,backgroundColor: "red",}}>
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
  
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});


