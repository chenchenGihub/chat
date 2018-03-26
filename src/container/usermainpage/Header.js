import React from 'react';
import { 
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Thumbnail } from './Thumbnail'
import { Button } from './Button'
export const Header=({
	HeaderStyle,
	NameAndfansStyle,
	nameStyle,
	fansStyle,
	nickname,
	fans,
	thumbnail,
	back,
	subscribed,
	btnStyle,
	handleClick,
	imageBoxStyle,
	handleBack
})=>(<View style={HeaderStyle}>
		<TouchableOpacity style={back} onPress={handleBack}>
			<Ionicons name="ios-arrow-back" size={30} />
		</TouchableOpacity>
		<Thumbnail imageBoxStyle={imageBoxStyle} source={thumbnail} />
		<View style={NameAndfansStyle}>
			<Text style={nameStyle}>{nickname}</Text>
			<Text style={fansStyle}>{fans.length}粉丝</Text>
		</View>
		<Button 
		 string={subscribed?"已关注":"关注"} 
		 btnStyle={btnStyle}
		 handleClick={handleClick}
		 textcolor={subscribed?"#fff":"#878d88"}
		 subscribed={subscribed}
		/>
		<FontAwesome name="ellipsis-h" size={25}/>
	</View>)

