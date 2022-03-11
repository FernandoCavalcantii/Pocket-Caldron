import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchInput from '../SearchInput';

const Header = ({ pageName, searchEnable }) => {
  const [inputStatus, setInputStatus] = useState(false);
  const history = useHistory();

  const searchBtn = (
    <button
      onClick={ () => setInputStatus(!inputStatus) }
      type="button"
    >
      <img
        data-testid="search-top-btn"
        src={ searchIcon }
        alt="search-icon"
      />
      ;
    </button>
  );
  return (
    <header>
      <div>
        <button
          onClick={ () => history.push('/profile') }
          type="button"
        >
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile-icon"
          />
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
