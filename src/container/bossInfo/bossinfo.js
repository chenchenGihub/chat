import React from 'react';
import { 
	View, 
	Text,
	StyleSheet,
	Platform,
	BackHandler,
	Alert,
	TouchableNativeFeedback,
	ToastAndroid,
	Image,
	ImageBackground,
	Dimensions,
	TouchableOpacity,
	DatePickerAndroid,
	ScrollView,
	DatePickerIOS,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import sha1 from 'sha1';
import * as Progress from 'react-native-progress';
import { Toast,List,Modal as AModal,TextareaItem } from 'antd-mobile';
import Modal from "react-native-modal";

import { saveUserInfo } from '../../redux/user.redux.js';
import LeftHeader from '../../component/header.js';
import { isValidInputCheck,ToastUtils } from '../../utils/utils.js';

const { width, height } = Dimensions.get('window');

const options = {
	  title: '选择头像',
	  cancelButtonTitle:'取消',
	  takePhotoButtonTitle:'拍照',
	  chooseFromLibraryButtonTitle:'相册选取',
	  quality:0.7,
	  allowsEditing:true,
	  maxWidth:600,
	  maxHeight:600,
	  storageOptions: {
	    skipBackup: false,
	    path: 'images',
	    cameraRoll:true,
	  },
	  permissionDenied:{
	  	title:"访问相册",
	  	text:"允许chat访问相册？",
	  	reTryTitle:"重新尝试",
	  	okTitle:"确定"
	  }
	};

 // Cloudinary settings for Django. Add to your settings file.
const CLOUDINARY = {
  cloud_name: 'dqfktbdqw',  
  api_key: '982239126941818',  
  api_secret: 'HZHGi5k2hTRpr40Bex9E6NMJKVU', 
  image:'https://api.cloudinary.com/v1_1/dqfktbdqw/image/upload'
}

const Item = List.Item;
const Brief = Item.Brief;
const prompt = AModal.prompt;

@connect(
	state=>state,
	{saveUserInfo}
	)
export default class WorkerInfo extends React.PureComponent{

	static navigationOptions = {
    		header:null
  	}

  	constructor(props) {
  	  super(props);
  	
  	  this.state = {
  	  	avatar:'',
  	  	isuploading:false,
  	  	progress:0,
  	  	userUpdateInfo:{
  	  		avatarurl:'',
  	  		nickname:'',
  	  		birth:'',
  	  		brief:'',
  	  		shopname:''
  	  	},
  	  	visibleModal:false,
  	  	chosenDate:new Date()
  	  };
  	}

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress',()=>true);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress',()=>true);
    }
  }


	// componentDidUpdate(){
	// 	console.log(this.props);
	// 	this.props.navigateTo&&this.props.navigation.navigate(this.props.navigateTo);
	// }



	pickerImg(){
		ImagePicker.showImagePicker(options, (response) => {

			  if (response.didCancel||response.error) {

			  	return

			  }else{
			    //let source = { uri: response.uri };
			    console.log("response",response,"storage",storage.cache.user.rawData)
			    // You can also display the image using data:
			     let source = 'data:image/jpeg;base64,' + response.data;
			    this.setState({
			      avatar:source
			    });

			   

			    /**
			     * 上传图片到服务器
			     */
			    	

			  let timestamp = Date.now();
			  let tags = 'app,avatar';
			  let folder = 'avatar';

			  let signature=`folder=${folder}&tags=${tags}&timestamp=${timestamp+CLOUDINARY.api_secret}`;
			  signature=sha1(signature);

			  const body = new FormData();

			  body.append('folder',folder);
			  body.append('signature',signature);
			  body.append('tags',tags);
			  body.append('timestamp',timestamp);
			  body.append('api_key',CLOUDINARY.api_key);
			  body.append('resource_type','image');
			  body.append('file',source);

			  this._upload(body,source);

			  
			}
		});
	}


	_upload(body,source){
		//console.log(body,CLOUDINARY.image)
		    this.setState({
		    	isuploading:true,
		    	progress:0
		    })
			const xhr = new XMLHttpRequest();

			  let url = CLOUDINARY.image;

				xhr.open("POST",url);

				xhr.onload = () => {
					if (xhr.status === 200) {
				    
				    let response=JSON.parse(xhr.responseText);

				    this.setState({
				    	isuploading:false,
				    	progress:0,
				    	userUpdateInfo:{
				    		...this.state.userUpdateInfo,
				    		avatarurl:response.secure_url
				    	}
				    })

				    storage.save({
				   	key:'avatarData',
				   	data:{
				   		avatarData:source,
				   		avatarurl:response.secure_url
				   	},
				   	expires: null
			   })
				    //console.log('success',response);

				    response.secure_url && Toast.success('头像上传成功!!!', 1);


				  } else {
				    console.warn('error');
				  }
				}
				xhr.upload.onprogress=(event)=>{
					if(event.lengthComputable){
						this.setState({
							progress:Math.round(event.loaded/event.total*100)
						})
					}
				}
			  	xhr.send(body);
	}

	userUpdateInfo(userUpdateInfo,key){
		//console.log(`userUpdateInfo:${userUpdateInfo}`)
		
		switch (key) {
			case "nickname":
				return prompt('昵称', `请输入你的昵称`,
			      [
			        {
			          text: '保存',
			          onPress: value => {
			          	this._updateNickName(userUpdateInfo,key="nickname",value)
			          }        
			              
			        },
			        {
			          text: '取消',
			          onPress: value => null
			        },
			      ], 'default', this.state.userUpdateInfo.nickname, ['输入你的昵称'])
			case "brief":
				return prompt('简介', `请输入你的简介`,
			      [
			        {
			          text: '保存',
			          onPress: value => {
			          	this._updateNickName(userUpdateInfo,key="brief",value)
			          }        			              
			        },
			        {
			          text: '取消',
			          onPress: value => null
			        },
			      ], 'default', this.state.userUpdateInfo.brief, ['输入你的简介'])
			case "shopname":
				 return prompt('店铺', `请输入你的店铺`,
			      [
			        {
			          text: '保存',
			          onPress: value => {
			          	this._updateNickName(userUpdateInfo,key="shopname",value)
			          }        
			              
			        },
			        {
			          text: '取消',
			          onPress: value => null
			        },
			      ], 'default', this.state.userUpdateInfo.shopname, ['输入你的店铺'])	
			default:
				return null
		}
	
	}

	_updateNickName(userUpdateInfo,key,value){
              	key=="nickname"?
              this.setState({
              	userUpdateInfo:{...this.state.userUpdateInfo,nickname:value}
              }):this.setState({
              	userUpdateInfo:{...this.state.userUpdateInfo,shopname:value}
              })
         	 
	}

	async opendate(userUpdateInfo){

				 try {

				 	let chosenDate = this.state.userUpdateInfo.birth&&this.state.userUpdateInfo.birth.split('.')
					  const {action, year, month, day} = await DatePickerAndroid.open({
					    // 要设置默认值为今天的话，使用`new Date()`即可。
					    // 下面显示的会是2020年5月25日。月份是从0开始算的。
					    
					    date: new Date(chosenDate[0],chosenDate[1],chosenDate[2]),
					    mode:'spinner'
					  });
					  if (action !== DatePickerAndroid.dismissedAction) {
					    // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
					    //console.log(`year:${month}`)
					   // userUpdateInfo.birth = this._formatdate({year, month, day});

					    this.setState({
					    	userUpdateInfo:{...this.state.userUpdateInfo,birth:this._formatdate({year, month, day})}
					    })
					  }


					} catch ({code, message}) {
					  console.warn('Cannot open date picker', message);
					}



	}

	openiosdate(){
		this.setState({
			visibleModal:!this.state.visibleModal
		})
	}

	setDate(v){
		//const date=this._formatdate({v.getFullYear(),v.getMonth(),v.getDate()})
		
		console.log("DatePickerIOS",v.getFullYear(),v.getMonth(),v.getDate());
		this.setState({
			chosenDate:v,
			userUpdateInfo:{...this.state.userUpdateInfo,birth:this._formatdate({year:v.getFullYear(),month:v.getMonth(),day:v.getDate()})}
		})
	}

	_formatdate({year, month, day}){
		return `${year}.${month+1}.${day}`
	}

	userbrief(v){
		//console.log(v);
		this.setState({
			userUpdateInfo:{...this.state.userUpdateInfo,brief:v}
		})	
	}
	usersubmit(){
		console.log(this.state.userUpdateInfo.avatarurl)
		if(!isValidInputCheck(this.state.userUpdateInfo.avatarurl)){
			ToastUtils(Platform.OS,'头像不能为空',0.5);
			return

		}
		if(!isValidInputCheck(this.state.userUpdateInfo.nickname)){
			ToastUtils(Platform.OS,'昵称不能为空',0.5);
			return

		}
		if(!isValidInputCheck(this.state.userUpdateInfo.shopname)){
			ToastUtils(Platform.OS,'昵称不能为空',0.5);
			return

		}
		if(!isValidInputCheck(this.state.userUpdateInfo.birth)){
			ToastUtils(Platform.OS,'生日不能为空',0.5);
			return

		}
	     if(!isValidInputCheck(this.state.userUpdateInfo.brief)){
			ToastUtils(Platform.OS,'简介不能为空',0.5);
			return

		}


				this.props.saveUserInfo(this.state.userUpdateInfo,this.props.users._id);

	}

	componentDidMount() {
		storage.load({
			key:'avatarData'
		}).then(avatar=>{
			//console.log("avatarData",avatar.avatarurl)
			avatardata=avatar;
			let userUpdateInfo = this.state.userUpdateInfo;
			userUpdateInfo.avatarurl=avatar.avatarurl;
			this.setState({
				avatar:avatar.avatarData,
				userUpdateInfo:userUpdateInfo
			})
		}).catch(err=>{

		})
	}

	render(){
		//console.log('type',this.props.users.type)
		const { type } = this.props.users;
		const { userUpdateInfo }= this.state;
		//console.log(`userUpdateInfo:${userUpdateInfo.nickname}`)
		let icon=this.state.avatar&&{uri:this.state.avatar} ||  require('../../assets/img/avatar.jpg');
			//console.log("this.state",this.state);
			
		return(
				<View style={styles.container}>
				
					<Header
					  statusBarProps={{ barStyle: 'light-content' }}
					  leftComponent={<LeftHeader {...this.props}/>}
					  centerComponent={{ text: `${!type&&'卖家'}完善信息`, style: { color: '#fff' } }}
					  rightComponent={{ icon: 'navigate-next', color: '#fff' }}
					/>
					<ScrollView>
					<View style={styles.avatarBox}>
						<TouchableOpacity onPress={()=>this.pickerImg()}>
							<Image
							 source={icon}
							 style={styles.avatar}	
							/>
						</TouchableOpacity>
						{
							this.state.isuploading?
							<View style={styles.avatarProgress}>
								<Progress.Circle 
									size={width*0.3} 
									//indeterminate={true}
									showsText={true}
									progress={this.state.progress}
								/>
							</View>:null
						}
						
					</View>
					<View style={styles.editorInfoBox}> 
						<List renderHeader={() => null} >
					        <Item  extra={this.state.userUpdateInfo.shopname} arrow="horizontal" onClick={() => this.userUpdateInfo(userUpdateInfo,key="shopname")}>店铺</Item>
					        <Item  extra={this.state.userUpdateInfo.nickname} arrow="horizontal" onClick={() => this.userUpdateInfo(userUpdateInfo,key="nickname")}>昵称</Item>
					        <Item  extra={this.state.userUpdateInfo.birth} arrow="horizontal" onClick={() => Platform.OS==='android' ? this.opendate(userUpdateInfo) : this.openiosdate()}>生日</Item>
					        <Modal
					          isVisible={this.state.visibleModal}
					          onBackdropPress={()=>this.setState({visibleModal:false})}
					          style={styles.bottomModal}
					        >
					          <View style={styles.modalContent}>
							      <DatePickerIOS
								    date={this.state.chosenDate}
								    onDateChange={(v)=>this.setDate(v)}
								    mode='date'
								  />
							    </View>
					        </Modal>
					        <List renderHeader={() => '简介'}>
					        	<TextareaItem
						            placeholder="请填写你简介"
						            clear={true}
						            rows={5}
						            count={1000}
						            extra={"123"}
						            onExtraClick={()=>null}
						            error={false}
						            onErrorClick={this.onErrorClick}
						            onChange={(v)=>this.userbrief(v)}
						            onBlur={()=>this.onblur}
						            onFocus={()=>this.onfocus}
						            value={this.state.userUpdateInfo.brief}
						        ></TextareaItem>
					        </List>
					     </List>
					</View>	
					{
						Platform.OS==='android'?
						(<TouchableNativeFeedback onPress={()=>this.usersubmit(this.state.userUpdateInfo)}>
							<View style={styles.btnBox}>
								<Text
								  style={styles.submitBtn}
								>保存</Text>
							</View>
						</TouchableNativeFeedback>)
						:(<TouchableOpacity onPress={()=>this.usersubmit(this.state.userUpdateInfo)}>
							<View style={styles.btnBox}>
								<Text
								  style={styles.submitBtn}
								>保存</Text>
							</View>
						</TouchableOpacity>)

					}
					</ScrollView>
				</View>
			)
	}
}


const styles=StyleSheet.create({
	container:{
		flex:1,
		//backgroundColor: "#ffd826",
	},
	avatarBox:{
		flexDirection: 'row',
		//justifyContent: 'center',
		alignSelf: 'center',
		//backgroundColor: "#f888ab",
	},
	avatar:{
		width:width*0.3,
		height:width*0.3,
		borderRadius:width*0.15,
		justifyContent: 'center',
		marginTop: width*0.02,
	},
	avatarProgress:{
		position:'absolute',
		bottom:0
	},
	editorInfoBox:{
		marginTop:20
	},
	btnBox:{
  	marginTop:width*0.1,
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor:'#0AD2FB',
  	height:width*0.12,
  	borderRadius:width*0.1,
  	marginHorizontal: width*0.02,
  },
 submitBtn:{
 	fontSize:20,
 	color:"#f7fffa"
 },
bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  modalContent: {
    backgroundColor: "white",
    //padding: 22,
    //justifyContent: "center",
    //alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
})



