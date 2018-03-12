import React from 'react';
import {
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
 
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import shallowCompare from 'react-addons-shallow-compare';
import CheckCircle from './checkcircle';
import PreviewImage from './previewimage';

const { width,height } = Dimensions.get('window');


export default class MyListItem extends React.PureComponent{
  

constructor(props) {
  super(props);

  this.state = {
   modalVisible:true
  };
}


renderResource=(type,item)=>{
  
  return (
    <TouchableOpacity onPress={()=>{this.props.onPressItem(this.props.id)}}>
      <Image
          source={{uri:item.uri}}
          style={{width:this.props.imgWidth,height:this.props.imgWidth}}
        />
    </TouchableOpacity>
        
        )
}

  render() {
   // console.log(this.props)
    return (
      
        <View style={[styles.imgBox,{width:this.props.imgWidth,height:this.props.imgWidth}]}>
          {this.renderResource(this.props.dataType,this.props.itemData.image)}
          

        <CheckCircle 
          BoxStyle={styles.circleBox} 
          checkedStyle={styles.checked} 
          checked={this.props.checked}
          madeCheck={()=>{this.props.onPressItem(this.props.id)}}
        />
        
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  
  
  pic:{
    height:width*0.1,
    width:width,
   
  },
  imgBox:{
    marginRight: 2,
    
  },
  circleBox:{
    borderWidth: width*0.002,
    borderColor: '#fff',
    borderStyle: 'solid',
    width:width*0.06,
    height:width*0.06,
    borderRadius: width*0.05,
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    top:width*0.01,
    left:width*0.01,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checked:{
    width:width*0.017,
    height:width*0.035,
    borderRightWidth: width*0.004,
    borderRightColor: '#0d085a',
    borderStyle: 'solid',
    borderBottomWidth: width*0.004,
    borderBottomColor: '#0d085a',
    borderStyle: 'solid',
    transform:[{rotateZ:"45deg"}],
    marginBottom: width*0.010,
  }
});


