import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  state = {
    userName: '',
    userNameValid: false,
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async () => {
    const { history } = this.props;
    const { userName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ loading: false });
    history.push('/search');
  };

  render() {
    const {
      userName,
      userNameValid,
      loading,
    } = this.state;

    const minLength = 3;
    const formPage = (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="text"
          placeholder="Nome"
          data-testid="login-name-input"
          name="userName"
          onChange={ this.handleChange }
        />
        <button
          onClick={ async () => createUser({ name: userName }) }
          disabled={ userName.length >= minLength ? userNameValid : !userNameValid }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </form>);

    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : formPage }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
