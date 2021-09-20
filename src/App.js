import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Home from './components/Home'
import Profile from './components/Profile'
import BoardModerator from './components/BoardModerator'
import BoardAdmin from './components/BoardAdmin'

import { clearMessage } from './actions/message'

import { history } from './helpers/history'
import Navbar from './components/Navbar'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()) //clear message when cahnging location
    })
  }, [dispatch])

  return (
    <Router history={history}>
      <div>
        <Navbar />
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
