import React from 'react'
import { Link } from 'react-router'
import HeroComponent from './HeroComponent'

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

  var res;

  const navLinkStyle = {
    fontFamily: "Cookie, Arial, Helvetica, sans-serif",
    lineHeight: "40px",
    textDecoration: "none",
    width:"120px",
    color: "#ffffff",
    float:"right"
  }

  if (props.location.pathname == '/'){
    res = <div>
      <HeroComponent/>
      <div style={Object.assign(containerStyle, {marginTop: "40px"})}>
        {props.children}
      </div>
    </div>
  }
  else{
    res = <div>
      <div style={headerStyle}>
        <div style={innerHeaderStyle}>
          <h1 style={logoStyle}>
            <Link to={"/"} style={{textDecoration: "none", color: "#ffffff"}}>Running Man</Link>
          </h1>
          <Link to={"/"} style={navLinkStyle}>Home</Link>
          <Link to={"/about"} style={navLinkStyle}>About</Link>
          <Link to={"/races"} style={navLinkStyle}>Races</Link>
          <div style={{clear:"both"}}/>
        </div>
      </div>
      <div style={containerStyle}>
        {props.children}
      </div>
      <div style={footerStyle}></div>
    </div>
  }

  return res;
};
export default App;
