import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import './form.css'

function Register() {

  const [user, setUser] = useState({
    name:'',
    email:'',
    password:''
  })

  const regsiterHandler = async(e) => {
    e.preventDefault()
    try {
      await axios.post('user/register',{...user})

      localStorage.setItem('firstRegister', true)

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
    // <div className='reg-page'>
    //   <form onSubmit={regsiterHandler}>
    //     <input type='text' name='name' required placeholder='enter name' value={user.name} onChange={onChangeInput}/>
    //     <input type='email' name='email' required placeholder='enter email' value={user.email} onChange={onChangeInput}/>
    //     <input type='password' name='password' required placeholder='enter password' value={user.password} onChange={onChangeInput}/>

        

    //     <div>
    //       <button type='submit' >Register</button>
    //       <Link to='/login' className='btn'>Login</Link>
    //     </div>
    //   </form>
    // </div>
    <div className='container'>
      <div className="form-box">
        <form className="form" onSubmit={regsiterHandler}>
            <span className="title">Sign up</span>
            <span className="subtitle">Create a free account with your email.</span>
            <div className="form-container">
              <input type='text' name='name' className='input' required placeholder='Name' value={user.name} onChange={onChangeInput}/>
              <input type="email" name='email' className="input" required placeholder="Email" value={user.email} onChange={onChangeInput}/>
              <input type="password" name='password' className="input" required placeholder="Password" value={user.password} onChange={onChangeInput}/>
            </div>
            <button type='submit'>Sign up</button>
        </form>
        <div className="form-section">
          <p>Have an account? <Link to='/login'>Log in</Link> </p>
        </div>
      </div>
    </div>
  )
}

export default Register