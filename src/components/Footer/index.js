import React from 'react';
import { Link } from 'react-router-dom';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import style from './style.module.scss';

function Footer() {
  return (
    <footer className={ style.fixFooter } data-testid="footer">
      <Link to="/foods">
        <img
          src={ mealIcon }
          alt="melalIcon"
          data-testid="food-bottom-btn"
        />
      </Link>
      <Link to="/explore">
        <img
          src={ exploreIcon }
          alt="exploreIcon"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="drinkIcon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
