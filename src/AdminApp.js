import React from 'react';
import RaceGroupListContainer from './admin_components/RaceGroupListContainer'
import RaceListContainer from './admin_components/RaceListContainer'

export default function AdminApp() {
  return (
  <div>
    <RaceGroupListContainer />
    <RaceListContainer />
  </div>
  );
}
