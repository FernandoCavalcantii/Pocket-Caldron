import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

export default function Header({ pageName, searchEnable }) {
  const searchBtn = (
    <button data-testid="search-top-btn" type="button">
      <img src={ searchIcon } alt="search-icon" />
      ;
    </button>
  );
  const history = useHistory();
  function toProfile() {
    history.push('/profile');
  }
  return (
    <header>
      <button onClick={ toProfile } data-testid="profile-top-btn" type="button">
        <img src={ profileIcon } alt="profile-icon" />
      </button>
      <h1 data-testid="page-title">
        { pageName }
      </h1>
      { searchEnable ? searchBtn : undefined }
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.func.isRequired,
  searchEnable: PropTypes.bool.isRequired,
};
