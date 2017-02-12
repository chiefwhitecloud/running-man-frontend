import React from 'react';
import Tabs from './../components/Tabs';
import TabPane from './../components/TabPane';
import RaceGroupListContainer from './RaceGroupListContainer';
import RaceListContainer from './RaceListContainer';
import ImportRaceContainer from './ImportRaceContainer';

export default class extends React.Component {
  render() {
    const style = {
      fontFamily: 'sans-serif',
      fontSize: '14px',
    }
    return (
      <Tabs selected={0}>
        <TabPane label={'Races'}>
          <div style={style}><RaceListContainer /></div>
        </TabPane>
        <TabPane label={'Import Race'}>
          <div style={style}><ImportRaceContainer /></div>
        </TabPane>
        <TabPane label={'Race Groups'}>
          <div style={style}><RaceGroupListContainer /></div>
        </TabPane>
      </Tabs>
    );
  }
}
