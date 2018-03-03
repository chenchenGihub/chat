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
import { Toast } from 'antd-mobile';

import ToastUtils from '../../../utils/utils';
import VideoPLayer from '../videoGallary/videopLayer';
import { uploadfile } from '../../../utils/httpUtils';



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
      uploading:false,
      videoUri:this.props.videoUri.path
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

//   publishVideo = async()=>{
//       console.log(this.props.videoUri.path)
// try{
//   const data = await uploadfile(this.props.videoUri.path);
//   console.log(data)
// }catch(err){
//   console.warn(err)
// }finally{
  
// }
  

       
// }



  

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
          <TouchableButton onPress={()=>{
            this.props.toggle(false)
            this.props.publishVideo(this.state)
          }}>
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


