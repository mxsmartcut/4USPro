import {StyleSheet} from 'react-native'


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      height:'100%',
      width:'100%',
      alignSelf:'center'

      
    },
    header:{
      width:'100%',
      height:50,
      alignItems:'center',
      borderBottomWidth:1,
      borderColor:'#888',
      flexDirection:'row',
      justifyContent:'space-between'

    },
    headerText:{
      fontFamily:'FuturaLT',
      fontSize:16

    },
    content:{
      flexDirection:'row',
      marginTop:5,
      alignItems:'center'
    },
    contentLabel:{
     
      color:"#d9413f",
      fontWeight:'bold',
      fontSize:14

    }
 

  });

  export default styles;