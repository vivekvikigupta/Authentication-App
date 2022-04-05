import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {fetch} from 'whatwg-fetch'


const Signupform = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name:'', email:'', phone:'', work:'', password:'', cpassword:''
  })

  let name, value;
  const handleInputs= (e) =>{
   if(user === undefined){
     return
   }
    name = e.target.name
    value = e.target.value
    setUser({...user, [name]:value})
    
  }

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    //additional data sent along with data

    const res = await fetch('/register', {
      method: "POST",
      headers: {
        "Content-Type" : 'application/json'
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    })

    const rdata = await res.json();
    

    if( res.status === 422 ){
      window.alert('Registration Failed! \nReason : ' + rdata.err);
      console.log(res.status)
      console.log(rdata.err)
    
    }
    else{
      window.alert( rdata.message + "\n You will be redirected to login page." )
      console.log("Registration Successful !")
      console.log(res.status)
      //redirecting to login page using useNavigate
      navigate('/login')
    }
  }


  return (
    <>
        <div className='row'>
              <div className='label col-1 control-label'></div>
              <label className='label col-1 control-label'><i className='zmdi zmdi-account' /></label>
              <div className='col-9'>
                <input type='text' className='form-control' name='name' placeholder='Your Name'
                value={user.name}
                onChange={handleInputs}/>  
              </div>
              <div className='label col-1 control-label'></div>
        </div>

         
            <div className='row'>
                <div className='label col-1 control-label'></div>
                <label className='label col-1 control-label'><i className='zmdi zmdi-email' /></label>
                <div className='col-9'>
                    <input type='email' className='form-control' name='email' placeholder='Your E-mail'
                    value={user.email}
                    onChange={handleInputs}
                    />  
                </div>
                <div className='label col-1 control-label'></div>
            </div>

            <div className='row'>
                <div className='label col-1 control-label'></div>
                <label className='label col-1 control-label'><i className='zmdi zmdi-phone' /></label>
                <div className='col-9'>
                 <input type='number' className='form-control' name='phone' placeholder='Phone Number'
                 value={user.phone}
                 onChange={handleInputs}
                 />  
                </div>
                <div className='label col-1 control-label'></div>
            </div>

            <div className='row'>
              <div className='label col-1 control-label'></div>
              <label className='label col-1 control-label'><i className='zmdi zmdi-case' /></label>
              <div className='col-9'>
                <input type='text' className='form-control' name='work' placeholder='Your Profession'
                value={user.work}
                onChange={handleInputs}
                />  
              </div>
              <div className='label col-1 control-label'></div>
            </div>

            <div className='row'>
              <div className='label col-1 control-label'></div>
              <label className='label col-1 control-label'><i className='zmdi zmdi-shield-security' /></label>
              <div className='col-9'>
                <input type='password' className='form-control' name='password' placeholder='Password'
                value={user.password}
                onChange={handleInputs}
                />
                
              </div>
              <div className='label col-1 control-label'></div>
            </div>

            <div className='row'>
              <div className='label col-2 control-label'></div>
              <div className='col-9'>
                <small>*Passowrd must be atleast 8 characters</small>  
              </div>
              <div className='label col-1 control-label'></div>
            </div>

            <div className='row'>
              <div className='label col-1 control-label h'></div>
              <label className='label col-1 control-label h'><i className='zmdi zmdi-shield-check' /></label>
              <div className='col-9'>
                <input type='password' className='form-control h' name='cpassword' placeholder='Confirm Password'
                value={user.cpassword}
                onChange={handleInputs}/>  
              </div>
              <div className='label col-1 control-label h'></div>
            </div>

            <div className='row'>
              <div className='col-4' />
              <div className='col-4'>
                <div className='btn btn-info' onClick={postData}>Register</div>
              </div>
              <div className='col-4'/>
            </div>
    </>
  )
}


export default Signupform;
