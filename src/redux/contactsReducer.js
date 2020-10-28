import {CONTACT_ADD, CONTACT_DELETE, CONTACT_EDIT, USER_SIGNOUT} from './types'

const initialState = []

export function contactsReducer(state = initialState, action) {
   switch (action.type) {
      case CONTACT_ADD:
         return [...state, action.payload]
      case CONTACT_DELETE:
         return state.filter(c => c.id !== action.payload)
      case CONTACT_EDIT:
         const idx = state.findIndex(c => c.id === action.payload.id)
         return [...state.slice(0, idx - 1), action.payload, ...state.slice(idx + 1)]
      case USER_SIGNOUT:
         return initialState
      default:
         return state
   }
}