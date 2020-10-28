import React from 'react'
import {connect} from 'react-redux'
import Header from './components/Header'
import {BrowserRouter, Redirect, Route} from 'react-router-dom'

import './scss/index.scss'
import {Login, Register} from './components/pages/Auth'
import {HelloPage} from './components/pages/HelloPage'
import Contacts from './components/pages/Contacts'

function App({user}) {
   return (
      <div className="App">
         <BrowserRouter>
            {user.isAuth && <Header/>}
            <div className='container mt-md'>
               <Route path={'/'} exact={true} component={HelloPage}/>
               <Route path={'/login'} component={Login}/>
               <Route path={'/register'} component={Register}/>
               <Route path={'/contacts'} component={Contacts}/>
            </div>
            {!user.isAuth ? <Redirect to={'/login'}/> : <Redirect to={'/'}/>}
         </BrowserRouter>
      </div>
   )
}

const mapStateToProps = ({user}) => {
   return {
      user
   }
}

export default connect(mapStateToProps, null)(App)
