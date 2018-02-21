import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TextInput,
	Button,
	TouchableOpacity,
	ToastAndroid, 
	Platform,
	BackHandler,
	ScrollView,
	TouchableNativeFeedback
}  from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { register,logout } from '../../redux/user.redux.js';
import { ToastUtils } from '../../utils/utils'
const { width,height } = Dimensions.get('window');

@connect(
	state=>state,
	{ register,logout }
	)
export default class Register extends React.PureComponent{

	static navigationOptions = {
    		header:null
  	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	userName:'',
	  	pwd:'',
	  	repeatpwd:'',
		type:true
	  };
	}

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
		if(key=="repeatpwd"){
			this.refs.RepeatPassWordTextInput.clear();
		}
		this.setState({
  			[key]:""
  		})
	}
	
	registerSubmit(){
		
		if(this.state.userName==''){
			ToastUtils(Platform.OS,'用户名不能为空',0.5)
			return
		}
		if(this.state.pwd==''){
			ToastUtils(Platform.OS,'密码不能为空',0.5)
			return
		}
		if(this.state.repeatpwd==''){
			ToastUtils(Platform.OS,'再次输入密码不能为空',0.5)
			return
		}
		if(this.state.pwd!=this.state.repeatpwd){
			ToastUtils(Platform.OS,'两次输入密码不一致',0.5)
			return
		}
		this.props.register(this.state);
		//console.log("users信息",this.props);
		
	}
	
	componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
   
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }
  
     
  }
	onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    this.props.logout()
    return true;
  };

	render(){
		const TouchableBtn=Platform.OS==='ios'?TouchableOpacity:TouchableNativeFeedback
		return(
			<ScrollView>
			<View style={styles.container}>
			    {
			    	Platform.OS==='ios'?
			    	(<TouchableOpacity onPress={this.onBackPress}>
			    		<View style={styles.back}>
			    		<View style={styles.backIcon}>
							<Icon name='chevron-left' size={22} color={"#b8baba"}/>
			    		</View>
			    		<View style={styles.backText}>
							<Text>返回</Text>
			    		</View>
					</View></TouchableOpacity>):null
			    	
			    }
				
				<View style={styles.inputContainer}>
						<LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.LoginLog}>
							<Text style={styles.logText}>注册</Text>
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
					<View style={styles.textInputBox}>
					<Icon style={styles.loginIcon} name="lock" size={25} color='#0087B0'/>
					    <TextInput
					    	ref="RepeatPassWordTextInput"
					        style={styles.textInput}
					        placeholder="请再次输入密码"
					        secureTextEntry={true} 
					        maxLength={6}
					        underlineColorAndroid={'transparent'}
					        onChangeText={(v) => this.handleChange("repeatpwd",v)}
					        value={this.state.repeatpwd}
					    />
					    {
					    	this.state.repeatpwd?
					    	<Icon onPress={()=>{this.clearText("repeatpwd")}} style={styles.loginRemoveIcon} name="times-circle-o" size={30} color='#9E9C9C'/>
					    	:null
						}
					</View>
					<View >
						<RadioGroup
						    onSelect = {(index, value) => this.handleChange("type", value)}
						    selectedIndex={0}
						    style={styles.checkBox}
						>
					        <RadioButton value={this.state.type} >
					          <Text>买家</Text>
					        </RadioButton>
					        <RadioButton value={!this.state.type}>
					          <Text>卖家</Text>
					        </RadioButton>
      					</RadioGroup>
					</View>
					<TouchableBtn onPress={()=>this.registerSubmit()}>
						<View style={styles.btnBox}>
							<Text
							  style={styles.submitBtn}
							>下一步</Text>
						</View>
					</TouchableBtn>
				</View>
			</View>
			</ScrollView>
			)
		}
	}
 

const styles=StyleSheet.create({
	container:{
  		flex:1
  	},
	LoginLog:{
		justifyContent: 'center',
		alignItems: 'center',
		//marginTop:10,
		height:height*0.2,
		width:height*0.2,
		alignSelf: 'center',
		borderRadius:height*0.1,
		//marginBottom:60
	},
	logText:{
		fontSize: 33,
		color:"#eeee",
		backgroundColor: "transparent",
	},
	checkBox:{
		flexDirection:'row',
		justifyContent: 'center',
		marginTop:20
	},
  inputContainer:{
  	flex:1,
  	justifyContent: 'center',
  	alignSelf: 'center',
  	//backgroundColor: 'red',
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
 back:{
 	marginTop:width*0.08,
 	marginLeft:width*0.03,
 	flexDirection:"row",
 	justifyContent: 'center',
 	width:width*0.15
 	//backgroundColor: "red",
 },
 backIcon:{
 	//backgroundColor: 'red',
 },
 backText:{
 	//backgroundColor: "red",
 	justifyContent: 'center',
 },
})

