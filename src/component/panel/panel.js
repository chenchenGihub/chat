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
	TextInput,
	Button,
	ScrollView,
	geolocation,
	PermissionsAndroid,
	TouchableWithoutFeedback
} from 'react-native';
import FontAwesome from  'react-native-vector-icons/FontAwesome';
import Entypo from  'react-native-vector-icons/Entypo';
import Ionicons from  'react-native-vector-icons/Ionicons';
import { ActionSheet } from 'antd-mobile';
const { width,height } = Dimensions.get('window');

const BUTTONS = ['从手机相册选择', '拍摄', '取消'];

const iconArr=["qq","wechat","chrome"];

export default class Panel extends React.Component{


constructor(props) {
	    super(props);
	    this.state = { 
	    	text: '',
	    	clicked:'',
	    	location:'',
	    	qq:false,
	    	wechat:false,
	    	chrome:false
	    	}
	     };
	 


// shouldComponentUpdate(nextProps, nextState) {
  
// }



componentWillMount() {
  this.getPosition();
}


/** 获取地理位置（经纬度） */
  getPosition = ()=> {
    navigator.geolocation.getCurrentPosition((position) => {
  let longitude = JSON.stringify(position.coords.longitude);//精度
  let latitude = JSON.stringify(position.coords.latitude);//纬度
  console.log(longitude,latitude);
  this.fetchData(longitude,latitude);
}, error => console.error(error),);
}

fetchData=(longitude,latitude)=>{
    fetch('https://restapi.amap.com/v3/geocode/regeo?key=3fcb5903d5a6427931775fe8214ce839&radius=1000&location='+longitude+','+latitude+'')
        .then((response)=>response.json())
        .then((responseBody)=>{
            console.log(responseBody);
            console.log(responseBody.regeocode.formatted_address);
            let city = responseBody.regeocode.addressComponent.province;
            let district = responseBody.regeocode.addressComponent.district;
            let township = responseBody.regeocode.addressComponent.township;

            if(responseBody.status ==1){
            	this.setState({
                   location: responseBody.regeocode.formatted_address
                })
                
            }else {
            	
            	this.setState({
            		location:"定位失败"
            	})
            }
        }).catch((error)=>{
        console.log(error);
    })
};


operatShare(ele,i){
	

	this.setState(preState=>{
		if(ele=='qq'){
			return {qq:!preState.qq}
		}else if(ele=='wechat'){
			return {wechat:!preState.wechat}
		}else{
			return {chrome:!preState.chrome}
		}
	})
	
}


	  
showActionSheet = () => {
    
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      //destructiveButtonIndex: BUTTONS.length - 2,
      // title: 'title',
     // message: 'I am description, description, description',
      maskClosable: true,
      'data-seed': 'logId',
      
    },
    (buttonIndex) => {
    	
      //this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  }

  

  

	render(){

		
		const locations=!this.state.location?"无法获取地址？":this.state.location;
		console.log(this.state);
		const shareList=iconArr.map((ele,index)=>{
  			return (<TouchableWithoutFeedback key={index} onPress={()=>{this.operatShare(ele,index)}}>
				<FontAwesome style={styles.shareicon} name={`${ele}`} size={20} color={this.state[ele]?"#e80f17":"#7b8187"} />
            </TouchableWithoutFeedback>)
  		})

		return (

			<View style={styles.container}>
		          <View style={[styles.ButtonBox]}>

		            <TouchableOpacity onPress={()=>this.props.operate('picOrtext')}>
		            <View style={styles.cancel}>
		            	<Text style={styles.cancelText}>取消</Text>
		            </View>
		              
		            </TouchableOpacity>
		            <TouchableOpacity onPress={()=>this.props.operate('picOrtext')}>
		            <View style={styles.cancel}>
		            	<Button
				          onPress={()=>this.onButtonPress}
				          title="发表"
				          accessibilityLabel="See an informative alert"
				          disabled={!this.state.text}
				          //color={"#eee"}
				        />
		            </View>
		              
		            </TouchableOpacity>
		          </View>
		          
			        <View style={styles.textInputBox}>
			        	<TextInput
				        style={{height: width*0.3, borderColor: 'transparent', borderWidth: 1,textAlignVertical: 'top'}}
				        onChangeText={(text) => this.setState({text})}
				        value={this.state.text}
				        maxLength = {400}
				        editable = {true}
				        placeholder={"分享新鲜事"}
				        multiline = {true}
				        numberOfLines = {4}
				        value={this.state.text}
				        underlineColorAndroid="transparent"
				        //autoFocus={true}
				        //caretHidden={true}
				      />
				      <TouchableOpacity onPress={this.showActionSheet} style={{width:width*0.3}}>
				      <View style={styles.cameraContainer}>
				      	<Entypo name={"camera"} size={40} color={"#777d82"}/>
				      	<Text style={styles.pictext}>相册/照相</Text>
				      </View>
				      </TouchableOpacity>
				      <View style={styles.locationBox}>
		        		<Entypo style={styles.locationIcon} name={"location-pin"} size={20} color={this.state.location?"#de001c":"#c8cdcc"}/>
		        		<Text style={styles.locationText}>{locations}</Text>
		        		<Ionicons style={styles.arrowIcon} name='ios-arrow-forward' size={15}/>
		        	</View>
			        </View>
		        	<View style={styles.shareBox}>
		        		<View style={styles.share}>		
		        			{shareList}
		        		</View>
		        	</View>

	         </View>

			)
	}
}
const styles = StyleSheet.create({
  
  container:{
  	flex:1,
  	paddingTop: width*0.06,
  },
  ButtonBox:{
  	paddingLeft: width*0.02,
  	flexDirection: 'row',
  	justifyContent: 'space-between',
  	borderBottomWidth: 0.5,
  	borderBottomColor: '#d6e0e3',
  	borderStyle: 'solid',
  },
  cancel:{
  	padding: 10,
  },
  cancelText:{
  	
  	fontSize: 16,
  },
  cameraContainer:{
  	height:width*0.3,
  	width:width*0.3,
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor: "#cdd8e1",

  },
  pictext:{
  	fontSize: 16,
  	color:"#a8b1b8",
  	marginTop:width*0.01
  },
  textInputBox:{
  	marginLeft: width*0.02,
  },
  locationBox:{
  	marginVertical:width*0.03,
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'center',
  	height:width*0.06,
  	borderWidth: 0.8,
  	borderColor: '#e6ecec',
  	borderStyle: 'solid',
  	borderRadius: 50,
  	paddingVertical: width*0.03,
  	alignSelf: 'flex-start'
  },
  locationIcon:{
  	marginHorizontal: width*0.01,
  },
  arrowIcon:{
  	marginTop:Platform.OS==="ios"? width*0.008:0,
  	marginLeft: width*0.02,
  	marginRight: width*0.03,
  },
  shareBox:{
  	flex:1,
  	backgroundColor: "#dde4eb",
  },
  share:{
  	height:width*0.1,
  	flexDirection: 'row',
  	alignItems: 'center'
  },
  locationText:{
  	fontSize:10
  },
  shareicon:{
  	marginLeft: width*0.04,
  	marginTop:width*0.02
  }
});


