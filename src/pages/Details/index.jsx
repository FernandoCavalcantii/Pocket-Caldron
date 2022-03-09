import React from 'react';
import { useLocation } from 'react-router-dom';

const Details = () => {
  const { pathname } = useLocation();
  const pathAndId = pathname.split('/');
  console.log(pathAndId[1]);
  return (
    <div>
      <h1>detalhes</h1>
    </div>
  );
};

export default Details;
