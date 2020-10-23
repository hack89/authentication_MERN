import React, {useContext} from 'react'
import AuthContext from '../../context/authContext/authContext'
import GuestContext from '../../context/guestContext/guestContext'
import {Link} from 'react-router-dom'
const Navbar = () => {

  const {logoutUser, clearError, userAuth, user} = useContext(AuthContext);
  const { clearGuests } = useContext(GuestContext)

  const logout =()=> {
    logoutUser()
    clearError()
    clearGuests()
  }

  const userLinks = (
    <>
    <li>Hello, {user ? user.name : ''}!</li>
        <span className="sm-hide">|</span>
        <li>
          <a href="#!" onClick={logout}>
            <span className="sm-hide">Logout</span>
            <i className="fas fa-sign-out-alt"></i>
          </a>
        </li>
    </>
  )

  const authLinks = (
    <>
    <li>
      <Link to='/register' >Register</Link>
    </li>
        <span className="sm-hide">|</span>
        <li>
          <Link to='/login'>Login</Link>
        </li>
    </>
  )

  return (
    <div className="navbar">
      <div className="logo">
        <h1><i className='fas fa-glass-cheers' />
          Party RSVP
        </h1>
  
      </div>
      <ul>
       {userAuth ? userLinks : authLinks}
      </ul>
    </div>
  )
}

export default Navbar
