import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ReactPlayer from 'react-player'

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

  editRoute = (event) => {
    event.preventDefault()
    window.location.href = `/songs/#/songs/${this.props.match.params.id}/edit`
  }

  indexRoute = (event) => {
    event.preventDefault()
    window.location.href = '/songs/#/songs/'
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
      <div className="song_show">
        <div className="title_show">
          <h1>{this.state.song.title}</h1>
          <h2>By: {this.state.song.artist}</h2>
        </div>
        <div className="video_container">
          <ReactPlayer
            className="video"
            url={this.state.song.video}
          />
        </div>
        <a href={this.state.song.tabs} target="_blank" rel="noopener noreferrer">{this.state.song.tabs}</a>
        <p>{this.state.song.notes}</p>
        <div className="show_routes">
          <button onClick={this.deleteSong}>Delete Song</button>
          <button onClick={this.editRoute}>Edit
          </button>
        </div>
        <button onClick={this.indexRoute}>Repertoire</button>
      </div>
    )
  }
}

export default SongShow
