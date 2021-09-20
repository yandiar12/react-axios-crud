import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { logout } from '../actions/auth'

const Navbar = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)

  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes('ROLE_MODERATOR'))
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'))
    }
  }, [currentUser])

  const logOut = () => {
    dispatch(logout())
    return <Redirect to='/login' />
  }
  
  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={'/'} className='navbar-brand'>
          bezKoder
        </Link>
        <div className='navbar-nav mr-auto'>
          <li className='navbar-nav mr-auto'>
            <Link to={'/home'} className='nav-link'>
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className='nav-item'>
              <Link to={'/mod'} className='nav-link'>
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className='nav-item'>
              <Link to={'/admin'} className='nav-link'>
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className='nav-item'>
              <Link to={'/user'} className='nav-link'>
                User
              </Link>
            </li>
          )}

          {currentUser ? (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to='/profile' className='nav-link'>
                  {currentUser.username}
                </Link>
              </li>
              <li className='nav-item'>
                <a href='/logout' className='nav-link' onClick={logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className='navbar-nav ml-auto'>
              <li className='navbar-nav ml-auto'>
                <Link to={'/login'} className='nav-link'>
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
 
export default Navbar;