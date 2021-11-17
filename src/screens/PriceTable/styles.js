import {StyleSheet} from 'react-native'


const styles = StyleSheet.create({
    
  containerVideo:{


    width:'100%',
    borderBottomWidth:1,
    borderColor:'#888',
    paddingBottom:20,
    marginTop:20,
    alignItems:'center',
  },
  video:{
 
   flex:1,
   height:180,
   width:'90%',
    marginTop:15,
    backgroundColor:'#000',
    borderRadius:8
  
  },
  jobsDidPic:{
    marginTop:20,
    flexDirection:'row',
    flex:1,   
    backgroundColor:'transparent',
   

  },
  videoC:{
    borderRadius:8,
    width:'100%',
    flex:1,
    height:180
  },
  jobsPic:{
    height:'80%',
    aspectRatio:1.6,
    marginTop:10,
    marginLeft:20,
    marginHorizontal:10,
    borderRadius:8,
    backgroundColor:'#888',
    
  }
  });

  export default styles;