import React from 'react';
import { View, Text,Platform } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';

const PickerElm = ({ hideName,name,width,options,onValueChange,value }, props) => {

  return (
    <View style={[styles.Input, width && { width },Platform.OS == "ios" && {borderBottomWidth:0}]} >
      {!hideName &&
      <Text style={styles.Text}>{name ? name : "Padrão"}</Text>
}
      <Picker

      style={{width:'100%',padding:0,margin:0}}
      selectedValue={value}
      onValueChange={(value)=>onValueChange(value)}
      >
            {options.map(elm => <Picker.Item value={elm.value} key={Math.random()} label={elm.label}/>)}

      </Picker>
      


    </View>

  );
}

export default PickerElm;