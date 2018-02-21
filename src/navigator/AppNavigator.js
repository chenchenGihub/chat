import React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator.js';
import axios from 'axios'
import DeviceInfo from 'react-native-device-info'

import Login from '../container/login/login.js'
import Auth from '../container/auth/auth.js'
import Register from '../container/register/register.js'
import WorkerInfo from '../container/workerInfo/workerinfo.js'
import BossInfo from '../container/bossInfo/bossinfo.js'
import TabBarIcon from '../container/tabbar/tabbar.js'
import UserDetail from '../container/userdetail/userdetail.js'
import ChatTo from '../container/chatto/chatto.js'
import { updateUserInfo,logout } from '../redux/user.redux.js'
import { port } from '../utils/dev'

export const RootNavigator = StackNavigator({
  Auth:{
    screen:Auth,
  },
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
  WorkerInfo: {
    screen: WorkerInfo,
  },
  BossInfo: {
    screen:BossInfo
  },
  TabBarIcon:{
    screen:TabBarIcon
  },
  UserDetail:{
    screen:UserDetail
  },
  ChatTo:{
    screen:ChatTo
  }
},
{
    headerMode: 'screen',
    transitionConfig:()=>({
        screenInterpolator:CardStackStyleInterpolator.forHorizontal
    })
}
);

//const AppNavigatorWithState =({ dispatch, nav, userinfo })=>(<RootNavigator userinfo={userinfo} navigation={addNavigationHelpers({ dispatch, state: nav })}/>)
@connect(
  state=>state,
  {updateUserInfo,logout}
  )
export default class AppNavigatorWithState extends React.Component{

componentDidMount() {
  storage.load({
          key: 'user'
        }).then(user => {
          //如果找到数据，则在then方法中返回
         axios.post(`${port}/user/info`,{userId:user._id,deviceUniqueId:DeviceInfo.getUniqueID()}).then(res=>{
        if(res.status===200){
          if(res.data.code===0){
            socket.emit("setName",res.data.data._id)//用户上线
            this.props.updateUserInfo(res.data.data);
          }else{
            console.log('not login')
            this.props.navigation.dispatch(NavigationActions.navigate({"routeName":"Login"}));
          }
        }
       })
        
        }).catch(err => {
          // 如果没有找到数据且没有sync方法，
          // 或者有其他异常，则在catch中返回
         // console.log(this.props,storage)
          this.props.logout();
        })

        

   }

  render(){
    const { dispatch, nav } = this.props;
    
    return <RootNavigator navigation={addNavigationHelpers({ dispatch, state: nav })}/>
  }
}


