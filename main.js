const body = document.querySelector("body");
const gridContainer = document.querySelector("#grid-container")

const drumEffects = [
    {
        name: "kick",
        src: "audio/kick.wav",
        keyListener: "a"
    },
    {
        name: "snare",
        src: "audio/snare.wav",
        keyListener:"s"
    },
    {
        name: "boom",
        src: "audio/boom.wav",
        keyListener:"d"
    },
    {
        name: "hihat",
        src: "audio/hihat.wav",
        keyListener:"f"
    },
    {
        name: "openhat",
        src: "audio/openhat.wav",
        keyListener:"g"
    },
    {
        name: "tink",
        src: "audio/tink.wav",
        keyListener:"h"
    },
    {
        name: "tom",
        src: "audio/tom.wav",
        keyListener:"j"
    },
    {
        name: "clap",
        src: "audio/clap.wav",
        keyListener: "k"
    },
    {
        name: "ride",
        src: "audio/ride.wav",
        keyListener:"l"
    }
]

let fragmentoEffects = new DocumentFragment;
let fragmentoAudio = new DocumentFragment;

for (effect of drumEffects) {
    let div = document.createElement("div");
    div.classList.add("effect");

    let effectKey = document.createElement("h2");
    effectKey.textContent = effect.keyListener;

    let effectTitle = document.createElement("h3");
    effectTitle.textContent = effect.name;

    div.append(effectKey, effectTitle);
    fragmentoEffects.appendChild(div);

    let audio = document.createElement("audio");
    audio.src = effect.src;
    audio.setAttribute('data-key', effect.keyListener)
    fragmentoAudio.appendChild(audio)    
}

window.addEventListener('keydown', function(e) {
    console.log(e.key)
    drumEffects.filter(effect => {
        return effect.keyListener == e.key;
    })
    let audioToPlay = document.querySelector(`[data-key='${e.key}']`);
    audioToPlay.play();
}) 

gridContainer.appendChild(fragmentoEffects)
body.appendChild(fragmentoAudio);