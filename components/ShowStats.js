import React, { Component} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { white, lightPurp} from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";
import Button from './Button'

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
                    <Button  onPress={this.handleRestartQuiz}>
                       Restart Quiz
                    </Button>
                    <Button  onPress={this.handleBackToDeck}>
                       Back to Deck
                    </Button>
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