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
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

const { width,height } = Dimensions.get('window');

export const Operation =({
	ImageBoxStyle
}) => (<View style={ImageBoxStyle}>
		Image
	  </View>)


const styles=StyleSheet.create({
	nameandtime:{
		marginLeft: 10,
		alignItems: 'flex-end'
	},
	name:{
		color:"#9a5917",
	},
	publishtime:{
		fontSize: 15,
		color:"#d5ded6"
	},
	SubscribeStyle:{
		width:width*0.1,
		height:width*0.05,
		borderWidth: 1,
		borderColor: '#db595d',
		borderStyle: 'solid',
		borderRadius: width*0.04,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	}
})

