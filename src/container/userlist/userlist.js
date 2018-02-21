/*flow*/
import React from 'react'
import {
	View, 
	Text, 
	StyleSheet,
	FlatList,
	Dimensions,
	Image,
	SectionList,
	BackHandler 
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Header, List, ListItem ,Card} from 'react-native-elements'
import axios from 'axios'
import autobind from 'autobind-decorator';
import Drawer from 'react-native-drawer'


import { GetUserList } from '../../redux/chatUser.redux'
import { goToDetail } from '../../redux/user.redux'
import Avatar from '../../component/topheader/avatar'
import Title from '../../component/topheader/title'
import RightComponent from '../../component/topheader/rightComponent'
import Mine from '../mine/mine'
import SectionHeader from '../../component/sectionlist/sectionheader.js'
import SectionItem from '../../component/sectionlist/sectionitem.js'
import { shallowEqual,pinyinsort } from '../../utils/utils'

import LeftHeader from '../../component/header'

const { width,height } = Dimensions.get('window');

@connect(
	state=>state,
	{GetUserList,goToDetail}
	)
export default class UserList extends React.Component{

	componentDidMount() {
	  this.props.GetUserList(!this.props.users.type)
	  //BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
	}

	componentWillReceiveProps(nextProps:Object) {
	  if(this.props.state.index===1){
	  	//this._drawer.close()
	  }
	}

	shouldComponentUpdate(nextProps:Object, nextState:Object) {

	  	return !shallowEqual(nextProps.chatUser,this.props.chatUser)

	}

	componentWillUnmount() {
		//BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
	  
	}

	  @autobind
	  onBackPress(){

	    const { nav } = this.props;
	    if (nav.index === 0) {
	      return false;
	    }
	    //dispatch(NavigationActions.back());
	    //this.props.goback()
	    return true;
	  };

	@autobind
	_goToChat(v){
		this.props.goToDetail(v)
	}

	@autobind
	 _renderItem({item}){
	    return <SectionItem style={styles.sectionItem} item={item} goToDetail={this._goToChat}/>
  	}

	@autobind
	_sectionHeader({section}){
    return <SectionHeader style={styles.sectionHeader} section={section}/>
  	}

  	@autobind
  	_ItemSeparator(){
  		return (<View style={styles.itemSeparator}/>)
  	}

  	@autobind
  	_ListFooter(){
  		return (<View style={styles.listfooter}>
  					<Text style={styles.listfooterText}>共{this.props.chatUser.userList.length}联系人</Text>
  				</View>)
  	}

  	@autobind
  	_openControlPanel(){
  		this._drawer.open()
  	}

	render(){
		
		const { userList } = this.props.chatUser;
		//console.log(userList)

		return(
				<View style={styles.container}>
					<Header
					  leftComponent={<Avatar source={this.props.users.avatarurl} style={styles.avatar} openControlPanel={this.props.openControlPanel}/>}
					  centerComponent={<Title text={'联系人'} style={styles.title}/>}
					  rightComponent={<RightComponent/>}
					/>
					
					<SectionList
					  renderItem={this._renderItem}
					  renderSectionHeader={this._sectionHeader}
					  sections={userList}
					  keyExtractor={()=>Math.random()}
					  ItemSeparatorComponent={this._ItemSeparator}
					  ListFooterComponent={this._ListFooter}
					/>
				</View>	
		)
	}
}

const styles=StyleSheet.create({
	container:{
		flex:1
	},
	title:{
		color:'#f8f9fd',
		fontSize: 20,
	},
	avatar:{
		marginTop: width*0.02,
	},
	sectionHeader:{
		height:width*0.06,
		width:width,
		backgroundColor: '#c0c3c3',
		justifyContent: 'center',
		paddingLeft:width*0.04 ,
	},
	sectionItem:{
		flex:1,
		height:width*0.14,
		width:width,
		justifyContent: 'center',
		paddingLeft:width*0.04 ,
	},
	itemSeparator:{
		height:1,
		width:width,
		backgroundColor:'#d1d3d9',
		marginLeft: width*0.04,
	},
	listfooter:{
		height:width*0.2,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopWidth: 2,
		borderTopColor: '#d1d3d9',
		borderStyle: 'solid',
	},
	listfooterText:{
		fontSize: 20,
		fontWeight: 'bold',
	}
})


