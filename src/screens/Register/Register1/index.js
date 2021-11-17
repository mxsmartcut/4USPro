import React, { useState,useContext } from 'react';
import { translate } from '../../../../i18n/src/locales'
import {
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions
} from "react-native";
const { height } = Dimensions.get('window')
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import context from '../../../contexts/mainContext';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Auth } from 'aws-amplify';
import api from '../../../services/api';
import * as Yup from "yup";
import { locales } from 'i18n-js';

Yup.setLocale({
  mixed: {
    default: '${path} é inválido',
    required: '${path} é um campo obrigatório',
    oneOf: '${path} deve ser um dos seguintes valores: ${values}',
    notOneOf: '${path} não pode ser um dos seguintes valores: ${values}',
  },
  string: {
    length: '${path} deve ter exatamente ${length} caracteres',
    min: '${path} deve ter pelo menos ${min} caracteres',
    max: '${path} deve ter no máximo ${max} caracteres',
    email: '${path} tem o formato de e-mail inválido',
    url: '${path} deve ter um formato de URL válida',
    trim: '${path} não deve conter espaços no início ou no fim.',
    lowercase: '${path} deve estar em maiúsculo',
    uppercase: '${path} deve estar em minúsculo',
  },
  number: {
    min: 'deve ser no mínimo ${min}',
    max: 'deve ser no máximo ${max}',
    lessThan: 'deve ser menor que ${less}',
    moreThan: 'deve ser maior que ${more}',
    notEqual: 'não pode ser igual à ${notEqual}',
    positive: 'deve ser um número posítivo',
    negative: 'deve ser um número negativo',
    integer: 'deve ser um número inteiro',
  },
  date: {
    min: 'deve ser maior que a data ${min}',
    max: 'deve ser menor que a data ${max}',
  },
  array: {
    min: 'deve ter no mínimo ${min} itens',
    max: 'deve ter no máximo ${max} itens',
  },
});
const Register = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [telephone, setTelephone] = useState('')
  const [name, setName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const mainContext = useContext(context)

  const nameCheck =()=> {
    if (!name) {
      setErrorMessage(translate('invalid_name'));
      return false
    }
    if (!name.includes(' ')) {
      setErrorMessage(translate('invalid_name'));
      return false
    }
    if (name.length < 5) {
      setErrorMessage(translate('invalid_name'));
      return false
    }


    return true;
  }


  const emailCheck = async () => {
    mainContext.setLoad(true);
    
    if (!email) {
      setErrorMessage(translate('email_cant_be_null'));
      return false
    }


    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      setErrorMessage(translate('invalid_email_format'));
      mainContext.setLoad(false);
      console.log(email)
      return false;
    }

    const response = (await api.post('/checkAttribute', {
      attributeName: 'email',
      attributeValue: email.toLocaleLowerCase(),
    })).data

    if (response.message == "used") {
      setErrorMessage(translate('email_in_use'));
      mainContext.setLoad(false);
      return false;
      
    }

    mainContext.setLoad(false);
    return true;
  }
  const telephoneCheck = () => {

    if (!/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/.test(telephone)) {

      setErrorMessage(translate('invalid_telephone_format'));
      return false;
    }
    return true;

  }

  const passwordCheck =  () => {

    if (password.length <8) {

      setErrorMessage(translate('invalid_password_format'));
      return false;
    }

    

    return true;

  }
  const nextStep = async () => {
    
  
      if (!nameCheck())
          return;

    if (!await emailCheck())
      return;

    if (!telephoneCheck())
      return;

    if (!passwordCheck())
      return;


    setErrorMessage('')
    navigation.navigate('Register2',{username:email,password:password,
       attributes:{
         name,
         'custom:phone':telephone.replace(/[\s()-]/g,'')
        }
       
    })


  }


  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={[styles.container]} >
        <View style={{ alignItems: 'center', width: '100%' }}>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>{translate('register_hello_message')}</Text>
          </View>
          <View style={[styles.inputsContainer]}>
            <Input onChangeText={setName} value={name} width={'80%'} name={translate('name')} />
            <Input onChangeText={setEmail} value={email} width={'80%'} name={translate('email')} />
            <Input
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }}
              onChangeText={setTelephone}
              value={telephone} width={'80%'} keyboardType='numeric' name={translate('telephone')}
            />

            <Input onChangeText={setPassword} value={password} secureTextEntry={true} keyboardType='email-address' autoCompleteType='email' width={'80%'} style={{ width: '80%' }} name={translate('password')} />
            <Text style={{ color: '#d00', fontSize: 15, textAlign: 'left', width: '80%' }}>{errorMessage}</Text>
            <View style={[styles.buttonContainer]}>
              <Button onPress={() => nextStep()} width={'50%'} text={translate('continue')} style={{ marginLeft: 0 }} />
            </View>
          </View>
        </View>
        <View style={[styles.createNowContainer]}>
          <Text style={styles.dont_have_account}>{translate('already_registered')}</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('Login') }}><Text style={styles.create_now}>{translate('get_in_now')}</Text></TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}


export default Register;