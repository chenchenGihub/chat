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
	Image
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header,SearchBar } from 'react-native-elements';
import axios from 'axios';
import autobind from 'autobind-decorator';
import Drawer from 'react-native-drawer';
import { RNCamera } from 'react-native-camera';
import Video from 'react-native-video';
import Popover, { PopoverTouchable } from 'react-native-modal-popover';

import { loadData,publish } from '../../redux/data.redux'
import Avatar from '../../component/topheader/avatar'
import Title from '../../component/topheader/title'
import RightComponent from '../../component/header/rightcomponent'
import { shallowEqual } from '../../utils/utils'
import Mine from '../mine/mine'
import DataContainer from "../../component/datas/datacontainer"
import Panel from "../../component/panel/panel"
import MyCamera from "../../component/panel/camera"
import VideoRoll from "../../component/panel/videoRoll"
import ProgressBox from "../../component/progressbar/progressbar"
import { uploadFormData } from "../../utils/httpUtils.js"
import Constants from "../../constant/constant.js"


const { width,height } = Dimensions.get('window');

const xhr=null;

@connect(
	state=>state,
	{loadData,publish}
	)
export default class Square extends React.Component{
	

constructor(props) {
  super(props);

  this.state = {
  	modalVisible:false,
  	progress:0,
  	uploading:true
  };

  this.operate=this.operate.bind(this)
  this.videoUri='';
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
	this.operate('picOrtext');	
	this._upload(uploadFormData(v.videoUri,"video"),v);

}	


_upload(body,v){

	this.setState({
              uploading:true
            })
	this.setVideouri(v.videoUri);

  	 xhr = new XMLHttpRequest();

        let url = Constants.CLOUDINARY.video;

        xhr.open("POST",url);

        xhr.onload = () => {
          if (xhr.status === 200) {
            this.setState({
              uploading:false
            })
            let response=JSON.parse(xhr.responseText);
            console.log("response",response,response.secure_url.substring(0,response.secure_url.lastIndexOf('/')));
            //console.log(response.secure_url.substring(0,response.secure_url.lastIndexOf('/'))+response.public_id.substring(response.public_id.indexOf("/"))+".jpg")
            let thumbnail=response.secure_url.substring(0,response.secure_url.lastIndexOf('/'))+response.public_id.substring(response.public_id.indexOf("/"))+".jpg"
            this.props.publish({title:v.text,body:response.secure_url,thumbnail:thumbnail})

          } else {
            console.warn('error');
          }
        }

        xhr.onabort = ()=>{
		    alert("The transfer has been canceled by the user.");
		}

        xhr.upload.onprogress=(event)=>{
          //console.log(event)

          if(event.lengthComputable){
				this.setState({
					progress:event.loaded/event.total
				})
			}
        }
      xhr.send(body);
}

_abort=()=>{
	console.log("abort")
	xhr.abort()
	
}

setVideouri(v){
	this.videoUri=v;
}

getVideouri(){
	return this.videoUri
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

		console.log(this.state)

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

        	{
        		this.state.uploading&&!!this.state.progress?
	        	<ProgressBox
	        	 	progress={this.state.progress}
	        	 	videothumb={this.getVideouri()}
	        	 	abort={this._abort}
	        	 />
	        	 :null
        	}
        	
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


