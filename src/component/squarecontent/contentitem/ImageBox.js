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
import GridView from 'react-native-super-grid';



const { width,height } = Dimensions.get('window');



export const ImageBox =({
	ImageBoxStyle,
	imgs,
	onlayout,
	BoxWidth,
	BoxHeight,
	type
}) => (
			<View style={ImageBoxStyle} onLayout={onlayout}>
			{
				imgs.map((item,i)=>
					<View key={i} style={{width:BoxWidth/(imgs.length>4?3:((imgs.length>1&&imgs.length<=4)?2:1)),height: BoxHeight/(imgs.length>=3?2:1)}}>
						<FastImage
					  	 style={styles.image}
					  	 source={{
						    uri: item,
						     // headers:{ Authorization: 'someAuthToken' },
						     priority: FastImage.priority.normal,
						   }}
						   resizeMode={FastImage.resizeMode.cover}
				  		/>
					
					</View>
						
					)
			}
				  
			</View>
		
	  )


const styles=StyleSheet.create({
	image:{
		flex:1,
		margin: width*0.006,
	}
})

