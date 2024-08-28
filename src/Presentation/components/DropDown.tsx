import React from 'react';
import { View, StyleSheet,Image,StyleProp, TextStyle, } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface DropDownComponentProps {
    image: any;
    label: string;
    items: { label: string; value: string }[];
    value: string | null;
    onValueChange: (value: string | null) => void;
}

const DropDownComponent: React.FC<DropDownComponentProps> = ({
   image,
   label, 
   items, 
   value, 
   onValueChange 
  }: DropDownComponentProps) => {
    return (
      <View style={styles.container}>
          <View>
            <Image source={image} style={styles.formIcon} />
      </View>
        <View style={styles.seleccion}>
           
            <RNPickerSelect

                placeholder={{ label, value: null }}
                items={items}
                value={value}
                onValueChange={onValueChange}
                style={pickerSelectStyles}
            />
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    seleccion: {
        marginTop: 20,
        width: '83%',
        fontSize: 12,
        borderWidth: 0.5,
        borderColor: '#F23469',
        borderRadius: 8,
        color: 'black',
        margin: 0,
    },
    formIcon:{
      width: 45,
      height: 45,
      marginTop: 23,
      marginEnd: 10
    },
    container:{
      flexDirection: 'row',
      padding: 0
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 4,
        paddingHorizontal: 0,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 4,
        color: 'yellow',
        paddingRight: 30,
    } as TextStyle,
    inputAndroid: {        
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'yellow',
        borderRadius: 8,
        color: 'black',
        paddingRight: 0,
    } as TextStyle,
     
});

export default DropDownComponent;
