const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.json())

app.post('/register', (req, res) => {
   console.log(req.body)
   const person = addUser({...req.body, contacts: []})
   res.json(person)
})

app.post('/login', (req, res) => {
   console.log('login', req.body)
   const person = checkLogin(req.body.login)
   if (!person) {
      return res.json({
         error: {
            text: 'Пользователь не найден!'
         }
      })
   }
   if(person.password !== req.body.password){
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

app.listen(3001, () => {
   console.log('Server started!')
})


function getData() {
   return JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')), 'utf-8')
}

function writeData(data) {
   fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data))
}

function addUser(data) {
   const areFree = checkLogin(data.login)
   if (areFree) return false
   const db = getData()
   const newData = [...db, data]
   writeData(newData)
   return newData
}

function checkLogin(login) {
   const db = getData()
   const user = db.filter((user) => user.login === login)
   if (user.length) {
      return user[0]
   }
   return false
}

function editContact(data) {

}

function deleteContact(id) {

}