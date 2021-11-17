import React, { useState, useContext } from 'react';
import { translate } from '../../../i18n/src/locales'
import {
  TouchableOpacity,
  View,
  Text,
  ToastAndroid
} from "react-native";
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Auth } from 'aws-amplify';
import context from '../../contexts/mainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
const ForgotPass = ({ navigation }) => {

  const mainContext = useContext(context)
  const[password,setPassword] = useState('')
  const[confirmPassword,setConfirmPassword] = useState('')
  const[code,setCode] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [emailSended, setEmailSended] = useState(false)

const showToast = () => {
    ToastAndroid.show(translate('diferent_passwords'), ToastAndroid.SHORT);
  };

const verifyAccount = async () => {
  try {
    if(password === confirmPassword){
      await Auth.forgotPasswordSubmit(email,code,password)
    }else{
      showToast()
    }
  } catch (err) {
    console.log(err)
  }
}

  const sendRecovery = async () => {

    try {
      await Auth.forgotPassword(email)
      setEmailSended(true)
    }
    catch (err) {

      console.log(err)
    }
  }


  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={[styles.container]} >
        <View style={{ alignItems: 'center', width: '100%' }}>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>{translate('password_recovery_message')}</Text>
          </View>
            {emailSended ?
            <>
              <Text style={{ color: '#d00', fontSize: 15, textAlign: 'left', width: '80%' }}>{errorMessage}</Text>
              <Input onChangeText={setCode} value={code} width={'80%'} name={translate('code')} />
              <Input onChangeText={setPassword}  secureTextEntry={true} value={password} width={'80%'} name={translate('password')} />
              <Input onChangeText={setCode}  secureTextEntry={true}  value={confirmPassword} width={'80%'} name={translate('confirm_password')} />
            

              <Text style={{ color: '#d00', fontSize: 15, textAlign: 'left', width: '80%' }}>{errorMessage}</Text>
              <View style={[styles.buttonContainer]}>
                <Button onPress={() => {
                  verifyAccount()
                }
                } width={'50%'} text={translate('continue')} style={{ marginLeft: 0 }} />
              </View>
              </>
            :
            <>
              <View style={[styles.inputsContainer]}>
                <Input onChangeText={setEmail} value={email} width={'80%'} name={translate('email')} /> 
                <Text style={{ color: '#d00', fontSize: 15, textAlign: 'left', width: '80%' }}>{errorMessage}</Text>
                <View style={[styles.buttonContainer]}>
                  <Button onPress={() => {
                    sendRecovery()
                  }
                  } width={'50%'} text={translate('continue')} style={{ marginLeft: 0 }} />
                </View> 
              </View> 
            </>
          }

          </View>
        </View>
        
    </KeyboardAwareScrollView>
  )
}


export default ForgotPass;