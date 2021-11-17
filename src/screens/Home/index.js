import React,{useContext,useEffect} from 'react';
import { translate } from '../../../i18n/src/locales'
import OneSignal from 'react-native-onesignal';
import {
  View,
  Text,
  Image
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/Button';
import { Auth } from 'aws-amplify';
import styles from './styles';
import Context from '../../contexts/mainContext';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {

  const mainContext = useContext(Context)
  getSession = async ()=>{
    try{
    mainContext.setLoad(true);

    const sessions = await Auth.currentSession();
  
    if(sessions.isValid()){


 
     const userLogged = await api.post('/getUserInfo',{

      "client_id": sessions.idToken.payload.sub
     },{

       headers:{Authorization:`Bearer ${sessions.idToken.jwtToken}`
      
      }})

      console.log(userLogged.data)
  
     await AsyncStorage.multiSet([
       ['jwtToken',sessions.idToken.jwtToken],
       ['userId',sessions.idToken.payload.sub],
       ['refreshToken',sessions.refreshToken.token]
      ])
      console.log("Setou external ID",sessions.idToken.payload.sub)

     OneSignal.setExternalUserId(sessions.idToken.payload.sub)
     mainContext.setUserData(userLogged.data)
     mainContext.setLoad(false);
     mainContext.setLogged(true);
     
    
    }
   else{
    mainContext.setLoad(false);

   }
  }
  catch(err){
    mainContext.setLoad(false);
  }

  }
  useEffect(()=>{
    getSession()

  },[])


  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={[styles.container]} >

        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Image style={{ marginLeft: 15, resizeMode: 'contain', height: 100, width: 100 }} source={require("../../images/manicure.png")} />
            <Text style={styles.homeText}>{translate('realize_where_you_want')}</Text>
            <Image style={{ resizeMode: 'contain', height: 100, width: 100 }} source={require("../../images/pagamento.png")} />
            <Text style={styles.homeText}>{translate('pay_recieve_online')}</Text>
            <Button onPress={() => navigation.navigate("Login")} width={'80%'} backgroundColor="#53489d" text={translate("login")} />
            <Button onPress={() => navigation.navigate("Register")} width={'80%'} text={translate("sign_up")} />


          </View>
        </View>
      </View >
    </KeyboardAwareScrollView>
  )
}


export default Home;