import React from "react";
import { 
	View,
	Text,
	StyleSheet,
	Dimensions
} from "react-native";


import { shallowEqual } from '../../utils/utils';
import Bubble from './bubble';
import Avatar from './avatar';
import Time from './Time';

const { width,height } = Dimensions.get('window');

export default class Message extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	shouldComponentUpdate(nextProps:Object, nextState:Object) {

		//console.log(!shallowEqual(nextProps.messageItem,this.props.messageItem))

	  	return !shallowEqual(nextProps,this.props)

	}

	render(){

		const { user } =this.props;
		const { messageItem } = this.props;
		//console.log("message",this.props)
		return(
			<View>
			{
						this.props.messageItem.isShowTime?
				(<View style={{flex:1,alignSelf: 'center',marginTop: width*0.04}}>		
					
						<Time 
						 style={styles.Time}
						 time={this.props.messageItem.createTime}
						 textStyle={styles.TimeText}
						/>
					
				</View>)
				:null
			}
				<View style={[this.props.style,user._id!=messageItem.from?styles.messageBox:null]}>							
					<Avatar source={this.props.user.avatarurl}/>
					<Bubble messageItem={this.props.messageItem} position={user._id==messageItem.from}/>		
				</View>
			</View>	
			)
	}
}

const styles=StyleSheet.create({
	messageBox:{
		alignSelf: 'flex-end',
		flexDirection: 'row-reverse',
	},
	Time:{
		backgroundColor: "#9aa2a9",
		padding: width*0.01,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: width*0.01,

	},
	TimeText:{
		color:"#e9f5ff"
	}
})

