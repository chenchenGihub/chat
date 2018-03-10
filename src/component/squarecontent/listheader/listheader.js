import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
const { width,height } = Dimensions.get('window');

export default class ListHeader extends React.Component{
	render(){
		return (
			<View style={styles.listheaderBox}>
				<View style={styles.hotbannerBox}>
					<SimpleLineIcons 
						name='bubble' 
						color="red"
						size={20}
					/>
					<Text style={styles.hotbannerText}>热榜</Text>
					<Text style={styles.hot}>#</Text>
				</View>
				
				
				<View style={styles.topicBox}>
					{
						this.props.hotDatas.map((v,i)=>(
							<View key={i} style={styles.topicContainer}>
								<View style={styles.imageBox}>
									<Image 
										source={require('./avatar.jpg')} 
										resizeMode="cover"
										style={styles.image}
										/>
								</View>
								<View style={styles.topicTitleBox}>
									<View style={styles.titleBox}>
										<Text style={styles.titleText}>{`#${v.title}#`}</Text>
									</View>
									<View style={styles.subtitleBox}>
										<Text style={styles.subtitleText}>{v.subtitle}</Text>
									</View>
								</View>
							</View>		
							))
					}
					
				</View>
			</View>

			)
	}
}


const styles=StyleSheet.create({
	listheaderBox:{
		flexDirection: 'column',
		padding:width*0.02,
		width:width,
		height:width*0.4,
		backgroundColor: "#fff",
		borderBottomWidth: 6,
		borderBottomColor: '#ecf1ed',
		borderStyle: 'solid',
	},
	hot:{
		position: 'absolute',
		left:width*0.013,
		top:width*0.012
	},
	hotbannerBox:{
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		//backgroundColor: "red",
		width:width,
		height:width*0.08,
		marginLeft: width*0.025,
	},
	hotbannerText:{
		marginLeft: width*0.01,
	},
	topicBox:{
		flexDirection: 'row',
		flexWrap: 'wrap',
		//backgroundColor: "#f0b533",
		// width:width,
		// height:width*0.3,
		marginBottom: width*0.04,
	},
	topicContainer:{
		flexDirection: 'row',
		width:width*0.45,
		height:width*0.1,
		//backgroundColor: "#ef0d54",
		marginLeft: width*0.02,
		marginBottom: width*0.04,
		justifyContent: 'flex-start',
	},
	imageBox:{
		//backgroundColor: "#2933f1",
		width:width*0.1,
		height:width*0.1
	},
	topicTitleBox:{
		flexDirection: 'column',
		justifyContent: 'flex-start',
		marginLeft: width*0.03,
		//backgroundColor: "red",
	},
	subtitleBox:{
		padding:width*0.01,
		borderWidth: 0.08,
		borderColor: '#feb9b9',
		borderStyle: 'solid',
		backgroundColor: "#e0a2a4",
		borderRadius: width,
		marginTop: width*0.01,
		padding:width*0.01
	},
	subtitleText:{
		fontSize: width*0.025,
	},
	image:{
		width:width*0.1,
		height:width*0.1
	}
})



