import React from 'react';
import {
	View, 
	Text, 
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback,
	Platform,
   Modal
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';



const { width,height } = Dimensions.get('window');


export default PreviewImage =({source,modalVisible})=>{
	
console.log(source)

  if(modalVisible){   
      return (      
        <View style={{marginTop: 22}}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
           <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>

            </View>
           </View>
          </Modal>

          <TouchableHighlight onPress={() => {
            this.setModalVisible(true)
          }}>
            <Text>Show Modal</Text>
          </TouchableHighlight>

        </View>

      );
  }

  return null
  
  
}

const styles = StyleSheet.create({
  
  gridBox:{
  	flex:1
  },
  pic:{
    height:width*0.1,
    width:width,
   
  },
  imgBox:{
    //padding: width*0.004,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleBox:{
    borderWidth: width*0.002,
    borderColor: '#fff',
    borderStyle: 'solid',
    width:width*0.06,
    height:width*0.06,
    borderRadius: width*0.05,
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    top:width*0.01,
    right:width*0.01,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checked:{
    width:width*0.017,
    height:width*0.035,
    borderRightWidth: width*0.004,
    borderRightColor: '#1500b7',
    borderStyle: 'solid',
    borderBottomWidth: width*0.004,
    borderBottomColor: '#1500b7',
    borderStyle: 'solid',
    transform:[{rotateZ:"45deg"}],
    marginBottom: width*0.010,
  }
});


