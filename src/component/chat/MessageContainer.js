/*flow*/ 
import * as React from 'react';
import { 
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Platform,
	Dimensions
} from 'react-native';

import autobind from 'autobind-decorator';

import {propsEqual} from 'react-shallow-equal';

import { shallowEqual } from '../../utils/utils';

import Message from '../../component/chat/message';

const { width,height } = Dimensions.get('window')

export class MessageContainer extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	componentWillReceiveProps(nextProps) {
	  //console.log(nextProps.messages)
	}

	shouldComponentUpdate(nextProps:Object, nextState:Object) {
		//console.log(!shallowEqual(nextProps.messages,this.props.messages))

	  	return !shallowEqual(nextProps.messages,this.props.messages)

	}


	_keyExtractor=(item, index)=>item._id
	
	_renderItem=({item})=>{
		
		return(
			<View>
				<Message 
					style={styles.messagesBox}
					messageItem={item}
					chatUserObj={this.props.chatUserObj}
					user={this.props.user}
				/>
			</View>
		)}


	render(): React.Node{

		//console.log(this.props.messages)

		return(			
			<View style={{flex:1}} onPress={this.props.textInputBlur}>	
				<View style={styles.container} >
					<FlatList
					  data={this.props.messages}
					  renderItem={this._renderItem}
					  keyExtractor={this._keyExtractor}
					  inverted={this.props.inverted}
					  //ListHeaderComponent={this._renderHeader}
					  //ItemSeparatorComponent={this._renderSeparator}
					  initialNumToRender={10}
					  onEndReachedThreshold={0.1}
					  //onEndReached=
					  refreshing={true}
					/>
				</View>
			</View>					
			)
	}
}

const styles=StyleSheet.create({
	
	container:{
		flex:1,
	},

	messagesBox:{
		flexDirection: 'row',
		padding: width*0.02,
		marginRight: width*0.2,
	},
	
})