import React from 'react';
import { 
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
export const Footer=({
	FooterStyle,
	icocnStyle,
	fav,
	repost,
	vote,
	textStyle,
	sendcomment
})=>(<View style={FooterStyle}
		pointerEvents='box-none'
	>
		<TouchableOpacity onPress={sendcomment}>
			<View style={icocnStyle}>
				<FontAwesome name="comment-o" size={20}/>
				<Text style={textStyle}>评论</Text>
			</View>
		</TouchableOpacity>
		<View style={icocnStyle}>	
			<Ionicons name="md-star-outline" size={30} />
			<Text style={textStyle}>收藏</Text>
		</View>
		<View style={icocnStyle}>
			<Feather name="thumbs-up" size={25}/>
			<Text style={textStyle}>点赞</Text>
		</View>
		<View style={icocnStyle}>
			<Entypo name="forward" size={25}/>
			<Text style={textStyle}>转发</Text>
		</View>
	</View>)

