import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class SongCreate extends Component {
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
      createdId: null
    }
  }

  handleInputChange = (event) => {
    event.persist()
    this.setState(prevState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }
      const updatedData = Object.assign({}, prevState.song, updatedField)
      return { song: updatedData }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: apiUrl + '/songs/',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      },
      data: { song: this.state.song }
    })
      .then(response => {
        this.setState({ createdId: response.data.song.id })
      })
      .catch(console.error)
  }

  render () {
    if (this.state.createdId) {
      return <Redirect to={`/songs/${this.state.createdId}`}/>
    }
    return (
      <div>
        <h1 className="create-banner">Add a song to your repertoire!</h1>

        <form className="create-container" onSubmit={this.handleSubmit}>
          <input
            className="create-form"
            placeholder="Song Title Here"
            name="title"
            value={this.state.song.title}
            onChange={this.handleInputChange}
          />
          <input
            className="create-form"
            placeholder="Song Artist Here"
            name="artist"
            value={this.state.song.artist}
            onChange={this.handleInputChange}
          />
          <input
            className="create-form"
            placeholder="Video Link Here"
            name="video"
            value={this.state.song.video}
            onChange={this.handleInputChange}
          />
          <input
            className="create-form"
            placeholder="Tabs/Sheet Music Here"
            name="tabs"
            value={this.state.song.tabs}
            onChange={this.handleInputChange}
          />
          <input
            className="create-form"
            placeholder="Notes"
            name="notes"
            value={this.state.song.notes}
            onChange={this.handleInputChange}
          />
          <button className="create-submit" type="submit">Add a Song</button>
        </form>
      </div>
    )
  }
}

export default SongCreate
