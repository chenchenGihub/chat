import React from 'react';
import { 
	View,
	Text,
} from "react-native"; 

export const TitleBox=({
	TitleStyle,
	TextStyle,
	title
})=>(
	<View style={TitleStyle}>
		<Text style={TextStyle}>{title}</Text>
	</View>
)