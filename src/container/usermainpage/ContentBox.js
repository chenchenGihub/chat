/**
 * @flow
 */
'use strict';

import React from 'react';
import {
  Alert,
  Animated,
  Button,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';


import {
  HeaderComponent,
  FooterComponent,
  ItemComponent,
  PlainInput,
  SeparatorComponent,
  Spindicator,
  //genItemData,
  pressItem,
  renderSmallSwitchOption,
  //RenderStackedItem,
}   from './ListExampleShared';

import { renderSectionHeader,renderSectionFooter,CustomSeparatorComponent } from './section.js';
import RenderStackedItem from './RenderStackItem';
const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);


export default class ContentBox extends React.PureComponent<{}, $FlowFixMeState> {
  
  constructor(props) {
    super(props);
  
    this.state = {
	  
  	};

    this.loadStart=this.loadStart.bind(this);
    this.setDuration=this.setDuration.bind(this);
    this.setTime=this.setTime.bind(this);
    this.onEnd=this.onEnd.bind(this);
    this.videoError=this.videoError.bind(this);
    this.onBuffer=this.onBuffer.bind(this);
    this.onTimedMetadata=this.onTimedMetadata.bind(this);
  }

  componentWillUnmount() {
    console.log("unmount")
  }

  _scrollPos = new Animated.Value(0);
  _scrollSinkY = Animated.event(
    [{nativeEvent: { contentOffset: { y: this._scrollPos } }}],
    {useNativeDriver: true},
  );

  _sectionListRef: any;
  _captureRef = (ref) => { this._sectionListRef = ref; };
  _VideoRef = (ref) => { this._VideoRef = ref; };

  _scrollToLocation(sectionIndex: number, itemIndex: number) {
    this._sectionListRef
      .getNode()
      .scrollToLocation({ sectionIndex, itemIndex });
  }


  loadStart(data){
  	console.log(data)
  }
  setDuration(data){
  	console.log(data)
  }
  setTime(data){
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

  _renderStackItem=({item})=> (
      <RenderStackedItem 
       item={item} 
      />
  )


  _renderItemComponent = ({item, separators}) => (
    <ItemComponent
      item={item}
      onPress={this._pressItem}
      onHideUnderlay={separators.unhighlight}
      onShowUnderlay={separators.highlight}
    />
  );

  render() {

  	console.log(this.props.data)

  	const  { data } = this.props;

  	console.log(data.title)

    return (
     
        <AnimatedSectionList
          ref={this._captureRef}
          ListHeaderComponent={<HeaderComponent title={data.title}/>}
          ListFooterComponent={FooterComponent}
          SectionSeparatorComponent={(info) =>
            <CustomSeparatorComponent {...info} text="SECTION SEPARATOR" style={styles.customSeparator} />
          }
          ItemSeparatorComponent={(info) =>
            <CustomSeparatorComponent {...info} text="ITEM SEPARATOR" />
          }
         
          enableVirtualization={this.state.virtualized}
          //onRefresh={() => Alert.alert('onRefresh: nothing to refresh :P')}
          onScroll={this._scrollSinkY}
          onViewableItemsChanged={this._onViewableItemsChanged}
          refreshing={false}
          renderItem={this._renderItemComponent}
          renderSectionHeader={renderSectionHeader}
          //renderSectionFooter={renderSectionFooter}
          stickySectionHeadersEnabled
          sections={[
            
            {
              renderItem:this._renderStackItem
              ,
              key: 's1',
              data: [
                { key:data._id,...data},
              ],
            },
           
            
          ]}
          style={styles.list}
          //viewabilityConfig={VIEWABILITY_CONFIG}
        />
      
    );
  }
}
  

  

const styles = StyleSheet.create({
  customSeparator: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#e9eaed',
  },
  headerText: {
    padding: 4,
    fontWeight: '600',
  },
  list: {
    backgroundColor: 'white',
  },
  optionSection: {
    flexDirection: 'row',
  },
  searchRow: {
    paddingHorizontal: 10,
  },
  scrollToRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  separatorText: {
    color: 'gray',
    alignSelf: 'center',
    fontSize: 7,
  },
});


