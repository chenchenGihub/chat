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
	BoxWidth,
	BoxHeight
}) => (
			<View style={ImageBoxStyle} >
			
					{
						imgs.map((v,i)=>
							<View
								key={i}
								style={{width:imgs.length>4?BoxWidth/3:((imgs.length>1&&imgs.length<5)?BoxWidth/2:BoxWidth),height:imgs.length>1?BoxHeight/2:BoxHeight}}
							>
								<FastImage
						  	 style={styles.image}
						  	 source={{
							    uri: v,
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
	},
	
})

