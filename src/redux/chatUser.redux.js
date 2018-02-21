import axios from 'axios';
import { port } from '../utils/dev.js';
import { pinyinsort } from '../utils/utils.js';

const GET_USER_LIST='GET_USER_LIST'

const initialState={
	userList:[]
}

export function chatUser(state=initialState,action){
	
	switch (action.type) {
		case GET_USER_LIST:
			return {...state,userList:action.data}
		default:
			return state
	}
}


function userList(data){


	return {type:GET_USER_LIST,data:pinyinsort(data)}
}

export function GetUserList(type){
	return dispatch=>{
		axios.get(`${port}/user/list?type=${type}`)
				.then(res=>{
					if(res.status===200&&res.data.code===0){
						//console.log("res.data",res.data.data)

						dispatch(userList(res.data.data))
					}else{
						
					}
				})
	}
}