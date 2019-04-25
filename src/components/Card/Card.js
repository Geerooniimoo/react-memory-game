import React from "react";
import "./Card.css";

const Card = props => (

  <div className={`card ${props.won ? " won" : ""}`} id={props.id} onClick={props.handleImgClick}>
    <img className="card-img" src={props.image} alt="Hero"  />
  </div>
);

export default Card;