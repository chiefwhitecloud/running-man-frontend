import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import RacePageLayout from './components/Races/PageLayout';
import RaceListContainer from './components/Races/ListContainer';
import FilterableRaceResults from './components/FilterableRaceResults';
import RacerContainer from './components/RacerContainer';
import App from './components/App';
import AdminApp from './AdminApp';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={RaceListContainer} />
      <Route path="/races" component={RacePageLayout} />
      <Route path="/race/:raceId" component={FilterableRaceResults} />
      <Route path="/racer/:racerId" component={RacerContainer} />
    </Route>
    <Route path="/admin" component={AdminApp} />
  </Router>
), document.getElementById('rrContent'));

if (
  process.env.NODE_ENV === 'production' &&
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
  Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {}
}
