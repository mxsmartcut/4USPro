import React from 'react';
import { View, Platform ,TouchableOpacity,Image} from 'react-native';
import Checkbox from 'expo-checkbox';
import styles from './styles';
import checkmark from '../../images/checkmark.png';

const CheckBox = ({ setChecked, isChecked, style }) => {
  return (
    <View>
      {Platform.OS == "ios" ?
        <TouchableOpacity onPress={()=>setChecked(!isChecked)} style={{alignItems:"center",borderRadius:3,width:25,height:25,backgroundColor:"#ddd",marginRight:15}}>
          {isChecked && <Image resizeMode="contain" style={{width:'70%',flex:1}} source={checkmark}/>}
        </TouchableOpacity>
        :
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} style={style} />
      }


    </View>
  );
}

export default CheckBox;