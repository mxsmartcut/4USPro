import React from 'react';
import {
  View,
  Dimensions,
  Text
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './styles';
import CardWithPhoto from '../../components/CardWithPhoto'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { translate } from '../../../i18n/src/locales';
const FirstRoute = () => {

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={[styles.container, { marginTop: 15 }]} >

        {[].length > 0 ?
          [].map(elm =>
            <CardWithPhoto name='Marcela Rabello' day="Qua, 18 Abril, 10h30min" service='Cabelo' uri='https://www.clicsargent.org.uk/wp-content/uploads/2018/09/Daisy-Aug2018-770x433-Teensyoungadults-752x433.jpg'
              buttons={[{ title: 'Mensagem', color: '#00C851', onClick: () => console.log('Mensagem') }, { title: 'Detalhes', color: '#33B5E5', onClick: () => console.log('Excluir') }, { title: 'Cancelar', color: '#FC5E5B', onClick: () => console.log('Excluir') }]}
            />
          ) :
          <Text>{translate("no_schedules")}</Text>
        }
      </View >
    </KeyboardAwareScrollView>
  )
}
const SecondRoute = () => {

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} >
      <View style={[styles.container, { marginTop: 15 }]} >

        {[].length > 0 ?
        [].map(elm=>
          <CardWithPhoto name='Marcela Rabello' day="Qua, 18 Abril, 10h30min" service='Cabelo' uri='https://www.clicsargent.org.uk/wp-content/uploads/2018/09/Daisy-Aug2018-770x433-Teensyoungadults-752x433.jpg'
            buttons={[{ title: '', color: '#fff', onClick: () => console.log('') }, { title: 'Detalhes', color: '#33B5E5', onClick: () => console.log('Excluir') }]}
          />
        )
        :
        <Text>{translate("none_concluded")}</Text>
        }
      </View >
    </KeyboardAwareScrollView>
  )
}
const Schedules = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: translate('scheduled') },
    { key: 'second', title: translate('concluded') },
  ]);
  const initialLayout = { width: Dimensions.get('window').width };
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });


  return (

    <TabView
      renderTabBar={props => <TabBar {...props} style={{ backgroundColor: 'rgb(242, 242, 242)' }} labelStyle={{ color: '#999', fontWeight: 'bold' }} indicatorStyle={{ backgroundColor: '#FC5E5B' }} />}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      sceneContainerStyle={{ backgroundColor: '#eee' }}
      style={{ backgroundColor: '#555' }}
    />


  )
}


export default Schedules;