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
        this.audio.src = "./assets/music/BatmanBegins.mp3";
        if (!this.state.playing) {
            this.setState({ playing: true });
            this.audio.play();
            this.audio.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            });
        } else {
            this.setState({ playing: false });
            this.audio.pause();
        };
    };

    render() {
        return (
            <div>
                <button className="btn btn-info" onClick={this.togglePlayPause}><i className="fas fa-volume-up"></i></button>
            </div>
        )
    };
};

export default Sounds;