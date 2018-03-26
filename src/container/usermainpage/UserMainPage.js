import React from 'react';
import { 
	View, 
	Text,
	StyleSheet,
	Dimensions ,
	Platform,
	BackHandler,
	TextInput,
	DeviceEventEmitter,
	unmountComponentAtNode
} from "react-native";
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';


import  { goback,fetchComments,sendComment } from '../../redux/user.redux.js';
import  { Header } from './Header.js';
import  { Footer } from './Footer.js';
import  { SendComment } from './SendComment.js';
import  { TitleBox } from './TitleBox.js';
import  ContentBox from './ContentBox.js';
import  VideoBox from './VideoBox.js';


const { width,height } = Dimensions.get("window");

@connect(
	state=>state,
	{ goback,fetchComments,sendComment }
	)
export default class UserMainPage extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	text:''
	  };
	  this._handleClick=this._handleClick.bind(this);
	  this._fav=this._fav.bind(this);
	  this._repost=this._repost.bind(this);
	  this._vote=this._vote.bind(this);
	  this.onBackPress=this.onBackPress.bind(this);
	  this._sendcomment=this._sendcomment.bind(this);
	  this._sendMessage=this._sendMessage.bind(this);
	  this._onChangeText=this._onChangeText.bind(this);
	}


	_handleClick(){
		console.log(113)
	}_fav(){
		console.log(113)
	}_repost(){
		console.log(113)
	}_vote(){
		console.log(113)
	}
	_sendcomment(v){
		this.refs.modal.open();
	}
	_sendMessage(){
		
		this.props.sendComment({text:this.state.text,dataId:this.props.navigation.state.params.v._id,commentId:this.props.users._id});
		this.setState({
			text:''
		},()=>{
			this.refs.modal.close();
		})
	}
	_onChangeText(text){
		this.setState({
			text:text
		})
	}

	componentDidMount() {

		this.props.fetchComments(this.props.navigation.state.params.v._id)

    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

  }
  componentWillUnmount() {
  	
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    
   	
  }

  onBackPress(){

    const { nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
   	
    this.props.goback()

    return true;
  };
  _contentref=(ref)=>{this._contentBox=ref;}

	render(){
		const { v } = this.props.navigation.state.params;
		console.log(this.props,v)


		

		return(<View style={styles.container}>
			<Header 
				HeaderStyle={styles.HeaderStyle}
				NameAndfansStyle={styles.NameAndfansStyle}
				imageBox={styles.imageBox}
				nickname={v.author.nickname}
				fans={v.author.fans}
				thumbnail={v.author.avatarurl}
				subscribed={true}
				btnStyle={styles.btnStyle}
				handleClick={this._handleClick}
				imageBoxStyle={styles.imageBoxStyle}
				back={styles.back}
				nameStyle={styles.nameStyle}
				fansStyle={styles.fansStyle}
				handleBack={()=>this.props.goback()}
			/>
			<TitleBox
				title={v.title}
				TitleStyle={styles.title}
				TextStyle={styles.titletext}
			/>
			<VideoBox
			 source={{uri: v.body}} 
			 poster={v.thumbnail}
			 rate={1.0}                              // 0 is paused, 1 is normal.
             volume={1.0}                            // 0 is muted, 1 is normal.
             muted={false}                           // Mutes the audio entirely.
             paused={false}                          // Pauses playback entirely.
             repeat={true}                           // Repeat forever.
             playInBackground={false}                // Audio continues to play when app entering background.
             playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
             ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
             progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
             onLoadStart={this.loadStart}            // Callback when video starts to load
             onLoad={this.setDuration}               // Callback when video loads
             onProgress={this.setTime}               // Callback every ~250ms with currentTime
             onEnd={this.onEnd}                      // Callback when playback finishes
             onError={this.videoError}               // Callback when video cannot be loaded
             onBuffer={this.onBuffer}                // Callback when remote video is buffering
             onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
             style={styles.stacked} 
             videoStyle={styles.videoStyle} 
			/>
		 

			<Modal ref={"modal"} style={styles.modal} position={"bottom"}>
	          <SendComment
	          	TextInputStyle={styles.TextInput}
	          	TextInputBoxStyle={styles.TextInputBox}
	          	sendMessage={this._sendMessage}
	          	onChangeText={this._onChangeText}
	          	text={this.state.text}
	          />
        	</Modal>
			<Footer 
				fav={this._fav}
				repost={this._repost}
				vote={this._vote}
				sendcomment={this._sendcomment}
				FooterStyle={styles.FooterStyle}
				icocnStyle={styles.icocnStyle}
				textStyle={styles.textStyle}
				
			/>
			
		</View>)
		
	}
}


UserMainPage.navigationOptions={
  header:null
}



const styles=StyleSheet.create({
	container:{
		flex:1,
	},
	HeaderStyle:{
		marginTop: Platform.OS==='ios'?20:0,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#777873',
		borderStyle: 'solid',
		width:width,
		height:width*0.12,
		

	},
	NameAndfansStyle:{
		flexDirection: 'column',
		alignItems: 'flex-start',
		
	},
	nameStyle:{
		fontSize: 18,
		fontWeight: 'bold',
		color:"#000000"
	},
	fansStyle:{
		fontSize: 14,
	},
	back:{
		marginHorizontal: width*0.03,
	},
	btnStyle:{
		justifyContent: 'center',
		alignItems: 'center',
		width:width*0.2,
		height:width*0.1,
		borderWidth: 0,
		borderColor: '#f6000b',
		borderStyle: 'solid',
		borderRadius: width*0.008,
		marginLeft: width*0.28,
		marginRight: width*0.04,
	},
	imageBoxStyle:{
		width:width*0.1,
		height:width*0.1,
		borderRadius: width*0.08,
		marginHorizontal: width*0.01,
		
	},imageBox:{
		width:width*0.1,
		height:width*0.1,
		borderRadius: width*0.08,
		marginRight: width*0.02,
	},
	FooterStyle:{
		width:width,
		height:width*0.12,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: '#8d9b8f',
		borderStyle: 'solid',
		position: 'absolute',
		bottom:0,
		backgroundColor: '#fff',
	},
	icocnStyle:{
		flexDirection: 'row',
		width:width*0.18,
		justifyContent: 'space-around',
		alignItems: 'center',

	},
	textStyle:{
		fontSize: 18,
		color:"#1a1c1a"
	},
	modal:{
		height:width*0.3
	},
	TextInput:{
		height: width*0.1, 
		width: width*0.8, 
		backgroundColor: '#DDDDDD',
		borderRadius: width*0.5,
		paddingLeft: width*0.04,
		//marginTop: width*0.04,
		marginLeft: width*0.03,
		padding:0
	},
	TextInputBox:{
		flexDirection: 'row',
		alignItems: 'center',
		height:width*.15,
		justifyContent: 'space-around',
		backgroundColor: "red",
	},
  stacked: {
    alignItems: 'center',
    backgroundColor: 'white',
    width:width,
    height:width*0.5,
    flex:1
  },
  videoStyle: {
    alignItems: 'center',
    backgroundColor: 'white',
    width:width,
    height:width*0.5,
  },
  Video: {
    flex:1,
    width:width,
    height:width*0.5
  },
  titletext:{
  	fontSize: width*0.05,
  	fontWeight: 'bold',
  	fontStyle: 'italic',
  	color:"#2c2e30"
  },
  title:{
  	height:undefined,
  	width:width,
  	padding:width*0.02,
  	alignItems: 'center',
  }
})



