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
	Modal,
	ProgressBar,
	ProgressViewIOS,
	Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const { width,height } = Dimensions.get('window');



export default class Focus extends React.PureComponent{
	

constructor(props) {
  super(props);

  this.state = {
  	
  };

  
}



// shouldComponentUpdate(nextProps, nextState) {
//   return !shallowEqual(nextState,this.state)
// }



	componentDidMount() {
	  
	}

	render(){

		console.log("focus")

		return(
			<View style={styles.container}>
					
        	<Text>{'focus'}</Text>
		</View>		
		)
	}
}

const styles = StyleSheet.create({
  
  container:{
  	flex:1,
  	justifyContent: 'center',
  	alignItems: 'center'
  },
  header:{
  	height:height*0.1,
  	width:width,
  	backgroundColor: '#c500b6',
  },
  text:{
  	color:'#120909'
  },
  title:{
		color:'#f8f9fd',
		fontSize: 20,
	},
  progressView: {
    marginTop: 20,
    marginLeft:10,
    marginRight:10,
  }
});


