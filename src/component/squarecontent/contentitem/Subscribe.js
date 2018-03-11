import React from 'react';
import { 
  View,
  Text ,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet
} from 'react-native';
import Feather  from 'react-native-vector-icons/Feather'

export  const Subscribe=({subscribe,SubscribeStyle,color})=>(<View style={SubscribeStyle}>
	<Feather name="plus" size={16} color={color}/>
	<Text style={[{color:color},{fontSize: 14}]}>关注</Text>
</View>)