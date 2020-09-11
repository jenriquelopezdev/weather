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

    const {city, country} = search;

    useEffect(() => {
        if (consult) {
            const appId = '4e04073029c58e4fc319fd01cdc6319b';
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

            try {

            } catch (error) {

            }
        }
    }, [consult])

    const showAlert = () => {
        Alert.alert(
            'Error',
            'Add a city and country to search',
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
