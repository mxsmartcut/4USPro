import React from 'react';
import {
  View,
  Text
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { translate } from '../../../i18n/src/locales';
import styles from './styles';
import CardWithPhoto from '../../components/CardWithPhoto'


const Messages = () => {



  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >

      <View style={[styles.container]} >
        {[].length > 0 ? [].map(elm =>
          <CardWithPhoto name='Marcela Rabello' message='Boa tarde. Gostaria de tirar uma
dúvida à respeito de seus serviços.'  uri='https://www.clicsargent.org.uk/wp-content/uploads/2018/09/Daisy-Aug2018-770x433-Teensyoungadults-752x433.jpg'
            buttons={[{ title: 'Detalhes', color: '#33B5E5', onClick: () => console.log('detalhes') }, { title: 'Excluir', color: '#FC5E5B', onClick: () => console.log('Excluir') }]}
          />
        ) :
          <Text style={{ marginTop: 10 }}>{translate("no_message")}</Text>
        }
      </View >
    </KeyboardAwareScrollView>
  )
}


export default Messages;