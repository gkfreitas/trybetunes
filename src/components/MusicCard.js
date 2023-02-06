import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
  };

  handleClick = async (song) => {
    this.setState({ loading: true });
    await addSong(song);
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
    const { musiclist } = this.props;
    if (!musiclist) {
      return <Loading />;
    }
    return (
      <div>
        {musiclist ? musiclist.map((e) => {
          const element = (
            <div key={ `${e.trackName}Div` }>
              <h1>{e.trackName}</h1>
              <audio
                key={ e.trackName }
                data-testid="audio-component"
                src={ e.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${e.trackId}` }
                onClick={ async () => { await this.handleClick(e.trackId); } }
              />
            </div>
          );
          return element;
        }) : <Loading />}
        { loading ? <Loading /> : ''}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musiclist: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  })).isRequired,
};

export default MusicCard;
