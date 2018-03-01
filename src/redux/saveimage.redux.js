import React from 'react';
import {CameraRoll} from 'react-native';

//获取图片
const PICS_LIST = 'Photos';
//获取视频
const VIDEOS_LIST = 'Videos';


const initState = {
	pictures:[],
	videos:[],
	dataType:''
};

export function saveResource(state=initState,action){
	switch(action.type){
		case PICS_LIST:
			return {...state,pictures:[...state.pictures,...action.resource.edges],dataType:action.type}
		case VIDEOS_LIST:
			return {...state,pictures:[...state.videos,...action.resource.edges],dataType:action.type}
		default:
			return state;
	}
}



function saveResourceData(data,type){
	
	return{
		type:type,
		resource:data
	}
}




export function saveDatas(nums,type){
	return async (dispatch,getState)=>{
		const options={first:nums,assetType:`${type}`};
	    const data = await CameraRoll.getPhotos(options);


		dispatch(saveResourceData(data,type));
}

}

