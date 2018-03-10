import React from 'react';
import {
	View, 
	Text, 
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	TouchableHighlight,
	StatusBar,
	Platform,
	ProgressBarAndroid,
	ProgressViewIOS,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Progress from 'react-native-progress';

import { shallowEqual } from '../../utils/utils'

const { width,height } = Dimensions.get('window');
const uri= 'file:///storage/emulated/0/DCIM/VID_20180303_125952.mp4';

export default class ProgressBox extends React.Component{
	

shouldComponentUpdate(nextProps, nextState) {
  return !shallowEqual(nextProps.progress,this.props.progress)
}

	render(){

    console.log(this.props)

    const { progress } = this.props;

		return(
			
        	<View style={styles.contentBox}>
          <View style={styles.imageBox}>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                <Image 
                 style={{width:width*0.08,height:width*0.08}}
                 source={{uri:this.props.videothumb}} 
                />
               
                  <Entypo 
                  name="controller-play" 
                  color="#fff"
                  size={15}
                  style={styles.playIcon}
                  /> 
                  <Text style={styles.abortText}>正在上传</Text>
              </View>
            
            {
              progress?
                (<View style={styles.percenteBox}>
                    <Text style={styles.progressText}> {`${Number(progress*100).toFixed(2)}%`}</Text>
                </View>)
              :<View/>
            }

            <TouchableOpacity onPress={()=>this.props.abort()}>
              <View style={styles.abortBox}>
                <Text style={styles.abortText}>终止传输</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Progress.Bar 
          progress={progress} 
          width={width} 
          unfilledColor="#787274"
          borderWidth={0.1}
          borderColor="#774f52"
          borderRadius={0}
          height={width*0.004}
          useNativeDriver={true}
          animationConfig={{ bounciness: 1 }}
          animationType="timing"
          />
        	</View>
        	

        	
        	


		)
	}
}

const styles = StyleSheet.create({
  
  container:{
  	flex:1
  },
  contentBox:{
    width:width,
    height:width*0.084,
    backgroundColor: "#838383",
  },
  progressbarBox:{
  	width:width,
  	height:1,
  	backgroundColor: "#787274",
  },
  imageBox:{
    width:width,
    height:width*0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: width*0.001,
  },
  playIcon:{
    position: 'absolute',
    top:width*0.016,
    left:width*0.016,
  },
  percenteBox:{
    borderWidth: 1,
    borderColor: '#774f52',
    borderStyle: 'solid',
    width:width*0.08,
    height:width*0.08,
    borderRadius: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  abortBox:{
    width:width*0.16,
    height:width*0.08,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#88878d",
  },
  abortText:{
    fontSize: width*0.03,
    color:"#fff"
  },progressText:{
    fontSize: width*0.016,
    color:"#1a1a1a"
  }
});


