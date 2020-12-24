import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class SongShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      song: null,
      deleted: false
    }
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: apiUrl + '/songs/' + this.props.match.params.id,
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({ song: response.data })
      })
      .catch(console.error)
  }

  deleteSong = (event) => {
    event.preventDefault()
    axios({
      method: 'DELETE',
      url: apiUrl + '/songs/' + this.props.match.params.id,
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({ deleted: true })
      })
      .catch(console.error)
  }

  render () {
    const { song, deleted } = this.state

    if (!song) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/songs/', state: { msg: 'Song successfully deleted!' } }
      } />
    }

    return (
      <div>
        <h4>{this.state.song.title}</h4>
        <p>By: {this.state.song.artist}</p>
        <p>{this.state.song.video}</p>
        <p>{this.state.song.tabs}</p>
        <p>{this.state.song.notes}</p>
        <button onClick={this.deleteSong}>Delete Song</button>
        <Link to={`/songs/${this.props.match.params.id}/edit`}>Edit
        </Link>
        <Link to='/songs'>Repertoire</Link>
      </div>
    )
  }
}

export default SongShow
