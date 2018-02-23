/*flow*/
import * as React from 'react';
import { 
	View,
 	Text,
 	StyleSheet,
 	TextInput,
 	Dimensions,
 	TouchableWithoutFeedback,
 	TouchableNativeFeedback,
 	Button,
 	Platform,
 	Keyboard
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import  Entypo from 'react-native-vector-icons/Entypo';
import  EvilIcons from 'react-native-vector-icons/EvilIcons';
import dismissKeyboard from 'dismissKeyboard';

import { shallowEqual } from '../../utils/utils';
const { width,height } = Dimensions.get('window');

type Props = {
  placeholder: string,
  autoFocus:boolean,
  placeholderTextColor?:string,
  inputMaxHeight:number
};

export class InputToolbar extends React.Component<Props,*>{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	showTextInput:true,
	  	isSpeak:false,
	  	showEmojis:false,
	  	showOperate:false,
	  	value:''
	  };
	}


componentWillReceiveProps(nextProps:Object) {
  if(nextProps.isBlur){
  	this.refs.textInput.blur()
  }
  if (nextProps.hadSend) {
  	this.refs.textInput.clear()
  }
}

shouldComponentUpdate(nextProps, nextState) {
  return !(shallowEqual(nextProps,this.props)&&shallowEqual(nextState,this.state))
}

componentDidUpdate(prevProps, prevState) {


  // if(this.state.showTextInput){

  // 	this.refs.textInput.focus()

  // 	return
  // }
 
  //this.refs.textInput.blur()
  this.props.renderAudio(this.state.showTextInput,this.state.isSpeak)
}
_showTextInput=()=>{

	this.setState(preState=>{
		return {showTextInput:!preState.showTextInput}
	})
}
_Speak=()=>{
	this.setState(preState=>{
		return {isSpeak:!preState.isSpeak,showTextInput:preState.showTextInput}
	})
	
}

_openEmoji=()=>{

	console.log(this.refs.textInput.props.value)
	this.setState(preState=>{
		return {showEmojis:!preState.showEmojis}
	})
	this.props.OperateDashBoard(this.state.showEmojis);
}

_openOperation=()=>{
	this.setState({
		showOperate:!this.state.showOperate
	})
	//this.props.OperateDashBoard(this.props.ToolBarHeight)
}
onChangeText=(v)=>{
	this.setState({
		...this.state,
		value:v
	})
}

	render():React.Node{
		
		const { hasValue } = this.props;
		const { showTextInput,isSpeak,showEmojis} = this.state;
		const TouchableButton=Platform.OS==='ios'?TouchableWithoutFeedback:TouchableNativeFeedback
		return(
				<View style={[styles.container]}>
					
					<TouchableWithoutFeedback onPress={this._showTextInput}>
						{showTextInput?
							(<View style={styles.audioinput}>
								<Ionicons name='ios-wifi' size={16}/>
							</View>)
							:
							(<View style={styles.Textinput}>
								<Entypo name='keyboard' size={18}/>
							</View>)
						}
						
					</TouchableWithoutFeedback>	
					{
						showTextInput?

						(<View style={styles.textinputBox}>
							<TextInput
							ref='textInput'
							underlineColorAndroid='transparent'
							placeholder={this.props.placeholder}
							style={[Platform.OS==='ios' ? styles.textinputIOS:styles.textinputAndroid]}
							autoFocus={this.props.autoFocus}
							maxHeight={this.props.inputMaxHeight}
							autoGrow={false}
							multiline={true}
							maxLength={100}
							onChange={this.props.onChange}
							onChangeText={this.props.onChangeText}
							onEndEditing={this.props.onEndEditing}
							onSelectionChange={this.props.onSelectionChange}
							returnKeyType={'go'}
							value={this.props.hasValue}
							editable={true}
							//onFocus={Keyboard.dismiss}
							//selectionColor={'#e83f24'}
							//selection={{start: 1,end: 1}}
						/>
						</View>)
						:
						(<TouchableWithoutFeedback onPressIn={this._Speak} onPressOut={this._Speak}>
							<View style={styles.audioinputBox}>

								{!isSpeak?(<Text>按住说话</Text>):(<Text>松开结束</Text>)}
							</View>
						</TouchableWithoutFeedback>)

					}				
					
						<TouchableButton onPress={this._openEmoji}>
							{!showEmojis?
							(<View style={styles.emojiBtn}>
								<Entypo name='emoji-flirt' size={28} color={"#5b5b6b"}/>
							</View>)
							:
							(<View style={styles.Textinput}>
								<Entypo name='keyboard' size={18}/>
							</View>)}
						</TouchableButton>
						{
									!hasValue?
						(<TouchableWithoutFeedback onPress={this._openOperation}>
							<View style={styles.plusBtn}>
								
									<EvilIcons name='plus' size={40} color={"#5b5b6b"}/>
								
								
							</View>
						</TouchableWithoutFeedback>):
						(<View style={styles.plusBtn}>
							<Button title="发送" onPress={()=>this.props.handleSubmit()}/>
						</View>)
						
						}
				</View>
			)
	}
} 

InputToolbar.defaultProps = {
  placeholder: '请输入',
  autoFocus:true
}

const styles=StyleSheet.create({
	container:{
		height:width*.12,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderBottomColor: '#abacc7',
		borderStyle: 'solid',
		borderTopColor: '#abacc7',
		flexDirection: 'row',
		alignItems: 'center',
	},
	textinputIOS:{
		flex:1,
		paddingTop: width*0.03,
	},
	textinputAndroid:{
		flex:1,
		height: width*.08
	},
	audioinput:{
		justifyContent: 'center',
		alignItems: 'center',
		transform:[{rotateZ: '90deg'}],
		height:width*.08,
		width:width*.08,
		marginHorizontal:width*.02 ,
		borderRadius: width*.04,
		borderColor:"#3c3c45",
		borderStyle:'solid',
		borderWidth:1
	},
	Textinput:{
		justifyContent: 'center',
		alignItems: 'center',
		height:width*.08,
		width:width*.08,
		marginHorizontal:width*.02 ,
		borderRadius: width*.04,
		borderColor:"#3c3c45",
		borderStyle:'solid',
		borderWidth:1
	},
	emojiBtn:{
		justifyContent: 'center',
		alignItems: 'center',
		height:width*.1,
		width:width*.1,
		marginLeft:width*.02 ,
	},
	plusBtn:{
		justifyContent: 'center',
		alignItems: 'center',
		height:width*.1,
		width:width*.15,
		marginHorizontal:width*.01 ,
	},
	audioinputBox:{
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth:1,
		borderColor: '#c8d3df',
		borderStyle: 'solid',
		borderRadius: width*0.01,
		width:width*0.6,
		paddingVertical: width*0.016,
	},
	textinputBox:{
		width:width*0.6,
	},
	
})