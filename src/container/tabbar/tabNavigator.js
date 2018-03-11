import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from 'react-native-tab-navigator';
import Msg from '../msg/msg'
import UserList from '../userlist/userlist'
import TopBar from '../topbar/topbar'
export class TabBottomNavigator extends React.PureComponent{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	selectedTab:"msg"
	  };
	}


	render(){

		const { Msg,UserList,TopBar,iconStyle } = this.props;

	return(
			<TabNavigator>
			  <TabNavigator.Item
			    selected={this.state.selectedTab === 'msg'}
			    title="消息"
			    renderIcon={() => <Icon name={"weibo"} size={24} style={iconStyle} />}
			    renderSelectedIcon={() => <Icon name={"weibo"} size={24} style={[iconStyle,{color:"#d33332"}]} />}
			    badgeText="1"
			    onPress={() => this.setState({ selectedTab: 'msg' })}>
			    <Msg/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			    selected={this.state.selectedTab === 'userlist'}
			    title="联系人"
			    renderIcon={() => <Icon name={"weibo"} size={24} style={iconStyle} />}
			    renderSelectedIcon={() => <Icon name={"weibo"} size={24} style={[iconStyle,{color:"#d33332"}]} />}
			    //renderBadge={() => <CustomBadgeView />}
			    onPress={() => this.setState({ selectedTab: 'userlist' })}>
			    <UserList/>
			  </TabNavigator.Item>
			  <TabNavigator.Item
			    selected={this.state.selectedTab === 'topbar'}
			    title="广场"
			    renderIcon={() => <Icon name={"windows"} size={24} style={iconStyle} />}
			    renderSelectedIcon={() => <Icon name={"windows"} size={24} style={[iconStyle,{color:"#d33332"}]} />}
			    //renderBadge={() => <CustomBadgeView />}
			    onPress={() => this.setState({ selectedTab: 'topbar' })}>
			    <TopBar/>
			  </TabNavigator.Item>
			</TabNavigator>
			)
	}
}
	
