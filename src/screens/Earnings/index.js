import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles';
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import StarRating from 'react-native-star-rating';
import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import context from '../../contexts/mainContext';
import { translate } from '../../../i18n/src/locales'





const Earnings = ({ navigation,route}) => {


  const { userData } = useContext(context)


  return (

    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >

      <View style={[styles.container]} >

     
        <View style={[styles.professionalInfoBar,{marginTop:10}]}>

          <View style={styles.professionalInfoSlot}>

            <View style={styles.greenIconSlot}>
              <FontAwesome name="dollar" size={30} color="#fff" />
            </View>
            <View>
              <Text style={styles.professionalInfoSlotBigText}>{translate('coin_unit')} {userData.earnings_month}</Text>
              <Text style={styles.professionalInfoSmallBigText}>Seus ganhos</Text>
            </View>
          </View>
          <View style={styles.professionalInfoSlot}>
            <View style={styles.blueIconSlot}>
            <FontAwesome name="money" size={30} color="#fff" />
        
            </View>
            <View>
              <Text style={styles.professionalInfoSlotBigText}>{translate('coin_unit')} {userData.jobs_did}</Text>
              <Text style={styles.professionalInfoSmallBigText}>Disponível para saque</Text>
            </View>
          </View>
          <View style={styles.professionalInfoSlot}>
            <View style={styles.redIconSlot}>
            <SimpleLineIcons name="calendar" size={30} color="#fff" />
            
            </View>
            <View>
              <Text style={styles.professionalInfoSlotBigText}>{translate('coin_unit')} {userData.profile_views}</Text>
              <Text style={styles.professionalInfoSmallBigText}>Valor à liberar</Text>
            </View>
          </View>
        </View>

        <Button onPress={() => {}}   width={'45%'} height={60} style={{ marginTop: 30,backgroundColor:'#33B5E5' }} text='Saque' />
        <Button onPress={() => {}} width={'45%'} height={60} style={{ marginTop: 30 }} text='Solicitar Antecipação' />

      </View >
    </KeyboardAwareScrollView>

  )


}


export default Earnings;