import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    artistName: '',
    buttonEnable: true,
    albumList: [],
    renderAlbum: false,
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonEnableChange);
  };

  buttonEnableChange = () => {
    const { artistName } = this.state;
    if (artistName.length >= 2) this.setState({ buttonEnable: false });
  };

  handleClick = async () => {
    const { artistName } = this.state;
    await searchAlbumsAPI(artistName);
    this.setState({
      loading: true,
      artistName: '',
      searchedArtist: artistName,
    });
    this.setState({
      albumList: [await searchAlbumsAPI(artistName)],
      renderAlbum: true,
      loading: false,
    });
  };

  render() {
    const {
      artistName,
      albumList,
      buttonEnable,
      searchedArtist,
      loading,
      renderAlbum,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="artistName"
            value={ artistName }
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            disabled={ buttonEnable }
            onClick={ this.handleClick }
            type="button"
          >
            Pesquisar
          </button>
        </form>
        <h2>
          Resultado de álbuns de:
          {' '}
          {searchedArtist}
        </h2>
        <ul>
          {loading ? <Loading /> : ''}
          {renderAlbum
            ? albumList[0].map((e, i) => (
              <li key={ `${e.artistName} ${e.trackCount} ${e.collectionPrice} ${i}` }>
                <img src={ e.artworkUrl100 } alt={ e.artistName } />
                <p>{e.artistName}</p>
                <p>{e.collectionName}</p>
                <Link
                  collectionid={ e.collectionId }
                  data-testid={ `link-to-album-${e.collectionId}` }
                  to={ `/album/${e.collectionId}` }
                >
                  Link
                </Link>
              </li>
            ))
            : 'Nenhum álbum foi encontrado'}
        </ul>
      </div>
    );
  }
}

export default Search;
