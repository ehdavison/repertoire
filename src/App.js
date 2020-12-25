import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import SongCreate from './components/songs/SongCreate'
import SongIndex from './components/songs/SongIndex'
import SongShow from './components/songs/SongShow'
import SongEdit from './components/songs/SongEdit'
class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  setUserId = id => this.setState({ id })

  setUserToken = token => this.setState({ token })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} setUserId={this.setUserId} setUserToken={this.setUserToken} />
          )} />
          <Route exact path='/' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} setUserId={this.setUserId} setUserToken={this.setUserToken} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/song-create' render={({ match }) => (
            <SongCreate msgAlert={this.msgAlert} match={match} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/songs' render={({ match }) => (
            <SongIndex msgAlert={this.msgAlert} match={match} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/songs/:id' render={({ match }) => (
            <SongShow msgAlert={this.msgAlert} match={match} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/songs/:id/edit' render={({ match }) => (
            <SongEdit msgAlert={this.msgAlert} match={match} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
