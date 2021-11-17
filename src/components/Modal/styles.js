import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  backgroundModal:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'#00000055',
    elevation:1,
    alignItems:'center',
    justifyContent:'center',
    zIndex:50
  },
  modal:{
    width:'90%',
    aspectRatio:0.75,
    backgroundColor:'#fff',
    borderRadius:15
  }


})
export default styles;