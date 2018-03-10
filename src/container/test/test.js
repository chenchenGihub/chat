import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
// import Tab1 from './tabOne';
// import Tab2 from './tabTwo';
import { View,Text,TextInput } from 'react-native';

class Tab1 extends Component {
  render() {
    return (
        <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: "red",}}>
          <Text>Tab1</Text>
        </View>
    );
  }
}

class Tab2 extends Component {
  render() {
    return (
        <View style={{flex:1,justifyContent: 'center',alignItems: 'center',backgroundColor: "#35ffff",}}>
          <Text>12321312</Text>
        </View>
    );
  }
}



export default class Test extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      inform:"@1024",
      //text:''
    };
  }

  // _onChangeText=(v)=>{
  //   this.setState(preState=>{

  //     console.log(preState.inform)

  //     let opterate=v.length-preState.inform.length

  //     if(opterate<0&&){
  //       preState.text=''
  //     }
  //     return{inform:v}
  //   })
  //   // if(this.state.text.indexOf(v)){
  //   //   this.state.text.splice(this.state.text.indexOf(v))
  //   // }

  //   console.log(v)
    
  // }

  render() {
    return (
      <View style={{flex:1,justifyContent: 'center',alignItems: 'flex-start'}}>
       <View style={{width: 200,height:100,backgroundColor: "#b4b7b7",justifyContent: 'center',}}>
         <TextInput
          value={this.state.inform}
          onChangeText={this._onChangeText}
          placeholder="....."
         />
       </View>
      </View>
    );
  }
}



