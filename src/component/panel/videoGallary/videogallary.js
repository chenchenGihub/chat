import React from 'react';
import {
  View, 
  Text, 
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Platform,
  TextInput,
  Button,
  ScrollView,
  PermissionsAndroid,
  TouchableWithoutFeedback
} from 'react-native';
import FontAwesome from  'react-native-vector-icons/FontAwesome';
import Entypo from  'react-native-vector-icons/Entypo';
import Ionicons from  'react-native-vector-icons/Ionicons';

const { width,height } = Dimensions.get('window');


export default class VideoGallary extends React.Component{

 state = {
    selected: (new Map(): Map<string, boolean>)
  };

 

  _keyExtractor = (item, index) => (Math.random()).toString();

  _renderItem=({item})=>(<MyListItem
      id={item.node.timestamp}
      onPressItem={this._onPressItem}
      checked={!!this.state.selected.get(item.node.timestamp)}
      imgurl={item.node.image.uri}
      imgWidth={width/4}
      onPressItem={this._onPressItem}
    />)

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };


  render() {

    console.log(this.state.selected)

    const { data } = this.props;

    return (
      <FlatList
        data={data}
        //extraData={}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) => <Text>{item.node.image.uri}</Text>}
        numColumns={4}
      />
     
    );
  }
}



