import React from 'react';
import TabHeader from './TabHeader';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      selected: this.props.selected
    };
  }

  handleClick(index) {
    this.setState({
      selected: index,
    });
  }

  renderTitles() {
    function labels(child, index) {
      return (
        <TabHeader
          key={index}
          isActive={this.state.selected === index}
          text={child.props.label}
          onSelected={this.handleClick}
          index={index}
        />
      );
    }
    return (
      <div className="tab-header-container">
        {this.props.children.map(labels.bind(this))}
      </div>
    );
  }

  renderContent() {
    return (
      <div className="tab__content">
        {this.props.children[this.state.selected]}
      </div>
    );
  }

  render() {
    return (
      <div className="tabs">
        {this.renderTitles()}
        {this.renderContent()}
      </div>
    );
  }
}
