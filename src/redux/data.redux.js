import axios from 'axios';
import { port } from '../utils/dev.js';

const DID_RESOURCE_DATA_LIST='DID_RESOURCE_DATA_LIST';
const FETCH_NEW_DATA='FETCH_NEW_DATA';
const LOAD_EARLIER_DATA='LOAD_EARLIER_DATA';
const WILL_RESOURCE_DATA_LIST='WILL_RESOURCE_DATA_LIST';


const initState={
	data:[],
	numColumns:1,
	refreshing:false,
	loading:false
}


function getdataList(data){
	return{
		type:DID_RESOURCE_DATA_LIST,
		payload:data
	}
}
function willgetdataList(data){
	return{
		type:WILL_RESOURCE_DATA_LIST,
		payload:data
	}
}

export function datalist(state=initState,action){
	
	switch(action.type){
		case WILL_RESOURCE_DATA_LIST:
			return {...state,refreshing:action.payload}
		case DID_RESOURCE_DATA_LIST:
			return {...state,refreshing:false,data:action.payload}
		case LOAD_EARLIER_DATA:
			return {...state,data:[...state.data,...action.payload]}
		case FETCH_NEW_DATA:
			return {...state,data:action.payload}		
		default:
			return state;
	}
}

export function loadData(){
	

	console.log("loadData")
	return dispatch=>{

		//dispatch(willgetdataList(true))

		axios.get(`${port}/user/loadDatalist`)
		.then(res=>{
			if(res.status==200&&res.data.code===0){

				setTimeout(()=>{
					dispatch(getdataList(res.data.data))
				},3000)

			}
			
		})
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
		}).then(res=>{
					if(res.status===200&&res.data.code===0){
						console.log("res.data",res.data.data)

						//dispatch(userList(res.data.data))
					}else{
						
					}
				})

	}
}





