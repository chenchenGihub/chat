import React from 'react'
import {View,Text} from 'react-native'

export default Title =({text,style})=>{
	return(
		<View>
			<Text style={style}>{text}</Text>
		</View>
		)
}