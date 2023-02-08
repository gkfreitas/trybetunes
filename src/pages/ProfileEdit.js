import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    loading: false,
    btnEnable: true,
  };

  componentDidMount() {
    this.userInfos();
    this.handleButton();
  }

  userInfos = async () => {
    this.setState({ loading: true });
    const data = await getUser();
    const { name, email, description, image } = data;
    this.setState({
      name,
      email,
      description,
      image,
      loading: false,
    });
  };

  handleButton = () => {
    const { name, email, description, image } = this.state;
    const errorCases = [
      name.length > 0,
      email.length > 0,
      description.length > 0,
      image.length > 0,
    ];
    const verify = errorCases.some((e) => e === false);
    this.setState({ btnEnable: verify });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    console.log('oi');
    this.setState({
      [name]: value,
    }, this.handleButton);
  };

  handleClick = async () => {
    const { name, email, image, description } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await updateUser({
      email,
      name,
      image,
      description,
    });
    this.setState({ loading: false });
    history.push('/profile');
  };

  render() {
    const { name, email, description, image, btnEnable, loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form>
            <label htmlFor="inputName">
              Nome
              <input
                name="name"
                onChange={ this.handleChange }
                value={ name }
                type="text"
                data-testid="edit-input-name"
                id="inputName"
              />
            </label>
            <label htmlFor="inputEmail">
              Email
              <input
                name="email"
                value={ email }
                onChange={ this.handleChange }
                type="email"
                data-testid="edit-input-email"
                id="inputEmail"
              />
            </label>
            <label htmlFor="inputDescription">
              Descrição
              <input
                name="description"
                value={ description }
                onChange={ this.handleChange }
                type="text"
                data-testid="edit-input-description"
                id="inputDescription"
              />
            </label>
            <label htmlFor="inputImage">
              Image:
              <input
                name="image"
                value={ image }
                onChange={ this.handleChange }
                type="text"
                id="inputImage"
                data-testid="edit-input-image"
              />
            </label>
            <input
              type="button"
              data-testid="edit-button-save"
              value="Submit"
              onClick={ this.handleClick }
              disabled={ btnEnable }
            />
          </form>
        )}
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}
ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default ProfileEdit;
