import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Loginform = () => { //react component name starts with capital letter

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e)=>{
    e.preventDefault();

    const res = await fetch('/signin', {
      method: "POST",
      headers: {
        "Content-Type" : 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const rdata = await res.json()
    
    if(res.status !== 200){
      console.log(res.status)
      console.log(rdata.err)
      window.alert('Login Failed! \nReason : ' + rdata.err)
    }
    else{
      console.log(res.status)
      console.log(rdata.message)
      window.alert(rdata.message + `\nWelcome ${email.split('@')[0]}`)

      //navigate to home page after successful login
      navigate('/')
    }
   
  }

  
  return (
    <>
        
        <form method='POST' className='col-md-6 set_x'>
          <h1 className='text-center'>Login</h1>

          <div className='row'>
          <div className='label col-1 control-label'></div>
            <label className='label col-1 control-label'><i className='zmdi zmdi-email' /></label>
            <div className='col-9'>
              <input type='email' className='form-control' name='email' 
              value = {email}
              onChange = { (e) => setEmail(e.target.value) }
              placeholder='Your E-mail'/>  
            </div>
            <div className='label col-1 control-label'></div>
          </div>

          <div className='row'>
            <div className='label col-1 control-label'></div>
            <label className='label col-1 control-label'><i className='zmdi zmdi-shield-security' /></label>
            <div className='col-9'>
              <input type='password'
              className='form-control' name='password' 
              value = {password}
              onChange = { (e) => setPassword(e.target.value) }
              placeholder='Password'/>
            </div>
            <div className='label col-1 control-label'></div>
          </div>

          <div className='row'>
            <div className='label col-2 control-label'/>
            <div className='col-9'>
              <small>*Passowrd must be atleast 8 characters</small>  
            </div>
            <div className='label col-1 control-label'></div>
          </div>

          <div className='row'>
            <div className='col-4'/>
            <div className='col-4'>
              <button className='btn btn-info' onClick={loginUser} >Login</button>
            </div>
            <div className='col-4'></div>
          </div>

                 
        </form>
    </>
  )
}

export default Loginform