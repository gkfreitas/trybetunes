import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    artistName: '',
    albumName: '',
    musicUrl: [],
    collectionId: 0,
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
      collectionId: data[1].collectionId,
      artistName: data[1].artistName,
      albumName: data[1].collectionName,
      musicUrl: data.filter((e) => e.kind),
    });
  };

  render() {
    const { albumName, artistName, musicUrl, collectionId } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{`Artist Name: ${artistName}`}</h1>
        <h1 data-testid="album-name">{`Collection Name: ${albumName}`}</h1>
        <MusicCard
          musiclist={ musicUrl }
          collectionid={ collectionId }
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
