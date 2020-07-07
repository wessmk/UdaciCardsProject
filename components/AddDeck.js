import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import { saveDeckTitle } from "../utils/api"
import { formatNewDeck } from "../utils/helpers";
import {connect} from 'react-redux'
import { addDeck } from "../actions";
import { white, lightPurp } from "../utils/colors";

class AddDeck extends Component {
    state ={
        input: ''
    }
    handleTextChange = (title) => { 
        this.setState(() => ({
            title
        }))
    }
    submit = () =>{
        const {title} = this.state
        saveDeckTitle(title)
        this.props.dispatch(addDeck({
            [title]: formatNewDeck(title)
        }))
        this.toDeck(title);
        this.setState(() => ({
            title: ''
        }))
    }
    toDeck = (deckTitle) => {

        this.props.navigation.navigate('SingleDeckPage', {deckTitle})
    }
    render(){
        const {title} = this.state
        return(
            <KeyboardAvoidingView style={styles.container}>
                <View>
                    <Text style={styles.headerText}>What is the title of your new deck?</Text>
                </View>
                <TextInput style={styles.input}
                    placeholder = "Deck Title"
                    value={title}
                    onChangeText={text=> this.handleTextChange(text)}
                />
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                    onPress={this.submit}
                >
                    <Text style={Platform.OS === 'ios' ? styles.iosSubmitBtnText : styles.androidSubmitBtnText}>SUBMIT</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
export default connect()(AddDeck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        padding: 30,
    },
    input : {
        height: 44, 
        padding: 8,
        borderWidth: 1,
        borderColor: '#757575',
        marginTop: 50,
        marginBottom: 50
    },
    headerText: {
        fontSize:42,
        textAlign: 'center'
    },
    text: {
        fontSize: 18
    },
    iosSubmitBtn:{
        backgroundColor: white,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        borderColor: lightPurp,
        borderWidth:1
    },
    androidSubmitBtn: {
        backgroundColor: lightPurp,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    androidSubmitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    iosSubmitBtnText: {
        color: lightPurp,
        fontSize: 22,
        textAlign: 'center'
    },
})