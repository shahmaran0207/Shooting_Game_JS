
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
    backgroundImage.src="src/images/background.gif"
}