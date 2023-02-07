import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loadingFavorite: false,
    checked: {},
  };

  handleClick = async (trackId) => {
    this.setState({ loadingFavorite: true });
    await addSong(trackId);
    this.setState({ loadingFavorite: false });
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
    const { musiclist, collectionid } = this.props;
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
            onClick={ async () => { await this.handleClick(trackId); } }
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
  collectionid: PropTypes.number.isRequired,
  musiclist: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.func,
    }),
  ).isRequired,
};

export default MusicCard;
