import React from 'react'
import {
	View, 
	Text, 
	StyleSheet,
	FlatList,
	Dimensions,
	Button,
	Image,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
	BackHandler 
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { Header } from 'react-native-elements'
import axios from 'axios'
import autobind from 'autobind-decorator';

import { chatTo,goback } from '../../redux/user.redux.js'

const { width,height } = Dimensions.get('window');

@connect(
	state=>state,
	{chatTo,goback}
	)
export default class UserDetail extends React.Component{

	static navigationOptions={
		header:null
	}

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }



	@autobind
	_chatWithThis({nickname,_id}){
		//console.log({nickname,_id})
		this.props.chatTo({nickname,_id})
	}

	@autobind
	_goBackPress(){
		console.log(1111111)
		this.props.goback()
	}	

  @autobind
  onBackPress(){

    const { nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    //dispatch(NavigationActions.back());
    this.props.goback()
    return true;
  };

	render(){
		const { params } = this.props.navigation.state
		const TouchableButton = Platform.OS==='ios'?TouchableOpacity:TouchableNativeFeedback
		return(
			<View style={styles.container}>
				<Header
				  leftComponent={<TouchableOpacity onPress={this.onBackPress}><Icon name='md-arrow-back' size={25}/></TouchableOpacity>}
				  centerComponent={<Title text={'资料详情'} style={styles.title}/>}
				  rightComponent={<View></View>}
				/>
				<View style={[styles.common,styles.avatarBox]}>
					<Image style={styles.avatar} source={{uri:params.v.avatarurl}}/>
					<Text style={styles.textLeft}>{params.v.nickname}</Text>
				</View>
				
				<View style={[styles.common,styles.shopnameBox]}>
					<Text>店铺</Text>
					<Text style={styles.textLeft}>{params.v.shopname}</Text>
				</View>
				
				<View style={[styles.common,styles.avatarBox]}>
					<Text>简介</Text>
					<Text style={styles.textLeft}>{params.v.brief}</Text>
				</View>
				<TouchableButton onPress={()=>this._chatWithThis(params.v)}>
							<View style={styles.btnBox}>
								<Text
								  style={styles.submitBtn}
								>发消息</Text>
							</View>
				</TouchableButton>
			</View>
		)
	}
}


const styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor: '#d2d6e3',
	},
	common:{
		paddingHorizontal: width*0.05,
		backgroundColor: "#ecf0ff",
		marginTop:20
	},
	title:{
		color:'#f8f9fd',
		fontSize: 20,
	},
	avatar:{
		marginTop: width*0.02,
		width:width*0.1,
		height:width*0.1
	},
	avatarBox:{
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height:width*0.2
	},
	textLeft:{
		marginHorizontal: width*0.1,

	},
	shopnameBox:{
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height:width*0.2

	},
	btnBox:{
  	marginTop:width*0.1,
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor:'#0AD2FB',
  	height:width*0.12,
  	borderRadius:width*0.01,
  	marginHorizontal: width*0.02,
  },
 submitBtn:{
 	fontSize:20,
 	color:"#f7fffa"
 },
 backicon:{
 	marginLeft: width*0.05,
 }
})

