import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import { saveDeck } from "../utils/api"
import { formatNewDeck } from "../utils/helpers";
import {connect} from 'react-redux'
import { addDeck } from "../actions";
import { white, lightPurp } from "../utils/colors";

class AddDeck extends Component {
    state ={
        input: '',
        disabled: true
    }
    handleTextChange = (title) => { 
        this.setState(() => ({
            title,
            disabled: title !== '' ? false : true
        }))
    }
    submit = () =>{
        const {title} = this.state
        const {decks} = this.props
        
        let id = Object.keys(decks).reduce((a, b) => decks[a] > decks[b] ? a : b);
        id = parseInt(id)+1
        saveDeck(id, title)

        this.props.dispatch(addDeck({
            [id]: formatNewDeck(title)
        }))
        this.toDeck(id);
        this.setState(() => ({
            title: '', 
            disabled: true
        }))
    }
    toDeck = (id) => {

        this.props.navigation.navigate('SingleDeckPage', {id})
    }
    render(){
        const {title, disabled} = this.state
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
                    disabled={disabled}
                >
                    <Text style={Platform.OS === 'ios' ? styles.iosSubmitBtnText : styles.androidSubmitBtnText}>SUBMIT</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
function mapStateToProps(state, {route}) {
    return {
        decks: state,
    }
}

export default connect(mapStateToProps)(AddDeck)

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