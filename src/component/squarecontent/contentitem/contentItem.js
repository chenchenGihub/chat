import React from 'react';
import { 
  View,
  Text ,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import shallowequal from 'shallowequal';
import FastImage from 'react-native-fast-image';

import  { AuthorBox } from './AuthorBox';
import  { Operation } from './Operation';


export default class ContentItem extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };


shouldComponentUpdate(nextProps, nextState) {
 return !shallowequal(this.props, nextProps)||!shallowequal(this.state,nextState);
}


  

  render() {
   console.log(this.props)
    const TouchableButton = Platform.OS==='ios'?TouchableOpacity:TouchableNativeFeedback
    //const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableButton onPress={this._onPress} >
        <View style={this.props.contentItemstyle}>
          <AuthorBox 
            author={this.props.author}
            subscribe={this.props.subscribe}
            
            publishtime={this.props.date}
            hideOperate={this.props.hideOperate}
            AuthorBoxStyle={this.props.AuthorBoxStyle}
          />
          <ImageBox 
            title={this.props.title}
            img={this.props.images}
            ImageBoxStyle={this.props.ImageBoxStyle}
          />
          <Operation
            repost={this.props.repost}
            sendcomment={this.props.sendcomment}
            vote={this.props.vote}
            OperationStyle={this.props.OperationStyle}
          />

        </View>
      </TouchableButton>
    );
  }
}