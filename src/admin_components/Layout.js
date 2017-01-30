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
        <TabPane label={'Import Race'}>
          <ImportRaceContainer />
        </TabPane>
        <TabPane label={'Race Groups'}>
          <RaceGroupListContainer />
        </TabPane>
        <TabPane label={'Races'}>
          <RaceListContainer />
        </TabPane>
      </Tabs>
    );
  }
}
