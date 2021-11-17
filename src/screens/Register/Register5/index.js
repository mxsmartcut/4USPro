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

const Register5 = ({ navigation,route }) => {


  const [startTime, setStartTime] = useState('')
  const [finalTime, setFinalTime] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const [breakTime, setBreakTime] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  const checkTimes = ()=>{

    if(startTime ==''){
      setErrorMessage(translate('invalid_time'))
      return false;
    }
    
    if(finalTime ==''){
      setErrorMessage(translate('invalid_time'))
      return false;
    }
    
    if(returnTime ==''){
      setErrorMessage(translate('invalid_time'))
      return false;
    }
    
    if(breakTime ==''){
      setErrorMessage(translate('invalid_time'))
      return false;
    }

    return true;  



  }

  const nextStep = async () => {
    setErrorMessage('')
    if(!checkTimes())
    return;
   
    const nextStepData = route.params

    //nextStepData.attributes['custom:start_time'] = startTime 
   //nextStepData.attributes['custom:final_time'] = finalTime; 
    //nextStepData.attributes['custom:break_time'] = breakTime;
    //nextStepData.attributes['custom:return_time'] = returnTime;
    navigation.navigate('Register6',nextStepData)

  }


  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={[styles.container]} >
        <View style={{ alignItems: 'center', width: '100%' }}>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>{translate('fifth_step_register')}</Text>
          </View>
          <View style={[styles.inputsContainer]}>
            <Text style={{ fontSize: 17 }}>{translate('select_work_range')}</Text>
            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'center' }}>
              <PickerElm
                value={startTime}
                width={'45%'}
                name={translate('begin_work')}
                onValueChange={(e)=>{setStartTime(e);setFinalTime('');setBreakTime('');setReturnTime('')}}
                options={[
                  { value: '', label: translate('select_input') },
                  { value: '9', label: '9h' },
                  { value: '10', label:'10h' },
                  { value: '11', label:'11h' },
                  { value: '12', label:'12h' },
                  { value: '13', label:'13h' },
                  { value: '14', label:'14h' },
                  { value: '15', label:'15h' },
                  { value: '16', label:'16h' },
                  { value: '17', label:'17h' },
                  { value: '18', label:'18h' },
                  { value: '19', label:'19h' },
                  { value: '20', label:'20h' },
                  { value: '21', label:'21h' },
                  { value: '22', label:'22h' },
                ]}
              />
              <PickerElm
                value={finalTime}
                width={'45%'}
                name={translate('finish_work')}
                onValueChange={(e)=>{setFinalTime(e);setBreakTime('');setReturnTime('')}}
                options={[
                  { value: '', label: translate('select_input') },
                  { value: '9', label: '9h' },
                  { value: '10', label:'10h' },
                  { value: '11', label:'11h' },
                  { value: '12', label:'12h' },
                  { value: '13', label:'13h' },
                  { value: '14', label:'14h' },
                  { value: '15', label:'15h' },
                  { value: '16', label:'16h' },
                  { value: '17', label:'17h' },
                  { value: '18', label:'18h' },
                  { value: '19', label:'19h' },
                  { value: '20', label:'20h' },
                  { value: '21', label:'21h' },
                  { value: '22', label:'22h' },
                ].filter((e)=> e.value == '' || parseInt(e.value) > parseInt(startTime))}
              />
            </View>

            <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'center' }}>
              <PickerElm
                value={breakTime}
                width={'45%'}
                name={translate('break')}
                onValueChange={(e)=>{setBreakTime(e);setReturnTime('')}}
                options={[
                  { value: '', label: translate('select_input') },
                  { value: '9', label: '9h' },
                  { value: '10', label:'10h' },
                  { value: '11', label:'11h' },
                  { value: '12', label:'12h' },
                  { value: '13', label:'13h' },
                  { value: '14', label:'14h' },
                  { value: '15', label:'15h' },
                  { value: '16', label:'16h' },
                  { value: '17', label:'17h' },
                  { value: '18', label:'18h' },
                  { value: '19', label:'19h' },
                  { value: '20', label:'20h' },
                  { value: '21', label:'21h' },
                  { value: '22', label:'22h' },
                ].filter((e)=> e.value == '' || parseInt(e.value) > parseInt(startTime) &&  parseInt(e.value) < parseInt(finalTime))}
              />
              <PickerElm
                value={returnTime}
                width={'45%'}
                name={translate('return')}
                onValueChange={setReturnTime}
                options={[
                  { value: '', label: translate('select_input') },
                  { value: '9', label: '9h' },
                  { value: '10', label:'10h' },
                  { value: '11', label:'11h' },
                  { value: '12', label:'12h' },
                  { value: '13', label:'13h' },
                  { value: '14', label:'14h' },
                  { value: '15', label:'15h' },
                  { value: '16', label:'16h' },
                  { value: '17', label:'17h' },
                  { value: '18', label:'18h' },
                  { value: '19', label:'19h' },
                  { value: '20', label:'20h' },
                  { value: '21', label:'21h' },
                  { value: '22', label:'22h' },
                ].filter((e)=> e.value == '' || parseInt(e.value) > parseInt(breakTime)  &&  parseInt(e.value) < parseInt(finalTime))}
                
              />
            </View>

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


export default Register5;