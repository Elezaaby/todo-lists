import React, { useState } from 'react'
import logo from '../images/logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Login.scss'

const Login = ({ gitUserData }) => {

  let navigate = useNavigate()
  const [error, setError] = useState()

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  function gitUsers(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }

  // console.log(user);

  async function submitLogin(e) {
    e.preventDefault()
    let { data } = await axios.post('https://route-movies-api.vercel.app/signin', user)

    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token)
      gitUserData()
      navigate('/todo-lists/notes')
    }
    else {
      setError(data.message)
      console.log(error)
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
            <input onChange={gitUsers} type="password" placeholder='Password' name='password' />
            {error ? <span>{error.includes('password') ? <span className='error'>Password is incorrect, try again</span> : ''}</span> : ''}<br />
            <button className='btn_reg'>Sign Up</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login