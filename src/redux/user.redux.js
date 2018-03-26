import axios from 'axios';
import {
	//ToastAndroid,
	Platform, 
}  from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { NavigationActions } from 'react-navigation';
import io from 'socket.io-client'

import { RootNavigator } from '../navigator/AppNavigator.js';
import { port } from '../utils/dev.js';
import { redirectTo, ToastUtils } from '../utils/utils.js';
const AUTH_SUCCESS="AUTH_SUCCESS";
const ERROR_MSG='ERROR_MSG';
const UPDATEUSERINFO='UPDATEUSERINFO';
const LOGOUT='LOGOUT';
const LOADUSERINFO='LOADUSERINFO';
const REGISTER='REGISTER';
const USERDETAIL='USERDETAIL';
const CHATTO='CHATTO';
const GOBACK='GOBACK';
const USERMAINPAGE='USERMAINPAGE';
const FUSH_COMMENTS_SUCCESS='FUSH_COMMENTS_SUCCESS';
const FETCH_MORE_COMMENTS='FETCH_MORE_COMMENTS';


/**
 * initial state
 */

const initialState={
	msg:'',
	userName:'',
	type:false,
	_id:'',
	avatarurl:'',
	isLogin:0
}
/**
 * @Author    chen
 * @DateTime  2017-12-21
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @function  [reducers]
 * @param     {[obj]}    state  [initial state]
 * @param     {[obj]}    action [user action]
 * @return    {[obj]}           [current state]
 */

export function users(state=initialState,action){
	//console.log(action.data)
	switch (action.type) {
		case AUTH_SUCCESS:
			return {...state,msg:'',...action.data}
		case UPDATEUSERINFO:
			return {...state,...action.data,isLogin:2}
		case ERROR_MSG:
			return {...state,isAuth:false,msg:action.msg}
		case LOGOUT:
			return {...initialState,isLogin:1}
		default:
			return state
	}
}

const firstAction=RootNavigator.router.getActionForPathAndParams('Auth');
const initialNavState=RootNavigator.router.getStateForAction(firstAction);


export function nav(state=initialNavState,action){
	let nextState;
	switch(action.type){
		case "LOGIN":
			nextState=RootNavigator.router.getStateForAction(
					NavigationActions.navigate({"routeName":"Login"}),
					state
				)
			break;
		case "REGISTER":
			nextState=RootNavigator.router.getStateForAction(
					NavigationActions.navigate({"routeName":"Register"}),
					state
				)
			break;	
		case "AUTH_SUCCESS":
			 nextState=RootNavigator.router.getStateForAction(
			 	NavigationActions.navigate({"routeName":`${redirectTo(action.data)}`}),
			 	state
			 	)
			 	break;
		case "LOGOUT":
			//let route=state.routes.find(v=>v.routeName=='Login')
		const resetAction = NavigationActions.reset({
			  index: 0,
			  actions: [
			    NavigationActions.navigate({ routeName: 'Login'})
			  ]
			})
			 nextState=RootNavigator.router.getStateForAction(
			 	resetAction
			 	)
			break;
		case "UPDATEUSERINFO":
			 nextState=RootNavigator.router.getStateForAction(
			 	NavigationActions.navigate({"routeName":`${redirectTo(action.data)}`}),
			 	state
			 	)
			break;
		case "USERDETAIL":
			 nextState=RootNavigator.router.getStateForAction(
			 	NavigationActions.navigate({"routeName":"UserDetail","params": {v:action.data},}),
			 	state
			 	)
			 break;
		case "CHATTO":
			 	nextState=RootNavigator.router.getStateForAction(
			 	NavigationActions.navigate({"routeName":"ChatTo","params": {v:action.data},}),
			 	state
			 	)
			 	break;
		case "USERMAINPAGE":
			 	nextState=RootNavigator.router.getStateForAction(
			 	NavigationActions.navigate({"routeName":"UserMainPage","params": {v:action.data},}),
			 	state
			 	)
			 	break;	 	
		case "GOBACK":
				nextState=RootNavigator.router.getStateForAction(
			 	NavigationActions.back(),
			 	state
			 	)
			 	break;	 				 			
		default: nextState = RootNavigator.router.getStateForAction(action, state);
      		break;
	}

	return nextState || state
}

const initialComments={
	comment:[],
	page:0,
	loading:false
}

export function comments(state=initialComments,action){
	switch(action.type){
		case 'FUSH_COMMENTS_SUCCESS':
			return {...state,comment:[action.data,...state.comment]}
		// case 'FETCH_MORE_COMMENTS':
		// 	return {comment:[...state.comment,...action.data],page++}
		default:
			return state;		
	}
}

/**
 * @Author    chen
 * @DateTime  2017-12-21
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @function  [Action Creator]
 * @param     {[object]}    data [user params]
 * @return    {[object]}         [action]
 */
function authSuccess(data){
	return {
		type:AUTH_SUCCESS,
		data
	}
}

function fetchCommentsSuccess(data){
	return {
		type:FETCH_MORE_COMMENTS,
		data
	}
}

function errorMsg(msg){
	return {
		type:ERROR_MSG,
		msg
	}
}

export function updateUserInfo(userInfo){

	return {type:UPDATEUSERINFO,data:userInfo}
}

export function goToDetail(v){
	return {type:USERDETAIL,data:v}
}

export function chatTo(id){
	return {type:CHATTO,data:id}
}
export function goToUserMainPage(id){
	return {type:USERMAINPAGE,data:id}
}

export function goback(){
	return {type:GOBACK,data:null}
}
/**
 * @Author    cc
 * @DateTime  2017-12-20
 * @copyright [copyright]
 * @license   [license]
 * @version   [0.0.0]
 * @param     {[string]}    options.userName  [description]
 * @param     {[string]}    options.pwd       [description]
 * @param     {[string]}    options.repeatpwd [description]
 * @param     {[string]}    options.type      [description]
 * @return    {[fuc]}                      [description]
 */
export function register({userName,pwd,repeatpwd,type}){
	
	console.log("设备唯一ID",DeviceInfo.getUniqueID());
	return dispatch=>{

		axios.post(`${port}/user/register`,{
			userName,
			pwd,
			type,
			deviceUniqueId:DeviceInfo.getUniqueID(),
			deviceManufacturer:DeviceInfo.getManufacturer(),
			deviceModel:DeviceInfo.getModel(),
			deviceID:DeviceInfo.getDeviceId(),
			SystemName:DeviceInfo.getSystemName(),
			SystemVersion:DeviceInfo.getSystemVersion(),
			AppVersion:DeviceInfo.getReadableVersion(),
			UserAgent:DeviceInfo.getUserAgent(),
			Timezone:DeviceInfo.getTimezone(),
			isEmulator:DeviceInfo.isEmulator(),
			InstanceID:DeviceInfo.getInstanceID(),
			FirstInstallTime:DeviceInfo.getFirstInstallTime(),
			LastUpdateTime:DeviceInfo.getLastUpdateTime(),
			Carrier:DeviceInfo.getCarrier()
		})
		.then(res=>{
			if(res.status===200&&res.data.code===0){
				//ToastAndroid.showWithGravity('发送成功',0.5,ToastAndroid.CENTER);
				ToastUtils(Platform.OS,'发送成功',0.5)
				 storage.save({
						    key: 'user',  // 注意:请不要在key中使用_下划线符号!
						    data: {
						    	userName:res.data.data.userName,
						    	type:res.data.data.type,
						    	_id:res.data.data._id,
						    	avatar:res.data.data.avatar
						    },
						    // 如果不指定过期时间，则会使用defaultExpires参数
						    // 如果设为null，则永不过期
						    expires: null
						  });
				 //console.log(res.data.data);
				 storage.remove({
					key: 'avatarData',

				});

				 storage.remove({
					key: 'users',

				});
				dispatch(authSuccess(res.data.data))
				
			}else{
				dispatch(errorMsg(res.data.msg))
				//ToastAndroid.showWithGravity(res.data.msg,0.5,ToastAndroid.CENTER)
				ToastUtils(Platform.OS,res.data.msg,0.5);
			}
		})
	}

}

export function login({userName,pwd}){
	return dispatch=>{
		axios.post(`${port}/user/login`,{userName,pwd})
				.then(res=>{
					if(res.status===200&&res.data.code===0){
						//ToastAndroid.showWithGravity('登录成功',0.5,ToastAndroid.CENTER);
						ToastUtils(Platform.OS,'登录成功',0.5)
						//console.log("res",res.data.data._id,"storage",storage)
						 storage.save({
						    key: 'user',  // 注意:请不要在key中使用_下划线符号!
						    data: {
						    	userName:res.data.data.userName,
						    	type:res.data.data.type,
						    	_id:res.data.data._id,
						    	avatarurl:res.data.data.avatarurl
						    },
						    // 如果不指定过期时间，则会使用defaultExpires参数
						    // 如果设为null，则永不过期
						    expires: null
						  });

						dispatch(authSuccess(res.data.data));

					}else{
						dispatch(errorMsg(res.data.msg))
						ToastUtils(Platform.OS,res.data.msg,0.5)
					}
				})
	}
}

export function logout(){
	return {type:LOGOUT}
}
export function navToegister(){
	return {type:REGISTER}
}

export function saveUserInfo(val,id){

	console.log(val,id)
	val.userId=id
	//const val=Object.assign({},val,{_id:id});
	console.log(val)
	return dispatch=>{
		axios.post(`${port}/user/saveUserInfo`,val)
				.then(res=>{
					if(res.status===200&&res.data.code===0){
						//Toast.success("保存成功",1)
						console.log("保存成功的数据",res.data.data);

						dispatch(authSuccess(res.data.data))
						ToastUtils(Platform.OS,'保存成功',0.5)
					}else{
						dispatch(errorMsg(res.data.msg))
					}
				})
	}
}

export function fetchComments(dataId){

	console.log(dataId);

	return dispatch=>{
		axios.post(`${port}/user/fetchcomments`,{dataId:dataId})
				.then(res=>{
					if(res.status===200&&res.data.code===0){
						
						console.log("保存成功的数据",res.data.data);

						dispatch(fetchCommentsSuccess(res.data.data))
						
					}else{
						dispatch(errorMsg(res.data.msg))
					}
				})
	}
}

export function sendComment({text,dataId,commentId}){

	console.log({text,dataId,commentId});

	return dispatch=>{
		axios.post(`${port}/user/sendcomment`,{text,dataId,commentId})
				.then(res=>{
					if(res.status===200&&res.data.code===0){
						
						console.log("保存成功的数据",res.data.data);

						//dispatch(authSuccess(res.data.data))
						
					}else{
						dispatch(errorMsg(res.data.msg))
					}
				})
	}
}

