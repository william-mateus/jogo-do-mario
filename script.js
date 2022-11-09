const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
let score = 0;
let marioMorreu = false;
let sonic = false;
var audioSonic = new Audio('2-GreenHillZone.mp3');
var audioMario = new Audio('SuperMarioBros.mp3');

function jump() {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}



function loop() {
    if (!marioMorreu) {
        
        
       
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            marioMorreu = true;
            pipe.style.animation = 'none';

            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';

            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'morreu.png'
            mario.style.width = '75px'; 
            mario.style.marginLeft = '50px';
            audioStop(audioMario)
        }
        //parar audio se morreu
    }
}

function audioStop(audio){
    audio.pause();
audio.currentTime = 0;
}

function pontuacao() {
    if (!marioMorreu) {
        score++;
        console.log("Pontuacao!");
    }
    //novo personagem
    if ( score == 5){
        mario.src = 'sonic.gif'
        mario.style.width = '80px'; 
        mario.style.marginLeft = '50px'; 

        audioStop(audioMario)
        audioSonic.play();
     }
     //fazer foto de quando mario morre


}

setInterval(()=>{audioMario.play()},10)
setInterval(loop, 10);
setInterval(pontuacao, 2000);
document.addEventListener('keydown', jump);