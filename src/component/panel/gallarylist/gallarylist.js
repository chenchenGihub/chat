import React from 'react';
import {
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  FlatList,
  ToastAndroid,
  AlertIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


import MyListItem from './mylistitem';
import { ToastMessage } from '../../../utils/utils';


const { width,height } = Dimensions.get('window');


export default class GallaryList extends React.Component{
  

 state = {
    selected: (new Map(): Map<object, boolean>),
    nums:[]
  };

 

 componentWillUnmount() {
   this.props.showtotal(0)
 }

  _keyExtractor = (item, index) => ((item.node.timestamp).toString()+item.node.image.filename);

  _renderItem=({item})=>(<MyListItem
      id={item.node.image}
      onPressItem={this._onPressItem}
      checked={!!this.state.selected.get(item.node.image)}
      itemData={item.node}
      imgWidth={width/this.props.columns}
      dataType={this.props.dataType}
    />)

  _onPressItem = (id: object) => {

  

   
    if(this.state.nums.length>=6&&!this.state.selected.get(id)){
      ToastMessage(Platform.OS,"已超过六张",300)
      return
    }
  

    


    
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle

       let map= selected.entries();
        let nums=[]; 
         for (let [key, value] of map) {
          if(value){
            nums.push(key)
            }
          }
      return {selected,nums};
    },()=>{

      
      this.props.showtotal(this.state.nums)

    });

   

    
  };


  render() {

    console.log(this.props.data)

    //const { selected } = this.state;

    //console.log(selected)

    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        numColumns={this.props.columns}
        initialNumToRender={8}
        initialScrollIndex={0}
        columnWrapperStyle={{borderBottomWidth:2,borderLeftWidth:2,borderColor:'#fff'}}
        showsVerticalScrollIndicator={true}
        //onScrollBeginDrag={()=>this.props.disableSwipeDown(false)}
        //onScrollEndDrag={()=>this.props.disableSwipeDown(true)}
      />
     
    );
  }
}

const styles = StyleSheet.create({
  
  container:{
    flex:1
  },
  headerBox:{
    height:width*0.1,
    width:width,
    backgroundColor: "#454647",
  }
});


