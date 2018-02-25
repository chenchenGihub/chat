import React from 'react';
import { StyleSheet, TouchableOpacity,View,Text,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const { width,height } = Dimensions.get('window');

class Button extends React.PureComponent {
  render() {
    const {  onPress, onLayout,style,icon } = this.props;
    return (
      <TouchableOpacity onPress={onPress} onLayout={onLayout}  style={styles.button}>
          <View style={styles.plus}>
            <Icon name={icon} size={24} color={"#000900"}/>
            <Text style={styles.text}>发布</Text>
          </View> 
        </TouchableOpacity>
    );
  }
}

const styles=StyleSheet.create({
  plus:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom:-width*0.02,
    right: width*0.01,
    //marginRight: 300,
    // marginLeft: -50,
    // paddingTop: 20,
    //marginBottom: 200,
  },
  text:{
    fontSize: 10,
    color:"#fff",
    marginLeft: width*0.01,
  }
})

export default Button;