import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {request} from '../../utils/http'
import {useDispatch} from 'react-redux'
import {connect} from 'react-redux'
import {setError, signIn} from '../../redux/actions'
import {CONTACT_ADD} from '../../redux/types'

function Auth({actionText, link, actionLink, linkText, question, user}) {
   const dispatch = useDispatch()
   const [login, setLogin] = useState('')
   const [password, setPassword] = useState('')
   const changeLoginHandler = ({target}) => {
      setLogin(target.value)
   }
   const changePasswordHandler = ({target}) => {
      setPassword(target.value)
   }

   const onSubmitHandler = async (e) => {
      e.preventDefault()
      const json = await request(actionLink, {login, password})
      console.log(json)
      if (!json.error) {
         dispatch(signIn({login}))
         json.contacts.forEach(c=>{
            dispatch({
               type: CONTACT_ADD,
               payload: c
            })
         })
      }
      else{
         dispatch(setError(json.error.text))
      }
   }

   return (
      <div className='auth'>
         {
            user.error &&
            <div className='auth__error'>
               {user.error}
            </div>
         }
         <form onSubmit={onSubmitHandler}>
            <input type="text" placeholder={'Логин'} value={login} onChange={changeLoginHandler}/>
            <input type="text" placeholder={'Пароль'} value={password} onChange={changePasswordHandler}/>
            <button className='btn mt-sm'>{actionText}</button>
         </form>
         <div className='auth__actions mt-md'>
            <p>{question}</p>
            <Link to={link}>{linkText}</Link>
         </div>
      </div>
   )
}

const mapStateToProps = ({user}) => ({user})

const LoginComp = ({user}) =>
   <Auth
      actionText='Войти'
      link='/register'
      actionLink='/login'
      linkText='Создать аккаунт'
      question='Нет аккаунта?'
      user={user}
   />


const RegisterComp = ({user}) =>
   <Auth
      actionText='Зарегистрироваться'
      link='/login'
      actionLink='register'
      linkText='Войти'
      question='Есть аккаунт?'
      isLoginComp={true}
      user={user}
   />

export const Login = connect(mapStateToProps, null)(LoginComp)
export const Register = connect(mapStateToProps, null)(RegisterComp)
