import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  View,
  Text
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';
import Context from '../../contexts/mainContext';
import Input from '../../components/Input'
import Button from '../../components/Button'
import Picker from '../../components/Picker'
import api from '../../services/api';
import { translate } from '../../../i18n/src/locales'
import AsyncStorage from '@react-native-async-storage/async-storage';
function valida_cpf(cpf) {
  var numeros, digitos, soma, i, resultado, digitos_iguais;
  digitos_iguais = 1;
  if (cpf.length < 11)
    return false;
  for (i = 0; i < cpf.length - 1; i++)
    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
      digitos_iguais = 0;
      break;
    }
  if (!digitos_iguais) {
    numeros = cpf.substring(0, 9);
    digitos = cpf.substring(9);
    soma = 0;
    for (i = 10; i > 1; i--)
      soma += numeros.charAt(10 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
      return false;
    numeros = cpf.substring(0, 10);
    soma = 0;
    for (i = 11; i > 1; i--)
      soma += numeros.charAt(11 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
      return false;
    return true;
  }
  else
    return false;
}
const AddBank = ({ navigation }) => {
  const [banks, setBanks] = useState([])
  useEffect(() => {

    api.get('https://gist.githubusercontent.com/antoniopresto/d73888dab087ae35a7cf41a61d8a3cbc/raw/43c94b305367afa82734f6fb4480f55e77e08a6e/banco_codigo.json')
      .then(e => setBanks(e.data))
  }, [])

  const { userData, setUserData, setLoad } = useContext(Context);
  const [account_number, setAccount_number] = useState('');
  const [agency, setAgency] = useState('');
  const [bank_number, setBank_Number] = useState('');
  const [bank_name, setBank_Name] = useState('');
  const [account_type, setAccount_type] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');


  async function sendBankData() {
    setError(false);

    if (name.length < 3) {
      setError(translate('invalid_name'))
      return;
    }
    if (!name.includes(' ')) {
      setError(translate('invalid_name'))
      return;
    }
    if (agency.length < 4) {
      setError(translate('invalid_agency'))
      return;
    }
    if (account_number.length < 8) {
      setError(translate('invalid_account_number'))
      return;
    }
    if (!valida_cpf(identifier)) {
      setError(translate('invalid_document'))
      return;
    }
    if (account_type == '') {
      setError(translate('select_account_type'))
      return;
    }
    if (bank_number.length != 3) {
      setError(translate('invalid_bank_number'))
      return;
    }
    //account_number, agency, bank_name, account_type, identifier, name, client_id
    setLoad(true)
    try {
      const bank = await api.post('/saveBank', {

        account_number,
        agency,
        bank_name: banks.filter(e => e.value.includes(bank_number))[0].value + ' - ' + banks.filter(e => e.value.includes(bank_number))[0].label,
        account_type,
        identifier,
        name,
        client_id: await AsyncStorage.getItem('userId')
      }, {

        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('jwtToken')}`

        }
      })
      setLoad(false)
      const newUserData = { ...userData }
      newUserData['bank_details'] = {

        account_number,
        agency,
        bank_name: banks.filter(e => e.value.includes(bank_number))[0].value + ' - ' + banks.filter(e => e.value.includes(bank_number))[0].label,
        account_type,
        identifier,
        name,
        client_id: await AsyncStorage.getItem('userId')
      }
      setUserData(newUserData)
      console.log(bank.data)
      navigation.goBack();
    }
    catch {

      setLoad(false)
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={[styles.container, { marginTop: 15 }]} >
        <Input value={name} onChangeText={setName} name={translate('fullname')} />
        <Input type='custom' options={{ mask: '99999' }} value={agency} keyboardType='decimal-pad' onChangeText={(v) => { setAgency(v.replace(/[^0-9]/, '')) }} name={translate('agency')} />
        <Input type='custom' options={{ mask: '999999999-9' }} value={account_number} keyboardType='decimal-pad' onChangeText={(v) => { setAccount_number(v.replace(/[^0-9]/, '')) }} name={translate('account_number')} />
        <Input keyboardType='decimal-pad' value={identifier.replace(/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/, '$1.$2.$3/$4')} onChangeText={(v) => { if (v.length < 15) setIdentifier(v) }} name={translate('cpf')} />
        <Picker
          value={account_type}
          onValueChange={setAccount_type}
          name={translate('account_type')}
          options={[
            { value: '', label: translate('select_input') },
            { value: '1', label: translate('checking_account') },
            { value: '2', label: translate('saving_account') }
          ]} />

        {banks.filter(e => e.value.includes(bank_number))[0] ?
          <>

            {bank_number.length > 1 &&
              <Text style={{ marginTop: 20 }}>{banks && banks.filter(e => e.value.includes(bank_number))[0].value + ' - ' + banks.filter(e => e.value.includes(bank_number))[0].label}</Text>
            }
          </>
          :

          <>
            {
              bank_number.length > 2 ?
                <Text style={{ marginTop: 20, color: '#ff5555', fontSize: 15 }}>{translate('invalid_bank')}</Text>
                :
                <Text style={{ marginTop: 20, color: '#000', fontSize: 15 }}>{translate('type_bank_number')}</Text>
            }
          </>
        }
        <Input type='custom' options={{ mask: '999' }} value={bank_number} onChangeText={(v) => { if (v.length < 42) setBank_Number(v) }} name={translate('bank_number')} />
        <Text style={{ color: '#ee2222', fontWeight: 'bold' }}>{error}</Text>
        <Button text='Adicionar' onPress={sendBankData} />
      </View >

    </KeyboardAwareScrollView>


  )
}


export default AddBank;