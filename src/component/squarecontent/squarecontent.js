import React from 'react';
import { 
	View,
	Text,
	FlatList,
	Dimensions,
	StyleSheet,
	ActivityIndicator
} from 'react-native';

import FastImage from 'react-native-fast-image'

import { connect } from 'react-redux';
import shallowequal from 'shallowequal';
import autobind from 'autobind-decorator'

import RecyclerviewList, { DataSource } from 'react-native-recyclerview-list';

import ContentItem from './contentitem/contentItem.js';
import ListHeader from './listheader/listheader.js';
import { AuthorBox } from './contentitem/AuthorBox.js';
import  { TitleBox } from './contentitem/TitleBox';
import  { Operation } from './contentitem/Operation';
import  { ImageBox } from './contentitem/ImageBox.js';
import  { goToUserMainPage,goback } from '../../redux/user.redux.js';
import { loadData } from '../../redux/data.redux';

const { width,height } = Dimensions.get('window');



@connect(
		state=>state,
		{ goToUserMainPage,goback }
	)
export default class SquareContent extends React.PureComponent{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	refreshing:false,
	  	loading:false
	  };

	}


	// shouldComponentUpdate(nextProps, nextState) {
	//   return !shallowequal(this.props.data.data, nextProps.data.data)||!shallowequal(this.state,nextState);
	// }
	onPressItem=(v)=>{
		
		this.props.goToUserMainPage(v)
	}


	componentWillUnmount() {
	  console.log("SquareContent unmount")
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

    _separator = () =>(<View style={styles.separator}/>);
    
    _renderEmpty = () => (<View style={styles.empty}>
        					<ActivityIndicator/>
        				  </View>);
   
   refreshing=()=>{
   	this.setState({
   		refreshing:true
   	},()=>{
   		this.props._loadData()
   	})
   	
   }

   componentDidUpdate(prevProps, prevState) {
     if(prevState.refreshing){
     	this.setState(prevState=>{
     		return {
     			refreshing:false
     		}
     	})
     }
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
    _goToUserDetail(){
    	console.log("_goToUserDetail")
    }
    @autobind
    _sendcomment(){
    	console.log("_sendcomment")
    }
    @autobind
    _vote(){
    	console.log("_vote")
    }
    @autobind
    _onlayout(e){
    	console.log(e.nativeEvent.layout)
    	this.setHeight(e.nativeEvent.layout.height)
    	this.setWidth(e.nativeEvent.layout.width)
    }

    setHeight(height){
    	this.height=height;
    }

    getHeight(){
    	return this.height
    }


    setWidth(width){
    	this.width=width
    }

    getWidth(){
    	return this.width
    }

	_renderItemData=({item})=>{
		
		return (
					<ContentItem
						item={item}
						contentItemstyle={styles.contentBox}
						id={item._id}
						author={item.author}
						date={item.date}
						title={item.title}
						content={item.body}
						imgs={item.thumbnail||item.body}
						hideOperate={this._hideOperate}
						subscribe={this._subscribe}
						goToUserDetail={this._goToUserDetail}
						AuthorBoxStyle={styles.AuthorBoxStyle}
						OperationStyle={styles.OperationStyle}
						sendcomment={this._sendcomment}
						vote={this._vote}
						ImageBoxStyle={styles.ImageBoxStyle}
						goback={this.props.goback}
						width={width}
						height={height*0.32}
						BoxStyle={styles.BoxStyle}
						goToUserMainPage={this.onPressItem}

				/>
				)
	}



	_renderItem=({item})=>{

		let imgs=item.thumbnail?[item.thumbnail]:item.body

		return (<View style={{flex:1,width:width,height:height*0.6}}>
				<AuthorBox
					author={item.author}
					publishtime={item.date}
					AuthorBoxStyle={styles.AuthorBoxStyle}
				/>
			{item.title ?<TitleBox title={item.title} BoxStyle={styles.BoxStyle}/>:null}
			<ImageBox 
				ImageBoxStyle={styles.ImageBoxStyle}
				imgs={imgs}
				BoxWidth={width}
				BoxHeight={height*0.4}
			/>
			<Operation
            //repost={this.props.repost}
            //sendcomment={this.props.sendcomment}
            //vote={this.props.vote}
            OperationStyle={styles.OperationStyle}
          />
		</View>
		        
		      )
	}

	

	render(){
		console.log(this.props)

		const { data,refreshing,loading } = this.props.data;

		//let dataSource = new DataSource(data, (item, index) => item._id);    

		
			return(
					<View style={{flex:1}}>
	                    <FlatList
	                    	extraData={this.state}
	                    	data={data}
	                        ref={(flatList)=>this._flatList = flatList}
	                        //ListHeaderComponent={this._header}
	                        ListFooterComponent={this._footer}
	                        removeClippedSubviews={false}
	                        ItemSeparatorComponent={this._separator}
	                        ListEmptyComponent={this._renderEmpty}
	                        renderItem={this._renderItemData}
	                        onRefresh={this.refreshing}
	                        refreshing={this.state.refreshing}
	                        keyExtractor={this._keyExtractor}
	                        onEndReachedThreshold={0.01}
	                        initialNumToRender={2}
	                        loading={loading}
	                        onEndReached={
	                            this._onload
	                        }
	                       
	                        getItemLayout={(data,index)=>{
	                        	
	                        	return {length: height*0.6, offset: (height*0.6+6) * index, index}
	                        }}

	                        />
	                    
					</View>

				)
			


		// return (
		//     <RecyclerviewList
		//       style={{ flex: 1 }}
		//       dataSource={dataSource}
		//       initialListSize={2}
		//       renderItem={this._renderItem}
		//       ItemSeparatorComponent={<View style={styles.separator}/>}
		//       ListEmptyComponent={<View style={styles.empty}>
  //       			<ActivityIndicator/>
  //       		</View>}
		//       />

  // 			);

	}
}

const styles=StyleSheet.create({
	contentBox:{
		width:width,
		height:height*0.6,
		backgroundColor: "#fff",
	},
	AuthorBoxStyle:{
		width:width,
		height:height*0.08,
		backgroundColor: "#fff",
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginVertical: width*0.04,

	},
	OperationStyle:{
		width:width,
		height:height*0.08,
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
		flexDirection: 'row',
		backgroundColor: '#fff',
		flexWrap: 'wrap',
		//justifyContent: 'center',
		alignItems: 'center',
	},
	empty:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	BoxStyle:{

		width:width,
		height:height*0.08
	}
})


