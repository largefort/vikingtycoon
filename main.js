import * as me from 'melonjs';
import PlayScreen from './js/screens/play.js';

me.device.onReady(function() {
    // Initialize the video
    if (!me.video.init(1024, 768, { parent : "screen", scale : "auto", scaleMethod : "flex-width" })) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // Initialize the audio
    me.audio.init("mp3,ogg");

    // Set the "Play/Ingame" Screen Object
    me.state.set(me.state.PLAY, new PlayScreen());

    // Start the game.
    me.state.change(me.state.PLAY);
});
