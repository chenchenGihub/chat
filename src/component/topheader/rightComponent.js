import React from 'react'
import { View,Text,TouchableOpacity,StyleSheet,Dimensions,findNodeHandle, NativeModules } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Popover, { PopoverTouchable } from 'react-native-modal-popover';

import Button from './Button';

const { width,height } = Dimensions.get('window');

export default class RightComponent extends React.Component{
	state = {
    showPopover: false,
    popoverAnchor: { x: 0, y: 0, width: 0, height: 0 },
  };

  setButton = (e) => {
    console.log(e.nativeEvent.layout)
    const { x,y,width,height } = e.nativeEvent.layout;
    //this.setState({ popoverAnchor: { x, y, width, height } });
    const handle = findNodeHandle(this.button);
    if (handle) {
      NativeModules.UIManager.measure(handle, (x0, y0, width, height, x, y) => {
        console.log(x0, y0, width, height, x, y)
        this.setState({ popoverAnchor: { x:300, y, width, height } });
      });
    }
  };



openPopover = () => {
    this.setState({ showPopover: true })
  };

closePopover = () => this.setState({ showPopover: false });  

render(){
	const {title,style,openModal,openCamera,openVideoPicker,isVisable} = this.props;
	//console.log(showPopover)
	if(title=='广场'){
		return (
			<View style={styles.app}>
				<Button 
				ref={r => {this.button = r}} 
				icon="plus" 
				onPress={this.openPopover} 
				onLayout={this.setButton}
				/>
				
				<Popover
		          placement='bottom'
		          contentStyle={{
				    padding: 20,
				    backgroundColor: '#FFF',
				    borderRadius: 8,
				    width:width*0.4,
				    marginTop:width*0.05
				  }}
		          arrowStyle={{borderTopColor: '#FFF',marginTop: 18,marginLeft: width*0.12,}}
		          backgroundStyle={{
				    backgroundColor: 'rgba(0, 0, 0, 0.5)'
				  }}
				  onClose={() => this.setState({ showPopover: false })}
		          visible={this.state.showPopover}
		          fromRect={this.state.popoverAnchor}
		          duration={80}
		        >
		        <TouchableOpacity onPress={() => this.setState({ showPopover: false })}>
		        	<View style={styles.label}>
		        		<Icon style={styles.icon} name={"file-text"} size={20} color='#245bff'/>
		        		<Text style={styles.textLabel}>发图文</Text>
		        	</View>
		        </TouchableOpacity>
		        <TouchableOpacity onPress={openCamera}>
		        	<View style={[styles.label,{marginVertical: width*0.04,}]}>
		        		<Icon style={styles.icon} name={"video-camera"} size={20} color='#fc4b0d'/>
		        		<Text style={styles.textLabel}>拍视频</Text>
		        	</View>
		        </TouchableOpacity>
		        <TouchableOpacity onPress={openVideoPicker}>
		        	<View style={styles.label}>
		        		<Icon style={styles.icon} name={"file-video-o"} size={20} color='#116c02'/>
		        		<Text style={styles.textLabel}>上传视频</Text>
		        	</View>
		        </TouchableOpacity>
      			</Popover>
				
			</View>
				
				
		)
	}

	return (<View>
		<Icon name={"user"}/>
	</View>)
} 
}

const styles=StyleSheet.create({
 label:{
 	flexDirection: 'row',
 	alignItems: 'center',
 },
 textLabel:{
 	marginLeft: width*0.04,
 },
 icon:{
 	marginLeft:width*0.03
 },
 app: {
    ...StyleSheet.absoluteFillObject,
    flex:1
  },
})

