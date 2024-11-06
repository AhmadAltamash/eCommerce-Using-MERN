import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


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
    <div>
      <form onSubmit={loginHandler}>
        <input type='email' name='email' required placeholder='enter email' value={user.email} onChange={onChangeInput}/>
        <input type='password' name='password' required placeholder='enter password' value={user.password} onChange={onChangeInput}/>

        

        <div>
          <button type='submit' >Login</button>
          <Link to='/register' className='btn'>Register</Link>
        </div>
      </form>
    </div>
  )
}

export default Login