import React from 'react'
import Signupform from './Signupform'


const Signup = () => {

  
  
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'></div>
          <form method='POST' autoComplete='off' className='col-md-6'>
            <h1 className='text-center'>Register</h1>

            <Signupform />

            

          </form>
        </div>  
      </div>
    </>
  )
}

export default Signup