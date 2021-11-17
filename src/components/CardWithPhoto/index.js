import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';

import styles from './styles';


const CardWithPhoto = ({ uri, day, name, service, message,buttons }) => {


    return (

        <View style={styles.messageContainer} >
            <View style={styles.upPart}>
                <View style={styles.roundedPicture}>
                    <Image style={{ flex: 1, borderRadius: 100 }} source={{ uri }} />
                </View>
                <View style={styles.textContainer}>
                    {name && <Text style={styles.name}>
                        {name}
                    </Text>}
                    {day &&  <Text style={styles.day}>
                        {day}
                    </Text>}
                    {service &&  <Text style={styles.job}>
                        {service}
                    </Text>}
                    {message &&  <Text style={styles.message}>
                        {message}
                    </Text>}
                   
                </View>
            </View>
            <View style={styles.bottomPart}>
            {buttons && buttons.map((elm,index)=>{

                return(
                <TouchableOpacity key={index} style={{borderRadius:20,width:100,alignItems:'center',justifyContent:'center',height:25,backgroundColor:elm.color}} onClick={()=>elm.onClick}>
                       <Text style={{fontSize:13,color:'white'}}> {elm.title}</Text>

                </TouchableOpacity>
                )

            })}
            </View>
        </View>


    );
}

export default CardWithPhoto;