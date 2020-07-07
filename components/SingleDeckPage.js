import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from "react-redux";
import { lightPurp, white } from "../utils/colors";

class SingleDeckPage extends Component{
    setTitle = (deckTitle) => {
        if (!deckTitle) return;
        this.props.navigation.setOptions({
            title: `Deck: ${deckTitle}`
        });
        
    };
    addCard = () =>{
        const {title} = this.props.deck
        this.props.navigation.navigate('AddCard', {deckTitle: title})
    }
    startQuiz= () =>{
        this.props.navigation.navigate('Quiz', {questionLength: this.props.deck.questions.length, questionCounter: 1, correctAnswersCounter: 0, deck: this.props.deck})
    }
   
    render(){
        
        const {title, questions} = this.props.deck
        this.setTitle(title);
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.cardCounterText}>{questions.length > 1? `${questions.length} cards` : `${questions.length} card`}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.iosSubmitBtn}
                        onPress={this.addCard}
                     >
                        <Text style={styles.submitBtnText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.androidSubmitBtn}
                        onPress={this.startQuiz}
                    >
                        <Text style={[styles.submitBtnText, {color: white}]}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-around'
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
        borderWidth: 1
    },
    androidSubmitBtn: {
        backgroundColor: lightPurp,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        width: 300
    },
    submitBtnText: {
        color: lightPurp,
        fontSize: 22,
        textAlign: 'center'
    },
    titleText:{
        fontSize:60,
        textAlign: 'center',
        width:300
    },
    cardCounterText: {
        fontSize: 30,
        textAlign: 'center',
        width: 300
    }
})



function mapStateToProps(state, {route}) {
    const {deckTitle } = route.params
    return {
        deck: state[deckTitle]
    }
}




export default connect(mapStateToProps)(SingleDeckPage)
