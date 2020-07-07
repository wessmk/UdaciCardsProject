import React, {Component} from 'react'
import { connect } from "react-redux";
import { ScrollView, StyleSheet } from 'react-native'
import { getDecks } from "../utils/api"
import { receiveDecks } from "../actions";
import Deck from './Deck';
class Decks extends Component{
    componentDidMount(){
        const {dispatch} = this.props
        getDecks()
            .then((decks) => dispatch(receiveDecks(decks)))
    }
    navigateToDeckPage = (id) => {
        this.props.navigation.navigate('SingleDeckPage', {id: id})
    }
    render(){
        const {decks} = this.props
        return(
            <ScrollView style={styles.container}>
               
                {
                    Object.keys(decks).map(deck => {
                        return <Deck deck={decks[deck]} key={deck} onPress={() => this.navigateToDeckPage(deck)}  />
                    })
                }
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})

function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(Decks)