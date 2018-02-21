import axios from 'axios';

import { port } from '../utils/dev.js';


//获取聊天列表
const MSG_LIST = 'MSG_LIST';
//读取信息
const MSG_RECV = 'MSG_RECV';
const My_MSG_RECV = 'My_MSG_RECV';
//标识已读
const MSG_READ = 'MSG_READ';

const initState = {
	chatmsg:[],
	unread:0
};

export function chat(state=initState,action){
	switch(action.type){
		case MSG_LIST:
			return {...state,chatmsg:action.data.msgs,unread:action.data.msgs.filter(v=>!v.isRead&&v.to==action.data.userId).length}
		case MSG_RECV:
			return {...state,chatmsg:[action.data,...state.chatmsg],unread:state.unread+1}
		//case MSG_READ:
		case My_MSG_RECV:
			return {...state,chatmsg:[action.data,...state.chatmsg]}
		default:
			return state;
	}
}

function msgList(msgs,userId){
	return{
		type:MSG_LIST,
		data:{
			msgs,
			userId
		}
	}
}


function msgReceive(data){
	return{type:MSG_RECV,data:data}
}

function receiveMyMsg(data){
	return{type:My_MSG_RECV,data:data}
}

export function getMsgList(){
	return (dispatch,getState)=>{
		storage.load({key:"user"}).then(ret => {
			axios.get(`${port}/user/getmsgList?id=${ret._id}`)
			.then(res=>{
				if(res.status==200&&res.data.code==0){
					//console.log(res.data)
					const userId=getState().users._id;
					dispatch(msgList(res.data.msg.reverse(),userId))
				}
			})
		})
		
	}
}

export function sendMsg({from,to,msg,chatId}){
	return dispatch=>{
		dispatch(receiveMyMsg({_id:Date.now(),chatId,from,to,msg,createTime:Date.now(),isRead:false,isShowTime:true}))
		socket.emit("sendmsg",{from,to,msg})
	}
}

export function receiveMsg(){
	return dispatch=>{
		socket.on("recieveMsg",(data)=>{
			console.log(data);
			dispatch(msgReceive(data))
		})
	}
}
