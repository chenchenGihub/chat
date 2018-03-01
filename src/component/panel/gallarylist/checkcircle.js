import React from 'react';
import {
	View,
	TouchableWithoutFeedback,
} from 'react-native';



export default CheckCircle =({checked,BoxStyle,checkedStyle,madeCheck})=>(
     
      <TouchableWithoutFeedback onPress={madeCheck}>
        <View style={[BoxStyle,{backgroundColor: checked? "#b6615b":null}]}>
          {checked?(<View style={checkedStyle}></View>):null}
        </View>
      </TouchableWithoutFeedback>

    );
  


  
  