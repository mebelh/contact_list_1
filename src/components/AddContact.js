import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addContact} from '../redux/actions'

export function AddContact() {
   const [name, setName] = useState('')
   const [phone, setPhone] = useState('')
   const dispatch = useDispatch()
   const addContactHandler = (e) => {
      e.preventDefault()
      if(!name || !phone || !+phone || phone.length < 10 || phone.length > 12 || name.length < 3){
         return
      }
      dispatch(addContact({name, phone}))
   }
   return (
      <form className='addContact' onSubmit={addContactHandler}>
         <h4 className='addContact__title'>Добавить контакт</h4>
         <input
            type='text'
            placeholder='Имя'
            onChange={
               ({target}) => {
                  setName(target.value)
               }
            }
            value={name}
         />
         <input
            type='text'
            placeholder='Номер телефона'
            onChange={
               ({target}) => {
                  setPhone(target.value)
               }
            }
            value={phone}
         />
         <button className='btn mt-sm'>Добавить</button>
      </form>
   )
}