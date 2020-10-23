import { 
    SUCCESS_REGISTER, 
    SUCCESS_LOGIN, 
    FAIL_LOGIN, 
    FAIL_REGISTER, 
    SET_ERROR, 
    CLEAR_ERROR, 
    LOG_OUT, 
    SET_USER, 
    AUTH_ERROR } from '../types'

export default function(state, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                userAuth: true,
                loading: false,
                errors: null
            }

        case SUCCESS_REGISTER:
        case SUCCESS_LOGIN:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                //...action.payload, ///BOOOO!
                userAuth: true,
                loading: false,
                errors: null
            }

        case FAIL_REGISTER:
        case FAIL_LOGIN:
        case LOG_OUT:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                userAuth: null,
                loading: false,
                errors: action.payload
            }

        case SET_ERROR:
            return {
                ...state,
                errors: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                errors: null
            }



        default:
            return state;
    }
}