const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const elementoMensagem = document.getElementById("mensagem");
const gameBoard = document.querySelector(".game-board");

let score = 0;
let marioMorreu = false;
let sonic = false;
var audioMorreu = new Audio("BossTheme.mp3");

const personagens = [
	{
		nome: "mario",
		src: "mario.gif",
		background: "fundoMario.webp",
		largura: "150px",
		marginLeft: "0px",
        alturaChao: "65px",
		audio: new Audio("SuperMarioBros.mp3"),
	},
	{
		nome: "sonic",
		src: "sonic.gif",
		background: "fundoSonic.png",
		largura: "80px",
		marginLeft: "50px",
        alturaChao: "90px",
		audio: new Audio("2-GreenHillZone.mp3"),
	},
	{
		nome: "pokemon",
		src: "pikachu.gif",
		background: "fundoPokemon.png",
		largura: "120px",
		marginLeft: "50px",
        alturaChao: "65px",
		audio: new Audio("audioPokemon.mp3"),
	},
	{
		nome: "street fighter",
		src: "ken.gif",
		background: "fundoKen.gif",
		largura: "200px",
		marginLeft: "50px",
        alturaChao: "0px",
		audio: new Audio("audioStreetFighter.mp3"),
	},
	{
		nome: "naruto",
		src: "naruto.gif",
		background:"fundoNaruto.jpg",
		largura:"200px",
		marginLeft:"50px",
		alturaChao:"0px",
		audio: new Audio("audioNaruto.mp3"),
	}
];
let personagemAtual = personagens[0];

function mostrarMensagem(mensagem) {
	elementoMensagem.innerText = `SCORE: ${mensagem}`;
    // TODO: mostrar mensagem de game over
    // TODO: Adicionar botão de reiniciar
    // TODO: Adicionar botão de iniciar
    // TODO: Centralizar game-board
    // TODO: Mudar pipe de acordo com o personagem
    // TODO: Adicionar image de morte de acordo com o personagem
    // TODO: Parar animação do background quando o personagem morre
    // TODO: Organizar arquivos por pasta
}

function jump() {
	mario.classList.add("jump");

	setTimeout(() => {
		mario.classList.remove("jump");
	}, 500);
}

function jumpMobile() {
	mario.classList.add("jumpMobile");

	setTimeout(() => {
		mario.classList.remove("jumpMobile");
	}, 500);
}

function loop() {
	if (!marioMorreu) {
		const pipePosition = pipe.offsetLeft;
		const cloudsPosition = clouds.offsetLeft;
		const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

        console.log(pipePosition, cloudsPosition, marioPosition);

		/*if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
			marioMorreu = true;
			pipe.style.animation = "none";
			pipe.style.left = `${pipePosition}px`;

            mario.src = "morreu.png";
            mario.style.animation = "none";
			mario.style.bottom = `${marioPosition}px`;
			mario.style.width = "75px";
			mario.style.marginLeft = "50px";

			clouds.style.animation = "none";
			clouds.style.left = `${cloudsPosition}px`;
        }

		//fazer foto de quando sonic morre
		/* if (score > 5 && pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
			marioMorreu = true;
			pipe.style.animation = "none";
			pipe.style.left = `${pipePosition}px`;

            mario.src = "sonicMorreu.png";
			mario.style.animation = "none";
			mario.style.bottom = `${marioPosition}px`;
			mario.style.width = "75px";
			mario.style.marginLeft = "50px";
		} */
	}
}

function audioStop(audio) {
	audio.pause();
	audio.currentTime = 0;
}

function mudarPersonagem(personagem) {
    personagemAtual.audio.pause();

    document.startViewTransition(() => {
        mario.src = personagem.src;
        mario.style.width = personagem.largura;
        mario.style.marginLeft = personagem.marginLeft;
        mario.style.bottom = personagem.alturaChao;

        pipe.style.bottom = personagem.alturaChao;

        gameBoard.setAttribute("data-bg", personagem.background);
        gameBoard.style.backgroundImage = `url(${personagem.background})`;
    });

    personagem.audio.play();
    personagemAtual = personagem;
}

function pontuacao() {
	if (!marioMorreu) {
		score++;
		console.log("Pontuacao!");
        elementoMensagem.classList.add("animado");
        setTimeout(() => {
            elementoMensagem.classList.remove("animado");
        }, 250);
	}

    const indicePersonagem = Math.min(Math.floor(score / 20), personagens.length - 1);
    console.log(indicePersonagem);
    const personagem = personagens[indicePersonagem];

    if (personagemAtual != personagem) {
        mudarPersonagem(personagem);
    }

	//som quando morre!
	if (marioMorreu) {
        for (const personagem of personagens) {
            personagem.audio.pause();
        }

		audioMorreu.play();
	}

	mostrarMensagem(score);
}

setInterval(loop, 10);

// Check if the user is using a mobile device
if (window.matchMedia("(max-width: 768px)").matches) {
    setInterval(pontuacao, 900);
} else {
    setInterval(pontuacao, 2000);
}

mudarPersonagem(personagemAtual);
document.addEventListener("keydown", jump);
document.addEventListener("click", jump);
