/*flow*/ 
import React from 'react';
import { 
	TouchableOpacity,
	TouchableHighlight,
	View, 
	Text, 
	StyleSheet,
	ImageBackground,
	Image,
	Dimensions,
	TouchableNativeFeedback,
	Platform
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Modal } from 'antd-mobile';

import { logout } from '../../redux/user.redux.js';

const { width,height } = Dimensions.get('window')

type Props={
	users:Object
};
@connect(
	state=>state.users,
	{ logout }
	)
export default class Mine extends React.PureComponent<Props,*>{

_logout(){
	Modal.alert('退出登录', '', [
      { text: '取消', onPress: () => null},
      { text: '确定', onPress: () => {
      	storage.remove({
					key: 'user'
				});
		this.props.logout();} 
	  },])
}

	
	render(): React.Node{
		//console.log(this.props)
		const TouchableBtn=Platform.OS==='ios'?TouchableOpacity:TouchableNativeFeedback;
		const alert = Modal.alert;
		return(
			<View style={styles.container}>
				<ImageBackground source={{uri:this.props.avatarurl}/*require('../../assets/background/backgroundImg.jpg')*/} style={styles.backgroundImg}>
					<View style={styles.showdetailBox}>
						<View style={styles.ImageBox}>
							<TouchableOpacity onPress={()=>null}>
								<Image style={styles.avatar} source={{uri:this.props.avatarurl}}/>
							</TouchableOpacity>
						</View>
						<Text style={styles.nickname}>{this.props.nickname}</Text>
					</View>
					<Text style={styles.brief}>{this.props.brief}</Text>
				</ImageBackground>
				<View style={styles.dashboard}>				
					<TouchableBtn>
						<View style={styles.myNotication}>
							<Icon name="bell-o" size={20} color='#1d1e1c'/>
							<Text style={styles.label}>我的消息</Text>
						</View>
					</TouchableBtn>
					<TouchableBtn>
						<View style={styles.myNotication}>
							<Icon name="star-o" size={20} color='#1d1e1c'/>
							<Text style={styles.label}>我的收藏</Text>
						</View>
					</TouchableBtn>	
					<TouchableBtn>
						<View style={styles.myNotication}>
							<SimpleLineIcons name="user-follow" size={20} color='#1d1e1c'/>
							<Text style={styles.label}>我的关注</Text>
						</View>
					</TouchableBtn>	
					<TouchableBtn>	
						<View style={styles.myNotication}>
							<SimpleLineIcons name="user-following" size={20} color='#1d1e1c'/>
							<Text style={styles.label}>我的粉丝</Text>
						</View>
					</TouchableBtn>
				</View>		
					<View style={styles.bottomBar}>
						<TouchableBtn>
							<View style={styles.options}>
								<Ionicons name='ios-settings' size={24} color='#1d1e1c'/>
								<Text style={styles.optionsText}>设置</Text>
							</View>
						</TouchableBtn>
						<TouchableBtn>	
							<View style={styles.options}>
								<Ionicons name='ios-moon-outline' size={24} color='#1d1e1c'/>
								<Text style={styles.optionsText}>夜间</Text>
							</View>
						</TouchableBtn>
						<TouchableBtn onPress={()=>{this._logout()}}>	
							<View style={styles.options}>
								<SimpleLineIcons name='logout' size={20} color='#1d1e1c'/>
								<Text style={styles.optionsText}>退出</Text>
							</View>
						</TouchableBtn>	
					</View>
	
			</View>
			)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	backgroundImg:{
		width:width*0.8,
		height:width*0.4,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	avatar:{
		width:width*0.14,
		height:width*0.14,
		borderRadius: width*0.07,
		
	},
	ImageBox:{
		borderWidth:2,
		borderColor:'#f7ffe9',
		borderStyle:'solid',
		borderRadius: width,
	},
	showdetailBox:{
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'transparent',
		paddingTop: width*0.05,
	},
	nickname:{
		marginLeft: width*0.03,
		fontSize: 20,
		color:"#f7ffe9"
	},
	brief:{
		//marginRight: width*0.01,
		fontSize: 15,
		color:"#f7ffe9",
		marginTop: width*0.05,
		alignSelf: 'center',
		//marginLeft: width*0.05,
	},
	myNotication:{
		flexDirection: 'row',
		alignItems: 'center',
		marginTop:width*0.03 ,
		padding: width*0.02,
		paddingLeft: width*0.05,
	},
	label:{
		marginLeft:width*0.03 ,
		fontSize:15
	},
	dashboard:{
		flex:1
	},
	bottomBar:{
		flexDirection: 'row',
		justifyContent: 'space-around',

	},
	optionsText:{
		fontSize: 15,
		marginLeft: width*0.02,
	},
	options:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginBottom: width*0.03,
	}
})



