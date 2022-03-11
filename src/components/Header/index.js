import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchInput from '../SearchInput';

const Header = ({ pageName, searchEnable }) => {
  const [inputStatus, setInputStatus] = useState(false);
  const history = useHistory();
  function toProfile() {
    history.push('/profile');
  }

  const handleInput = () => {
    setInputStatus(!inputStatus);
  };

  const searchBtn = (
    <button
      onClick={ handleInput }
      type="button"
    >
      <img
        src={ searchIcon }
        data-testid="search-top-btn"
        alt="search-icon"
      />
      ;
    </button>
  );
  return (
    <header>
      <div>
        <button onClick={ toProfile } type="button">
          <img src={ profileIcon } data-testid="profile-top-btn" alt="profile-icon" />
        </button>
        <h1 data-testid="page-title">
          { pageName }
        </h1>
        { searchEnable && searchBtn }
      </div>
      <div>
        { inputStatus && <SearchInput /> }
      </div>
    </header>
  );
};

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  searchEnable: PropTypes.bool,
};

Header.defaultProps = {
  searchEnable: false,
};

export default Header;
