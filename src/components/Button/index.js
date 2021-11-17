import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native';

import styles from './styles';


const Button = ({ text, width, height,backgroundColor,color,onPress,style }, props) => {
    

    return (
       
            
                <TouchableOpacity 
                style={[
                    styles.Button,
                     width && { width },
                      height && { height },
                      backgroundColor && {backgroundColor},
                     
                      ,{...style}]} 
                      {...props}
                        onPress={onPress?()=>onPress():null}
                >
                    <Text style={[styles.Text, color && {color}]}>{text}</Text>
                </TouchableOpacity>
            
      
    );
}

export default Button;