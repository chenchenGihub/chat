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
  PermissionsAndroid,
  TouchableWithoutFeedback,
  CameraRoll
} from 'react-native';
import FontAwesome from  'react-native-vector-icons/FontAwesome';
import EvilIcons from  'react-native-vector-icons/EvilIcons';
import Ionicons from  'react-native-vector-icons/Ionicons';
import Video from "react-native-video";
const { width,height } = Dimensions.get('window');

import  VideoPLayer from './videoGallary/videopLayer.js';
import  VideoGallary from './videoGallary/videogallary';

export default class VideoRoll extends React.Component{

 state = {
    videos:[]
  };

 

    next=()=>{

    }


  async  componentWillMount() {
       
  const data = await CameraRoll.getPhotos({
                first:20,
                assetType:"Videos"
             })    
                 console.log(data); 

                 // let videos=[];
                 // data.edges.map((v,i)=>{
                 //     videos.push(v.node.image)
                 // })   

                 console.log(data.edges)

                 this.setState({
                  videos:data.edges
                 })
  }
    

  render() {
    return (
     <ScrollView style={styles.container}>
     <View style={styles.header}>
       <EvilIcons 
       name="close" 
       size={30} 
       color="#fff"
       onPress={()=>this.props.operate('picOrtext')}
       />
       <TouchableOpacity onPress={this.next}>
         <View style={styles.next}>
          <Text style={styles.nextText}>下一步</Text>
        </View>
       </TouchableOpacity>
     </View>
       <VideoPLayer />
       <VideoGallary
         data={this.state.videos}
       />
     </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
   // backgroundColor: "red",
  },
  next: {
    justifyContent: 'center',
    alignItems: 'center',
    width:width*0.2,
    height:height*0.05,
    borderRadius:height*0.01,
    backgroundColor: "#e45250",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#000000",
    width:width,
    height:width*0.16
  },
  nextText:{
    fontSize: width*0.05,
    color:"#fff"
  },
  
});


