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
  Button,
  CameraRoll,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header,SearchBar } from 'react-native-elements';
//import Geolocation from 'Geolocation';
import Modal from "react-native-modal";

import axios from 'axios';
import autobind from 'autobind-decorator';
import Drawer from 'react-native-drawer';
import Camera from 'react-native-camera';
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
import { saveDatas } from '../../redux/saveimage.redux.js';

const { width,height } = Dimensions.get('window');

@connect(
  state=>state,
  {saveDatas}
  )
export default class Test extends React.Component{
  state={
    pictures:[]
  }
	
// async componentWillMount() {
//   const options={first:1000,assetType:"Photos"};
//     const data = await CameraRoll.getPhotos(options);
//     console.log(data)
//     this.setState({
//       pictures:data.edges
//     })
  
//   }
//   


  componentDidMount() {
    //this.props.saveDatas(150,"Photos")
  }

	startRecording() {  

		console.log(this.Rncamera)
    if (this.Rncamera) {  
      this.Rncamera.capture({mode: Camera.constants.CaptureMode.video})  
          .then((data) => console.log(data))  
          .catch(err => console.error(err));  
      
    }  
  }  

  stopRecording() {  
    if (this.Rncamera) {  
      this.Rncamera.stopCapture();  
    }  
  }  


  refreshing(){
        // let timer =  setTimeout(()=>{
        //             clearTimeout(timer)
        //             alert('刷新成功')
        //         },1500)
    }
    _onload(){
        // let timer =  setTimeout(()=>{
        //     clearTimeout(timer)
        //     alert('加载成功')
        // },1500)
    }


    _renderItem = (item) => {

      console.log(item)

        var txt = '第' + item.index + '个' + ' title=' + item.item.title;
        var bgColor = item.index % 2 == 0 ? 'red' : 'blue';
        return (
          <View style={{width:width/4,height:100,marginRight: 2,}}>
           <Image style={{width:width/4,height:100}}

            source={{uri:item.item.node.image.uri}}/>
        </View>
          )
        
           
        
        //return <Text style={[{flex:1,height:100,marginRight: 2,backgroundColor:bgColor},styles.txt]}>{txt}</Text>
    }

    _header = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是头部</Text>;
    }

    _footer = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是尾部</Text>;
    }

    _separator = () => {
        return <View style={{height:2,backgroundColor:'yellow'}}/>;
    }

    _keyExtractor = (item, index) => (Math.random()).toString();


 render() {

  console.log(this.props.saveResource.pictures)
    return (
      <View style={styles.container}>
        {/*<Camera  
          ref={(cam) => {  
            this.Rncamera = cam;  
          }}  
          style={styles.preview}  
          //aspect={this.state.camera.aspect}  
          //captureTarget={this.state.camera.captureTarget}  
          //type={this.state.camera.type}  
          //flashMode={this.state.camera.flashMode}  
          defaultTouchToFocus  
          mirrorImage={false}  
        />  */}
       {/* <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPressIn={this.startRecording.bind(this)}
            onPressOut={this.stopRecording.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> recordVideo </Text>
        </TouchableOpacity>
        </View>*/}

        <Button title='滚动到指定位置' onPress={()=>{
                    this._flatList.scrollToOffset({animated: true, offset: 2000});
                }}/>
                <View style={{flex:1}}>
                    <FlatList
                        data={this.props.saveResource.pictures}
                        ref={(flatList)=>this._flatList = flatList}
                        ListHeaderComponent={this._header}
                        ListFooterComponent={this._footer}
                        //ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        onRefresh={this.refreshing}
                        refreshing={false}
                        onEndReachedThreshold={0}
                        onEndReached={
                            this._onload
                        }
                        numColumns ={4}
                        columnWrapperStyle={{borderBottomWidth:2,borderLeftWidth:2,borderColor:'black'}}

                        //horizontal={true}
                        keyExtractor={this._keyExtractor}
                        getItemLayout={(data,index)=>(
                        {length: 100, offset: (100+2) * index, index}
                        )}
                        >

                    </FlatList>
                </View>
      </View>
    );
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
	console.log(this.camera)
	if (this.camera) {
      const options = { quality: RNCamera.Constants.VideoQuality['2160p'], maxDuration: 5,maxFileSize:12410240 };
      const data = await this.camera.recordAsync(options)
      console.log(data);
	}
}


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },content:{
        width:width,
        height:height,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center'
    },
    cell:{
        height:100,
        backgroundColor:'purple',
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#ececec',
        borderBottomWidth:1

    },
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    }
});



