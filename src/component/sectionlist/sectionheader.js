import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

export default class SectionHeader extends React.Component {

	render(){
		return(		 
				<View style={this.props.style}>
					<Text style={styles.label}>{this.props.section.key}</Text>
				</View>
			
		)
	}
	
}
const styles=StyleSheet.create({
	label:{
		color:'#f9001a'
	}
})