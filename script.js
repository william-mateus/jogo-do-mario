const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const elementoMensagem = document.getElementById("mensagem");
let score = 0;
let marioMorreu = false;
let sonic = false;
var audioSonic = new Audio('2-GreenHillZone.mp3');
var audioMario = new Audio('SuperMarioBros.mp3');
var audioPokemon = new Audio('audioPokemon.mp3');
var audioDonkey = new Audio('audioDonkey.mp3');
var audioStreetFigther = new Audio('audioStreetFighter.mp3');
var audioNaruto = new Audio('audioNaruto.mp3');
var audioMorreu = new Audio('BossTheme.mp3');

function mostrarMensagem(mensagem) {
    elementoMensagem.innerText = mensagem;
    elementoMensagem.classList.remove("escondido"); 
        
    elementoMensagem.classList.add("paraAnimacao");
        
    setTimeout(() => {
        elementoMensagem.classList.remove("paraAnimacao");
    }
    , 1000);
}

function jump() {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}



function loop() {
    if (!marioMorreu) {
        
        
       
        const pipePosition = pipe.offsetLeft;
        const cloudsPosition = clouds.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            marioMorreu = true;
            pipe.style.animation = 'none';

            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';

            mario.style.bottom = `${marioPosition}px`;

            clouds.style.animation = 'none';

            clouds.style.left = `${cloudsPosition}px`;

            mario.src = 'morreu.png'
            mario.style.width = '75px'; 
            mario.style.marginLeft = '50px';
            
        }
            //fazer foto de quando sonic morre
        if (score > 5 && pipePosition <= 120 && pipePosition > 0 && marioPosition < 80 ){
            marioMorreu = true;
            pipe.style.animation = 'none';

            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';

            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'sonicMorreu.png'
            mario.style.width = '75px'; 
            mario.style.marginLeft = '50px';
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
    if(score < 6){
        audioMario.play();
    }
    //sonic
    if ( score == 9){
        audioMario.pause()
        mario.src = 'sonic.gif'
        mario.style.width = '80px'; 
        mario.style.marginLeft = '50px'; 
        


        audioSonic.play();
     }
     if ( score == 19){
        audioSonic.pause()
        mario.src = 'pikachu.gif'
        mario.style.width = '120px'; 
        mario.style.marginLeft = '50px';  
        audioPokemon.play();
     }
     if ( score == 29){
        audioPokemon.pause()
        mario.src = 'ken.gif'
        mario.style.width = '200px'; 
        mario.style.marginLeft = '50px';  
        audioStreetFigther.play();
     }
     if ( score == 39){
        audioStreetFigther.pause()
        mario.src = 'naruto.gif'
        mario.style.width = '200px'; 
        mario.style.marginLeft = '50px';  
        audioNaruto.play();
     }
        // donkey consertar!!
     
     //som quando morre!
     if(marioMorreu){
        audioMario.pause();
        audioSonic.pause();
        audioPokemon.pause();
        audioStreetFigther.pause();
        audioNaruto.pause();
        audioMorreu.play();
     }
   
     mostrarMensagem(score);

}


setInterval(loop, 10);
setInterval(pontuacao, 2000);
document.addEventListener('keydown', jump);
document.addEventListener('click',jump);