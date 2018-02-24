import React from 'react'
import {
	View, 
	Text, 
	StyleSheet,
	FlatList,
	Dimensions,
	TouchableOpacity,
	StatusBar 
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Header } from 'react-native-elements'
import axios from 'axios'
import autobind from 'autobind-decorator';
import Drawer from 'react-native-drawer'
import { RNCamera } from 'react-native-camera';


import { GetUserList } from '../../redux/chatUser.redux'
import Avatar from '../../component/topheader/avatar'
import Title from '../../component/topheader/title'
import RightComponent from '../../component/topheader/rightComponent'
import { shallowEqual } from '../../utils/utils'
import Mine from '../mine/mine'


const { width,height } = Dimensions.get('window');

class ControlPanel extends React.Component{
	render(){
		return(
				<View style={{flex:1,backgroundColor: 'red',}}>
					<Text>123</Text>
				</View>
			)
	}
}

@connect(
	state=>state,
	{GetUserList}
	)
export default class Square extends React.Component{

	componentDidMount() {

	}

	shouldComponentUpdate(nextProps:Object, nextState:Object) {

	  	return !shallowEqual(nextProps.chatUser,this.props.chatUser)

	}

	componentWillReceiveProps(nextProps) {
	  
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



	render(){

		return(
				<View style={styles.container}>
					<StatusBar
				     backgroundColor="blue"
				     barStyle="light-content"
				     animated={true}
				     hidden={true}
				   />
					
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            notAuthorizedView={<View><Text>{"请求相机"}</Text></View>}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={this.takeVideo.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}>拍摄</Text>
        </TouchableOpacity>
        </View>
      </View>
				
		)
	}
}

const styles=StyleSheet.create({
	container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
	title:{
		color:'#f8f9fd',
		fontSize: 20,
	},
	avatar:{
		marginTop: width*0.02,
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
})