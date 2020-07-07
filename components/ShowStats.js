import React, { Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white, lightPurp} from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
class ShowStats extends Component {
    handleRestartQuiz = () => {
        const { questionLength, deck} = this.props
        this.props.navigation.navigate('Quiz', {questionLength: questionLength, questionCounter: 1, correctAnswersCounter: 0, deck: this.props.deck})
    }
    handleBackToDeck = () => {
        const deckTitle = this.props.deck.title
        this.props.navigation.navigate('SingleDeckPage', {deckTitle})
    }
    componentDidMount(){
        clearLocalNotification()
            .then(setLocalNotification)
    }
    render(){
        const {questionLength, correctAnswersCounter, deck} = this.props
        
        return(
            <View style={styles.container}>
                
                    <View>
                        <Text style={styles.headerText}>Quiz Completed</Text>
                        <Text style={styles.headerText}>"{deck.title}"</Text>
                    </View>
                    
                    <Text style={styles.text}>{correctAnswersCounter} Correct Answers Out of {questionLength} ({Math.round((correctAnswersCounter/ questionLength) *100)} %) </Text>

                 <View>
                    <TouchableOpacity 
                        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                        onPress={this.handleRestartQuiz}
                    >
                        <Text style={Platform.OS === 'ios' ? styles.iosBtnText : styles.androidBtnText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                        onPress={this.handleBackToDeck}
                    >
                        <Text style={Platform.OS === 'ios' ? styles.iosBtnText : styles.androidBtnText}>Back to Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 30,
    },
    headerText: {
        fontSize: 42,
        textAlign: 'center'
    },
    text: {
        fontSize: 26,
        textAlign: 'center'
    },
    iosSubmitBtn:{
        backgroundColor: white,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        borderColor: lightPurp,
        borderWidth: 1,
        marginTop: 20,
    },
    androidSubmitBtn: {
        backgroundColor: lightPurp,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        width: 300,
        alignSelf: 'center'
    },
    androidBtnText: {
        color: white,
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 22,
    },
    iosBtnText: {
        color: lightPurp,
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 22,
    },
})

function mapStateToProps(state, {route}) {
    const {questionLength, correctAnswersCounter, deck } = route.params
    return {
        questionLength, 
        correctAnswersCounter,
        deck
    }
}

export default connect(mapStateToProps)(ShowStats)