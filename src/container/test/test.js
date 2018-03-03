import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
// import Tab1 from './tabOne';
// import Tab2 from './tabTwo';
import { View,Text } from 'react-native';

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
  render() {
    return (
      <Container>
        
        <Tabs initialPage={1}>
          <Tab heading="Tab1">
            <Tab1 />
          </Tab>
          <Tab heading="Tab2">
            <Tab2 />
          </Tab>
         
        </Tabs>
      </Container>
    );
  }
}