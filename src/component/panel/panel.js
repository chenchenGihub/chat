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
	TextInput,
	Button,
	ScrollView,
	geolocation,
	PermissionsAndroid,
	TouchableWithoutFeedback,
  Image,
  Modal
} from 'react-native';
import sha1 from 'sha1';
import FontAwesome from  'react-native-vector-icons/FontAwesome';
import Entypo from  'react-native-vector-icons/Entypo';
import Ionicons from  'react-native-vector-icons/Ionicons';
import EvilIcons from  'react-native-vector-icons/EvilIcons';
import { ActionSheet } from 'antd-mobile';
import ImagePicker from 'react-native-image-picker';

import ImageGallary from './imageGallary';

const { width,height } = Dimensions.get('window');

const BUTTONS = ['从手机相册选择', '拍摄', '取消'];

const iconArr=["qq","wechat","chrome"];


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

const CLOUDINARY = {
  cloud_name: 'dqfktbdqw',  
  api_key: '982239126941818',  
  api_secret: 'HZHGi5k2hTRpr40Bex9E6NMJKVU', 
  image:'https://api.cloudinary.com/v1_1/dqfktbdqw/image/upload',
  video:'https://api.cloudinary.com/v1_1/dqfktbdqw/video/upload',
  audio:'https://api.cloudinary.com/v1_1/dqfktbdqw/audio/upload',
}

export default class Panel extends React.Component{


constructor(props) {
	    super(props);
	    this.state = { 
	    	text: '',
	    	clicked:'',
	    	location:'',
	    	qq:false,
	    	wechat:false,
	    	chrome:false,
        visibleModal: false,
        current:[],
        previewVisable:false,
        uri:''
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
    	console.log(buttonIndex)
      switch(buttonIndex){
        case 0:
          this.setState({visibleModal:true})
          return 
        case 1:
        ImagePicker.launchCamera(options, (response)  => {
          console.log(response)
          let source = 'data:image/jpeg;base64,' + response.data;
          this.onButtonPress(source);
        });
          return  
      }
    });
  }


publishPic(arr){

if(!arr) arr=[];
 const current = arr.map(v=>v.uri)

 console.log(current)

  this.setState({
    visibleModal:false,
    current:[...this.state.current,...current]
  })

}

deletePic=(i)=>{
  console.log(i)
  this.setState(preState=>{
    preState.current.splice(i,1)

    return { current : preState.current } 
  })
}

previewPic=(v)=>{
  this.setState({
    previewVisable:!this.state.previewVisable,
    uri:v
  })
}

onButtonPress=(files)=>{


         /**
           * 上传图片到服务器
           */
            
        console.log("arr",files[0])

        let timestamp = Date.now();
        let tags = 'app,avatar';
        let folder = 'avatar';

        let signature=`folder=${folder}&tags=${tags}&timestamp=${timestamp+CLOUDINARY.api_secret}`;
        signature=sha1(signature);

        let file=files[0];

        const body = new FormData();
        body.append('file', {uri: file, type: 'image/png', name: 'testImage.png'});
        body.append('folder',folder);
        body.append('signature',signature);
        body.append('tags',tags);
        body.append('timestamp',timestamp);
        body.append('api_key',CLOUDINARY.api_key);
        body.append('resource_type','image');
        //body.append('file',file[0]); 

        this._upload(body);
        //this.fetch(body);
}

fetch=(body)=>{
    console.log(body);
}


_upload=(body)=>{
  const xhr = new XMLHttpRequest();

        let url = CLOUDINARY.image;

        xhr.open("POST",url);

        xhr.onload = () => {
          if (xhr.status === 200) {
            
            let response=JSON.parse(xhr.responseText);
            console.log("response",response)
            
           // response.secure_url && Toast.success('头像上传成功!!!', 1);


          } else {
            console.warn('error');
          }
        }
        xhr.upload.onprogress=(event)=>{
          //console.log(event)
        }
      xhr.send(body);
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
		          <View style={styles.ButtonBox}>
		            <TouchableOpacity onPress={()=>this.props.operate('picOrtext')}>
  		            <View style={styles.cancel}>
  		            	<Text style={styles.cancelText}>取消</Text>
  		            </View>
		            </TouchableOpacity>
		            
  		            <View style={styles.cancel}>
  		            	<Button
  				          onPress={()=>this.onButtonPress(this.state.current)}
  				          title="发表"
  				          accessibilityLabel="See an informative alert"
  				          disabled={!this.state.text&&this.state.current.length==0}
  				          //color={"#eee"}
  				          />
  		            </View>
		          
		          </View>
		         <ScrollView>
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
                  <View style={styles.pictureBox}>
                    
                    {
                      this.state.current.map((v,i)=>(

                        <View key={i} style={styles.imageContainer}>
                        <TouchableWithoutFeedback onPress={()=>this.previewPic(v,i)}><Image 
                            style={styles.image}
                            source={{uri:v}}
                          />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>this.deletePic(i)}>
                          <EvilIcons style={styles.deletePic} name="close" size={20} color="#f3f3ff" />
                        </TouchableWithoutFeedback>
                        </View>))
                    }
                        
                    {
                      this.state.current.length>=3?null:
        				      (<TouchableOpacity onPress={this.showActionSheet} style={{width:width*0.3}}>
          				      <View style={styles.cameraContainer}>
          				      	<Entypo name={"camera"} size={40} color={"#777d82"}/>
          				      	<Text style={styles.pictext}>相册/照相</Text>
          				      </View>
        				      </TouchableOpacity>)
                    }
                  </View>
    				      <View style={styles.locationBox}>
    		        		<Entypo style={styles.locationIcon} name={"location-pin"} size={20} color={this.state.location?"#de001c":"#c8cdcc"}/>
    		        		<Text style={styles.locationText}>{locations}</Text>
    		        		<Ionicons style={styles.arrowIcon} name='ios-arrow-forward' size={15}/>
    		        	</View>
			         </View>
              </ScrollView> 
		        	<View style={styles.shareBox}>
		        		<View style={styles.share}>		
		        			{shareList}
		        		</View>
		        	</View>
              <ImageGallary  
              visibleModal={this.state.visibleModal} 
              closePic={this.publishPic.bind(this)}
              />
              <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.previewVisable}
                onRequestClose={() => {
                  this.previewPic(!this.state.previewVisable);
                }}>
                <TouchableWithoutFeedback
                      onPress={() => {
                        this.previewPic(v="");
                      }}>
                <View style={{flex:1}}>
                  

                    
                 <Image
                        style={{width:width,height:height}}
                        source={{uri:this.state.uri}}
                      
                      />
                    
                  
                </View>
                </TouchableWithoutFeedback>
              </Modal>

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
    marginTop: width*0.02,
  },
  cameraContainer:{
  	height:width*0.3,
  	width:width*0.3,
  	justifyContent: 'center',
  	alignItems: 'center',
  	backgroundColor: "#cdd8e1",

  },imageContainer:{
    height:width*0.3,
    width:width*0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width*0.02,
    marginBottom: width*0.02,
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
  },
  pictureBox:{
    flex:1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  image:{
    height:width*0.3,
    width:width*0.3,
  },
  deletePic:{
    position: 'absolute',
    top:width*0.01,
    right:width*0.01,
  }
});


