let canvas;
let ctx;

// 1. Set up the canvas
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;

// Append the canvas to the container instead of directly to the body
document.getElementById("gameContainer").appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

// Spaceship coordinates
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

let bulletList=[]

function Bullet(){
    this.x=0;
    this.y=0;
    this.init=function (){
        this.x=spaceshipX;
        this.y=spaceshipY;

        bulletList.push(this);
    };

    this.update=function (){
        this.y-=7;
    };
}

function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "src/images/background.gif";

    spaceshipImage = new Image();
    spaceshipImage.src = "src/images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "src/images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "src/images/enemy.png";

    gameOverImage = new Image();
    gameOverImage.src = "src/images/gameover.png";
}

let keysDown = {};

// 2. Render: draw the UI
function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

    for(let i=0; i<bulletList.length; i++){
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
}

function setupKeyboardListener() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.keyCode] = true;
    });

    document.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];

        //spacebar: 32
        if(event.keyCode==32) createBullet();
    });
}

function createBullet(){
    let b= new Bullet();
    b.init();
}

// 39: Right arrow, 37: Left arrow
function update() {
    if (39 in keysDown) spaceshipX += 5;
    if (37 in keysDown) spaceshipX -= 5;

    // Keep spaceship within bounds
    if (spaceshipX <= 0) spaceshipX = 0;
    if (spaceshipX >= canvas.width - 64) spaceshipX = canvas.width - 64;

    for(let i=0; i<bulletList.length; i++){
        bulletList[i].update()
    }
}

function main() {
    update();
    render();
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();
