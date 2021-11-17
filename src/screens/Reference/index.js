import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';
import Context from '../../contexts/mainContext';
import Clipboard from 'expo-clipboard';
const Reference = () => {

  const copyToClipboard= (copied)=>{
    Alert.alert("Copiado","Seu número de referência foi copiado para area de transferência")
    console.log(copied)
    Clipboard.setString(copied)

  }

  const { userData } = useContext(Context)


  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={[styles.container, { marginTop: 15 }]} >
        <Text>Você ainda não possui pessoas referênciadas.</Text>
        <Text>Mande o codigo abaixo para alguem e ganhe dinheiro !</Text>
        <TouchableOpacity onPress={()=>copyToClipboard(userData.invitation_code)}>
          <Text style={{
            color: "#d9413f",
            fontWeight: 'bold',
            fontSize: 22,
            marginTop: 20
          }}>{userData.invitation_code}</Text>
            </TouchableOpacity>
      </View >
    
    </KeyboardAwareScrollView>


  )
}


export default Reference;