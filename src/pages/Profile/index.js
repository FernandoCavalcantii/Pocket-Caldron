import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import style from './style.module.scss';

export default function Profile() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    if (userEmail === null) {
      setEmail('');
    } else {
      setEmail(userEmail.email);
    }
  }, []);

  return (
    <>
      <Header pageName="Profile" />
      <div className={ style.container }>
        <p data-testid="profile-email">
          { email }
        </p>
        <div>

          <Link to="/done-recipes">
            <button type="button" data-testid="profile-done-btn">
              Done Recipes
            </button>
          </Link>
          <Link to="/favorite-recipes">
            <button type="button" data-testid="profile-favorite-btn">
              Favorite Recipes
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
