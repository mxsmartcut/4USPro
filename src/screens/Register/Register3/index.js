import React, { useState, useContext } from 'react';
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
import PickerElm from '../../../components/Picker';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Auth } from 'aws-amplify';
import api from '../../../services/api';
import axios from 'axios';
import SelectPicker from 'react-native-select-picker';
import * as Yup from "yup";
import context from '../../../contexts/mainContext';

const Register3 = ({ navigation,route }) => {


  const [cep, setCep] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [validCep, setValidCep] = useState(false);
  const mainContext = useContext(context)

  const checkStreet = () => {

    if (street.length <= 0) {

      setErrorMessage(translate('invalid_street'))
      return false;
    }
    return true;

  }

  const checkNumber =  () => {

    if (number.length <= 0) {

      setErrorMessage(translate('invalid_number'))
      return false;
    }
    return true;
  }

  const checkCep = async () => {


    try {
      mainContext.setLoad(true)
      const data = (await axios.get('https://viacep.com.br/ws/' + cep.replace('-', '') + '/json/')).data

      if (!data.bairro) {

        setErrorMessage(translate('invalid_cep'))
        mainContext.setLoad(false)
        return false

      }
      mainContext.setLoad(false)
      return true
    }
    catch {
      setErrorMessage(translate('invalid_cep'))
      mainContext.setLoad(false)
      return false
    }



  }
  const checkNeighborhood = ()=>{

    if (neighborhood.length <= 0) {

      setErrorMessage(translate('invalid_neighborhood'))
      return false;
    }
    return true;

  }
  const checkCity = ()=>{

    if (city.length <= 0) {

      setErrorMessage(translate('invalid_city'))
      return false;
    }
    return true;

  }

  const nextStep = async () => {
    setErrorMessage('')
    if (!await checkCep())
      return;
    if (!checkStreet())
      return;
    if (!checkNumber())
      return;
    if (!checkNeighborhood())
      return;
    if (!checkCity())
      return;


    const nextStepData = route.params;

    nextStepData.attributes["custom:zip"] = cep.replace(/[-]/g,'');
    nextStepData.attributes["custom:street"] = street;
    nextStepData.attributes["custom:number"] = number;
    nextStepData.attributes["custom:complement"] = complement;
    nextStepData.attributes["custom:neighborhood"] = neighborhood;
    nextStepData.attributes["custom:city"] = city;

    console.log(nextStepData)
    navigation.navigate('Register4',nextStepData)

  }

  const getData = async (cep) => {

    mainContext.setLoad(true)
    const data = (await axios.get('https://viacep.com.br/ws/' + cep + '/json/')).data

    setNeighborhood(data.bairro)
    setCity(data.localidade)
    setStreet(data.logradouro)

    setValidCep(data.localidade ? true : false)
    mainContext.setLoad(false)
  }
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={[styles.container]} >
        <View style={{ alignItems: 'center', width: '100%' }}>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>{translate('third_step_register')}</Text>
          </View>
          <View style={[styles.inputsContainer]}>
            <Input
              type={'custom'}
              options={{ mask: '99999-999' }}
              onChangeText={(txt) => { setCep(txt); if (txt.replace('-', '').length == 8) getData(txt.replace('-', '')); }}
              value={cep}
              width={'80%'}
              keyboardType='numeric'
              name={translate('cep')}
            />
            <View style={{ flexDirection: 'row' }}>
              <Input onChangeText={setStreet} value={street} width={'55%'} name={translate('street')} />
              <Input
                type={'custom'}
                options={{ mask: '99999' }}
                onChangeText={setNumber}
                value={number}
                width={'20%'}
                keyboardType='numeric'
                name={translate('number')}
              />

            </View>
            <Input onChangeText={setComplement} value={complement} width={'80%'} name={translate('complement')} />

            <Input onChangeText={setNeighborhood} value={neighborhood} width={'80%'} style={{ width: '80%' }} name={translate('neighborhood')} />
            <Input onChangeText={setCity} value={city} width={'80%'} style={{ width: '80%' }} name={translate('city')} />

            <Text style={{ color: '#d00', fontSize: 15, textAlign: 'left', width: '80%' }}>{errorMessage}</Text>
            <View style={[styles.buttonContainer]}>
              <Button onPress={() => nextStep()} width={'50%'} text={translate('continue')} style={{ marginLeft: 0 }} />
            </View>
          </View>
        </View>

      </View>
    </KeyboardAwareScrollView>
  )
}


export default Register3;