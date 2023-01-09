import React from "react";
import "./Nav.css";

const Nav = props => (
  <nav>
    <h2>Clicky Game</h2>
    <h3> TOPSCORE {props.topScore}</h3>
    <h3>  SCORE {props.score} </h3>
    <p>
      click all images only once to win.
    </p>
  </nav>

)

export default Nav;