import './App.css';
import heroes from "./heroes";
import Nav from "./components/Nav";
import win1 from "./music/win.mp3";
import win2 from "./music/win2.mp3";
import lost from "./music/lost.mp3";
import Grid from "./components/Grid";
import Card from "./components/Card";
import Sounds from "./components/Sounds";
import React, { Component } from 'react';
import laugh from "./music/man-laughing.mp3";

class App extends Component {
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
          audio.src = `${lost}`;
          audio2.src = `${laugh}`;
          audio2.play();
        } else { 
          audio2.src = `${win1}`;
          hero.clicked = true;
          update.score++;
          audio2.play();
        };
        audio.play();
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
      audio2.src = `${win2}`;
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
        <Nav score={this.state.score} topScore={this.state.topScore} />
        <Sounds />
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

export default App;
