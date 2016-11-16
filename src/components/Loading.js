import React from 'react'

class Loading extends React.Component {
  constructor(props, context) {
   super(props);
  }
  shouldComponentUpdate() {
   return false;
  }
  render() {
    return <div className={"loader"}>Loading</div>;
  }
}

export default Loading;
