import React from 'react';
import {
	View, 
	Text, 
	StyleSheet,
	Dimensions,
	Platform,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import sha1 from 'sha1';
import * as Progress from 'react-native-progress';

import ToastUtils from '../../../utils/utils';
import VideoPLayer from '../videoGallary/videopLayer';



const { width,height } = Dimensions.get('window');


const CLOUDINARY = {
  cloud_name: 'dqfktbdqw',  
  api_key: '982239126941818',  
  api_secret: 'HZHGi5k2hTRpr40Bex9E6NMJKVU', 
  image:'https://api.cloudinary.com/v1_1/dqfktbdqw/image/upload',
  video:'https://api.cloudinary.com/v1_1/dqfktbdqw/video/upload',
  audio:'https://api.cloudinary.com/v1_1/dqfktbdqw/audio/upload',
}


export default class EditerVideo extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      text:'',
      checked:false,
      uploading:false
    };

  }
	
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleCheck=()=>{
    this.setState({
      checked:!this.state.checked
    })
  }

  publishVideo=()=>{


        if(this.state.uploading){
          ToastUtils(Platform.OS,"请勿重复提交")
        }

        this.setState({
          uploading:true
        })

         /**
           * 上传图片到服务器
           */
            
        console.log("arr",this.props.videoUri.path)

        let timestamp = Date.now();
        let tags = 'app,video';
        let folder = 'video';

        let signature=`folder=${folder}&tags=${tags}&timestamp=${timestamp+CLOUDINARY.api_secret}`;
        signature=sha1(signature);


        const body = new FormData();
        body.append('file', {uri: this.props.videoUri.path, type: 'video/mp4', name: 'testvideo.mp4'});
        body.append('folder',folder);
        body.append('signature',signature);
        body.append('tags',tags);
        body.append('timestamp',timestamp);
        body.append('api_key',CLOUDINARY.api_key);
        body.append('resource_type','video');
        //body.append('file',file[0]); 

        this._upload(body);
  }


  _upload=(body)=>{
  const xhr = new XMLHttpRequest();

        let url = CLOUDINARY.video;

        xhr.open("POST",url);

        xhr.onload = () => {
          if (xhr.status === 200) {
            this.setState({
              uploading:true
            })
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

  render() {
    console.log(this.props)

    const KeyboardView=Platform.OS==='ios'?KeyboardAwareScrollView:KeyboardAvoidingView;
    const TouchableButton=Platform.OS==="ios" ? TouchableOpacity:TouchableNativeFeedback
    return (
      
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
                  this.props.toggle(false);
                }}>
          <KeyboardAwareScrollView
              style={styles.container}
          >
            <View style={styles.headerBox}>
              <TouchableOpacity
                style={styles.backIcon}
                onPress={() => {
                  this.props.toggle(false);
                }}>
                <Ionicons 
                  name="ios-arrow-back"
                  size={30}
                  color="#fff"
                  
                />
              </TouchableOpacity>
              <Text style={styles.publishText}>发布</Text>
            </View>
            
             
        <ScrollView style={{flex:1}}>
            <View style={styles.videoBox}>
              <VideoPLayer 
               {...this.props}
              />
            </View>
            
            <View style={styles.textInputBox}>
              <TextInput
                    style={{height: width*0.3, borderColor: 'transparent', borderWidth: 1,textAlignVertical: 'top'}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    maxLength = {400}
                    editable = {true}
                    placeholder={"说点什么～"}
                    multiline = {true}
                    numberOfLines = {4}
                    value={this.state.text}
                    underlineColorAndroid="transparent"
                    //autoFocus={true}
                    //caretHidden={true}
                  />
            </View>
          </ScrollView>
          <TouchableButton onPress={()=>{this.props.publishVideo(this.state)}}>
            <View style={styles.button}>
                <Text style={styles.btnText}>发布</Text>
            </View>
          </TouchableButton>
          </KeyboardAwareScrollView> 
          <TouchableWithoutFeedback onPress={this.handleCheck}>
            <View style={styles.savePhotosBox}>
              <View style={[styles.checkBox,{backgroundColor: this.state.checked?"#5c0006":"#fff",}]}>
                {this.state.checked?<View style={styles.checked}/>:null}
              </View>
              <Text style={styles.text}>同时保存到相册</Text>
            </View>
          </TouchableWithoutFeedback>
           
        </Modal>
      
    );
  }
}

const styles = StyleSheet.create({
  
  container:{
  	flex:1
  },
  headerBox:{
    height:width*0.14,
    width:width,
    backgroundColor: "#383939",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#515252',
    borderStyle: 'solid',
  },
  publishText:{
    fontSize: width*0.06,
    color:"#fff",
    alignSelf: 'center'
  },
  backIcon:{
    position: 'absolute',
    top:width*0.03,
    left:width*0.02
  },
  videoBox:{
    height:height*0.5,
    width:width,
    //backgroundColor: "blue",
  },
  textInputBox:{
    height:width*0.3,
    width:width,
    backgroundColor:'rgba(0,0 ,0,0.1 )',
    marginTop: width*0.04,
  },
  button:{
    width:width*.9,
    height:width*0.12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ee8e58",
    marginBottom: width*0.02,
    marginTop: width*0.1,
    // marginLeft: width*0.04,
    // marginRight: width*0.02,
    borderWidth: 1,
    borderColor: '#ee8e58',
    borderStyle: 'solid',
    borderRadius: width*.008,
    alignSelf: 'center'
  },
  btnText:{
    fontSize: width*0.06,
    color:"#fff"
  },
  editorBox:{
    flex:1
  },
  savePhotosBox:{
    width:width*0.4,
    height:width*0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: "red",
    alignSelf: 'flex-end',
    marginRight: width*0.02,
  },
  checkBox:{
    width:width*0.06,
    height:width*0.06,
    borderWidth: 0.8,
    borderColor: '#ee8e58',
    borderStyle: 'solid',
    borderRadius: width*0.04,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    fontSize: width*0.04,
    color:"#3a3a3a",
    marginLeft: width*0.01,
  },
  checked:{
    width:width*0.017,
    height:width*0.035,
    borderRightWidth: width*0.004,
    borderRightColor: '#febcc5',
    borderStyle: 'solid',
    borderBottomWidth: width*0.004,
    borderBottomColor: '#febcc5',
    borderStyle: 'solid',
    transform:[{rotateZ:"45deg"}],
    marginBottom: width*0.010,
  }
});


