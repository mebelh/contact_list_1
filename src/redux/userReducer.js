import {SET_ERROR, USER_SIGNIN, USER_SIGNOUT} from './types'

const initialState = {
   isAuth: false,
   error: false
}

export function userReducer(state = initialState, action) {
   switch (action.type) {
      case USER_SIGNIN:
         return {
            ...state,
            ...action.payload
         }
      case USER_SIGNOUT:
         return initialState
      case SET_ERROR:
         return {
            ...state,
            error: action.payload ? action.payload : false
         }
      default:
         return state
   }
}