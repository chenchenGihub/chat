import { combineReducers } from 'redux';
import { users } from '../redux/user.redux.js';
import { nav } from '../redux/user.redux.js';
import { chatUser } from '../redux/chatUser.redux.js';
import { chat } from '../redux/chat.redux.js';
import { datalist } from '../redux/data.redux.js';
import { saveResource } from '../redux/saveimage.redux.js';

const rootReducers=combineReducers({
	users,
	chatUser,
	nav,
	datalist,
	chat,
	
	saveResource
});

export default rootReducers;