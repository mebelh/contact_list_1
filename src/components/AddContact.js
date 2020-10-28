import React, {useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import {addContact} from '../redux/actions'

function AddContact({user}) {
   const [name, setName] = useState('')
   const [phone, setPhone] = useState('')
   const dispatch = useDispatch()
   const addContactHandler = (e) => {
      e.preventDefault()
      if (!name || !phone || !+phone || phone.length < 10 || phone.length > 12 || name.length < 3) {
         return
      }
      setPhone('')
      setName('')
      dispatch(addContact({name, phone}, user.login))
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

const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps, null)(AddContact)