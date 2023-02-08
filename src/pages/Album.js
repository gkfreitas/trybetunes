import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    artistName: '',
    albumName: '',
    musicList: [],
  };

  componentDidMount() {
    this.renderMusic();
  }

  renderMusic = async () => {
    const { history } = this.props;
    const { pathname } = history.location;
    const collectionId = pathname.replace('/album/', '');
    await getMusics(collectionId);
    const data = await getMusics(collectionId);
    this.setState({
      artistName: data[0].artistName,
      albumName: data[0].collectionName,
      musicList: data.filter((e) => e.kind),
    });
  };

  loadFavoriteSongs = async () => {
    await getFavoriteSongs();
    const data = await getFavoriteSongs();
    this.setState({
      musicList: data,
    });
  };

  render() {
    const { albumName, artistName, musicList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{`Artist Name: ${artistName}`}</h1>
        <h1 data-testid="album-name">{`Collection Name: ${albumName}`}</h1>
        <MusicCard
          musiclist={ musicList }
          onStateChange={ this.loadFavoriteSongs }
        />
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
