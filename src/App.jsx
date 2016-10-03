import "babel-polyfill";
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import RaceList from './components/RaceList'
import FilterableRaceResults from './components/FilterableRaceResults'
import Racer from './components/Racer'
import App from './components/App'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={RaceList} />
      <Route path="/race/:raceId" component={FilterableRaceResults}/>
      <Route path="/racer/:racerId" component={Racer}/>
    </Route>
  </Router>
), document.getElementById('rrContent'))
