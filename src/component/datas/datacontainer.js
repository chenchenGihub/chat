import React from 'react';
import {
	View, 
	Text, 
	StyleSheet,
	FlatList,
	Dimensions,
	TouchableOpacity,
	StatusBar 
} from 'react-native'


export default class DataContainer extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}


	render(){

		console.log(this.props)
		return(

			<View style={this.props.DataItem}>
				<Text>131112</Text>
			</View>
			)
	}
}