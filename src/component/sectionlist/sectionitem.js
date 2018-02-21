import React from 'react'
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity} from 'react-native'

import Avatar from '../topheader/avatar.js'

const { width,height } = Dimensions.get('window');

export default class SectionItem extends React.Component{

render(){
	//console.log(this.props)
	return(
		<View style={this.props.style}>
			<TouchableOpacity onPress={()=>{this.props.goToDetail(this.props.item)}}>
				<View style={styles.userBox}>
					<Avatar source={this.props.item.avatarurl}/>
					<Text style={styles.label}>{this.props.item.nickname}</Text>
				</View>	
			</TouchableOpacity>   
		</View>)
	}
}
const styles=StyleSheet.create({
	label:{
		color:'#0c0d03',
		fontSize: 15,
		marginLeft: width*0.04,
	},
	userBox:{
		flexDirection: 'row',
		alignItems: 'center'
	}
})