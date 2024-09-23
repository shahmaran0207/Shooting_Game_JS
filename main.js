
let canvas;
let ctx;

//1. canvas 세팅
canvas=document.createElement("canvas");
ctx=canvas.getContext("2d");

canvas.width=400;
canvas.height=700;

document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

function loadImage(){
    backgroundImage=new Image();
    backgroundImage.src="src/images/background.gif";

    spaceshipImage=new Image();
    spaceshipImage.src="src/images/spaceship.png";

    bulletImage=new Image();
    bulletImage.src="src/images/bullet.png";

    enemyImage=new Image();
    enemyImage.src="src/images/enemy.png";

    gameOverImage=new Image();
    gameOverImage.src="src/images/gameover.png";
}

//2. render: UI를 그려주는 것
function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function main(){
    render()
    requestAnimationFrame(main)
}

loadImage();
render();
main();
