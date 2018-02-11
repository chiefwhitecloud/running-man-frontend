import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import RacePageLayout from './components/Races/PageLayout';
import RaceListContainer from './components/Races/ListContainer';
import FilterableRaceResults from './components/FilterableRaceResults';
import RacerContainer from './components/RacerContainer';
import App from './components/App';
import AdminApp from './AdminApp';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('rrContent'));

if (
  process.env.NODE_ENV === 'production' &&
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
  Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {}
}
