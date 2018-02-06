import React, { Component } from 'react';
import axios from 'axios'
import { Link, Route } from 'react-router-dom'
import Songs from './Songs'
import AllAlbums from './AllAlbums'
import StatefulAlbums from './StatefulAlbums'

export default class SingleArtist extends Component {
  constructor (){
    super()
    this.state = {
      artist: {},
      albums: [],
      songs: []
    }
  }

  componentDidMount () {
    axios.get(`/api/artists/${this.props.match.params.artistId}`)
    .then(res => res.data)
    .then(artist => {
      this.setState({ artist })
      return axios.get(`/api/artists/${this.props.match.params.artistId}/albums`)
    })
    .then(res => res.data)
    .then(albums => {
      this.setState({ albums })
      console.log('albums', albums)
      return axios.get(`/api/artists/${this.props.match.params.artistId}/songs`)
    })
    .then(res => res.data)
    .then(songs => {
      console.log(this.state)
      this.setState({ songs })
    })
  }
  render () {

    const artist = this.state.artist; // or however you've named it

    return (
      <div>
        <h3>{ artist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`${artist.id}/albums`}>ALBUMS</Link></li>
          <li><Link to="TODO">SONGS</Link></li>
        </ul>
        <Route path="/artists/1/albums" component={StatefulAlbums} />
      </div>
    );
  }

}

// return (
  //AllAlbums albums={this.match.albums}
//   <div>
//     <h2>{this.state.artist.name}</h2>
//     <AllAlbums albums={this.state.albums} />
//     <Songs songs={this.state.songs} />
//   </div>
// )
// }
