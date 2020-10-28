import React from 'react'

export function Contact({id, name, phone}) {
   return (
      <div className='contacts__item'>
         <div>{name}</div>
         <div>{phone}</div>
      </div>
   )
}

export function createContact({id, name, phone}){
   return <Contact phone={phone} name={name} id={id} key={'' + id + name + phone}/>
}