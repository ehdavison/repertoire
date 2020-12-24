import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Import axios
import axios from 'axios'
import apiUrl from '../../apiConfig'

class SongIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      songs: null
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
        console.log('response is: ', response)
        this.setState({ songs: response.data })
      })
      .catch(console.error)
  }
  songJsx = 'Loading...'
  render () {
    console.log('this.state.songs: ', this.state.songs)
    if (this.state.songs) {
      this.songJsx = this.state.songs.map(song => {
        return (<div key={song.id}>
          <Link to={'/songs/' + song.id}>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </Link>
        </div>)
      })
      console.log('songJsx is: ', this.songJsx)
      return (
        <div>
          <h1>Your Repertoire</h1>
          {this.songJsx}
        </div>
      )
    } else {
      this.songJsx = 'You have not added any songs to your repertoire.'
      return (
        <div>
          <h1>Your Repertoire</h1>
          {this.songJsx}
        </div>
      )
    }
  }
}

export default SongIndex
