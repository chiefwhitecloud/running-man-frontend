import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import Main from './Main';
import HeroComponent from './HeroComponent';
import RaceListContainer from './Races/ListContainer';
import AdminApp from '../AdminApp';

const containerStyle = {
  maxWidth: '1200px',
  margin: '40px auto 0px auto',
};

const App = () => (
  <div>
    <Switch>
      <Route exact path={'/'} component={() => <div><HeroComponent /><div style={containerStyle}><RaceListContainer /></div></div>} />
      <Route path={'/admin'} component={AdminApp} />
      <Route path={'*'} component={() => <div><TopNavBar /><Main /></div>} />
    </Switch>
  </div>
);

export default App;
