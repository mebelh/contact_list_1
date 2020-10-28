import {CONTACT_ADD, CONTACT_DELETE, CONTACT_EDIT, SET_ERROR, USER_SIGNIN, USER_SIGNOUT} from './types'

export function signIn(userData) {
   return {
      type: USER_SIGNIN,
      payload: {
         ...userData,
         isAuth: true
      }
   }
}

export function signOut() {
   return {
      type: USER_SIGNOUT,
   }
}

export function setError(text) {
   return dispatch => {
      dispatch({
         type: SET_ERROR,
         payload: !!text && text
      })
      setTimeout(() => {
         dispatch({
            type: SET_ERROR,
         })
      }, 3000)
   }
}

export function addContact(contact) {
   return {
      type: CONTACT_ADD,
      payload: contact
   }
}

export function deleteContact(id) {
   return {
      type: CONTACT_DELETE,
      payload: id
   }
}


export function editContact(id, name, phone) {
   if (id && name && phone)
      return {
         type: CONTACT_EDIT,
         payload: {id, phone, name}
      }
}