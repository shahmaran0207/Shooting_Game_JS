let canvas;
let ctx;
let score=0;

// 1. Set up the canvas
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;

// Append the canvas to the container instead of directly to the body
document.getElementById("gameContainer").appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let gameOver=false;

// Spaceship coordinates
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

let bulletList=[]

function Bullet(){
    this.x=0;
    this.y=0;
    this.init=function (){
        this.x=spaceshipX+20  ;
        this.y=spaceshipY;
        this.alive=true;    //true면 살아있는 총알, false면 죽은 총알

        bulletList.push(this);
    };

    this.update=function (){
        this.y-=7;
    };

    this.checkHit=function (){
        for(let i=0; i<enemyList.length; i++){
            if(this.y<=enemyList[i].y && this.x>=enemyList[i].x && this.x<=enemyList[i].x+40){
                score+=5;
                this.alive=false;
                enemyList.splice(i,1);
            }
        }
    }
}

function generateRandomValue(min, max){
    let randomNum=Math.floor(Math.random()*(max-min+1))+min;
    return randomNum;
}

let enemyList=[];

function Enemy(){
    this.x=0;
    this.y=0;

    this.init=function (){
        this.y=0;
        this.x=generateRandomValue(0, canvas.width-48);
        enemyList.push(this);
    };

    this.update=function (){
        this.y+=2;

        if(this.y>=canvas.height-104) gameOver=true;
    }
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

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

    ctx.fillText(`Score:${score}`, 20, 20);
    ctx.fillStyle="White";
    ctx.font="20px Arial";

    for(let i=0; i<bulletList.length; i++){
        if(bulletList[i].alive) ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }

    for(let i=0; i<enemyList.length; i++){
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
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

function createEnemy(){
    const interval=setInterval(function (){
        let e=new Enemy();
        e.init();

    }, 850);
}

// 39: Right arrow, 37: Left arrow
function update() {
    if (39 in keysDown) spaceshipX += 5;
    if (37 in keysDown) spaceshipX -= 5;

    // Keep spaceship within bounds
    if (spaceshipX <= 0) spaceshipX = 0;
    if (spaceshipX >= canvas.width - 64) spaceshipX = canvas.width - 64;

    for(let i=0; i<bulletList.length; i++){
        if(bulletList[i].alive){
            bulletList[i].update();
            bulletList[i].checkHit();
        }
    }

    for(let i=0; i<enemyList.length; i++){
        enemyList[i].update()
    }
}

function main() {
    if(!gameOver){
        update();
        render();
        requestAnimationFrame(main);
    }
    else ctx.drawImage(gameOverImage, 80, 210, 256, 256);
}

loadImage();
setupKeyboardListener();
createEnemy();
main();
