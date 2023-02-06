import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  render() {
    const { musiclist } = this.props;
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
            </div>
          );
          return element;
        }) : <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musiclist: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default MusicCard;
