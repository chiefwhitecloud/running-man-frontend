import React from 'react'
import RaceResultsTable from './RaceResultsTable'
import RaceHeader from './RaceHeader'
import FilterBar from './FilterBar'
import Loading from './Loading'
import SelectedFilters from './SelectedFilters'
import xhr from './../xhr'

export default class FilterableRaceResults extends React.Component {
  constructor(props) {
   super(props);
   this.raceResults_ = [];
   this.state = {
      race: {},
      results: [],
      isLoading: true,
      selectedAgeCategoryKeys: []
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

     this.raceResults_ = raceResults["results"];

     this.ageCategories_ = ageCategories;

     this.setState({
       race : raceMeta,
       results : raceResults["results"],
       selectedAgeCategory: undefined,
       isLoading: false,
       selectedAgeCategoryKeys: []
     });
   });
  }
  handleFilterRequest(info){

    let selected = this.state.selectedAgeCategoryKeys;

    selected.push(info.key);

    let results = [];
    for (const result of this.raceResults_) {
      for (const filterKey of selected){
        const ageCat = this.ageCategories_.get(filterKey)
        if (result.sex == ageCat.sex && ((ageCat.ageCategory != undefined && result.ageCategory == ageCat.ageCategory) || ageCat.ageCategory == undefined)){
          results.push(result);
        }
      }
    }

    this.setState({
      results: results,
      selectedAgeCategoryKeys: selected
    });
  }
  render() {

    if (this.state.isLoading){
      return <Loading />;
    }
    else{
      return <div>
        <RaceHeader name={this.state.race.name}  date={this.state.race.date}>
          <SelectedFilters selectedAgeCategoryKey={this.state.selectedAgeCategoryKeys} />
          <FilterBar ageCategories={this.ageCategories_} handle={this.handleFilterRequest.bind(this)} selectedAgeCategoryKey={this.state.selectedAgeCategoryKeys} />
        </RaceHeader>
        <RaceResultsTable results={this.state.results} />
      </div>
    }

  }
}
