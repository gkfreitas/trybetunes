import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artistName: '',
    buttonEnable: true,
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

  render() {
    const { artistName, buttonEnable } = this.state;
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
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
