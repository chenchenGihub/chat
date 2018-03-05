import axios from 'axios';
import { port } from '../utils/dev.js';

const DATA_LIST='DATA_LIST';
const FETCH_NEW_DATA='FETCH_NEW_DATA';
const LOAD_EARLIER_DATA='LOAD_EARLIER_DATA';


const initState={
	data:[]
}

export function data(state=initState,action){
	switch(action.type){
		case DATA_LIST:
			return {...state,data:action.data}
		case LOAD_EARLIER_DATA:
			return {...state,data:[...state.data,...action.data]}
		case FETCH_NEW_DATA:
			return {...state,data:action.data}		
		default:
			return state;
	}
}

export function loadData(){
	return dispatch=>{
		//axios
	}
}

export function publish({title,body,thumbnail}){
	return (dispatch,getState)=>{
		console.log(title,body,thumbnail,getState().users)
		axios.post(`${port}/user/uploadResource`,{
			title,
			body,
			thumbnail,
			authorId:getState().users._id,
			authorAvatar:getState().users.avatarurl,
			authorName:getState().users.userName
		}).then(res=>{
					if(res.status===200&&res.data.code===0){
						console.log("res.data",res.data.data)

						//dispatch(userList(res.data.data))
					}else{
						
					}
				})

	}
}





