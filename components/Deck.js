import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, lightPurp } from "../utils/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
export default function Deck(props) {
        const {deck, onPress} = props
        const deckTitle = deck.title
        return(
            <TouchableOpacity style={styles.container}
                onPress={() => onPress(deckTitle)}
            >
                <MaterialCommunityIcons name="cards" size={70} color="black" style={{color: white}} />
                <Text style={styles.deckTitle}>{deck.title}</Text>
                <Text style={styles.deckText}>{deck.questions.length > 1 ? `${deck.questions.length} cards` : `${deck.questions.length} card`}</Text>
            </TouchableOpacity>
        )
    
}

const styles = StyleSheet.create({
   container: {
        flex: 1,
        padding: 20,
        backgroundColor:  lightPurp,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 30,
        paddingBottom: 30
   },
   deckTitle:{
       fontSize: 25,
       color: white
   },
   deckText: {
       fontSize: 18,
       color: white
   }
})