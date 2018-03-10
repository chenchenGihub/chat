import React from 'react';
import { 
  View,
  Text ,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

export default class ContentItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    console.log(this.props)
    const TouchableButton = Platform.OS==='ios'?TouchableOpacity:TouchableNativeFeedback
    //const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableButton onPress={this._onPress} >
        <View style={this.props.contentItemstyle}>
          <Text style={{ color: "red" }}>
            {this.props.content}
          </Text>
        </View>
      </TouchableButton>
    );
  }
}