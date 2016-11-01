import React from 'react'

export default class FilterBar extends React.Component {
  constructor(props) {
   super(props);
   this.state = {dropdownOpen: false};
  }
  show(evt) {
    if (evt.target.className == 'dropdown-menu' && !this.state.dropdownOpen){
      this.setState({ dropdownOpen: true });
      document.addEventListener("click", this.hide.bind(this));
    }
  }
  hide(evt) {
    if (evt.target.className !== 'dropdown-menu' && this.state.dropdownOpen){
      this.setState({ dropdownOpen: false });
      document.removeEventListener("click", this.hide.bind(this));
    }
  }
  componentWillUnmount(){
    document.removeEventListener("click", this.hide.bind(this));
  }
  render() {

    let rows = [];

    let nestedAgeCategoryMap = new Map();

    if (this.props.ageCategories){
      for (let entry of this.props.ageCategories.entries()) {
        if (entry[1].ageCategory == undefined){
          nestedAgeCategoryMap.set(entry[1].sex, []);
        }
      }

      for (let entry of this.props.ageCategories.entries()) {
        if (entry[1].ageCategory != undefined){
          let v = nestedAgeCategoryMap.get(entry[1].sex);
          v.push(entry[1]);
          nestedAgeCategoryMap.set(entry[1].sex, v);
        }
      }
    }

    const groupStyle = {
      float: "left",
      width: "200px",
      textAlign: "center",
      boxSizing: "border-box"
    }

    for (let [key, value] of nestedAgeCategoryMap.entries()) {
      let ageCats = nestedAgeCategoryMap.get(key);
      var ageCatDivs = []
      for(let n of ageCats) {
          ageCatDivs.push(<MenuOption key={n.key} handler={() => this.props.handle(n)} displayText={n.ageCategory} />);
      }
      rows.push(<div key={key} style={groupStyle}>
         <div>
           {(() => {
             switch (key) {
               case "M":   return "Male";
               case "F": return "Female";
               case "W": return "Wheelchair";
               default:      return key;
              }
            })()}
         </div>
         {ageCatDivs}
      </div>);
    }

  const outerDivStyle = {
    position: "relative",
    float: "right"
  };

  const buttonStyle = {
    width: "200px"
  };

  let dropdownStyle = {
    position: "absolute",
    right: "0px",
    width: 200 * nestedAgeCategoryMap.size,
    backgroundColor: "gray",
    fontFamily: "sans-serif",
    fontSize: "13px"
  };

  if (this.state.dropdownOpen){
    dropdownStyle["display"] = "block";
  }
  else{
    dropdownStyle["display"] = "none";
  }

  return <div>
            <div style={outerDivStyle}>
              <button onClick={this.show.bind(this)} className={'dropdown-menu'} style={buttonStyle}>filter</button>
                <div style={dropdownStyle}>
                  {rows}
                  <div style={{clear: "both"}}/>
                </div>
            </div>
            <div style={{clear:"both"}}/>
        </div>
  }
}

FilterBar.propTypes = {
  selectedAgeCategoryKeys: React.PropTypes.array,
  handle: React.PropTypes.func.isRequired,
  ageCategories: function(props, propName) {
    const m = props[propName];
    if (!m) { return new Error(`Required property ${propName} not supplied`); }
    if (!(m instanceof Map)) { return new Error("must be a Map"); }
  }
};

class MenuOption extends React.Component {
  constructor(props) {
   super(props);
  }
  render(){

    const style ={
       cursor: "pointer",
       padding: 5
    }
    return <div style={style} onClick={this.props.handler}>{this.props.displayText}</div>
  }
}
