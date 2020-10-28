import React from 'react'
import {Link} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import {signOut} from '../redux/actions'

function Header({user}) {
   const dispatch = useDispatch()

   const logoutHandler = ()=>{
      dispatch(signOut())
   }
   return (
      <div className='header'>
         <div className='header__content container'>
            <Link to={'/contacts'}>
               <div>
                  Список Контактов
               </div>
            </Link>
            <div>
               Здравствуйте, {user.login}
               <div
                  onClick={logoutHandler}
                  className='link'
               >
                  Выйти
               </div>
            </div>
         </div>
      </div>
   )
}

const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps, null)(Header)