import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'



const Navbar = () => {
  return (
    <>
        
        <nav className="navbar navbar-expand-lg navbar-custom navbar-light bg-custom">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="#">
                    <b>Umeed</b>
                    {/* <img src={ logo } alt='logo'></img> */}
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item" >
                            <NavLink className="nav-link active navbar-text" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link navbar-text" to="/about">About</NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink className="nav-link navbar-text" to="/contact">Contact</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link navbar-text" to="/Login">Login</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link navbar-text" to="/Signup">Signup</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar