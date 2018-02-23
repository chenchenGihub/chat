import React from 'react'
import { View, Text, StyleSheet,Alert } from 'react-native'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { ActivityIndicator } from 'antd-mobile'
import { propsEqual } from 'react-shallow-equal'; 


import { updateUserInfo } from '../../redux/user.redux.js';
import { redirectTo } from '../../utils/utils'
import { port } from '../../utils/dev'
import Login from '../login/login'
import WorkerInfo from '../workerInfo/workerinfo'
import BossInfo from '../bossInfo/bossinfo'
import TabBarIcon from '../tabbar/tabbar'


@connect(
		state=>state,
	)
export default class Auth extends React.Component{


	componentWillReceiveProps(nextProps) {
	 	//console.log(nextProps.users)
	}

	shouldComponentUpdate(nextProps,nextState) {

		return false//!propsEqual(this.props.chat, nextProps.chat);

	}

	render(){

		const { type,avatarurl,isLogin } = this.props.users;

		//console.log("render",this.props.users)
		


		if(isLogin===1){
			console.log("Login")
			return (<View style={styles.container}><Login /></View>)
		}else if(isLogin===2&&!avatarurl){
			console.log("WorkerInfo")
			 if(redirectTo({type,avatarurl})=='WorkerInfo'){
			 	return (<View style={styles.container}><WorkerInfo/></View>)
			 }else{
			 	return (<View style={styles.container}><BossInfo/></View>)
			 }				
		}else if(isLogin===2&&avatarurl){

			console.log("TabBarIcon")
				return (<View style={styles.container}><TabBarIcon/></View>)
		}else{
			//console.log("正在加载")
			return (<View style={styles.container}><ActivityIndicator toast text="正在加载" /></View>)
		}
	 

	}
}

Auth.navigationOptions={
	header:null
}

const styles = StyleSheet.create({
	container:{
		flex:1
	}
})




