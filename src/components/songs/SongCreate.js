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
    console.log('this is the song: ', this.state.song)
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
    console.log(this.props)
    if (this.state.createdId) {
      return <Redirect to={`/songs/${this.state.createdId}`}/>
    }
    return (
      <div>
        <h1>Song Create Page</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Song Title Here"
            name="title"
            value={this.state.song.title}
            onChange={this.handleInputChange}
          />
          <input
            placeholder="Song Artist Here"
            name="artist"
            value={this.state.song.artist}
            onChange={this.handleInputChange}
          />
          <input
            placeholder="Video Link Here"
            name="video"
            value={this.state.song.video}
            onChange={this.handleInputChange}
          />
          <input
            placeholder="Tabs/Sheet Music Here"
            name="tabs"
            value={this.state.song.tabs}
            onChange={this.handleInputChange}
          />
          <input
            placeholder="Notes"
            name="notes"
            value={this.state.song.notes}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add a Song</button>
        </form>
      </div>
    )
  }
}

export default SongCreate
