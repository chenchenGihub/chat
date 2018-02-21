import React from 'react'
import {View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	TouchableOpacity
} from 'react-native'

const { width,height } = Dimensions.get('window');

export default class Avatar extends React.Component{
	render(){
		//console.log(this.props);
		return (
			
				<View style={this.props.style}>
					<TouchableOpacity onPress={()=>{this.props.openControlPanel()}}>
						<Image style={styles.avatar} source={{uri:this.props.source}}/>
					</TouchableOpacity>
				</View>
			
		)
	}
}

const styles=StyleSheet.create({
	avatar:{
		width:width*0.1,
		height:width*0.1,
		borderRadius: width*0.05,
	}
})