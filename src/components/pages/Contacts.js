import React from 'react'
import {connect} from 'react-redux'
import {createContact} from '../Contact'
import AddContact from '../AddContact'

function Contacts({contactsData}) {
   const contacts = contactsData ? contactsData.map(createContact) : ''

   return (
      <div className='contacts'>
         <AddContact/>

         <div className='contacts__list mt-lg'>
            {contacts}
         </div>
      </div>
   )
}

const mapStateToProps = ({contacts}) => ({contactsData: contacts})

export default connect(mapStateToProps, null)(Contacts)