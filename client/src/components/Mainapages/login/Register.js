import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'


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
    <div className='reg-page'>
      <form onSubmit={regsiterHandler}>
        <input type='text' name='name' required placeholder='enter name' value={user.name} onChange={onChangeInput}/>
        <input type='email' name='email' required placeholder='enter email' value={user.email} onChange={onChangeInput}/>
        <input type='password' name='password' required placeholder='enter password' value={user.password} onChange={onChangeInput}/>

        

        <div>
          <button type='submit' >Register</button>
          <Link to='/login' className='btn'>Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register