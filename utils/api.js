import {AsyncStorage} from 'react-native'
import { DECKS_KEY, formatNewDeck } from "./helpers";


export function getDecks(){
    //return AsyncStorage.clear(DECKS_KEY)
    return AsyncStorage.getItem(DECKS_KEY)
        .then(decks => {
            if (decks !== null){
                return JSON.parse(decks)
            }
            AsyncStorage.setItem(DECKS_KEY, JSON.stringify(dummyData));
            console.log('dummyData ### ', dummyData)
            return dummyData;
        })
    
}
export function saveDeck(id, title) {
    return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
        [id]: formatNewDeck(title),
    }))
}

export function addCardToDeck(q, title) {
    return AsyncStorage.getItem(DECKS_KEY)
        .then(JSON.parse)
        .then(decks =>{
            let singleDeck = decks[title]
            singleDeck.questions.push(q)
            return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
                [title]: singleDeck,
            }))
        })
}


const dummyData = {
  1: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  2: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}