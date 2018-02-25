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


const { width,height } = Dimensions.get('window');


const videoUrl='https://vjs.zencdn.net/v/oceans.mp4';
const thumnailUrl="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494233305839&di=e1647289d1fcd778f64ddf3ccaf6fcfa&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1016%2Fgha%2F1%2F1350006791532.jpg";
const data=[
{
	_id:Math.random(),
	author:{
		id:"12313213212421",
		username:'afafafafdafdafa'
	},
	title:"的方法大方",
	video:{
		videoId:'aSAsaasad21321321321fasafa',
		thumnail:thumnailUrl,
		videoUrl:videoUrl,
	}
},
{	_id:Math.random(),
	author:{
		id:"12313213212421",
		username:'afafafafdafdafa'
	},
	title:"的方法大方",
	video:{
		videoId:'aSAsaasad21321321321fasafa',
		thumnail:thumnailUrl,
		videoUrl:videoUrl,
	}
},
{	_id:Math.random(),
	author:{
		id:"12313213212421",
		username:'afafafafdafdafa'
	},
	title:"的方法大方",
	video:{
		videoId:'aSAsaasad21321321321fasafa',
		thumnail:thumnailUrl,
		videoUrl:videoUrl,
	}
},
{	_id:Math.random(),
	author:{
		id:"12313213212421",
		username:'afafafafdafdafa'
	},
	title:"的方法大方",
	video:{
		videoId:'aSAsaasad21321321321fasafa',
		thumnail:thumnailUrl,
		videoUrl:videoUrl,
	}
},
{	_id:Math.random(),
	author:{
		id:"12313213212421",
		username:'afafafafdafdafa'
	},
	title:"的方法大方",
	video:{
		videoId:'aSAsaasad21321321321fasafa',
		thumnail:thumnailUrl,
		videoUrl:videoUrl,
	}
},
];




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





operate(v){
	if(v=='picOrtext'){
		this.setState({
			modalVisible:!this.state.modalVisible
		})
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
	          onRequestClose={() => {alert("Modal has been closed.")}}
	          >

	          <Panel
	          	operate={this.operate}
	          />
	         
        	</Modal>
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
  avatar:{
		marginTop: width*0.02,
	},
	SearchBar:{
		position: 'absolute',
		top:width*0.01,
		left: width*0.2,
	}
});


