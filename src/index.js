var environment = require("environment");


var supports = module.exports,

    document = environment.document,
    audio, video;


supports.dom = !!(typeof(window) !== "undefined" && window.document && window.document.createElement);

supports.workers = typeof(Worker) !== "undefined";

supports.eventListeners = supports.dom && !!environment.window.addEventListener;
supports.attachEvents = supports.dom && !!environment.window.attachEvent;

supports.viewport = supports.dom && !!environment.window.screen;


if (supports.dom) {
    audio = new Audio();
    video = document.createElement("video");

    supports.audioMpeg = !!audio.canPlayType("audio/mpeg;").replace(/^no$/, "");
    supports.audioOpus = !!audio.canPlayType("audio/ogg; codecs=\"opus\"").replace(/^no$/, "");
    supports.audioOgg = !!audio.canPlayType("audio/ogg; codecs=\"vorbis\"").replace(/^no$/, "");
    supports.audioWav = !!audio.canPlayType("audio/wav; codecs=\"1\"").replace(/^no$/, "");
    supports.audioAac = !!audio.canPlayType("audio/aac;").replace(/^no$/, "");
    supports.audioM4a = !!(audio.canPlayType("audio/x-m4a;") || audio.canPlayType("audio/m4a;") || audio.canPlayType("audio/aac;")).replace(/^no$/, "");
    supports.audioMp4 = !!(audio.canPlayType("audio/x-mp4;") || audio.canPlayType("audio/mp4;") || audio.canPlayType("audio/aac;")).replace(/^no$/, "");
    supports.audioWebm = !!audio.canPlayType("audio/webm; codecs=\"vorbis\"").replace(/^no$/, "");

    supports.videoWebm = !!video.canPlayType("video/webm").replace(/^no$/, "");
    supports.videoOgg = !!video.canPlayType("video/ogg").replace(/^no$/, "");
    supports.videoMp4 = !!video.canPlayType("video/mp4").replace(/^no$/, "");

    supports.canvas = (function() {
        try {
            if (document.createElement("canvas").getContext("2d")) {
                return true;
            }
        } catch (err) {}
        return false;
    }());

    supports.webgl = (function() {
        var canvas = document.createElement("canvas"),
            names = ["3d", "moz-webgl", "experimental-webgl", "webkit-3d", "webgl"],
            i = names.length;

        while (i--) {
            try {
                if (canvas.getContext(names[i])) {
                    return true;
                }
            } catch (e) {}
        }

        return false;
    }());

    supports.touch = "ontouchstart" in environment.window;

    supports.pointerLock = (
        "pointerLockElement" in document ||
        "webkitPointerLockElement" in document ||
        "mozPointerLockElement" in document ||
        "msPointerLockElement" in document ||
        "oPointerLockElement" in document
    );
    supports.fullScreen = (
        "fullscreenElement" in document ||
        "fullScreenElement" in document ||
        "webkitFullscreenElement" in document ||
        "webkitFullScreenElement" in document ||
        "mozFullScreenElement" in document ||
        "mozFullscreenElement" in document ||
        "msFullscreenElement" in document ||
        "msFullScreenElement" in document ||
        "oFullscreenElement" in document ||
        "oFullScreenElement" in document
    );
} else {
    supports.audioMpeg = true;
    supports.audioOpus = true;
    supports.audioOgg = true;
    supports.audioWav = true;
    supports.audioAac = true;
    supports.audioM4a = true;
    supports.audioMp4 = true;
    supports.audioWebm = true;

    supports.videoWebm = true;
    supports.videoOgg = true;
    supports.videoMp4 = true;

    supports.canvas = false;
    supports.webgl = false;

    supports.touch = false;

    supports.pointerLock = false;
    supports.fullScreen = false;
}
