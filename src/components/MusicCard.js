import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loadingFavorite: false,
    checked: {},
  };

  componentDidMount() {
    this.saveFavoriteSongs();
  }

  handleClick = async (objectAlbum) => {
    this.setState({ loadingFavorite: true });
    await addSong(objectAlbum);
    this.setState({ loadingFavorite: false });
    await removeSong(objectAlbum);
  };

  saveFavoriteSongs = async () => {
    this.setState({ loadingFavorite: true });
    await getFavoriteSongs();
    const data = await getFavoriteSongs();
    this.setState({ loadingFavorite: false });
    data.forEach((e) => {
      this.setState((prevState) => ({
        checked: {
          ...prevState.checked,
          [e.trackId]: !prevState[e.trackId],
        },
      }));
    });
  };

  handleChange = (trackId) => {
    this.setState((prevState) => ({
      checked: {
        ...prevState.checked,
        [trackId]: !prevState.checked[trackId],
      },
    }));
  };

  render() {
    const { loadingFavorite, checked } = this.state;
    const { musiclist } = this.props;
    const renderMusic = musiclist.length ? musiclist.map((e) => {
      const { trackId, trackName, previewUrl } = e;
      const element = (
        <div key={ trackId }>
          <h1>{trackName}</h1>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>{trackId}</code>
          </audio>
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ checked[trackId] }
            onChange={ () => this.handleChange(trackId) }
            onClick={ () => this.handleClick(e) }
          />
        </div>
      );
      return element;
    }) : <Loading />;
    return (
      <div>
        {loadingFavorite ? <Loading /> : renderMusic}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musiclist: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.func,
    }),
  ).isRequired,
};

export default MusicCard;
