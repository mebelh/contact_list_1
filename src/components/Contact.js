import React, {useState} from 'react'
import {request} from '../utils/http'
import {connect, useDispatch} from 'react-redux'
import {deleteContact} from '../redux/actions'

export function ContactComp({id, name: serverName, phone: serverPhone, login}) {
   const [editing, setEditing] = useState(false)
   const [name, setName] = useState(serverName)
   const [phone, setPhone] = useState(serverPhone)
   const [error, setError] = useState(false)
   const dispatch = useDispatch()

   const toggleEditingStatusHandler = () => {
      setEditing(!editing)
      setError(false)
   }

   const changeContact = async () => {
      if (+phone && phone.length > 9 && phone.length < 12 && name.length > 2) {
         toggleEditingStatusHandler()
         if (phone !== serverPhone || name !== serverName) {
            request('/api/edit', {id, name, phone, login}).then()
         }
      } else {
         setError(true)
      }
   }

   const deleteContactHandler = () => {
      dispatch(deleteContact(id, login))
   }

   return !editing ?
      (
         <div className='contacts__item'>
            <div>{name}</div>
            <div>{phone}</div>
            <div
               className='contacts__item_edit link'
               onClick={toggleEditingStatusHandler}
            >
               Изменить
            </div>
            <div
               className='contacts__item_delete link danger'
               onClick={deleteContactHandler}
            >
               Удалить
            </div>
         </div>
      ) :
      (
         <div className='contacts__item'
              style={error ? {
                 backgroundColor: 'red'
              } : {}}
         >
            <input
               value={name}
               onChange={({target}) => {
                  setName(target.value)
               }}
            />
            <input
               value={phone}
               onChange={({target}) => {
                  if (+target.value) {
                     setPhone(target.value)
                  }
               }}
            />

            <div
               className='link'
               onClick={changeContact}
            >
               Сохранить
            </div>
         </div>
      )
}

const mapStateToProps = ({user}) => ({login: user.login})

const Contact = connect(mapStateToProps, null)(ContactComp)

export function createContact({id, name, phone}) {
   return <Contact phone={phone} name={name} id={id} key={id}/>
}