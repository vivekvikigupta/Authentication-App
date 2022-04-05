import React, {useEffect, useState} from 'react'
import logo from '../images/logo.png'
import {useNavigate} from 'react-router-dom'

const About = () => {

  const navigate = useNavigate()
  const [userData, setUserData] = useState('');

  const callProfilePage = async ()=>{
    try{
      const res = await fetch('/profile', {
        method: "GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials:"include"
      })
      
      const data = await res.json()
      console.log(data)
      setUserData(data)
      

      if(res.status !== 200){
        if(res.status === 401){
          console.log(data.err)
          window.alert("Please login first!")
          navigate('/login')
          
        }else{
        const error = new Error(res.error)
        throw error
        }
      }
    }catch(err){
      console.log(err)

    }
  }

  useEffect(() => {
    //can't use async function in useEffect
    callProfilePage()
  
  }, [])


  return (
    <div className='container user_profile'>
      <form method='GET'>
        <div className='row'>
          <div className='col-4'>
              <div className='profile-img'>
                <img src={logo} alt='logo' className='img-fluid' />
              </div>
          </div>

          <div className='col-8'>
            
            <div className='row'>
              <div className='col-12 profile_head'>
                <h3>{ userData.name }</h3>
                <h6>{ userData.work }</h6>
              </div>
            </div>

            <div className='usr_data'>

              <div className='row row_gap'>
                <div className='col-6'>
                  <label className='label_head'>Name</label>
                </div>
                <div className='col-6'>
                  <label>{userData.name}</label>
                </div>
              </div>

              <div className='row row_gap'>
                <div className='col-6'>
                  <label className='label_head'>E-mail</label>
                </div>
                <div className='col-6'>
                  <label>{userData.email}</label>
                </div>
              </div>

              <div className='row row_gap'>
                <div className='col-6'>
                  <label className='label_head'>Contact Number</label>
                </div>
                <div className='col-6'>
                  <label>{userData.phone}</label>
                </div>
              </div>

              <div className='row row_gap'>
                <div className='col-6'>
                  <label className='label_head'>Profession</label>
                </div>
                <div className='col-6'>
                  <label>{userData.work}</label>
                </div>
              </div>

            </div>
            
            
          </div>
        </div>

      </form>
    </div>
 )
}
export default About
