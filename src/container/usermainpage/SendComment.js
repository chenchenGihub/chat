import React from 'react';
import { 
	View,
	Text,
	Button,
	TextInput
} from 'react-native';

export const SendComment=({
	TextInputStyle,
	TextInputBoxStyle,
	sendMessage,
	onChangeText,
	text
})=>{

	console.log(text)
	return(
		<View style={TextInputBoxStyle}>
            <TextInput 
            	style={TextInputStyle}
            	underlineColorAndroid="transparent"
				placeholder="发表你的评论..."
				onChangeText={onChangeText}
				//autoFocus={true}
            />
            <Button title='发表' onPress={sendMessage} disabled={!text}/>
        </View>
)}