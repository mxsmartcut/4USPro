import {StyleSheet} from 'react-native'


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      height:'100%',
      width:'100%',
      alignSelf:'center'

      
    },
    professionalBar:{

      width:'85%',
      height:95,
      backgroundColor:'#fff',

      flexDirection:'row',
      alignItems:'center'
    },
    professionalContainerBar:{
      backgroundColor:'#fff',
      alignItems:'center',
      width:'100%',
      height:95,
    },
    professionalInfoBar:{

      width:'100%',
      marginTop:50,
      height:300,
      backgroundColor:'#fff',
      alignContent:'center',
      alignItems:'center'
    },
    pictureProfessional:{
      backgroundColor:'#ddd',
      width:70,
      height:70,
      borderRadius:65,
      alignItems:'center',
      justifyContent:'center'
      
    },
    nameProfessional:{
 
      fontFamily:'FuturaLT',
      fontSize:18,
      color:'#444'
     
    },
    professionProfessional:{
      fontFamily:'FuturaLT',
      marginTop:5,
      color:'#444'
    },
    professionalInfoContainer:{

      marginLeft:'5%',
    },
    rateContainer:{
      flexDirection:'row'

    },
    rateText:{
      fontSize:15,
      color:'#999',
      marginLeft:6,
      fontFamily:'FuturaLT',
    },
    professionalInfoSlot:{
      marginVertical:10,

      width:'85%',
      height:80,
      alignItems:'center',
      flexDirection:'row'

    },
    greenIconSlot:{
      width:60,
      height:60,
      borderRadius:60,
      backgroundColor:'#94DCB1',
      marginRight:15,
      justifyContent:'center',
      alignItems:'center'

    },
    blueIconSlot:{
      alignItems:'center',
      justifyContent:'center',
      width:60,
      height:60,
      borderRadius:60,
      backgroundColor:'#33B5E5',
      marginRight:15

    },
    redIconSlot:{
      alignItems:'center',
      justifyContent:'center',
      width:60,
      height:60,
      borderRadius:60,
      backgroundColor:'#FFBDBD',
      marginRight:15

    },
    professionalInfoSlotBigText:{
      fontSize:18,
      color:'#333',
      fontFamily:'FuturaLT'

    },
    professionalInfoSmallBigText:{

      fontSize:17,
      color:'#999',
      fontFamily:'FuturaLT'

    },
    // modal style
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },


  });

  export default styles;