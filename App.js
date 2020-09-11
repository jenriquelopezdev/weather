import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Keyboard,
    TouchableWithoutFeedback, Alert,
} from 'react-native';
import Form from './components/Form';
import Weather from './components/Weather';

const App = () => {

    const [search, saveSearch] = useState({
        city: '',
        country: ''
    })

    const [consult, saveConsult] = useState(false)
    const [result, saveResult] = useState({})

    const [bgColor, saveBgColor] = useState('rgb(71, 149, 212)')

    const {city, country} = search;

    const bgColorApp = {
        backgroundColor: bgColor
    }

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

                    //Modify background colors based on temperature

                    // Kelvin degrees
                    const kelvin = 273.15;

                    const {main} = result;
                    const current = main.temp - kelvin;

                    if (current < 10) {
                        saveBgColor('rgb(105, 108, 149)')
                    } else if (current >= 10 && current < 25) {
                        saveBgColor('rgb(71, 149, 212)')
                    } else {
                        saveBgColor('rgb(178, 28, 61)')
                    }

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
                <View style={[styles.app, bgColorApp]}>
                    <View style={styles.container}>
                        <Weather
                            result={result}
                        />
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
        justifyContent: 'center'
    },
    container: {
        marginHorizontal: '2.5%'
    }
});

export default App;
