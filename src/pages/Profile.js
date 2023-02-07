import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  state = {
    loading: false,
    name: '',
    email: '',
    description: '',
    userImg: '',
  };

  componentDidMount() {
    this.userInfos();
  }

  userInfos = async () => {
    this.setState({ loading: true });
    const data = await getUser();
    this.setState({
      name: data.name,
      email: data.email,
      description: data.description,
      userImg: data.image,
      loading: false,
    });
  };

  render() {
    const { loading, name, email, description, userImg } = this.state;
    const userElement = (
      <>
        <p>
          {email}
        </p>
        <p>
          {name}
        </p>
        <p>
          {description}
        </p>
        <img data-testid="profile-image" src={ userImg } alt={ name } />
      </>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : userElement}
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
