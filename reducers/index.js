import {RECEIVE_DECKS, ADD_DECK, ADD_CARD} from '../actions'
function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            }
        case ADD_DECK:
            return{
                ...state,
                ...action.deck,
            }
        case ADD_CARD: 

            return{
                ...state,
                [action.deckTitle]: {
                    ...state[action.deckTitle],
                    questions: state[action.deckTitle].questions.concat([action.question])
                }
            }
            default:
                return state
    }
}

export default decks