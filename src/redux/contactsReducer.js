import {CONTACT_ADD, CONTACT_DELETE, CONTACT_EDIT} from './types'

const initialState = [
   {
      id: 1,
      name: 'Алексей Штора',
      phone: '123123123'
   },
   {
      id: 2,
      name: 'Валерий Штора',
      phone: '123123123'
   },
   {
      id: 3,
      name: 'Алексей Валерий',
      phone: '123123123'
   }
]

export function contactsReducer(state = initialState, action) {
   switch (action.type) {
      case CONTACT_ADD:
         return [...state, action.payload]
      case CONTACT_DELETE:
         return state.filter(c => c.id !== action.payload)
      case CONTACT_EDIT:
         const idx = state.indexOf(c => c.id === action.payload.id)
         return [...state.slice(0, idx - 1), action.payload, ...state.slice(idx + 1)]
      default:
         return state
   }
}