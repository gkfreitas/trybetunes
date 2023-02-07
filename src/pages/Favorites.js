import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends Component {
  state = {
    loading: false,
    musicList: [],
  };

  componentDidMount() {
    this.loadFavoriteSongs();
  }

  loadFavoriteSongs = async () => {
    this.setState({ loading: true });
    await getFavoriteSongs();
    const data = await getFavoriteSongs();
    this.setState({
      musicList: data,
      loading: false,
    });
  };

  render() {
    const { loading, musicList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : <MusicCard
          musiclist={ musicList }
          onStateChange={ this.loadFavoriteSongs }
        />}
      </div>
    );
  }
}
export default Favorites;
