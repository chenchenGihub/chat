import React from 'react';
import { 
  View,
  Text ,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native';

import FastImage from 'react-native-fast-image'
import moment from 'moment'
import { Thumbnail } from 'native-base'
import FontAwesome  from 'react-native-vector-icons/FontAwesome'

import { Subscribe } from './Subscribe';
const { width,height } = Dimensions.get('window');

export const AuthorBox =({
	author,
	subscribe,
	goToUserDetail,
	title,
	publishtime,
	hideOperate,
	AuthorBoxStyle,
	onPress
}) => (
	
	<TouchableWithoutFeedback onPress={onPress}>
		<View style={AuthorBoxStyle}
				pointerEvents={"box-none"}
		   >
		   <TouchableWithoutFeedback onPress={goToUserDetail}>
		   
		   	<Thumbnail small source={{uri: author.avatarurl}} />
		   </TouchableWithoutFeedback>

			<View style={styles.nameandtime}>
				<Text style={styles.name}>{author.userName}</Text>
				<View style={styles.dateandmobile}>
					<Text style={styles.publishtime}>{moment(publishtime).calendar()}</Text>
					<FontAwesome name="mobile" size={16} style={styles.mobileIcon}/>
					<Text style={styles.publishtime}>{author.deviceModel}</Text>
				</View>		
			
		   </View>
			
		  
			<TouchableOpacity onPress={subscribe}>
				<Subscribe SubscribeStyle={styles.SubscribeStyle} color={"#db595d"}/>
			</TouchableOpacity>
		  </View>
		</TouchableWithoutFeedback>)
	


const styles=StyleSheet.create({
	nameandtime:{
		
		alignItems: 'flex-start',
		//backgroundColor: "red",
		flex:0.9
	},
	name:{
		color:"#9a5917",
		marginVertical: width*0.008,
	},
	publishtime:{
		fontSize: width*0.035,
		color:"#949494"
	},
	SubscribeStyle:{
		width:width*0.14,
		height:width*0.06,
		borderWidth: 1,
		borderColor: '#db595d',
		borderStyle: 'solid',
		borderRadius: width*0.006,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	dateandmobile:{
		flexDirection: 'row',
		alignItems: 'center',
		width:width*0.5,
	},
	mobileIcon:{
		marginHorizontal: width*0.02,
	}
})

