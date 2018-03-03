import React, { Component } from 'react';
import { View,Text } from 'react-native';


​export default class Tab1 extends Component {
  render() {
    return (
        <View style={{flex:1,justifyContent: 'center',,alignItems: 'center',backgroundColor: "red",}}>
          <Text>Tab1</Text>
        </View>
    );
  }
}