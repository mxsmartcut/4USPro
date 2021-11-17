import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex:1,
      width:'100%',
      alignItems: 'center',
      fontFamily:'Lato',
      justifyContent:'space-between'
    },
    loginText:{
      
      fontSize:22,
      marginVertical:20,
      fontFamily:'Lato',
      color:"#d9413f",
      width:'100%',
      marginTop:80

    },
    loginTextContainer:{
  
      width:'80%',
    },
    buttonContainer:{
 
      marginTop:30,
      width:'80%'
  
    },
    createNowContainer:{
     
      marginTop:25,
      flexDirection:'row',
      marginBottom:50,
      fontFamily:'FuturaLT',
    },
    dont_have_account:{
      fontSize:16,
      fontFamily:'FuturaLT',
      marginRight:5

    },
    create_now:{
      fontFamily:'FuturaLT',
      fontSize:16,
      color:"#d9413f",
      textDecorationLine: 'underline'

    },
    inputsContainer:{
      width:'100%',
      alignItems:'center'


    }

  });

  export default styles;