import "babel-polyfill";
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import RacePageLayout from './components/Races/PageLayout'
import RaceListContainer from './components/Races/ListContainer'
import FilterableRaceResults from './components/FilterableRaceResults'
import Racer from './components/Racer'
import App from './components/App'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={RaceListContainer} />
      <Route path="/races" component={RacePageLayout}/>
      <Route path="/race/:raceId" component={FilterableRaceResults}/>
      <Route path="/racer/:racerId" component={Racer}/>
    </Route>
  </Router>
), document.getElementById('rrContent'));

document.body.style.margin = "0px";
document.body.style.padding = "0px";
document.body.style.fontFamily = "Verdana";
document.body.style.fontSize = "18px";
document.body.style.backgroundColor = "#eaf0f2";

if (
  process.env.NODE_ENV === 'production' &&
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
  Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {}
}
