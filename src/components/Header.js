import React, { Component } from 'react';
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
    this.setState({ userName: user.name });
    this.setState({ loading: false });
  };

  render() {
    const { loading, userName } = this.state;
    return (
      <div data-testid="header-component">
        <h1 data-testid="header-user-name">
          {loading ? <Loading /> : userName}
        </h1>
      </div>
    );
  }
}
export default Header;
