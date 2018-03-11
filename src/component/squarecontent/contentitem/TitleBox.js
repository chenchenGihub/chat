import React from 'react';
import { 
  View,
  Text ,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native';
import FastImage from 'react-native-fast-image'
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

const { width,height } = Dimensions.get('window');

const Alltext=()=>(<Text style={{color:"#255f79"}}>全文</Text>)

export const TitleBox =({
	title
}) =>{
	if(title){
		return(<Text style={styles.TitleBoxStyle}>
			{title.length>40?`${title.substring(0,5)}${'...'}`:title}
			{title.length>40?(<Alltext/>):null}
		  </Text>)
	}

	return null
} 


const styles=StyleSheet.create({
	alltext:{
		color:"#255f79"
	},
	TitleBoxStyle:{
		//flex:0.8,
		padding: width*0.02,
		fontSize: width*0.04,
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: 'bold',
		color:"#3c3b3b"
	}
})

