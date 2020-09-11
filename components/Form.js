import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableWithoutFeedback, Text, Animated, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';

const Form = ({search, saveSearch, saveConsult}) => {
    const {country, city} = search;

    const [animationBtn] = useState(new Animated.Value(1));

    const checkWeather = () => {
        if (country.trim() === '' || city.trim() === '') {
            showAlert();
            return;
        }
        //consulting the api
        saveConsult(true)
    }

    const showAlert = () => {
        Alert.alert(
            'Error',
            'Add a city and country to search',
            [{text: ' OK'}]
        )
    }

    const styleAnimate = {
        transform: [{scale: animationBtn}]
    }

    const animationInput = () => {
        Animated.spring(animationBtn, {
            toValue: .75
        }).start();
    }

    const animationOutput = () => {
        Animated.spring(animationBtn, {
            toValue: 1,
            friction: 4,
            tension: 30
        }).start();
    }


    return (
        <>
            <View style={styles.form}>
                <View>
                    <TextInput
                        value={city}
                        style={styles.input}
                        onChangeText={city => saveSearch({...search, city})}
                        placeholder='City'
                        placeholderTextColor='#666'
                    />
                </View>
                <View>
                    <Picker
                        selectedValue={country}
                        itemStyle={{height: 120, backgroundColor: '#fff'}}
                        onValueChange={country => saveSearch({...search, country})}
                    >
                        <Picker.Item label='Select country' value=''/>
                        <Picker.Item label='Estados unidos' value='US'/>
                        <Picker.Item label='Mexico' value='MX'/>
                        <Picker.Item label='Argentina' value='AR'/>
                        <Picker.Item label='Colombia' value='CO'/>
                        <Picker.Item label='España' value='ES'/>
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    onPressIn={() => animationInput()}
                    onPressOut={() => animationOutput()}
                    onPress={() => checkWeather()}
                >
                    <Animated.View
                        style={[styles.btnSearch, styleAnimate]}>
                        <Text style={styles.txtSearch}>Search Weather</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#fff',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnSearch: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    txtSearch: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
});

export default Form;