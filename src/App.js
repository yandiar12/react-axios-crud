import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import BoardModerator from './components/BoardModerator'
import BoardAdmin from './components/BoardAdmin'

//  Tutorials
import AddTutorial from './components/Tutorials/add-tutorial.component'
import Tutorial from './components/Tutorials/tutorial.component'
import TutorialList from './components/Tutorials/tutorials-list.component'

import { logout } from './actions/auth'
import { clearMessage } from './actions/message'

import { history } from './helpers/history'

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)

  const { user: currentUser } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()) //clear message when cahnging location
    })
  }, [dispatch])

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
    <Router history={history}>
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

            {currentUser && (<li className='nav-item'>
              <Link to={'/tutorials'} className='nav-link'>
                Tutorial
              </Link>
            </li>)}

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

        <div className='container mt-3'>
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Profile} />
            <Route path='/mod' component={BoardModerator} />
            <Route path='/admin' component={BoardAdmin} />
            <Route path='/tutorials/:id' component={Tutorial} />
            <Route path='/tutorials' component={TutorialList} />
            <Route path='/add-tutorial' component={AddTutorial} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
