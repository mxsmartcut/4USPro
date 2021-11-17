import React, { useState,useContext } from 'react';
import { translate } from '../../../../i18n/src/locales'
import {
  View,
  Text,
} from "react-native";
import { cpf as validatorCpf } from 'cpf-cnpj-validator';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import PickerElm from '../../../components/Picker';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import api from '../../../services/api';
import moment from 'moment';
import * as Yup from "yup";
import context from '../../../contexts/mainContext';
const Register2 = ({ navigation,route }) => {


  const [cpf, setCPF] = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('')
  const [refer, setRefer] = useState('')
  const [celphone, setCelphone] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const mainContext = useContext(context)
  const telephoneCheck = () => {

    if (!/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/.test(celphone)) {

      setErrorMessage(translate('invalid_telephone_format'));
      return false;
    }
    return true;

  }

  const refCheck = async () =>{

    if(refer != ''){
      mainContext.setLoad(true);
      const response = (await api.post('/checkCode', {
        code: refer.toUpperCase(),
      })).data

      console.log(response.exists)
      if (!response.exists) {
        setErrorMessage(translate('invalid_ref_code'));
        mainContext.setLoad(false);
        return false;
      }
  

    }
    mainContext.setLoad(false);
    return true;
  }

  const cpfValidator = () => {

    if (!validatorCpf.isValid(cpf.replace(/[.-]/g, ''))) {
      console.log("Entrou")
      setErrorMessage(translate('invalid_document'));
      return false;
    }
    return true
  }
  const birthdayValidator = () => {

    const data = moment(birthday, "DD/MM/YYYY")
    var years = moment().diff(data, 'years');
    if (years > 100) {
      setErrorMessage(translate('invalid_birthday'));
      return false;

    }
    if (!data.isValid()) {
      setErrorMessage(translate('invalid_birthday'));
      return false;

    }
    return true
  }
  const genderValidation = () => {
    if (!gender) {
      setErrorMessage(translate('select_gender'));
      return false;
    }
    return true;
  }

  const nextStep = async () => {


    if (!cpfValidator()) {
      console.log('cpf inválido')
      return;
    }

    if (!birthdayValidator())
      return;
    if (!genderValidation())
      return;
    if (!telephoneCheck())
      return;
    if (! await refCheck())
      return;
   
    const nextStepData = route.params;

    nextStepData.attributes["custom:nasc"] =  moment(birthday, "DD/MM/YYYY").format('YYYY-MM-DD')
    nextStepData.attributes["custom:sexo"] =  gender
    nextStepData.attributes["custom:cpf"] =  cpf.replace(/[^\d]/g,'')
    //nextStepData.attributes["custom:whatsapp"] =  celphone.replace(/[\s()-]/g,'');
    nextStepData.attributes["custom:refered_by"] =  refer.toUpperCase();

    console.log(nextStepData)

    setErrorMessage('')
    navigation.navigate('Register3',nextStepData)
  }


  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={[styles.container]} >
        <View style={{ alignItems: 'center', width: '100%' }}>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>{translate('second_step_register')}</Text>
          </View>
          <View style={[styles.inputsContainer]}>
            <Input
              type={'cpf'}
              onChangeText={setCPF}
              value={cpf}
              width={'80%'}
              keyboardType='numeric'
              name={translate('cpf')}
            />
            <Input
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY'
              }}
              onChangeText={setBirthday}
              value={birthday}
              width={'80%'}
              keyboardType='numeric'
              name={translate('birthday')}
            />
            <PickerElm
              value={gender}
              width={'80%'}
              name={translate('gender')}
              onValueChange={setGender}
              options={[{ value: '', label: translate('select_input') }, { value: 'H', label: translate('male') }, { value: 'M', label: translate('female') }, { value: 'O', label: translate('other') }]}
            />

            <Input
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }}
              onChangeText={setCelphone}
              value={celphone} width={'80%'} keyboardType='numeric' name={translate('celphone_whatsapp')}
            />
            <Input onChangeText={(e)=>setRefer(e.toUpperCase())} value={refer} width={'80%'} style={{ width: '80%' }} name={translate('refer_code')} />

            <Text style={{ color: '#d00', fontSize: 15, textAlign: 'left', width: '80%' }}>{errorMessage}</Text>
            <View style={[styles.buttonContainer]}>
              <Button onPress={() => nextStep()} width={'50%'} text={translate('continue')} style={{ marginLeft: 0 ,marginBottom:50}} />
            </View>
          </View>
        </View>

      </View>
    </KeyboardAwareScrollView>
  )
}


export default Register2;