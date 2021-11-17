import React, { useState, useContext } from 'react';
import { translate } from '../../../i18n/src/locales';
import OneSignal from 'react-native-onesignal';
import {
  TouchableOpacity,
  View,
  Text
} from "react-native";
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Auth } from 'aws-amplify';
import context from '../../contexts/mainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
const Login = ({ navigation }) => {

  const mainContext = useContext(context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const sendLogin = async () => {

    if (!email) {
      setErrorMessage('E-mail não pode ficar em branco')
      return;
    }
    if (!password) {
      setErrorMessage('Senha não pode ficar em branco')
      return;
    }

    setErrorMessage('')
    try {
      mainContext.setLoad(true);
      
      await Auth.signIn(email, password)
      const user = await Auth.currentAuthenticatedUser().catch(err =>

        console.log(err)

      )

      console.log('jwt',user.signInUserSession.idToken.jwtToken)
      console.log('sub',user.signInUserSession.idToken.payload.sub)

      const userLogged = await api.post('/getUserInfo', {

        "client_id": user.signInUserSession.idToken.payload.sub
      }, {

        headers: {
          Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`

        }
      })

      console.log(userLogged.data)

      await AsyncStorage.multiSet([
        ['jwtToken', user.signInUserSession.idToken.jwtToken],
        ['userId', user.signInUserSession.idToken.payload.sub],
        ['refreshToken', user.signInUserSession.refreshToken.token]
      ])
      console.log("Setou external ID",user.signInUserSession.idToken.payload.sub)
      OneSignal.setExternalUserId(user.signInUserSession.idToken.payload.sub)
      mainContext.setUserData(userLogged.data)
      mainContext.setLoad(false);
      mainContext.setLogged(true);



    }
    catch (err) {
      if (err.code == "NotAuthorizedException")
        setErrorMessage('Email ou senha incorreto')
      if (err.code == "UserNotConfirmedException")
        setErrorMessage('É necessário confirmar o seu email ')
        
        console.log(err)
        console.log(err.config)
  
      mainContext.setLoad(false);
    
    }
  }


  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={[styles.container]} >
        <View style={{ alignItems: 'center', width: '100%' }}>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>{translate('login_hello_message')}</Text>
          </View>
          <View style={[styles.inputsContainer]}>
            <Input onChangeText={setEmail} value={email} width={'80%'} name={translate('email')} />

            <Input onChangeText={setPassword} value={password} secureTextEntry={true} keyboardType='email-address' autoCompleteType='email' width={'80%'} style={{ width: '80%' }} name={translate('password')} />
            <Text style={{ color: '#d00', fontSize: 15, textAlign: 'left', width: '80%' }}>{errorMessage}</Text>
            <TouchableOpacity style={{width: '80%' }} onPress={()=> navigation.navigate("ForgotPass")}> 
              <Text style={{ color: '#d00', fontSize: 15, textAlign: 'left', width: '80%' }}>{translate('miss_pass')}</Text>
            </TouchableOpacity>
            <View style={[styles.buttonContainer]}>
              <Button onPress={() => sendLogin()} width={'50%'} text={translate('login')} style={{ marginLeft: 0 }} />
            </View>
       
          </View>
        </View>
        <View style={[styles.createNowContainer]}>
          <Text style={styles.dont_have_account}>{translate('dont_have_account')}</Text>
          <TouchableOpacity onPress={() => { navigation.navigate("Register") }}><Text style={styles.create_now}>{translate('create_now')}</Text></TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}


export default Login;