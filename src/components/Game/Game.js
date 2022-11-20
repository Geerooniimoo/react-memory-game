import React, { Component } from 'react';
import './Game.css';
import heroes from "../../heroes.json";
import Card from "../Card";
import Grid from "../Grid";
import Nav from "../Nav";
import Sounds from "../Sounds";

class Game extends Component {
  state = {
    heroes,
    score: 0,
    topScore: 0
  };

  handleClick = id => {
    // double clicked flag
    let doubleClicked = false;

    // win and lost sounds
    let audio = new Audio();
    let audio2 = new Audio();
    
    // a state snapshot to minimize state updates
    let update = {
      heroes: [...this.state.heroes],
      score: this.state.score,
      topScore: this.state.topScore
    }
    // click updates
    update.heroes.forEach(hero => {
      if (hero.id === id) {
        if (hero.clicked) {
          doubleClicked = true;
          audio.src = "./assets/music/lost.mp3";
          audio2.src = "./assets/music/man-laughing.mp3";
          audio2.play();
        } else { 
          audio.src = "./assets/music/win.mp3"
        };
        audio.play();
        hero.clicked = true;
        update.score++;
        if (update.score > update.topScore) {
          update.topScore = update.score;
        };
      }
    })
    
    // reset score and clicked state in all cards if a card was clicked twice.
    if (doubleClicked) {
      update.heroes.forEach(hero => hero.clicked = false);
      update.score = 0;
    };

    // reset clicked in cards if all cards where clicked once
    if (update.score && !(update.score % update.heroes.length)) {
      audio2.src = "./assets/music/win2.mp3";
      audio2.play();
      update.heroes.forEach(hero => hero.clicked = false);
    };

    // randomize heroes
    update.heroes = update.heroes.sort(() => 0.5 - Math.random());
    
    // update state
    this.setState({heroes: update.heroes,score: update.score,topScore: update.topScore});
  };

  render() {
    return (
      <div className="Game">
        <Sounds />
        <Nav score={this.state.score} topScore={this.state.topScore} />
        <Grid shake={!this.state.score && this.state.topScore}>
          {this.state.heroes.map(hero => (
            <Card
              key={hero.id}
              won={this.state.score && !(this.state.score % this.state.heroes.length)}
              id={hero.id}
              image={hero.image}
              handleImgClick={() => this.handleClick(hero.id)}
            />
          ))}
        </Grid>
      </div>
    );
  }
}

export default Game;
