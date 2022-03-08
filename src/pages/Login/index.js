import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useDispatch } from 'react-redux';
import saveLogin from '../../Redux/actions/loginActions';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const passwordLength = 7;

  useEffect(() => {
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

export default Login;
