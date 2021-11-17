import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  messageContainer:{
    width:'100%',
    height:135,
    backgroundColor:'#fff',

  },
  upPart:{
    marginHorizontal:20,
    marginTop:13,
    height:'50%',
      flexDirection:'row',
  },
  bottomPart:{
    height:'50%',
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',


  },
  roundedPicture:{
    flex:1,
    alignSelf:'center',
    backgroundColor:'#ddd',
    maxWidth:70,
    maxHeight:70,
    aspectRatio:1,
    borderRadius:100,

  },
  message:{
    color:'#555',
    fontSize:13.33,

  },
  textContainer:{
    flex:1,
    marginLeft:15,
   justifyContent:'center',
   
  },
  name:{
    fontSize:18,
    fontFamily:'FuturaLT',

  },
  day:{
    fontSize:16,
    fontFamily:'FuturaLT',
    color:'#FC5E5B'

  },
  job:{
    color:'#999',
    fontSize:16,
    fontFamily:'FuturaLT',

  }
})
export default styles;