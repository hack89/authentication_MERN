import { 
    TOGGLE_FILTER, 
    SEARCH_GUEST,
     CLEAR_SEARCH, 
     ADD_GUEST, 
     REMOVE_GUEST, 
     UPDATE_GUEST, 
     EDIT_GUEST, 
     CLEAR_EDIT,
     GET_GUESTS,
      GUESTS_ERROR, 
      CLEAR_GUESTS } from '../types'



export default function(state, { type, payload }) {
    switch (type) {
        case GET_GUESTS:
            return {
                ...state,
                guests: payload
            }
        case ADD_GUEST:
            return {
                ...state,
                guests: [...state.guests, payload]
            }
        case REMOVE_GUEST:
            return {
                ...state,
                guests: state.guests.filter(guest => guest._id !== payload)
            }

        case UPDATE_GUEST:
            return {
                ...state,
                guests: state.guests.map(guest => guest._id === payload._id ? payload : guest)
            }

        case EDIT_GUEST:
            return {
                ...state,
                editable: payload
            }

        case CLEAR_EDIT:
            return {
                ...state,
                editable: null
            }

        case TOGGLE_FILTER:
            return {
                ...state,
                filterGuest: !state.filterGuest
            }
        case SEARCH_GUEST:
            const reg = new RegExp(`${payload}`, 'gi')
            return {
                ...state,
                search: state.guests.filter(guest => guest.name.match(reg))
            }
        
        case GUESTS_ERROR:
            return{
                ...state,
                // guests: [], CAMBIATOOO (tolto)
                errors: payload
            }
        case CLEAR_GUESTS:
            return {
                ...state,
                filterGuest: false,
                search: null,
                editable: null,
                guests: [],
                errors: null
            }
        
        case CLEAR_SEARCH:
            return {
                ...state,
                search: null
            }
        default:
            return state
    }
}