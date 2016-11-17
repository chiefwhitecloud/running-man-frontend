import React from 'react'
import { Link } from 'react-router'

const RaceLink = (item) => {
  return <div key={item.id}>
    <Link to={"/race/" + item.id} style={{textDecoration: "none", display: "block", marginBottom: "5px"}}>{item.name}</Link>
  </div>;
};

export default RaceLink;
