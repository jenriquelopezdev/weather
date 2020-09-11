import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Keyboard,
    TouchableWithoutFeedback, Alert,
} from 'react-native';
import Form from './components/Form';

const App = () => {

    const [search, saveSearch] = useState({
        city: '',
        country: ''
    })

    const [consult, saveConsult] = useState(false)
    const [result, saveResult] = useState({})

    const {city, country} = search;

    useEffect(() => {
        const checkWeather = async () => {
            if (consult) {
                const appId = '4e04073029c58e4fc319fd01cdc6319b';
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

                try {
                    const response = await fetch(url);
                    const result = await response.json();

                    saveConsult(false);
                    saveResult(result);
                    
                } catch (error) {
                    showAlert();
                }
            }
        }
        checkWeather();
    }, [consult])

    const showAlert = () => {
        Alert.alert(
            'Error',
            'No results, try another city or country',
            [{text: ' OK'}]
        )
    }

    const hideKeyboard = () => {
        Keyboard.dismiss();
    }


    return (
        <>
            <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
                <View style={styles.app}>
                    <View style={styles.container}>
                        <Form
                            search={search}
                            saveSearch={saveSearch}
                            saveConsult={saveConsult}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: 'rgb(71, 149, 212)',
        justifyContent: 'center'
    },
    container: {
        marginHorizontal: '2.5%'
    }
});

export default App;
