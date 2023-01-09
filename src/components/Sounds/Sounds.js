import "./Sounds.css";
import sound from '../../music/BatmanBegins.mp3'
import React, { Component } from "react";

class Sounds extends Component {

    state = {
        song: [],
        playing: false
    };

    audio = new Audio();

    togglePlayPause = () => {
        this.audio.src = `${sound}`;
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
                <button id="soundBtn" onClick={this.togglePlayPause}><i className="fas fa-volume-up"></i></button>
        )
    };
};

export default Sounds;