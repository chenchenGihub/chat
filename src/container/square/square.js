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
	Modal,
	ProgressBar,
	ProgressViewIOS,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header,SearchBar } from 'react-native-elements';
//import Geolocation from 'Geolocation';


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

@connect(
	state=>state,
	{loadData}
	)
export default class Square extends React.Component{
	

constructor(props) {
  super(props);

  this.state = {
  	modalVisible:false
  };

  this.operate=this.operate.bind(this)
}

	takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true,exif:true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data);
    }
  };

takeVideo=async ()=>{
	if (this.camera) {
      const options = { quality: RNCamera.Constants.VideoQuality['2160p'], maxDuration: 15,maxFileSize:10240,mute:false };
      const data = await this.camera.recordAsync()
      console.log(data);
    }
}

// _keyExtractor=(item, index)=>(item._id).toString();


// 	renderDataItem=({item})=>{
// 		return (<DataContainer
// 					style={styles.DataItem}
// 					dataItem={item}
// 				/>)
// 	}

_publishVideo=(v)=>{
	console.log(v)
}

operate(v){
	console.log("v",v)
	if(v=='picOrtext'||v=='capatureVideo'||v=='uploadVideo'){
		this.setState({
			modalVisible:!this.state.modalVisible,
			choice:v
		})
	}
		
}

renderPanelContainer=()=>{
	if(this.state.choice=='picOrtext'){
		return (<Panel operate={this.operate}/>)
	}else if(this.state.choice=='capatureVideo'){
		return (<MyCamera 
				operate={this.operate}
				publishVideo={this._publishVideo}
			/>)
	}else{
			return (<VideoRoll operate={this.operate}/>)
	}	
	
}
	
	render(){

		return(
			<View style={styles.container}>
					<Header
					  leftComponent={<Avatar source={this.props.users.avatarurl} style={styles.avatar} openControlPanel={this.props.openControlPanel}/>}
					  centerComponent={<Title text={'广场'} style={styles.title}/>}
					  rightComponent={<RightComponent operate={this.operate}/>}
					/>

			<Modal
	          animationType={"slide"}
	          transparent={false}
	          visible={this.state.modalVisible}
	          onRequestClose={() => {this.setState({modalVisible:!this.state.modalVisible})}}
	          >
	          {this.renderPanelContainer()}
        	</Modal>

        	 {/*<ProgressViewIOS 
        	 	style={styles.progressView} 
        	 	progressTintColor="purple" 
        	 	progress={0.2}
        	 	progressViewStyle="bar"
        	 	trackTintColor="blue"
        	 	//trackImage=""
        	 />*/}
        	
		</View>		
		)
	}
}

const styles = StyleSheet.create({
  
  container:{
  	flex:1
  },
  header:{
  	height:height*0.1,
  	width:width,
  	backgroundColor: '#c500b6',
  },
  text:{
  	color:'#120909'
  },
  title:{
		color:'#f8f9fd',
		fontSize: 20,
	},
  progressView: {
    marginTop: 20,
    marginLeft:10,
    marginRight:10,
  }
});


