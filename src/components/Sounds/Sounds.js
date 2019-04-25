// Needs fontawesome link and sounds in public/assets/music to make this work

import React, { Component } from "react";
import "./Sounds.css";

class Sounds extends Component {

    state = {
        song: [],
        playing: false
    };

    audio = new Audio();

    togglePlayPause = () => {
            this.audio.src="/assets/music/BatmanBegins.mp3";
        if(!this.state.playing) {
            this.setState({playing: true});
            this.audio.play();
        } else {
            this.setState({playing: false});
            this.audio.pause();
        }
    };

    render() {
        return(
        <div>
            {/* <audio id="soundTrack" src="/assets/music/BatmanBegins.mp3" loop="loop" autoPlay>
                Your browser doesn't support the <code>audo</code> element.
            </audio> */}
            <button className="btn btn-info" onClick={this.togglePlayPause}><i className="fas fa-volume-up"></i></button>
        </div>
    )}
};

export default Sounds;