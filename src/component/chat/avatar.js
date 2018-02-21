import React from 'react';
import { 
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions 
} from 'react-native';


const { width,height } = Dimensions.get('window')

export default class Avatar extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	renderImage(){
		return(
				<Image style={styles.avatar} source={{uri:this.props.source}}/>
			)
	}

	render(){
		//console.log(this.props.source)
		return(
			<View>
				{this.renderImage()}
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