import React, {useState, useEffect} from 'react'

const Home = () => {


  const [userData, setUserData] = useState('');

  const callUserName = async ()=>{
    try{
      const res = await fetch('/home', {
        method: "GET",
        headers:{
          "Content-Type": "application/json"
        }
      })
      
      const data = await res.json()
      console.log(data)
      setUserData(data)
      
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error
      }
    
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    //can't use async function in useEffect
    callUserName()
  
  }, [])



  return (

    //for home welcome page
    <div className='p-5 container'>
      <div className='home-container'>
        <h1>Welcome {userData.name}</h1>
      </div>
      <div className='para'>
        <h4>Good to see you again!</h4>
      </div>

      <div className='form'>
     
        <div className='row'>
        <div className='col-1'></div>
          <div className='col-2'><h1>Think</h1></div>
          <div className='col-6'></div>
          <div className='col-3'><h1>Innovate</h1></div>
        </div>

        <div className='row'>
          <div className='col-3'></div>
          <div className='col-4'><h1>Care</h1></div>
          <div className='col-2'><h1>Cost</h1></div>
          <div className='col-4'></div>
        </div>

        <div className='row'>
          <div className='col-4'></div>
          <div className='col-8'><h1>Competency</h1></div>
        </div>
       
      </div>
      
        
    
    
    </div>
    

    
  )
}

export default Home
