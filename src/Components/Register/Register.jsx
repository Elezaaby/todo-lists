import React, { useState } from 'react'
import './Register.scss'
import logo from '../images/logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {

  let navigate = useNavigate()
  const [error, setError] = useState()

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    age: 0,
  })

  function gitUsers(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }

  // console.log(user);

  async function submitRegister(e) {
    e.preventDefault()
    let { data } = await axios.post('https://route-movies-api.vercel.app/signup', user)
    console.log(data);
    if (data.message === 'success') {
      navigate('/todo-lists/login')
    }
    else {
      setError(data.message)
      console.log(error)
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
          <span>Please fill in this form to create an account!</span>
        </div>
        <div className="form">
          <form onSubmit={submitRegister}>
            <div className="form_name">
              <input onChange={gitUsers} className='name' type="text" placeholder='First Name' name='first_name' />
              <input onChange={gitUsers} className='name' type="text" placeholder='Last Name' name='last_name' />
            </div>
            <input onChange={gitUsers} type="email" placeholder='Email' name='email' />
            {error ? <span>{error.includes('email') ? <span className='error'>Email is incorrect, try again</span> : ''}</span> : ''}<br />
            <input onChange={gitUsers} type="password" placeholder='Password' name='password' />
            {error ? <span>{error.includes('password') ? <span className='error'>Password is incorrect, try again</span> : ''}</span> : ''}<br />
            <input onChange={gitUsers} type="number" placeholder='Age' name='age' />
            <button className='btn_reg'>Sign Up</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register