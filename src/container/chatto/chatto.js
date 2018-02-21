/*flow*/ 
import React from 'react'
import {
	View, 
	Text, 
	StyleSheet,
	FlatList,
	Dimensions,
	Button,
	Image,
	TouchableOpacity,
	BackHandler,
	Platform,

} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { Header } from 'react-native-elements'

import autobind from 'autobind-decorator'

import { ChatBox } from '../../component/chat/chatbox'
import { goback } from '../../redux/user.redux'
import { sendMsg} from '../../redux/chat.redux'
import { shallowEqual } from '../../utils/utils'

const { width,height } = Dimensions.get('window')






type State={
	messages:Array<T>,
	isBlur:boolean,
	hasValue:string,
	hadSend:boolean
};

@connect(
	state=>state,
	{ goback,sendMsg }
)
export default class ChatTo extends React.Component<*,State>{

constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isBlur:false,
      hasValue:'',
      hadSend:false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  
  // shouldComponentUpdate(nextProps:Object, nextState:Object) {

  //     return !shallowEqual(nextProps,this.props)

  // }

  @autobind
  onBackPress(){

    const { nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    this.props.goback()
    return true;
  };

  @autobind
  _onChange(){
  	//console.log(123)
  }


  @autobind
  _onChangeText(text){
  	
  	let regu = "^[ ]+$";

  	let re = new RegExp(regu);
  	let reg = new RegExp("^[\n]+$")

  	if(!!text&&!re.test(text)&&!reg.test(text)){
  		this.setState(previousState=>({
  		 ...previousState,
  		 hasValue:text,
  		 hadSend:false
  		}))
  	}else{
  		this.setState(previousState=>({
  		 ...previousState,
  		 hasValue:''
  		}))
  	}
  	

  }

  @autobind
  _onEndEditing(){
  	//console.log("end")
  }

  @autobind
  _onSelectionChange(e){
  	//console.log(e.nativeEvent.selection)
  }

  @autobind
  _textInputBlur(){
  	console.log(123)
  	this.setState(previousState=>({
  		...previousState,
  		isBlur:true
  	}))
  }

  @autobind
  _sendMessage(){
  	this.setState(previousState=>({
  		...previousState,
  		hadSend:true,
  		hasValue:''
  	}))

    const from  = this.props.users._id;
    const to = this.props.navigation.state.params.v._id;
    const msg=this.state.hasValue;
    const chatId = [from,to].sort().join("_");
    this.props.sendMsg({from,to,msg,chatId});
  }

  _operateMessage(chatmsg){
    for (var i = chatmsg.length - 1; i >= 1; i--) {
      //console.log((chatmsg[i-1].createTime-chatmsg[i].createTime))

      if((chatmsg[i-1].createTime-chatmsg[i].createTime)<600000){
        chatmsg[i-1].isShowTime=false;
      }

    }

    return chatmsg
  }

	render(){
		const { params } = this.props.navigation.state;
		const { _id, nickname, avatarurl } = this.props.users;
    //console.log('render',this.props.chat.chatmsg);
    const chatmsg= this.props.chat.chatmsg.filter((v=>v.chatId==[params.v._id,_id].sort().join("_")));

    
    const chatmsgs=this._operateMessage(chatmsg)

    //console.log(chatmsgs)
		return(
			<View style={styles.container}>
				<Header
				  leftComponent={<TouchableOpacity onPress={this.onBackPress}><Icon name='md-arrow-back' size={25}/></TouchableOpacity>}
				  centerComponent={<Title text={`${params.v.nickname}`} style={styles.title}/>}
				  rightComponent={<View></View>}
				/>
				<ChatBox 
				 style={styles.chatbottom}
				 placeholder={"请输入文字...."}
				 inverted={true}
				 autoFocus={false}
				 placeholderTextColor={'#c2c2ea'}
				 inputMaxHeight={100}
				 onChange={this._onChange}
				 onChangeText={this._onChangeText}
				 onEndEditing={this._onEndEditing}
				 onSelectionChange={this._onSelectionChange}
				 textInputBlur={this._textInputBlur}
				 isBlur={this.state.isBlur}
				 hasValue={this.state.hasValue}
				 ref='textinput'
				 handleSubmit={this._sendMessage}
				 hadSend={this.state.hadSend}
				 messages={chatmsgs}
         user={this.props.users}
         chatUserObj={this.props.chat}
				/>
			</View>
		)
	}
}

ChatTo.navigationOptions={
		header:null
	}

const styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor: '#eaf1ff',
    position: 'relative',
 },
 title:{
		color:'#f8f9fd',
		fontSize: 20,
	},
footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  // chatbottom:{
  //   flex:1,
  // },	
})

