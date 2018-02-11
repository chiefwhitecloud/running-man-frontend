import React from 'react';
import { Link } from 'react-router-dom';

const RaceLink = item => (
  <div key={item.id}>
    <Link to={`/race/${item.id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '5px' }}>
      {item.name}
    </Link>
  </div>
);

export default RaceLink;
