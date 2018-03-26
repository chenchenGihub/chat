/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @providesModule ListExampleShared
 */
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  Animated,
  Image,
  Platform,
  TouchableHighlight,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  Dimensions
} = ReactNative;

import Video from 'react-native-video'; 

const { width, height } = Dimensions.get("window");

type Item = { text: any, key: string, paused: boolean, noImage?: ?boolean};

// function genItemData(count: number, start: number = 0): Array<Item> {
//   const dataBlob = [];
//   for (let ii = start; ii < count + start; ii++) {
//     const itemHash = Math.abs(hashCode('Item ' + ii));
//     dataBlob.push({
//       title: 'Item ' + ii,
//       text: LOREM_IPSUM.substr(0, itemHash % 301 + 20),
//       key: String(ii),
//       pressed: false,
//     });
//   }
//   return dataBlob;
// }

const HORIZ_WIDTH = 200;
const ITEM_HEIGHT = 72;

class ItemComponent extends React.PureComponent<{
  fixedHeight?: ?boolean,
  horizontal?: ?boolean,
  item: Item,
  onPress: (key: string) => void,
  onShowUnderlay?: () => void,
  onHideUnderlay?: () => void,
}> {


  constructor(props) {
    super(props);
  
    this.state = {};
    
  }

  _onPress = () => {
    this.props.onPress(this.props.item.key);
  };

  

  render() {
    const {fixedHeight, horizontal, item} = this.props;
   // const itemHash = Math.abs(hashCode(item.title));
    //const imgSource = THUMB_URLS[itemHash % THUMB_URLS.length];
    return (
      <TouchableHighlight
        onPress={this._onPress}
        onShowUnderlay={this.props.onShowUnderlay}
        onHideUnderlay={this.props.onHideUnderlay}
        tvParallaxProperties={{
          pressMagnification: 1.1,
        }}
        style={horizontal ? styles.horizItem : styles.item}>
        <View style={[
          styles.row, horizontal && {width: HORIZ_WIDTH}, fixedHeight && {height: ITEM_HEIGHT}]}>
          
          <Text
            style={styles.text}
            numberOfLines={(horizontal || fixedHeight) ? 3 : undefined}>
            {item.title} - {item.text}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class RenderStackedItem extends React.PureComponent{
  constructor(props) {
    super(props);
  
    this.state = {};

    this.loadStart=this.loadStart.bind(this);
    this.setDuration=this.setDuration.bind(this);
    this.setTime=this.setTime.bind(this);
    this.onEnd=this.onEnd.bind(this);
    this.videoError=this.videoError.bind(this);
    this.onBuffer=this.onBuffer.bind(this);
    this.onTimedMetadata=this.onTimedMetadata.bind(this);

  }
  
  loadStart(data){
    console.log(data)
  }
  setDuration(data){
    console.log(data)
  }
  onEnd(data){
    console.log(data)
  }
  videoError(data){
    console.log(data)
  }
  onBuffer(data){
    console.log(data)
  }
  onTimedMetadata(data){
    console.log(data)
  }
  setTime(data){
    console.log(data)
  }



    _playRef = (ref) => { this._VideoRef = ref; };
    
    render(){
      
        const {
          item,
          loadStart,
          setDuration,
          setTime,
          onEnd,
          videoError,
          onBuffer,
          onTimedMetadata,
        } = this.props;

       
        return (
          <View style={styles.stacked}>
           <Video source={{uri: item.body}}   // Can be a URL or a local file.
             poster={item.thumbnail}
             ref={this._playRef}                                      // Store reference
             rate={1.0}                              // 0 is paused, 1 is normal.
             volume={1.0}                            // 0 is muted, 1 is normal.
             muted={false}                           // Mutes the audio entirely.
             paused={false}                          // Pauses playback entirely.
             resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
             repeat={true}                           // Repeat forever.
             playInBackground={false}                // Audio continues to play when app entering background.
             playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
             ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
             progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
             onLoadStart={this.loadStart}            // Callback when video starts to load
             onLoad={this.setDuration}               // Callback when video loads
             onProgress={this.setTime}               // Callback every ~250ms with currentTime
             onEnd={this.onEnd}                      // Callback when playback finishes
             onError={this.videoError}               // Callback when video cannot be loaded
             onBuffer={this.onBuffer}                // Callback when remote video is buffering
             onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
             style={styles.Video} />
          </View>
        );
    }
}
  
  

class FooterComponent extends React.PureComponent<{}> {
  render() {
    return (
      <View style={styles.headerFooterContainer}>
        <SeparatorComponent />
        <View style={styles.headerFooter}>
          <Text>没有更多</Text>
        </View>
      </View>
    );
  }
}

const HeaderComponent = ({title}) => (
      <View style={styles.headerFooterContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <SeparatorComponent />
      </View>);
  

class SeparatorComponent extends React.PureComponent<{}> {
  render() {
    return <View style={styles.separator} />;
  }
}

class ItemSeparatorComponent extends React.PureComponent<$FlowFixMeProps> {
  render() {
    const style = this.props.highlighted
      ? [styles.itemSeparator, {marginLeft: 0, backgroundColor: 'rgb(217, 217, 217)'}]
      : styles.itemSeparator;
    return <View style={style} />;
  }
}

class Spindicator extends React.PureComponent<$FlowFixMeProps> {
  render() {
    return (
      <Animated.View style={[styles.spindicator, {
        transform: [
          {rotate: this.props.value.interpolate({
            inputRange: [0, 5000],
            outputRange: ['0deg', '360deg'],
            extrapolate: 'extend',
          })}
        ]
      }]} />
    );
  }
}






const HEADER = {height: undefined, width: width};
const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;

function getItemLayout(data: any, index: number, horizontal?: boolean) {
  const [length, separator, header] = horizontal ?
    [HORIZ_WIDTH, 0, HEADER.width] : [ITEM_HEIGHT, SEPARATOR_HEIGHT, HEADER.height];
  return {length, offset: (length + separator) * index + header, index};
}

function pressItem(context: Object, key: string) {
  const index = Number(key);
  const pressed = !context.state.data[index].pressed;
  context.setState((state) => {
    const newData = [...state.data];
    newData[index] = {
      ...state.data[index],
      pressed,
      title: 'Item ' + key + (pressed ? ' (pressed)' : ''),
    };
    return {data: newData};
  });
}

function renderSmallSwitchOption(context: Object, key: string) {
  if (Platform.isTVOS) {
    return null;
  }
  return (
    <View style={styles.option}>
      <Text>{key}:</Text>
      <Switch
        style={styles.smallSwitch}
        value={context.state[key]}
        onValueChange={(value) => context.setState({[key]: value})}
      />
    </View>
  );
}

function PlainInput(props: Object) {
  return (
    <TextInput
      autoCapitalize="none"
      autoCorrect={false}
      clearButtonMode="always"
      underlineColorAndroid="transparent"
      style={styles.searchTextInput}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  headerFooter: {
    ...HEADER,
    padding: width*0.02,
    alignItems: 'center',
  },
  header: {
    ...HEADER,
    padding: width*0.02,

  },
  headerFooterContainer: {
    backgroundColor: 'rgb(239, 239, 244)',
  },
  horizItem: {
    alignSelf: 'flex-start', // Necessary for touch highlight
  },
  item: {
    flex: 1,
  },
  itemSeparator: {
    height: SEPARATOR_HEIGHT,
    backgroundColor: 'rgb(200, 199, 204)',
    marginLeft: 60,
  },
  option: {
    flexDirection: 'row',
    padding: 8,
    paddingRight: 0,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
    paddingVertical: 0,
    height: 26,
    fontSize: 14,
    flexGrow: 1,
  },
  separator: {
    height: SEPARATOR_HEIGHT,
    backgroundColor: 'rgb(200, 199, 204)',
  },
  smallSwitch: Platform.select({
    android: {
      top: 1,
      margin: -6,
      transform: [{scale: 0.7}],
    },
    ios: {
      top: 4,
      margin: -10,
      transform: [{scale: 0.5}],
    },
  }),
  stacked: {
    flex:1,
    alignItems: 'center',
    backgroundColor: 'white',
    width:width,
    height:width*0.5
  },
  Video: {
    flex:1,
    width:width,
    height:width*0.5
  },
  thumb: {
    width: 50,
    height: 50,
    left: -5,
  },
  spindicator: {
    marginLeft: 'auto',
    marginTop: 8,
    width: 2,
    height: 16,
    backgroundColor: 'darkgray',
  },
  stackedText: {
    padding: 4,
    fontSize: 18,
  },
  text: {
    flex: 1,
  },
  title:{
    lineHeight:width*0.05,
    textAlign: 'auto',
    fontSize: width*0.05,
    fontWeight: 'bold',
  }
});

module.exports = {
  FooterComponent,
  HeaderComponent,
  ItemComponent,
  ItemSeparatorComponent,
  PlainInput,
  SeparatorComponent,
  Spindicator,
  //genItemData,
  getItemLayout,
  pressItem,
  renderSmallSwitchOption,
  RenderStackedItem,
};
