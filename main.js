
let canvas;
let ctx;

//1. canvas 세팅
canvas=document.createElement("canvas");
ctx=canvas.getContext("2d");

canvas.width=400;
canvas.height=700;

document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

//우주선 좌표 - 계속 움직이면 바뀌기 때문에 따로 빼 두는 것
let spaceshipX = canvas.width/2 -32;
let spaceshipY = canvas.height-64;

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

let keysDown={}

//2. render: UI를 그려주는 것
function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function setupKeyboardListener(){
    document.addEventListener("keydown", function (event){
        keysDown[event.keyCode]=true;
    });

    document.addEventListener("keyup", function (event){
        delete keysDown[event.keyCode]
    })
}

//39: 오른쪽 방향키
//37: 왼쪽 방향키
function update(){
    if(39 in keysDown) spaceshipX+=5;
    if(37 in keysDown) spaceshipX-=5;

    if(spaceshipX<=0) spaceshipX=0;
    if(spaceshipX >= canvas.width-64) spaceshipX=canvas.width-64;
}

function main(){
    update();
    render();
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();
