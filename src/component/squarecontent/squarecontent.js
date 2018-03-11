import React from 'react';
import { 
	View,
	Text,
	FlatList,
	Dimensions,
	StyleSheet,
	Image
} from 'react-native';

import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import { LargeList } from "react-native-largelist";


import { connect } from 'react-redux';
import shallowequal from 'shallowequal';
import autobind from 'autobind-decorator'

import ContentItem from './contentitem/contentItem.js';
import ListHeader from './listheader/listheader.js';

const { width,height } = Dimensions.get('window');



// @connect(
//   state=>state,
//   {loadData}
//   )
export default class SquareContent extends React.PureComponent{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	refreshing:false
	  };
	}


	// shouldComponentUpdate(nextProps, nextState) {
	//   return !shallowequal(this.props.data.data, nextProps.data.data)||!shallowequal(this.state,nextState);
	// }
	onPressItem=()=>{
		console.log(this.state)
	}

	_keyExtractor = (item, index) => {


			return	item._id
	};

    _header = () => {
    	//console.log(data)
    	return(<ListHeader hotDatas={datas}/>)
    }

    _footer = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是尾部</Text>;
    }

    _separator = () => {
        return <View style={styles.separator}/>;
    }

    @autobind
    _hideOperate(){
    	console.log("_hideOperate")
    }
    @autobind
    _subscribe(){
    	console.log("_subscribe")
    }
    @autobind
    _sendcomment(){
    	console.log("_sendcomment")
    }
    @autobind
    _vote(){
    	console.log("_vote")
    }


	_renderItemData=({item})=>{
		//console.log(item)
		return (
					<ContentItem
					contentItemstyle={styles.contentBox}
					id={item._id}
					author={item.author}
					date={item.date}
					title={item.title}
					content={item.body}
					onPressItem={this.onPressItem}
					hideOperate={this._hideOperate}
					subscribe={this._subscribe}
					AuthorBoxStyle={styles.AuthorBoxStyle}
					OperationStyle={styles.OperationStyle}
					sendcomment={this._sendcomment}
					vote={this._vote}
					ImageBoxStyle={styles.ImageBoxStyle}
				/>
				)
	}



	

	

	render(){
		console.log(this.props)

		const { data } = this.props.data;


		return(
				<View style={{flex:1}}>
                    <FlatList
                    	extraData={this.state}
                    	data={data}
                        ref={(flatList)=>this._flatList = flatList}
                        //ListHeaderComponent={this._header}
                        // ListFooterComponent={this._footer}
                        removeClippedSubviews={false}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItemData}
                        onRefresh={this.refreshing}
                        refreshing={false}
                        keyExtractor={this._keyExtractor}
                        onEndReachedThreshold={0.1}
                        initialNumToRender={10}
                        onEndReached={
                            this._onload
                        }
                        //numColumns ={3}
                        //columnWrapperStyle={{borderWidth:2,borderColor:'black',paddingLeft:20}}

                        //horizontal={true}

                        getItemLayout={(data,index)=>{
                        	
                        	return {length: width*0.6, offset: (width*0.6+6) * index, index}
                        }}

                        />
                    
				</View>

			)
	}
}

const styles=StyleSheet.create({
	contentBox:{
		width:width,
		height:width*0.6,
		backgroundColor: "#fff",
	},
	AuthorBoxStyle:{
		width:width,
		height:width*0.12,
		backgroundColor: "#fff",
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	OperationStyle:{
		width:width,
		height:width*0.12,
		backgroundColor: "#FFF",
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderTopWidth: 1,
		borderTopColor: '#ede9e6',
		borderStyle: 'solid',
	},
	separator:{
		width:width,
		height:6,
		backgroundColor: "#ecf1ed",
	},
	ImageBoxStyle:{
		flex:1,
		backgroundColor: "red",
	}
})


