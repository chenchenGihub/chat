/* @flow */

import * as React from 'react';
import { 
  StyleSheet, 
  Dimensions,
  View,
  Text,
  Modal, 
  TouchableWithoutFeedback,
  Platform,
  BackHandler
} from 'react-native';

import { Container, Tab, Tabs,ScrollableTab } from 'native-base';
import shallowequal from 'shallowequal';
import ImagePicker from 'react-native-image-crop-picker';

import { connect } from 'react-redux';
import { Header,SearchBar } from 'react-native-elements';
import Avatar from '../../component/topheader/avatar'
import Title from '../../component/topheader/title'
import RightComponent from '../../component/header/rightcomponent'

import { uploadFormData } from "../../utils/httpUtils.js"
import Constants from "../../constant/constant.js"
import Panel from "../../component/panel/panel"
import MyCamera from "../../component/panel/camera"
import VideoRoll from "../../component/panel/videoRoll"
import ProgressBox from "../../component/progressbar/progressbar"
import { publish,loadData } from '../../redux/data.redux'
import SquareContent from "../../component/squarecontent/squarecontent"
import EditerVideo from "../../component/panel/camera/editerVideo.js"

@connect(
  state=>state,
  {publish,loadData}
  )
export default class Square extends React.Component<*, State> {
  

constructor(props) {
  super(props);

  this.state = {
    modalVisible:false,
    choice:'',
    uploading:true,
    progress:0,
    openEditor:false
  };
  this.operate=this.operate.bind(this);
  this.videoUri='';
}

componentDidMount() {
  this.props.loadData()
  BackHandler.addEventListener('hardwareBackPress', function() {
      this.operate('');
    });
}

componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", ()=>console.log("unmount"))
    this.props.operate('')
  }

shouldComponentUpdate(nextProps, nextState) {

  //console.log(shallowequal(this.props.datalist, nextProps.datalist),shallowequal(this.state,nextState))
  return !shallowequal(this.props.datalist, nextProps.datalist)||!shallowequal(this.state,nextState);
}


  _handleIndexChange = index =>{
    this.props.handleTopIndexChange(index);
    this.setState({
      index,
    });
  }

_publishVideo=(v)=>{
  console.log(v)
  this.operate('');  
  this._upload(uploadFormData(v.videoUri,"video"),v);

} 


_upload(body,v){

  this.setState({
              uploading:true
            })
  this.setVideouri(v.videoUri);

     xhr = new XMLHttpRequest();

        let url = Constants.CLOUDINARY.video;

        xhr.open("POST",url);

        xhr.onload = () => {
          if (xhr.status === 200) {
            this.setState({
              uploading:false
            })
            let response=JSON.parse(xhr.responseText);
            console.log("response",response,response.secure_url.substring(0,response.secure_url.lastIndexOf('/')));
            //console.log(response.secure_url.substring(0,response.secure_url.lastIndexOf('/'))+response.public_id.substring(response.public_id.indexOf("/"))+".jpg")
            let thumbnail=response.secure_url.substring(0,response.secure_url.lastIndexOf('/'))+response.public_id.substring(response.public_id.indexOf("/"))+".jpg"
            this.props.publish({title:v.text,body:response.secure_url,thumbnail:thumbnail})

          } else {
            console.warn('error');
          }
        }

        xhr.onabort = ()=>{
        alert("The transfer has been canceled by the user.");
    }

        xhr.upload.onprogress=(event)=>{
          //console.log(event)

          if(event.lengthComputable){
        this.setState({
          progress:event.loaded/event.total
        })
      }
        }
      xhr.send(body);
}

_abort=()=>{
  console.log("abort")
  xhr.abort()
  
}

setVideouri(v){
  this.videoUri=v;
}

getVideouri(){
  return this.videoUri
}

operate(v){
  console.log("v",v)
  if(v=='picOrtext'||v=='capatureVideo'){
    this.setState({
      modalVisible:!this.state.modalVisible,
      choice:v
    })
  }else if(v=="uploadVideo"){
     ImagePicker.openPicker({
      mediaType: "video",
    }).then((video) => {   
    console.log(video); 
      
      this.setVideouri(video);
      
      this.setState({
         openEditor:!this.state.openEditor
      })
    }).catch((error) => { 
      console.log(error) 
    });
  }
}
    


renderPanelContainer=()=>{
  if(this.state.choice=='picOrtext'){
    return (<Panel operate={this.operate}/>)
  }else if(this.state.choice=='capatureVideo'){
    return (<MyCamera 
        operate={this.operate}
        publishVideo={this._publishVideo}
      />)
  }
  
}



  render() {
   console.log("topheader",this.props)
    return (
      <View style={{flex:1}}>
      <Header
            leftComponent={<Avatar source={this.props.users.avatarurl} style={styles.avatar} openControlPanel={this.props.openControlPanel}/>}
            centerComponent={<Title text={'广场'} style={styles.title}/>}
            rightComponent={<RightComponent operate={this.operate}/>}
          />
        <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setState({modalVisible:!this.state.modalVisible})}}
            >
            {this.renderPanelContainer()}
        </Modal>
        {
          this.state.openEditor?
            <EditerVideo
          videoUri={this.getVideouri()}
          modalVisible={this.state.openEditor}
          publishVideo={this._publishVideo}
          toggle={()=>{this.setState({openEditor:!this.state.openEditor})}}
        />:null
        }
        
        {
            this.state.uploading&&!!this.state.progress?
            <ProgressBox
              progress={this.state.progress}
              videothumb={this.getVideouri()}
              abort={this._abort}
             />
             :null
          }
        
           
              <SquareContent
                platform={Platform.OS}
                data={this.props.datalist}
                numberOfSections={1}
              />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#222',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    color: '#fff',
    fontWeight: '400',
  },
  title:{
    color:'#f8f9fd',
    fontSize: 20,
  },activetab:{
    backgroundColor: "#dbe1d7",
  }
});
