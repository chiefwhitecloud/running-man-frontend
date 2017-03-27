import React from 'react';
import Tabs from './../components/Tabs';
import TabPane from './../components/TabPane';
import RaceGroupListContainer from './RaceGroupListContainer';
import RaceListContainer from './RaceListContainer';
import ImportRaceContainer from './ImportRaceContainer';

export default class extends React.Component {
  render() {
    return (
      <Tabs selected={0}>
        <TabPane label={'Races'}>
          <div><RaceListContainer /></div>
        </TabPane>
        <TabPane label={'Import Race'}>
          <div><ImportRaceContainer /></div>
        </TabPane>
        <TabPane label={'Race Groups'}>
          <div><RaceGroupListContainer /></div>
        </TabPane>
      </Tabs>
    );
  }
}
