import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveLogin from '../../Redux/actions/loginActions';

const Login = ({ dispatch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const passwordLength = 7;

  const emailCheck = () => {
    const regex = /\S+@\S+\.\S+/i;
    if (String(email).match(regex)) {
      return true;
    }
    return false;
  };

  const enableButton = () => {
    if (password.length >= passwordLength && emailCheck()) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  };

  useEffect(() => {
    enableButton();
  }, [email, password]);

  const handleChange = ({ target }) => {
    const { value } = target;
    switch (target.type) {
    case 'email':
      setEmail(value);
      break;
    default:
      setPassword(value);
    }
  };

  const handleClick = () => {
    dispatch(saveLogin(email));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const storageEmail = JSON.stringify({ email });
    localStorage.setItem('user', storageEmail);
    setRedirect(true);
  };

  return (
    <div>
      <input
        data-testid="email-input"
        type="email"
        placeholder="e-mail"
        onChange={ handleChange }
      />
      <input
        data-testid="password-input"
        type="password"
        placeholder="senha"
        onChange={ handleChange }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        onClick={ handleClick }
        disabled={ disableBtn }
      >
        Enter
      </button>
      {redirect && <Redirect to="/foods" />}
    </div>
  );
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
