import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { options } from 'react-native-joi';
import { TextInputMask } from 'react-native-masked-text'
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Input = ({ name, onChangeText, width, secureTextEntry, value, type, options, keyboardType,onFocus }, props) => {

  const [showPass, setShowPass] = useState(false);

  return (
    <View style={[styles.Input, width && { width }]} >
      <Text style={styles.Text}>{name ? name : "Padrão"}</Text>
      {type ?
        <>
          <TextInputMask
            type={type}
            options={options}
            onChangeText={(txt) => { onChangeText(txt) }}
            value={value}
            style={styles.TextInput}
            
            keyboardType={keyboardType}
            {...props}
          />

        </>
        : <View style={{display:'flex',flexDirection:'row'}}>
         
          <TextInput
          onFocus={()=>onFocus && onFocus()}
            autoCapitalize='none'
            onChangeText={(txt) => { onChangeText(txt) }}
            style={[styles.TextInput,{width:secureTextEntry ?'90%':'100%'}]}
            secureTextEntry={showPass?false:secureTextEntry?true:false }
            
            {...props}
            value={value}
          />
          {secureTextEntry &&
            <TouchableOpacity onPress={()=>setShowPass(!showPass)}>
              <Feather name={showPass?"eye-off":"eye"} size={20} color="#444" />
            </TouchableOpacity>
          }
        </View>}



    </View>

  );
}

export default Input;