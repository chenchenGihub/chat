import React from 'react';
import { 
	View,
	Text,
	StyleSheet,
	Dimensions
} from 'react-native';
import Video from 'react-native-video'; 

const { width,height } = Dimensions.get("window");

export default class VideoBox extends React.PureComponent{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}


	render(){

		const { 
			style,
			source,
			rate,
			volume,
			muted,
			paused,
			repeat,
			playInBackground,
			playWhenInactive,
			ignoreSilentSwitch,
			progressUpdateInterval,
			onLoadStart,
			onLoad,
			onProgress,
			onEnd,
			onError,
			onBuffer,
			onTimedMetadata,
			poster,
			videoStyle
		}=this.props;

		return(
			<View style={style}>
				<Video source={source}   // Can be a URL or a local file.
             //poster={poster}
             posterResizeMode="cover"
             ref={this._playRef}                                      // Store reference
             rate={rate}                              // 0 is paused, 1 is normal.
             volume={volume}                            // 0 is muted, 1 is normal.
             muted={muted}                           // Mutes the audio entirely.
             paused={paused}                          // Pauses playback entirely.
             resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
             repeat={repeat}                           // Repeat forever.
             playInBackground={playInBackground}                // Audio continues to play when app entering background.
             playWhenInactive={playWhenInactive}                // [iOS] Video continues to play when control or notification center are shown.
             ignoreSilentSwitch={ignoreSilentSwitch}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
             progressUpdateInterval={progressUpdateInterval}          // [iOS] Interval to fire onProgress (default to ~250ms)
             onLoadStart={onLoadStart}            // Callback when video starts to load
             onLoad={onLoad}               // Callback when video loads
             onProgress={onProgress}               // Callback every ~250ms with currentTime
             onEnd={onEnd}                      // Callback when playback finishes
             onError={onError}               // Callback when video cannot be loaded
             onBuffer={onBuffer}                // Callback when remote video is buffering
             onTimedMetadata={onTimedMetadata}  // Callback when the stream receive some metadata
             style={videoStyle} />
			</View>

		)
	}
}

const styles=StyleSheet.create({
	
})