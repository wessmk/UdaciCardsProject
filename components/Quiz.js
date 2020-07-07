import React, { Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white, red, green, darkRed } from "../utils/colors";

class Quiz extends Component{
    state ={
        showButton: true,
    }
    handleShowAnswerButton = () => {
        this.setState((state) => {
            return {
                showButton: !state.showButton
            }
        })

    }
    handleHideAnswerButton = () => {
        this.setState((state) => {
            return {
                showButton: !state.showButton
            }
        })
    }
    handleCorrectAnswerButton = () => {
        const { questionCounter, correctAnswersCounter, deck } = this.props
        const {questions} = deck
        this.setState(state => ({ showButton: !state.showButton }))
        if (questions.length > questionCounter) {
            
            this.props.navigation.navigate('Quiz', {correctAnswersCounter:correctAnswersCounter +1, questionLength: questions.length, questionCounter: questionCounter+1,  deck})
        }
        else{
            this.props.navigation.navigate('ShowStats', {questionLength: questions.length, correctAnswersCounter: correctAnswersCounter+1, deck})
        }
    }
    handleWrongAnswerButton = () => {
        const { questionCounter, correctAnswersCounter, deck } = this.props
        const {questions} = deck
        this.setState(state => ({ showButton: !state.showButton }))
        if (questions.length > questionCounter) {
            
            this.props.navigation.navigate('Quiz', {correctAnswersCounter:correctAnswersCounter, questionLength: questions.length, questionCounter: questionCounter+1,  deck})
        }
        else{
            this.props.navigation.navigate('ShowStats', {questionLength: questions.length, correctAnswersCounter: correctAnswersCounter, deck})
        }
    }
    render(){
        
        const {questionCounter,questionLength, deck } = this.props
        const {questions} = deck
        const {showButton} =this.state
        return(
            <View style={{flex:1}}>
                <Text style={styles.questionCounterText}>{questionCounter}/{questionLength}</Text>
                <View style={styles.container}>
                    <View>
                        {showButton && (<Text style={styles.headerText}>{questions[questionCounter -1 ].question}</Text>)}
                        {!showButton && (<Text style={styles.headerText}>{questions[questionCounter -1 ].answer}</Text>)}
                        {showButton && (<TouchableOpacity
                            
                            onPress={this.handleShowAnswerButton}
                        >
                            <Text style={styles.QABtnText}>Answer</Text>
                        </TouchableOpacity>)}
                        {!showButton && (<TouchableOpacity
                            
                            onPress={this.handleHideAnswerButton}
                        >
                            <Text style={styles.QABtnText}>Question</Text>
                        </TouchableOpacity>)}
                        <View>
                            {!showButton && (<TouchableOpacity 
                                style={Platform.OS === 'ios' ? styles.iosCorrectSubmitBtn : styles.androidCorrectSubmitBtn}
                                onPress={this.handleCorrectAnswerButton}
                            >
                                <Text style={styles.correctBtnText}>Correct</Text>
                            </TouchableOpacity>)}
                            {!showButton && (<TouchableOpacity
                                style={Platform.OS === 'ios' ? styles.iosWrongSubmitBtn : styles.androidWrongSubmitBtn}
                                onPress={this.handleWrongAnswerButton}
                            >
                                <Text style={styles.wrongBtnText}>Incorrect</Text>
                            </TouchableOpacity>)}
                        </View>
                    </View>
                </View>
                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        padding: 30,
    },
    questionCounterText:{
        fontSize: 25,
        fontWeight:'700',
        padding: 20
    },
    headerText: {
        fontSize: 42,
        textAlign: 'center'
    },
    iosCorrectSubmitBtn: {
        backgroundColor: green,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    androidCorrectSubmitBtn: {
        backgroundColor: green,
        height: 50,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    iosWrongSubmitBtn: {
        backgroundColor: darkRed,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    androidWrongSubmitBtn: {
        backgroundColor: darkRed,
        height: 50,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    QABtnText: {
        color: red,
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '700'
    },
    correctBtnText: {
        color: white, 
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 22,
    },
    wrongBtnText: {
        color: white, 
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 22,
    }
});

function mapStateToProps(state, {route}) {
    const {questionCounter, questionLength, correctAnswersCounter, deck } = route.params
    return {
        questionCounter,
        questionLength, 
        correctAnswersCounter,
        deck
    }
}

export default connect(mapStateToProps)(Quiz)