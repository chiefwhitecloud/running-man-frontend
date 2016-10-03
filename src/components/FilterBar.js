import React from 'react'
import xhr from './../xhr'

export default class FilterBar extends React.Component {
  constructor(props) {
   super(props);
  }
  render() {

    let AgeCategory = (props) => {
      if (props.isSelected){
        return <b>{props.displayText}</b>
      }
      else{
        return <div>{props.displayText}</div>;
      }
    };

    let rows = [];

    if (this.props.ageCategories){
      for (let entry of this.props.ageCategories.entries()) {
        rows.push(<tr key={entry[0]} onClick={() => this.props.handle(entry[1])}>
          <td>
            <AgeCategory displayText={entry[0]} isSelected={this.props.selectedAgeCategoryKey && this.props.selectedAgeCategoryKey == entry[0]} />
          </td>
        </tr>);
      }
    }

    return <div>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>;
  }
}
