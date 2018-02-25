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