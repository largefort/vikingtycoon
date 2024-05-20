import * as me from 'melonjs';
import PlayScreen from './js/screens/play.js';

me.device.onReady(function() {
    if (!me.video.init(1024, 768, { parent : "screen", scale : "auto", scaleMethod : "flex-width" })) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    me.audio.init("mp3,ogg");

    me.state.set(me.state.PLAY, new PlayScreen());

    me.state.change(me.state.PLAY);
});
