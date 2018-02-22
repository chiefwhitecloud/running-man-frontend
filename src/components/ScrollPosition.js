import React from 'react';
import PropTypes from 'prop-types';

import { GetVisibleListitemHeightOffset, GetListHeightAvailableOnScreen, GetVisibleItems } from '../VirtualScroll';

const debounce = (fn, time) => {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  }
}

export default class ScrollPosition extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.windowHeight = 0;
    this.domRect = null;
    this.state = {
      items: [],
      heightOffset: 0,
    };
  }

  componentDidMount() {
    this.domRect = this.element.getBoundingClientRect();
    this.windowHeight = window.innerHeight;

    window.addEventListener('scroll', debounce(() => {
      this.handleScroll();
    }, 5));

    this.updateItems();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  updateItems() {
    const elementHeight = this.props.items.length * this.props.itemHeight;

    const availableHeight = GetListHeightAvailableOnScreen(elementHeight,
      this.domRect.top, window.scrollY, this.windowHeight);

    const heightOffset = GetVisibleListitemHeightOffset(elementHeight,
      this.domRect.top, window.scrollY, this.windowHeight);

    const items = GetVisibleItems(this.props.items,
      this.props.itemHeight, availableHeight, heightOffset);

    this.setState({
      heightOffset,
      items,
    });
  }

  handleScroll() {
    this.updateItems();
  }

  render() {
    const ss = <div key="1" ref={(element) => { this.element = element; }} style={{ height: '1px' }} />;

    if (this.domRect === null) {
      return ss;
    }
    return [
      ss,
      this.props.render(this.props.items.length * this.props.itemHeight,
        this.state.heightOffset, this.state.items),
    ];
  }
}

ScrollPosition.propTypes = {
  itemHeight: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
};
