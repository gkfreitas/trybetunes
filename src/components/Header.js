import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    loading: true,
    userName: '',
  };

  componentDidMount() {
    this.awaitGetUser();
  }

  awaitGetUser = async () => {
    const user = await getUser();
    this.setState({ userName: user.name, loading: false });
  };

  render() {
    const { loading, userName } = this.state;
    return (
      <div data-testid="header-component">
        <h1 data-testid="header-user-name">
          {loading ? <Loading /> : userName}
        </h1>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </div>
    );
  }
}
export default Header;
