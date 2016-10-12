import React from 'react'
import RaceResults from './RaceResults'
import RaceHeader from './RaceHeader'
import FilterBar from './FilterBar'
import xhr from './../xhr'

export default class FilterableRaceResults extends React.Component {
  constructor(props) {
   super(props);
   this.raceResults = [];
   this.state = {
      race: {},
      results: [],
      isLoading: true
   };
   let raceMeta;
   xhr.get('/feed/race/' + this.props.params.raceId).then((race) => {
     return race;
   }).then((race) => {
     raceMeta = race;
     return xhr.get(race["results"]);
   }).then((raceResults) => {

     let ageCategories = new Map();

     for (const result of raceResults["results"]) {
       if (!ageCategories.has(result.sex)){
         ageCategories.set(result.sex, {
           key: result.sex,
           sex: result.sex,
           ageCategory: undefined
         });
       }

       let key = result.sex + ' - ' + result.ageCategory;

       if (!ageCategories.has(key)){
         ageCategories.set(key, {
           key: key,
           sex: result.sex,
           ageCategory: result.ageCategory
         });
       }
     }

     this.raceResults = raceResults["results"];

     this.setState({
       race : raceMeta,
       results : raceResults["results"],
       ageCategories: ageCategories,
       selectedAgeCategory: undefined,
       isLoading: false
     });
   });
  }
  handleFilterRequest(info){
    let results = [];
    for (const result of this.raceResults) {
      if (result.sex == info.sex && ((info.ageCategory != undefined && result.ageCategory == info.ageCategory) || info.ageCategory == undefined)){
        results.push(result);
      }
    }

    this.setState({
      results: results,
      selectedAgeCategoryKey: info.key
    });
  }
  render() {

    if (this.state.isLoading){
      return <div>Loading</div>;
    }
    else{
      return <div>
        <RaceHeader name={this.state.race.name}  date={this.state.race.date} />
        <FilterBar ageCategories={this.state.ageCategories} handle={this.handleFilterRequest.bind(this)} selectedAgeCategoryKey={this.state.selectedAgeCategoryKey} />
        <RaceResults results={this.state.results} />
      </div>
    }

  }
}
