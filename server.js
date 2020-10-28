const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const {v4: uuidv4} = require('uuid')

app.use(express.json())

app.post('/register', (req, res) => {
   const person = addUser({...req.body, contacts: []})
   res.json(person)
})

app.post('/login', (req, res) => {
   const person = findUser(req.body.login)
   if (!person) {
      return res.json({
         error: {
            text: 'Пользователь не найден!'
         }
      })
   }
   if (person.password !== req.body.password) {
      return res.json({
         error: {
            text: 'Неверный пароль!'
         }
      })
   }
   res.json({
      login: person.login,
      contacts: person.contacts
   })
})

app.post('/api/add', (req, res) => {
   const id = uuidv4()
   const contact = {id, ...req.body.contact}
   addContact(req.body.userLogin, contact)
   res.json(contact)
})

app.post('/api/edit', (req, res) => {
   const {login, ...contact} = req.body
   editContact(login, contact)
})

app.post('/api/delete', (req, res) => {
   deleteContact(req.body.id, req.body.userLogin)
})

app.listen(3001, () => {
   console.log('Server started!')
})

function addUser(user) {
   const areFree = findUserIdx(user.login)
   if (areFree) return false
   const db = getData()
   const newData = [...db, user]
   writeData(newData)
   return user
}

function addContact(userLogin, contact) {
   const user = findUser(userLogin)
   const data = getData()
   const userIdx = findUserIdx(userLogin)
   const newContacts = [...user.contacts, contact]
   user.contacts = newContacts
   const newData = replaceElInArray(data, userIdx, user)
   writeData(newData)
}

function editContact(userLogin, contact) {
   const data = getData()
   const userIdx = findUserIdx(userLogin)
   const user = findUser(userLogin)
   const contacts = user['contacts'] || []
   const contactIdx = findContactIdx(userLogin, contact.id)
   const newUser = {
      ...user,
      'contacts': replaceElInArray(contacts, contactIdx, contact)
   }

   const newData = replaceElInArray(data, userIdx, newUser)

   writeData(newData)
}

function deleteContact(id, userLogin) {
   const data = getData()
   const user = findUser(userLogin)
   const userIdx = findUserIdx(userLogin)
   const contactIdx = findContactIdx(userLogin, id)
   const newContacts = deleteElInArray(user['contacts'], contactIdx)
   const newUser = {
      ...user,
      ['contacts']: newContacts
   }
   const newData = replaceElInArray(data, userIdx, newUser)
   writeData(newData)
}

function getData() {
   return JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')), 'utf-8')
}

function writeData(data) {
   fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data))
}

function findUserIdx(userLogin) {
   const data = getData()
   const userIdx = data.findIndex(u => u.login === userLogin)
   return ~userIdx ? userIdx : false
}

function findUser(userLogin) {
   const data = getData()
   const userIdx = findUserIdx(userLogin)
   return data[userIdx]
}

function replaceElInArray(arr, id, newEl) {
   return [...arr.slice(0, id), newEl, ...arr.slice(id + 1)]
}

function deleteElInArray(arr, id) {
   return [...arr.slice(0, id), ...arr.slice(id + 1)]
}

function findContactIdx(userLogin, contactId) {
   const userIdx = findUserIdx(userLogin)
   const data = getData()
   const user = data[userIdx]
   const courseIdx = user.contacts.findIndex(c => c.id === contactId)
   return ~courseIdx ? courseIdx : false
}