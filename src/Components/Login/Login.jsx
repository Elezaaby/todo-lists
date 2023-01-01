import React, { useState } from 'react'
import logo from '../images/logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Login.scss'
import Joi from 'joi';

const Login = ({ gitUserData }) => {

  let navigate = useNavigate()
  // list error api
  const [error, setError] = useState()
  // list error validate
  const [errorValidate, setErrorValidate] = useState([])
  const [isLoding, setIsLoding] = useState(false)

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  function validateRegister(user) {
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
    return schema.validate(user, { abortEarly: false })
  }

  function gitUsers(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }

  async function submitLogin(e) {
    e.preventDefault()
    setIsLoding(true)
    let validateResult = validateRegister(user)


    if (validateResult.error) {
      // list error validate
      setIsLoding(false)
      setErrorValidate(validateResult.error.details)
      console.log(errorValidate);
    }

    else {
      let { data } = await axios.post('https://route-movies-api.vercel.app/signin', user)

      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token)
        gitUserData()
        navigate('/todo-lists/notes')
      }
      else {
        setError(data.message)
        setIsLoding(false)
      }
    }
  }
  return (
    <section className='login'>
      <div className="container_reg">
        <div className="hed_reg">
          <div className="hed_reg_logo">
            <img src={logo} alt="" />
            <h3>Sign In</h3>
          </div>
          <span>Please fill out this form to continue!</span>
        </div>
        <div className="form">
          <form onSubmit={submitLogin}>
            <input onChange={gitUsers} type="email" placeholder='Email' name='email' />
            {error ? <span>{error.includes('email') ? <span className='error'>Email is incorrect, try again</span> : ''}</span> : ''}<br />
            {errorValidate ? errorValidate.map((error, index) => error.context.key === 'email' ? <div key={index} className='error'>{error.message}</div> : '') : ''}


            <input onChange={gitUsers} type="password" placeholder='Password' name='password' />
            {error ? <span>{error.includes('password') ? <span className='error'>Password is incorrect, try again</span> : ''}</span> : ''}<br />
            {errorValidate ? errorValidate.map((error, index) => error.context.key === 'password' ? <div key={index} className='error'>The Password is incorrect</div> : '') : ''}


            <button className='btn_reg'> {isLoding ? <i className='fas fa-spinner fa-spin'></i> : 'Sign In'} </button>

          </form>
        </div>
      </div>
    </section>
  )
}

export default Login