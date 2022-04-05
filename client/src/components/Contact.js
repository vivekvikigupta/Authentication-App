import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'


const Contact = () => {

  const navigate = useNavigate()

  const [userData, setUserData] = useState('');

  const contactUs = async ()=>{
    try{
      const res = await fetch('/getcontact', {
        method: "GET",
        headers:{
          "Content-Type": "application/json"
        }
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
    contactUs()
  
  }, [])






  return (
    <div className='container contact_info'>
      <div class="container overflow-hidden">
        <div class="row gy-5">

          <div class="col-4  contact_info_sub">
            <div class="p-3 border">
              <i className='zmdi zmdi-account' />
              <label className='user_detail_label'>{userData.name}</label>
            </div>
          </div>

          <div class="col-4 contact_info_sub">
            <div class="p-3 border">
              <i className='zmdi zmdi-email' />
              <label className='user_detail_label'>{userData.email}</label>
            </div>
          </div>

          <div class="col-4  contact_info_sub">
            <div class="p-3 border">
              <i className='zmdi zmdi-phone' />
              <label className='user_detail_label'>{userData.phone}</label>
            </div>
          </div>
        

          <form>
            <div className='row'>
              <div className='col-12'>
                <textarea type="text" placeholder="Type Your mesage here...." className='user_message' name="user_message" cols="200" rows="8"/>
              </div>
            </div>
            <div className='row'>
              <div className='col-5'>

              </div>
              <div className='col-4'>
                <button className="btn btn-info" onClick='#'>Send</button>
              </div>
            </div>
              
            
          </form>

        </div> 
      </div>
    </div>
  )
}

export default Contact