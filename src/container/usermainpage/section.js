import React from 'react';
import { 
	View, 
	Text,
} from 'react-native';


export const renderSectionHeader = ({section}) => {

	if(section.key=='s1'){
		return null
	}
return(
  <View style={styles.header}>
    <Text style={styles.headerText}>SECTION HEADER</Text>
    <SeparatorComponent />
  </View>
)};

export const renderSectionFooter = ({section}) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>SECTION FOOTER: {section.key}</Text>
    <SeparatorComponent />
  </View>
);

export const CustomSeparatorComponent = ({highlighted,style}) => (
  <View style={[style, highlighted && {backgroundColor: 'rgb(200, 199, 204)'}]}>
    
  </View>
);