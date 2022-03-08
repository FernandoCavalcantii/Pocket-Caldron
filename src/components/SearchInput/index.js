import React from 'react';
import { useSelector } from 'react-redux';

export default function SearchInput() {
  const searchInputStatus = useSelector((state) => state.searchReducer.status);
  const searchInput = (
    <label htmlFor="search-input">
      <input type="text" data-testid="search-input" />
    </label>
  );
  return (
    <div>
      { searchInputStatus && searchInput }
    </div>
  );
}
