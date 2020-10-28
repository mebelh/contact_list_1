import {combineReducers} from 'redux'
import {userReducer} from './userReducer'
import {contactsReducer} from './contactsReducer'

export const rootReducer = combineReducers(
   {
      user: userReducer,
      contacts: contactsReducer
   }
)