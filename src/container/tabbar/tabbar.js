/* @flow */
import * as React from 'react'
import { Animated,
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Platform
   } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TabViewAnimated,
  TabBar,
} from 'react-native-tab-view';
import type { Route, NavigationState } from 'react-native-tab-view/types';
import autobind from 'autobind-decorator';
import Drawer from 'react-native-drawer'

import LeftHeader from '../../component/header'
import SimplePage from './SimplePage'
import Msg from '../msg/msg'
import UserList from '../userlist/userlist'
import Square from '../square/square'
import Mine from '../mine/mine'
import Test from '../test/test'
import TopBar from '../topbar/topbar'

import { getMsgList,sendMsg,receiveMsg } from '../../redux/chat.redux'
import { loadData } from '../../redux/data.redux';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type State = NavigationState<
  Route<{
    key: string,
    title: string,
    icon: string,
  }>
>;

const initialLayout = {
  height: Dimensions.get('window').width*0.12,
  width: Dimensions.get('window').width,
};


@connect(
  state=>state,
  {getMsgList,receiveMsg,loadData}
  )
export default class TabBarIcon extends React.PureComponent<*, State> {
  


  state = {
    index: 0,
    routes: [
      { key: '1', title: '消息', icon: 'weibo', color: '#4CAF50' },
      {
        key: '2',
        title: '联系人',
        icon: 'user',
        color: '#F44336',
      },
      { key: '3', title: '广场', icon: 'windows', color: '#3F51B5' },
     // {key: '4', title: 'test', icon: 'windows', color: '#3F51B5' }
    ],
    topbarindex:1
  };

  componentDidMount() {
    
      this.props.getMsgList();
      
      this.props.receiveMsg();
     // this.props.loadData()
  }

  _handleIndexChange = index =>{

    this.setState({
      index,
    });
  }
    
   _handleTopIndexChange=(v)=>{
    //console.log(v)
      this.setState({
        topbarindex:v
      });
   } 

  _renderIndicator = props => {
    const { width, position } = props;
    const inputRange = [
      0,
      0.48,
      0.49,
      0.51,
      0.52,
      1,
      1.48,
      1.49,
      1.51,
      1.52,
      2,
    ];

    const scale = position.interpolate({
      inputRange,
      outputRange: inputRange.map(x => (Math.trunc(x) === x ? 1.1: 0.1)),
    });
    const opacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(x => {
        const d = x - Math.trunc(x);
        return d === 0.49 || d === 0.51 ? 0 : 1;
      }),
    });
    const translateX = position.interpolate({
      inputRange: inputRange,
      outputRange: inputRange.map(x => Math.round(x) * width),
    });
    const backgroundColor = position.interpolate({
      inputRange,
      outputRange: inputRange.map(
        x => props.navigationState.routes[Math.round(x)].color
      ),
    });

    return (
      <Animated.View
        style={[styles.container, { width, transform: [{ translateX }] }]}
      >
        <Animated.View
          style={[
            styles.indicator,
            { backgroundColor, opacity, transform: [{ scale }] },
          ]}
        />
      </Animated.View>
    );
  };

  _renderIcon = ({ route }) => (
    <Icon name={route.icon} size={24} style={styles.icon} />
  );

  _renderBadge = ({ route }) => {
    if (route.key === '1') {
      if(this.props.chat.unread){
      return (
        <View style={styles.badge}>
          <Text style={styles.count}>{this.props.chat.unread}</Text>
        </View>
      )
      }
    }
    return null;
  };

  _getLabelText = ({ route }) => route.title;

  _renderFooter = props => (
    <TabBar
      {...props}
      getLabelText={this._getLabelText}
      renderIcon={this._renderIcon}
      renderBadge={this._renderBadge}
      renderIndicator={this._renderIndicator}
      labelStyle={styles.label}
      tabStyle={styles.tab}
      style={styles.tabbar}
    />
  );

  _renderScene = ({ route }) => {
  //console.log(this.state.index,this.state.routes.indexOf(route),route)
  //   if (Math.abs(this.state.index - this.state.routes.indexOf(route)) >1) {
  //   return null;
  // }
    //console.log(route)
    switch(route.key){
      case '1':
        return <Msg state={this.state} openControlPanel={this._openControlPanel}/>
      case '2':
        return <UserList state={this.state} openControlPanel={this._openControlPanel}/>
      case '3':
        return <TopBar state={this.state} handleTopIndexChange={this._handleTopIndexChange} openControlPanel={this._openControlPanel}/>
    }
  };

  @autobind
    _openControlPanel(){
      this._drawer.open()
    }

  render() {
    //console.log(this.state.topbarindex)
    return (
      <Drawer
       //type='static'
       openDrawerOffset={0.2}
           ref={(ref) => this._drawer = ref}
           content={<Mine />}
           //styles={drawerStyles}
           //panCloseMask={0.2}
           tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
          })}
         tweenDuration={100}
         tweenEasing={"linear"}
         //panThreshold={0.5}
         panOpenMask={this.state.index!==2 ? 0.8:0}
         initializeOpen={false}
         side={'left'}
         useInteractionManager={true}
         //elevation={10}
         acceptTap={true}
         acceptPan={true}
         tapToClose={true}
         negotiatePan={true}//important!!
          >
            <TabViewAnimated
              style={this.props.style}
              navigationState={this.state}
              renderScene={this._renderScene}
              renderFooter={this._renderFooter}
              onIndexChange={this._handleIndexChange}
              animationEnabled={false}
              swipeEnabled={false}
              initialLayout={initialLayout}
              useNativeDriver
            />
      </Drawer>  
    );
  }
}

TabBarIcon.navigationOptions={
  header:null
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#222',
  },
  tab: {
    padding: 0,
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  indicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0084ff',
    margin: 6,
  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: '#f44336',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
});
