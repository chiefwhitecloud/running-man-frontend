import React from 'react'
import { Link } from 'react-router'

const App = (props) => {
  var headerStyle = {
    backgroundColor: "#292c2f",
    boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.15)",
    padding: "20px 40px",
    height: "80px",
    boxSizing: "border-box"
  }

  var innerHeaderStyle = {
    maxWidth: "1200px",
    textAlign: "center",
    margin: "0 auto"
  }

  var logoStyle = {
    float: "left",
    font: "normal 28px Cookie, Arial, Helvetica, sans-serif",
    lineHeight: "40px",
    margin: "0"
  }

  var containerStyle = {
    maxWidth: "1200px",
    margin: "0px auto"
  }

  const footerStyle = {
    height: "200px"
  }

  return <div>
    <div style={headerStyle}>
      <div style={innerHeaderStyle}>
        <h1 style={logoStyle}>
          <Link to={"/"} style={{textDecoration: "none", color: "#ffffff"}}>Running Man</Link>
        </h1>
      </div>
    </div>
    <div style={containerStyle}>
      {props.children}
    </div>
    <div style={footerStyle}></div>
  </div>
};
export default App;
