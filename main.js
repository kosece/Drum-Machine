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

const playSound = (audio) => {
    audio.currentTime = 0; // "rewinds" the audio back to the beginning before playing it, allowing the user to play the same audio before it finishes playing.
    audio.play();
}

const addAnimation = (div) => {
    div.classList.add('pressed'); // Add 'pressed' status to the div that the key is linked to
}

const removeAnimation = (div) => {
    div.classList.remove('pressed')
}

let fragmentoEffectDivs = new DocumentFragment;
let fragmentoAudio = new DocumentFragment;

for (effect of drumEffects) {
    /* HTML ELEMENTS CREATION */
    let div = document.createElement("div");
    div.classList.add("effect");
    div.setAttribute('data-key', effect.keyListener)

    let effectKey = document.createElement("h2");
    effectKey.textContent = effect.keyListener;

    let effectName = document.createElement("h3");
    effectName.textContent = effect.name;

    div.append(effectKey, effectName);

    let audio = document.createElement("audio");
    audio.src = effect.src;
    audio.setAttribute('data-key', effect.keyListener)
    
    /* Estos event listeners los creo directamente con los divs porque si los creo afuera tengo que 
    usar un document.querySelectorAll para elegir todos los divs de efectos, y no me regresa nada al 
    no ejecutarse DESPUES de que se creen los elementos por algun motivo */

    div.addEventListener('touchstart', function(){
        let audioToPlay = document.querySelector(`audio[data-key="${div.getAttribute('data-key')}"]`); // Select audio with the same data key as the touched div
        playSound(audioToPlay);
        addAnimation(div);
    })

    div.addEventListener('touchend', function() {
        removeAnimation(div);
    })

    fragmentoAudio.appendChild(audio);
    fragmentoEffectDivs.appendChild(div);
}

window.addEventListener('keypress', function(e) {
    let audioToPlay = document.querySelector(`audio[data-key='${e.key}']`); // Select audio with data-key equal to the pressed key
    playSound(audioToPlay); 

    let divToAnimate = document.querySelector(`div[data-key='${e.key}']`); // Select div with data-key equal to pressed div
    addAnimation(divToAnimate);
}) 

window.addEventListener('keyup', function(e) {
    let animatedDiv = document.querySelector(`.pressed[data-key="${e.key}"]`); // Select just the div linked with the key that stopped being pressed
    removeAnimation(animatedDiv)
})

gridContainer.appendChild(fragmentoEffectDivs)
body.appendChild(fragmentoAudio);