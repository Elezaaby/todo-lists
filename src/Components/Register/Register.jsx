import React, { useState } from 'react'
import './Register.scss'
import logo from '../images/logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';

const Register = () => {

  let navigate = useNavigate()
  // list error api
  const [error, setError] = useState()
  // list error validate
  const [errorValidate, setErrorValidate] = useState([])
  const [isLoding, setIsLoding] = useState(false)

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    age: 0, 
  })

  function validateRegister(user) {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().alphanum().min(3).max(10).required(),
      age: Joi.number().min(16).max(60).required(),
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

  async function submitRegister(e) {
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
      let { data } = await axios.post('https://route-movies-api.vercel.app/signup', user)

      if (data.message === 'success') {
        navigate('/todo-lists/login')
      }
      else {
        setError(data.message)
        setIsLoding(false)
      }
    }
  }
  return (
    <section className='register'>
      <div className="container_reg">
        <div className="hed_reg">
          <div className="hed_reg_logo">
            <img src={logo} alt="" />
            <h3>Sign Up</h3>
          </div>
          <span>Please fill in this form to create an account!</span><br />
        </div>
        <div className="form">
          <form onSubmit={submitRegister}>
            <div className="form_name">
              <input onChange={gitUsers} className='name' type="text" placeholder='First Name' name='first_name' />
              <input onChange={gitUsers} className='name' type="text" placeholder='Last Name' name='last_name' />
            </div>
            {errorValidate ? errorValidate.map((error, index) => error.context.key === 'first_name' ? <div key={index} className='error'>{error.message}</div> : '') : ''}
            {errorValidate ? errorValidate.map((error, index) => error.context.key === 'last_name' ? <div key={index} className='error'>{error.message}</div> : '') : ''}

            <input onChange={gitUsers} type="email" placeholder='Email' name='email' />
            {error ? <span>{error.includes('email') ? <span className='error'>Email is incorrect, try again</span> : ''}</span> : ''}<br />
            {errorValidate ? errorValidate.map((error, index) => error.context.key === 'email' ? <div key={index} className='error'>{error.message}</div> : '') : ''}

            <input onChange={gitUsers} type="password" placeholder='Password' name='password' />
            {error ? <span>{error.includes('password') ? <span className='error'>Password is incorrect, try again</span> : ''}</span> : ''}<br />
            {errorValidate ? errorValidate.map((error, index) => error.context.key === 'password' ? <div key={index} className='error'>The Password is incorrect</div> : '') : ''}

            <input onChange={gitUsers} type="number" placeholder='Age' name='age' />
            {errorValidate ? errorValidate.map((error, index) => error.context.key === 'age' ? <div key={index} className='error'>{error.message}</div> : '') : ''}

            <button className='btn_reg'> {isLoding ? <i className='fas fa-spinner fa-spin'></i> : 'Sign Up'} </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register