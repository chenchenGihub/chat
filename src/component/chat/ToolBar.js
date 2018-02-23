import React from 'react';
import { 
		View,
		Text,
		ScrollView,
		TouchableWithoutFeedback,
		Animated,
		Dimensions,
		Image,
		StyleSheet,
		Platform,
 }from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';


const { width,height } = Dimensions.get('window');

import emoji from '../../constant/constant.js';
import { shallowEqual } from '../../utils/utils';

const iconName=['image','camera']

 export  default  class ToolBar extends React.Component{
 	constructor(props){
        super(props);
        this.state={
            //当前显示的图片索引
            currentIndex:0,
            //在线图片数据
            // imgDate:[
            //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494233305839&di=e1647289d1fcd778f64ddf3ccaf6fcfa&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1016%2Fgha%2F1%2F1350006791532.jpg",
            //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494232883125&di=c8234065f7872532308c5396e0fcd3b8&imgtype=0&src=http%3A%2F%2Fimg1.91.com%2Fuploads%2Fallimg%2F130514%2F32-1305141I359.jpg",
            //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494236734637&di=bb81b0fa9b2040542a4a6f9fcc2d0359&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2012%2F1016%2Fgha%2F1%2F1350006753179.jpg",
            //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494236802350&di=72da30f79403ec28b124424f2c24a9f6&imgtype=0&src=http%3A%2F%2Ftupian.enterdesk.com%2F2014%2Flxy%2F2014%2F09%2F16%2F8.jpg"
            // ]
        };
        
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.onAnnotationEnd = this.onAnnotationEnd.bind(this)
    }
    componentDidMount(){
      
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   return !shallowEqual(nextProps,this.props)
    // }

    //点击圆点，关闭定时器，并设置当前图片索引
    dotClick(index){
       
        this.setState({
            currentIndex:index
        },()=>{
            var ScrollView = this.refs.scrollView;
            const currentX = this.state.currentIndex*Dimensions.get('window').width;
            ScrollView.scrollResponderScrollTo({x:currentX,animated:true})
        })
    }

    //开始拖动，关闭定时器
    dragStart(){
       
    }

    //拖动结束，开启定时器
    dragEnd(){
       
    }



    //当一帧滚动完毕时，重新设置当前图片的索引
    onAnnotationEnd(e){
        const offSetX = e.nativeEvent.contentOffset.x;
        const currentIndex = offSetX/Dimensions.get('window').width;
        this.setState({
            currentIndex:currentIndex
        })
    }

    inputEmoji(ele){
    	console.log(ele)
    }

    renderDashBoard=()=>{
        return (
            <View style={styles.emojiBox}>
                <TouchableWithoutFeedback onPress={()=>{console.log(123)}}>
                <View style={{flexDirection: 'row',}}>
                    <View  style={styles.operateIconBox}>
                        <Entypo name='image' size={40}/>
                        <Text>相册</Text>
                    </View>
                    <View  style={styles.operateIconBox}>
                        <Entypo name='camera' size={40}/>
                         <Text>拍摄</Text>
                    </View>
                    <View  style={styles.operateIconBox}>
                        <Entypo name='location-pin' size={40}/>
                         <Text>位置</Text>
                    </View>
                </View>
                    
                </TouchableWithoutFeedback>
            </View>
        )
    }

    render() {

    	console.log("ToolBar",this.props)

        const { currentIndex } = this.state;
 
        const { ToolBarHeight } = this.props;

        const imgDataList = emoji.map((elem,index)=>{
            return(
                //<Image key={index} style={{width:width,height:width*0.8}} source={{uri:elem}} />
                <View key={index} style={styles.emojiBox}>
                	{
                		elem.map((ele,index)=>{
                			return(
                				<TouchableWithoutFeedback key={index} onPress={()=>{this.inputEmoji(ele)}}>
                					<View  style={styles.emojisort}>
                						<Text style={styles.emojiText}>{ele}</Text>
                					</View>
                				</TouchableWithoutFeedback>
                					
                				)
                		})
                	}
                </View>
            )
        });
      // const dotList = emoji.map((elem,index)=>{
      //     return (
      //     		<TouchableWithoutFeedback onPress={()=>{this.dotClick(index)}} key={index}>         			
      //           	<View style={[styles.dotStyle,{backgroundColor:currentIndex===index?"red":"#eee"}]}/>
      //     		</TouchableWithoutFeedback>
      //     )
      // })
    return (
      <View style={[styles.carousel,{height:258}]}>

            <View> 
                 <ScrollView
                     ref="scrollView"
                     horizontal={true}
                     showsHorizontalScrollIndicator={false}
                     pagingEnabled={true}
                     onScrollBeginDrag={this.dragStart}
                     onScrollEndDrag={this.dragEnd}
                     onMomentumScrollEnd={this.onAnnotationEnd}

                 >
                     {this.renderDashBoard()}
                 </ScrollView>
                 {/*{ToolBarHeight?(<View style={styles.dotView}>{dotList}</View>):null}*/}
            </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    dotStyle:{
        width:12,
        height:12,
        borderRadius:6,
        marginRight:10,
        backgroundColor: 'transparent',
    },
    dotView:{
        flexDirection:'row',
       	justifyContent: 'center',
        bottom:width*0.04,
    },
    emojiBox:{
    	flexDirection: 'row',
    	flexWrap: 'wrap',
    	width:width,
    	backgroundColor: "#ffffff",
    },
    carousel:{
    	backgroundColor: "#fff",
        flex:1
    },
    emojisort:{    	
    	padding: width*0.02,
    },
    emojiText:{
    	fontSize: Platform.OS==='ios'? 25 : 20,
    },
    operateIconBox:{
        borderWidth: 1,
        borderColor: '#eaeaea',
        borderStyle: 'solid',
        width:width*0.2,
        height:width*0.2,
        borderRadius:width*0.02,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width*0.1,
        marginLeft: width*0.1,
    },
});

