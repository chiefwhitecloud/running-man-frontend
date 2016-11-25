import React from 'react'
import ListContainer from './ListContainer'
import SelectYearComponent from './SelectYearComponent'

export default function() {
  return (<div style={{marginTop: "40px"}}>
    <ListContainer enableSelectYear={true} />
  </div>);
}
