import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions
} from 'react-native';

const { width,height } = Dimensions.get('window')

export default class Bubble extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	renderMessageText(){
		//console.log(this.props)
		return(
				<View >
					<Text>{this.props.messageItem.msg}</Text>
				</View>
				
			)
	}

	render(){
		return(
			<View style={[styles.messageContainer,!this.props.position?{backgroundColor: "#eee"}:null]}>
				{this.renderMessageText()}
			</View>
			)
	}
}

const styles=StyleSheet.create({
	messageContainer:{
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: width*0.02,
		backgroundColor: '#2fbfaf',
		padding: width*0.03,
		borderRadius:width*0.02 ,
	}
})




