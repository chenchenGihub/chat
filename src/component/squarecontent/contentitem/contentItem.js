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
  


shouldComponentUpdate(nextProps, nextState) {
 return !shallowequal(this.props.item, nextProps.item)||!shallowequal(this.state,nextState);
}

componentWillUnmount() {
  console.log("ContentItem Unmount")
}
  

  render() {
   
   const { imgs } =this.props
   let Images=Array.isArray(imgs)?imgs:[imgs];
   console.log(this.props.item)
    const TouchableButton = Platform.OS==='ios'?TouchableWithoutFeedback:TouchableNativeFeedback
   
    return (
      <TouchableButton onPress={()=>this.props.goToUserMainPage(this.props.item)} >
        <View style={this.props.contentItemstyle}
              pointerEvents={"box-none"}
        >
          
          
            
          
              <AuthorBox 
                onPress={this._onPress}
                author={this.props.author}
                subscribe={this.props.subscribe}
                goToUserDetail={this.props.goToUserDetail}
                publishtime={this.props.date}
                hideOperate={this.props.hideOperate}
                AuthorBoxStyle={this.props.AuthorBoxStyle}
              />

         
          
              <TitleBox title={this.props.title} BoxStyle={this.props.BoxStyle}/>
               
        
          
          <ImageBox 
            imgs={Images}
            ImageBoxStyle={this.props.ImageBoxStyle}
            //onlayout={this.props.onlayout}
            BoxWidth={this.props.width}
            BoxHeight={this.props.height}
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