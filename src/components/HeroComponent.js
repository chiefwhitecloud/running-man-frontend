import React from 'react';

export default function HeroComponent() {
  return (
    <div style={{height:"450px", backgroundColor:"#292c2f", color:"#ffffff", position:"relative"}}>
      <div style={{position:"absolute", left:"50%", top:"50%", transform: "translateX(-50%) translateY(-50%)"}}>
        <h1 style={{textAlign:"center"}}>Find and Analyze Your Road Racing Results!</h1>
        <h4 style={{textAlign:"center"}}>Newfoundland &amp; Labrador Road Racing Results... Organized.</h4>
      </div>
    </div>
  );
}
