import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RacePageLayout from './Races/PageLayout';
import FilterableRaceResults from './FilterableRaceResults';
import RacerContainer from './RacerContainer';

const containerStyle = {
  maxWidth: '1200px',
  margin: '0px auto',
};

const Main = () => (
  <div style={containerStyle}>
    <Switch>
      <Route path="/races" component={RacePageLayout} />
      <Route path="/race/:raceId" component={FilterableRaceResults} />
      <Route path="/racer/:racerId" component={RacerContainer} />
    </Switch>
  </div>
);

export default Main;
