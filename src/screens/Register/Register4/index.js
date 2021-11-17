import React, { useState } from 'react';
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
import SelectPicker from 'react-native-select-picker';
import * as Yup from "yup";

const Register4 = ({ navigation,route }) => {


  const [rg, setRg] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [school, setSchool] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const checkRg = ()=>{
    
    if (!rg.replace(/[-.]/g,'').length >= 9) {
   
      setErrorMessage(translate('invalid_document'))
      return false;
    }
   
    return true;

  }
  const checkVehicle = ()=>{

    if (vehicle =='') {

      setErrorMessage(translate('select_vehicle'))
      return false;
    }
    return true;

  }
  const checkSchool = ()=>{

    if (school =='') {

      setErrorMessage(translate('select_school'))
      return false;
    }
    return true;

  }


  const nextStep = async () => {
    setErrorMessage('')
    if(!checkRg())
    return;
    if(!checkVehicle())
    return;
    if(!checkSchool())
    return;
    


    const nextStepData = route.params;

    nextStepData.attributes["custom:rg"] = rg.replace(/[^\d]/g,'');
    nextStepData.attributes["custom:vehicle"] = vehicle;
    nextStepData.attributes["custom:school"] = school;
    
    console.log(nextStepData)
    navigation.navigate('Register5',nextStepData)
    
 
  }


  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={[styles.container]} >
        <View style={{ alignItems: 'center', width: '100%' }}>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>{translate('fourth_step_register')}</Text>
          </View>
          <View style={[styles.inputsContainer]}>
            <Input
              type={'custom'}
              options={{
                mask:'99.999.999-9'
              }}
              
              onChangeText={setRg}
              value={rg}
              width={'80%'}
              keyboardType='numeric'
              name={translate('RG')}
            />
            <PickerElm
              value={vehicle}
              width={'80%'}
              name={translate('has_particular_vehicle')}
              onValueChange={setVehicle}
              options={[
                {value:'',label:translate('select_input')},
                {value:'1',label:translate('nothing')},
                {value:'2',label:translate('car')},
                {value:'3',label:translate('motorcicle')}
              ]}
              />
            <PickerElm
              value={school}
              width={'80%'}
              name={translate('schooling')}
              onValueChange={setSchool}
              options={[
                {value:'',label:translate('select_input')},
                {value:'1',label:translate('nothing')},
                {value:'2',label:translate('incomplete_elementary_school')},
                {value:'3',label:translate('complete_elementary_school')},
                {value:'4',label:translate('incomplete_high_school')},
                {value:'5',label:translate('complete_high_school')},
                {value:'6',label:translate('incompleto_university_education')},
                {value:'7',label:translate('complete_university_education')}
              ]}
              />


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


export default Register4;