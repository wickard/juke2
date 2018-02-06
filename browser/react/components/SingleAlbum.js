import React, { Component } from 'react';
import Songs from '../components/Songs';
import axios from 'axios'


export default class SingleAlbum extends Component {

  constructor (){
    super()
    this.state = {
      selectedAlbum: {}
    }
  }

  componentDidMount (){
    axios.get(`/api/albums/${this.props.match.params.albumId}`)
    .then(res => res.data)
    .then(album => this.setState({
      selectedAlbum: album
    }));

  }

  render () {
    const album = this.state.selectedAlbum;

    return (
      <div className="album">
        <div>
          <h3>{ album.name } <span> <a href="mailto:JnJ@Juke.com?subject=Triggered%20about%20album"><i className="glyphicon glyphicon-bullhorn" /></a></span></h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs songs={album.songs} />
      </div>
    );
  }
}
