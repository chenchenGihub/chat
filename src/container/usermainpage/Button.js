import React from 'react';
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image'

export const Button = ({
	string,
	btnStyle,
	handleClick,
	textcolor,
	subscribed
})=>(<TouchableOpacity onPress={handleClick}>
	<View style={[btnStyle,{backgroundColor: subscribed?"#8c5206":"#fffff2"}]}>
		<Text style={{color:textcolor}}>{string}</Text>
	</View>
</TouchableOpacity>)