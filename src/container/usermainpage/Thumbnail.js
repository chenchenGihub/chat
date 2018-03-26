import React from 'react';
import {
	View,
	Text
} from 'react-native';
import FastImage from 'react-native-fast-image'

export const Thumbnail = ({imageBoxStyle,imageBox,source})=>(
<View style={imageBox}>
	<FastImage
    style={imageBoxStyle}
    source={{
      uri: source,
      priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.cover}
  />
</View>
	)