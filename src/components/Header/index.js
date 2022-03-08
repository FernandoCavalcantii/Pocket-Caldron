import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import searchStatus from '../../Redux/actions/searchInputActions';

const Header = ({ pageName, searchEnable }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  function toProfile() {
    history.push('/profile');
  }

  const handleInput = () => {
    dispatch(searchStatus());
  };

  const searchBtn = (
    <button onClick={ handleInput } data-testid="search-top-btn" type="button">
      <img src={ searchIcon } alt="search-icon" />
      ;
    </button>
  );
  return (
    <header>
      <button onClick={ toProfile } data-testid="profile-top-btn" type="button">
        <img src={ profileIcon } alt="profile-icon" />
      </button>
      <h1 data-testid="page-title">
        { pageName }
      </h1>
      { searchEnable && searchBtn }
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
