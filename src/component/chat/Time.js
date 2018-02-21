import React from 'react';
import { View,Text } from 'react-native';
import moment from 'moment';
import momentLocale from 'moment/locale/zh-cn';
moment.updateLocale('zh-cn', momentLocale);


export default function Time({time,style,textStyle}){

		const times=moment(time).fromNow().includes("分钟前")||moment(time).fromNow().includes("几秒前")?moment(time).fromNow():moment(time).calendar()


// moment("20111031", "YYYYMMDD").fromNow(); // 6 年前
// moment("20120620", "YYYYMMDD").fromNow(); // 6 年前
// moment().startOf('day').fromNow();        // 15 小时前
// moment().endOf('day').fromNow();          // 9 小时内
// moment().startOf('hour').fromNow();       // 39 分钟前


		return(
				<View style={style}>
					<Text style={textStyle}>{times}</Text>
				</View>
			)
	

}