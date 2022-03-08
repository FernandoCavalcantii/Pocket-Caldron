import React from 'react';

export default function SearchInput() {
  return (
    <form>
      <label htmlFor="search-input">
        <input type="text" data-testid="search-input" />
      </label>
      <label htmlFor="ingredient-search-radio">
        Ingredients
        <input
          name="header-radios"
          type="radio"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          name="header-radios"
          type="radio"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          type="radio"
          name="header-radios"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </form>
  );
}
