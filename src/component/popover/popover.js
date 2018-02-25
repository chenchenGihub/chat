import React from 'react';
import { Button, StyleSheet, Text, View,Dimensions,TouchableOpacity } from 'react-native';
import Popover, { PopoverTouchable } from 'react-native-modal-popover';
 const { width,height } = Dimensions.get('window');
const styles = StyleSheet.create({
  app: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c2ffd2',
  },
  content: {
    padding: 16,
    backgroundColor: 'pink',
    borderRadius: 8,
  },
  arrow: {
    borderTopColor: 'pink',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
});
 
const PopOver = () => (
  <View style={styles.app}>
    
      <PopoverTouchable onPopoverDisplayed={() => console.log('Popover displayed!')}>
      <TouchableOpacity>
          <Text>121312312</Text>
      </TouchableOpacity>
      <Popover
          placement='bottom'
        contentStyle={styles.content}
        arrowStyle={styles.arrow}
        backgroundStyle={styles.background}
        visible={false}
      >
          <TouchableOpacity >
            <Text >Block User</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() =>{this.popupDialog.show()}}>
            <Text >Report User</Text>
          </TouchableOpacity>
  </Popover>
</PopoverTouchable>
   
  </View>
);
 
export default PopOver;