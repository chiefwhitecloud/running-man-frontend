import React from 'react';
import RaceGroupListContainer from './admin_components/RaceGroupListContainer';
import RaceListContainer from './admin_components/RaceListContainer';
import ImportRaceContainer from './admin_components/ImportRaceContainer';

export default function AdminApp() {
  return (
    <div>
      <ImportRaceContainer />
      <RaceGroupListContainer />
      <RaceListContainer />
    </div>
  );
}
