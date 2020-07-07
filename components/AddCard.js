import React, { Component } from "react";
import { Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, TextInput, View} from 'react-native'
import { addCard } from "../actions";
import { connect } from "react-redux";
import {CommonActions} from '@react-navigation/native';
import { lightPurp, white } from "../utils/colors";
import { addCardToDeck } from "../utils/api";
class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        disabled: true
    }
    submitCard= () => {
        const {navigation, dispatch, deck, id} = this.props
        const {question, answer} = this.state
        const fullQuestion = {question, answer}
        dispatch(addCard(fullQuestion, id))
        addCardToDeck(fullQuestion, id)
        navigation.dispatch(
            CommonActions.goBack({
                key: 'AddCard',
            }))
    }
    handleQuestionTextChange = (question) => {
        this.setState(({answer}) => ({
            question, 
            disabled: (question !== '' && answer !== '') ? false : true
        }))
    }
    handleAnswerTextChange = (answer) => {
        this.setState(({question}) => ({
            answer,
            disabled: (question !== '' && answer !== '') ? false : true
        }))
    }
    render(){
        const {title, questions} = this.props.deck
        const {question, answer, disabled} = this.state
        return(
            <KeyboardAvoidingView style={styles.container}>
                <View style={{alignItems: 'stretch'}}>
                    <Text style={styles.headerText}>Add Card to the "{title}" Deck</Text>
                    <TextInput style={styles.input}
                        placeholder = "Your Question"
                        value={question}
                        onChangeText={text=> this.handleQuestionTextChange(text)}
                    />
                    <TextInput style={styles.input}
                        placeholder = "Your Answer"
                        value={answer}
                        onChangeText={text=> this.handleAnswerTextChange(text)}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                        onPress={this.submitCard}
                        disabled={disabled}
                    >
                        <Text style={Platform.OS === 'ios' ? styles.iosSubmitBtnText : styles.androidSubmitBtnText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: 30,
    },
    input: {
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: '#757575',
        marginTop: 50,
    },
    headerText: {
        fontSize: 42,
        textAlign: 'center'
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

function mapStateToProps(state, {route}) {
    const {id } = route.params
    return {
        deck: state[id], 
        id
    }
}

export default connect(mapStateToProps)(AddCard)