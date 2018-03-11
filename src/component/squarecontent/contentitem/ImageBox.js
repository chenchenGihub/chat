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

export const ImageBox =({
	ImageBoxStyle,
	imgs
}) => (<View style={ImageBoxStyle}>
		<FastImage
		    style={styles.image}
		    source={{
		      uri: imgs,
		      //headers:{ Authorization: 'someAuthToken' },
		      priority: FastImage.priority.normal,
		    }}
		    resizeMode={FastImage.resizeMode.cover}
		  />
	  </View>)


const styles=StyleSheet.create({
	image:{
		flex:1
	},
	
})

