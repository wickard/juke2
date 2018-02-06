import React, { Component } from 'react';
import axios from 'axios'
import { NavLink, Route } from 'react-router-dom'
import Songs from './Songs'
import AllAlbums from './AllAlbums'

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
          <li><NavLink activeClassName="active" to={`/artists/${artist.id}/albums`}>ALBUMS</NavLink></li>
          <li><NavLink activeClassName="active" to={`/artists/${artist.id}/songs`}>SONGS</NavLink></li>
        </ul>
            <Route path={`/artists/${artist.id}/albums`} render={ () => <AllAlbums albums={this.state.albums} />} />
            <Route path={`/artists/${artist.id}/songs`} render={ () => <Songs songs={this.state.songs} />} />
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
