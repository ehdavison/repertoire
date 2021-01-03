import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class SongEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      song: {
        title: '',
        artist: '',
        video: '',
        tabs: '',
        notes: ''
      },
      updated: false
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
      .then(res => this.setState({ song: res.data }))
      .catch(console.error)
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedSong = Object.assign(this.state.song, updatedField)
    this.setState({ song: editedSong })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: apiUrl + '/songs/' + this.props.match.params.id + '/',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      },
      data: { song: this.state.song }
    })
      .then(() => this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    const { updated } = this.state
    // const { handleChange, handleSubmit } = this

    if (updated) {
      return <Redirect to={`/songs/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <h1>Song Update Page</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Song Title Here"
            name="title"
            value={this.state.song.title}
            onChange={this.handleChange}
          />
          <input
            placeholder="Song Artist Here"
            name="artist"
            value={this.state.song.artist}
            onChange={this.handleChange}
          />
          <input
            placeholder="Video Link Here"
            name="video"
            value={this.state.song.video}
            onChange={this.handleChange}
          />
          <input
            placeholder="Tabs/Sheet Music Here"
            name="tabs"
            value={this.state.song.tabs}
            onChange={this.handleChange}
          />
          <input
            placeholder="Notes"
            name="notes"
            value={this.state.song.notes}
            onChange={this.handleChange}
          />
          <button type="submit">Update a Song</button>
        </form>
      </div>
    )
  }
}

export default SongEdit
