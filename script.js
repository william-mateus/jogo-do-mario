const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
let score = 0;
let marioMorreu = false;

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
        }
    }
}

function piranha() {
    if (!marioMorreu) {
        score++;
        console.log("PIRANHA!");
    }
}

setInterval(loop, 10);
setInterval(piranha, 2000);
document.addEventListener('keydown', jump);