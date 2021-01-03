import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Import axios
import axios from 'axios'
import apiUrl from '../../apiConfig'

class SongIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      songs: null,
      clicked: false
    }
  }

  componentDidMount () {
    axios({
      method: 'GET',
      url: apiUrl + '/songs/',
      headers: {
        'Authorization': `Token ${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({ songs: response.data })
      })
      .catch(console.error)
  }
  songJsx = 'Loading...'

  render () {
    if (this.state.songs) {
      this.songJsx = this.state.songs.map(song => {
        if (this.props.user.id === song.owner) {
          return (<div className = "index_container" key={song.id}>
            <Link className="index_link" to={'/songs/' + song.id}>
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </Link>
          </div>)
        }
      })
      return (
        <div className="index_format">
          <h1 className="index_message">Your Repertoire</h1>
          <Link className="create_route" to={'/song-create'}>Add a Song</Link>
          {this.songJsx}
        </div>
      )
    } else {
      this.songJsx = 'You have not added any songs to your repertoire.'
      return (
        <div>
          <h1>Your Repertoire</h1>
          <Link to={'/song-create'}>Add a Song</Link>
          {this.songJsx}
        </div>
      )
    }
  }
}

export default SongIndex
