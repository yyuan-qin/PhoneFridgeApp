import React from 'react';
import { TouchableOpacity, StyleSheet, Text} from 'react-native';
import { addOptionPopUp } from './add-popup';
import { useNavigation } from 'expo-router';

const AddItemButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => addOptionPopUp(navigation)}>
        <Text style={styles.text}>{"+"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create ({
    button: {
        width : 60,
        height : 60,
        borderRadius : 30,
        backgroundColor : 'green',
        justifyContent : 'center',
        alignContent : 'center',
    },

    text: {
        color : 'white',
        fontSize : 30,
        textAlign : 'center',
        fontWeight : 'bold',
    }
});

export default AddItemButton;
