import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import Form from './components/Form';

const App = () => {

    const hideKeyboard = () => {
        Keyboard.dismiss();
    }


    return (
        <>
            <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
                <View style={styles.app}>
                    <View style={styles.container}>
                        <Form/>
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
