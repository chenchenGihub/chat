import React from 'react';
import { 
  View,
  Text ,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import shallowequal from 'shallowequal';
import FastImage from 'react-native-fast-image';

import  { AuthorBox } from './AuthorBox';
import  { Operation } from './Operation';
import  { ImageBox } from './ImageBox';
import  { TitleBox } from './TitleBox';


export default class ContentItem extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };


shouldComponentUpdate(nextProps, nextState) {
 return !shallowequal(this.props, nextProps)||!shallowequal(this.state,nextState);
}


  

  render() {
   console.log(this.props)
    const TouchableButton = Platform.OS==='ios'?TouchableWithoutFeedback:TouchableNativeFeedback
    //const textColor = this.props.selected ? "red" : "black";
    return (
      
        <View style={this.props.contentItemstyle}>
          <TouchableButton onPress={this._onPress} >
          <View>
              <AuthorBox 
                author={this.props.author}
                subscribe={this.props.subscribe}
                
                publishtime={this.props.date}
                hideOperate={this.props.hideOperate}
                AuthorBoxStyle={this.props.AuthorBoxStyle}
              />
              <TitleBox title={this.props.title}/>
          </View>
          </TouchableButton>
          <ImageBox 
            title={this.props.title}
            imgs={this.props.imgs}
            ImageBoxStyle={this.props.ImageBoxStyle}
          />
          <Operation
            repost={this.props.repost}
            sendcomment={this.props.sendcomment}
            vote={this.props.vote}
            OperationStyle={this.props.OperationStyle}
          />

        </View>
      
    );
  }
}