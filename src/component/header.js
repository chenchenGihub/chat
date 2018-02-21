import React from 'react';
import { 
	View, 
	Text,
	Platform,
	BackHandler,
	Alert,
	TouchableOpacity,
	StyleSheet,
	Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header ,Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import { logout } from '../redux/user.redux.js';

const { width,height } = Dimensions.get('window');

@connect(
	state=>state,
	{ logout }
	)
export default class LeftHeader extends React.Component{

	logoutSubmit(){

		Alert.alert(
            '选择离开将不会保留你...',
            null,
            [
              {text: '执意离去', onPress: () => {
              	storage.remove({
					key: 'user'
				});
				this.props.logout();
				//this.props.navigation.navigate("Login")
              }},
              {text: '让我再想想', onPress: () => null},
            ]
          )
		
	}

	 render(){
		return(
			<View>
				<TouchableOpacity onPress={()=>this.logoutSubmit()} style={{width:20,height:20,borderRadius:10}}>
					<View style={styles.back}>
			    		<View style={styles.backIcon}>
							<Icon name='chevron-left' size={22} color={"#b8baba"}/>
			    		</View>
			    		<View style={styles.backTextBox}>
							<Text style={styles.backText}>退出</Text>
			    		</View>
			    	</View>	
				</TouchableOpacity>
			</View>
			)
	}




}

const styles=StyleSheet.create({
back:{
 	flexDirection:"row",
 	justifyContent: 'center',
 	width:width*0.15
},
backTextBox:{
 	justifyContent: 'center',
 	
},
backText:{
 	color:'#eee'
}
})




