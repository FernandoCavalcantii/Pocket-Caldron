import React from 'react';

export default function Header() {
  return (
    <header>
      <button data-testid="profile-top-btn" type="button">
        user
      </button>
      <h1 data-testid="page-title">
        Food
      </h1>
      <button data-testid="search-top-btn" type="button">
        Search
      </button>
    </header>
  );
}
