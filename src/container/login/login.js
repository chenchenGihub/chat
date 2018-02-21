import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image, 
	Dimensions,
	TextInput,
	Button,
	TouchableOpacity,
	ToastAndroid,
	BackHandler,
	Platform,
	Keyboard,
	Alert,
	ScrollView ,
	TouchableNativeFeedback 
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { login,navToegister } from '../../redux/user.redux.js';
import { NavigationActions, withNavigation } from 'react-navigation';

import { ToastUtils } from '../../utils/utils'

const { width,height } = Dimensions.get('window');

@withNavigation
@connect(
	state=>state,
	{ login,navToegister }
	)
export default class Login extends React.PureComponent{
	static navigationOptions = {
    		title: 'Home',
    		header:null
  	}

  	constructor(props) {
  	  super(props);
  	  this.state = {
  	  	userName:'',
  	  	pwd:''
  	  };
  	}

/*
  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }
   
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }
  
     
  }
*/

 

  // onBackAndroid(){
    
  //   if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
  //     //最近2秒内按过back键，可以退出应用。
  //     return false;
  //   }
  //   this.lastBackPressed = Date.now();
  //  Platform.OS === 'android' ? ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT) : null/*后续兼容苹果设备*/;
  //   return true;
  // };

  	handleChange(key,v){
  		this.setState({
  			[key]:v
  		})
  	}
	clearText(key){
		if(key=="userName"){
			this.refs.UserTextInput.clear();
		}
		if(key=="pwd"){
			this.refs.PassWordTextInput.clear();
		}
		this.setState({
  			[key]:""
  		})
	}

	userlogin(){
		if(this.state.userName==''){
			//ToastAndroid.showWithGravityAndOffset('用户名不能为空',0.5,ToastAndroid.TOP,25,height)
			ToastUtils(Platform.OS,'用户名不能为空',0.5)
			return
		}
		if(this.state.pwd==''){
			//ToastAndroid.showWithGravityAndOffset('密码不能为空',0.5,ToastAndroid.TOP,25,height)
			ToastUtils(Platform.OS,'密码不能为空',0.5)
			return
		}
		Keyboard.dismiss();
		this.props.login(this.state)
	}

	register(){
		this.props.navToegister()
	}


	render(){
		const TouchableBtn=Platform.OS==='ios'?TouchableOpacity:TouchableNativeFeedback
		return(
			<ScrollView 
				keyboardShouldPersistTaps={'always'}
			>
				<View style={styles.container}>
					<View style={styles.inputContainer}>
							<LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.LoginLog}>
								<Text style={styles.logText}>登录</Text>
							</LinearGradient>
						<View style={styles.textInputBox}>
							<Icon  style={styles.loginIcon} name="user" size={25} color='#0087B0'/>
							<TextInput
							    ref="UserTextInput"
						        style={styles.textInput}
						        placeholder="请输入用户名"
						        underlineColorAndroid={'transparent'}
						        maxLength={10}
						        onChangeText={(v) => this.handleChange("userName",v)}
						        value={this.state.userName}
						    />
						    {
						    	this.state.userName?
						  		<Icon onPress={()=>{this.clearText("userName")}}  style={styles.loginRemoveIcon} name="times-circle-o" size={30} color='#9E9C9C'/>
						  		:null
						    }
						</View>
						<View style={styles.textInputBox}>
						<Icon style={styles.loginIcon} name="lock" size={25} color='#0087B0'/>
						    <TextInput
						    	ref="PassWordTextInput"
						        style={styles.textInput}
						        placeholder="请输入密码"
						        secureTextEntry={true} 
						        maxLength={6}
						        underlineColorAndroid={'transparent'}
						        onChangeText={(v) => this.handleChange("pwd",v)}
						        value={this.state.pwd}
						    />
						    {
						    	this.state.pwd?
						    	<Icon onPress={()=>{this.clearText("pwd")}} style={styles.loginRemoveIcon} name="times-circle-o" size={30} color='#9E9C9C'/>
						    	:null
							}
						</View>
						<TouchableBtn onPress={()=>this.userlogin()}>
							<View style={styles.btnBox}>
								<Text
								  style={styles.submitBtn}
								>登录</Text>
							</View>
						</TouchableBtn>
						<View style={styles.registerBox}>
							<View style={styles.noaccountBox}>
								<Text>没有账号？</Text>
							</View>
							<TouchableBtn onPress={()=>this.register()}>
								<View style={styles.registerBtn}>
									<Text style={styles.registerText}>点击注册</Text>
								</View>
							</TouchableBtn>
						</View>	
					</View>
				</View>
			</ScrollView>
			)
	}
}

const styles = StyleSheet.create({
  container:{
  	flex:1
  },
	LoginLog:{
		justifyContent: 'center',
		alignItems: 'center',
		marginTop:40,
		height:height*0.2,
		width:height*0.2,
		alignSelf: 'center',
		borderRadius:height*0.1,
		marginBottom:60
	},
	logText:{
		fontSize: 33,
		color:"#eeee",
		backgroundColor: "transparent",
	},
  inputContainer:{
  	flex:1,
  	justifyContent: 'center',
  	alignSelf: 'center'
  },
  textInput:{
  	marginLeft:10,
  	padding:4,
  	width:width*0.5
  },
  textInputBox:{
  	marginTop:20,
  	flexDirection:"row",
  	backgroundColor:"rgba(0,0,0,0.1)",
  	padding:10,
  	borderRadius:50,
  	width:width*0.8
  },
  loginIcon:{
  	marginLeft:4,
  	marginTop:6
  },
  loginRemoveIcon:{
  	marginLeft:20
  },
  btnBox:{
  	marginTop:20,
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor:'#0AD2FB',
  	height:width*0.12,
  	borderRadius:width*0.1
  },
 submitBtn:{
 	fontSize:20
 },
 noaccountBox:{
 	marginTop:width*.01
 },
 registerBox:{
 	flexDirection:'row',
 	justifyContent:'center',
 	marginTop:width*.1
 },
 registerBtn:{
 	backgroundColor:"#D0A812",
 	borderRadius:4,
 	justifyContent:'center',
 	alignItems: 'center',
 	width:width*0.2,
 	height:width*0.07
 },
 registerText:{
 	fontSize:10
 },
});
