import React from 'react';
import RaceHeader from './RaceHeader';
import FilterBar from './FilterBar';
import Loading from './Loading';
import SelectedFilters from './SelectedFilters';
import xhr from './../xhr';
import { GetPace } from './../RaceTimeConverter';
import { doRequests } from './FetchData';
import ScrollPosition from './ScrollPosition';
import SimpleResults from './SimpleResults';

export default class FilterableRaceResults extends React.Component {
  constructor(props) {
    super(props);
    this.raceResults = [];
    this.raceGroup = undefined;
    this.state = {
      race: {},
      results: [],
      isLoading: true,
      selectedAgeCategoryKeys: [],
    };
    let raceMeta;
    xhr.get(`/feed/race/${props.match.params.raceId}`).then((race) => {
      raceMeta = race;
      const requests = [race["results"]];
      if (race['raceGroup'] !== undefined) {
        requests.push(race['raceGroup']);
      }
      return doRequests(requests);
    }).then((results) => {
      const [raceResults, raceGroup] = results;

      const ageCategories = new Map();
      for (const result of raceResults["results"]) {
        if (!ageCategories.has(result.sex)) {
          ageCategories.set(result.sex, {
            key: result.sex,
            sex: result.sex,
            ageCategory: undefined,
          });
        }

        const key = `${result.sex} - ${result.ageCategory}`;

        if (!ageCategories.has(key)) {
          ageCategories.set(key, {
            key,
            sex: result.sex,
            ageCategory: result.ageCategory,
          });
        }
      }

      this.raceResults = raceResults["results"];
      this.raceGroup = raceGroup;

      this.raceResults.forEach( result => {
        result.pace = GetPace(result.time, this.raceGroup.distance);
      });

      this.ageCategories = ageCategories;

      this.setState({
        race: raceMeta,
        results: raceResults["results"],
        selectedAgeCategory: undefined,
        isLoading: false,
        selectedAgeCategoryKeys: []
      });
    });
  }

  handleFilterRequest(info) {
    let selected = this.state.selectedAgeCategoryKeys;

    selected.push(info.key);

    let results = [];
    for (const result of this.raceResults) {
      for (const filterKey of selected) {
        const ageCat = this.ageCategories.get(filterKey)
        if (result.sex === ageCat.sex &&
          ((ageCat.ageCategory !== undefined && result.ageCategory === ageCat.ageCategory)
          || ageCat.ageCategory === undefined)) {
          results.push(result);
        }
      }
    }

    this.setState({
      results,
      selectedAgeCategoryKeys: selected,
    });
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }

    return (<div>
      <RaceHeader name={this.state.race.name} date={this.state.race.date}>
        <SelectedFilters selectedAgeCategoryKey={this.state.selectedAgeCategoryKeys} />
        <FilterBar
          ageCategories={this.ageCategories}
          handle={this.handleFilterRequest.bind(this)}
          selectedAgeCategoryKey={this.state.selectedAgeCategoryKeys}
        />
      </RaceHeader>
      <ScrollPosition
        itemHeight={41}
        items={this.state.results}
        render={(totalHeight, heightOffset, results) => (
          (<SimpleResults totalHeight={totalHeight} results={results} heightOffset={heightOffset} />)
        )}
      />
    </div>);
  }
}
