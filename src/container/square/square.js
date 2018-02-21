import React from 'react'
import {
	View, 
	Text, 
	StyleSheet,
	FlatList,
	Dimensions 
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Header } from 'react-native-elements'
import axios from 'axios'
import autobind from 'autobind-decorator';
import Drawer from 'react-native-drawer'

import { GetUserList } from '../../redux/chatUser.redux'
import Avatar from '../../component/topheader/avatar'
import Title from '../../component/topheader/title'
import RightComponent from '../../component/topheader/rightComponent'
import { shallowEqual } from '../../utils/utils'
import Mine from '../mine/mine'


const { width,height } = Dimensions.get('window');

class ControlPanel extends React.Component{
	render(){
		return(
				<View style={{flex:1,backgroundColor: 'red',}}>
					<Text>123</Text>
				</View>
			)
	}
}

@connect(
	state=>state,
	{GetUserList}
	)
export default class Square extends React.Component{

	componentDidMount() {

	}

	shouldComponentUpdate(nextProps:Object, nextState:Object) {

	  	return !shallowEqual(nextProps.chatUser,this.props.chatUser)

	}

	componentWillReceiveProps(nextProps) {
	  
	}

	render(){

		return(
				<View style={styles.container}>
					<Header
					  leftComponent={<Avatar source={this.props.users.avatarurl} style={styles.avatar} openControlPanel={this.props.openControlPanel}/>}
					  centerComponent={<Title text={'广场'} style={styles.title}/>}
					  rightComponent={<RightComponent/>}
					/>
					
				</View>
		)
	}
}

const styles=StyleSheet.create({
	container:{
		flex:1
	},
	title:{
		color:'#f8f9fd',
		fontSize: 20,
	},
	avatar:{
		marginTop: width*0.02,
	}
})