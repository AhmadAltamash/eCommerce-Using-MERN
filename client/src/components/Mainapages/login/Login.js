import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './form.css'

function Login() {

  const [user, setUser] = useState({
    email:'',
    password:''
  })

  const loginHandler = async(e) => {
    e.preventDefault()
    try {
      await axios.post('user/login',{...user})

      localStorage.setItem('firstLogin', true)

      window.location.href = '/'
    } catch (error) {
      alert(error.response.data.msg)
    }
  }
  const onChangeInput = (e)=>{
    const {name,value} = e.target;
    setUser({...user, [name]:value})
  }

  return (
    <div className='container'>
      <div className="form-box">
        <form className="form" onSubmit={loginHandler}>
            <span className="title">Login</span>
            <span className="subtitle">Login to your account with your email.</span>
            <div className="form-container">
              <input type="email" name='email' className="input" required placeholder="Email" value={user.email} onChange={onChangeInput}/>
              <input type="password" name='password' className="input" required placeholder="Password" value={user.password} onChange={onChangeInput}/>
            </div>
            <button type='submit'>Login</button>
        </form>
        <div className="form-section">
          <p>Create a free account with your email. <Link to='/register'>Register</Link> </p>
        </div>
      </div>
    </div>
  )
}

export default Login