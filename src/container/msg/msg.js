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
import Drawer from 'react-native-drawer'
import autobind from 'autobind-decorator';
import { propsEqual } from 'react-shallow-equal';

import { GetUserList } from '../../redux/chatUser.redux'
import Avatar from '../../component/topheader/avatar'
import Title from '../../component/topheader/title'
import Mine from '../mine/mine'
import RightComponent from '../../component/topheader/rightComponent'
import { getMsgList } from '../../redux/chat.redux'
import LeftHeader from '../../component/header'

const { width,height } = Dimensions.get('window');

@connect(
	state=>state,
	{getMsgList}
	)
export default class Msg extends React.Component{

	componentWillMount() {
	 // this.props.getMsgList(this.props.users._id);
	}

	componentDidMount() {
	  
	}

	shouldComponentUpdate(nextProps) {

	return !propsEqual(this.props.chat, nextProps.chat);

	}

	componentWillReceiveProps(nextProps) {
	
	}

	render(){

		//console.log("msg",this.props)

		const { _id }= this.props.users;

		return(
				<View style={styles.container}>
					<Header
					  leftComponent={<Avatar source={this.props.users.avatarurl} style={styles.avatar} openControlPanel={this.props.openControlPanel}/>}
					  centerComponent={<Title text={'消息'} style={styles.title}/>}
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