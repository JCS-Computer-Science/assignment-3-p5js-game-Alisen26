let player = {
        x: 100,
        y: 200,
        size: 20,
        speed: 3,
        health: 10
   }

let enemies = [
    {
        x: 300,
        y: 200,
        size: 30,
        type: "slow",
        speed: 1,
        health: 4
    },
    {
        x: 450,
        y: 200,
        size: 40,
        type: "",
        speed: 3,
        health: 5
    },
]

function setup(){
    createCanvas(400,400);

}

function draw(){
    background(220);
    drawPlayer();
    playerMove();
    drawEnemy();
    enemyMove();
    checkCollisions();
    
}

function drawPlayer(){
    fill(0);
    circle(player.x,player.y, player.size);
}

function playerMove(){
    if (keyIsDown(LEFT_ARROW)){
        player.x -= player.speed;
    }

    if(keyIsDown(RIGHT_ARROW)){
        player.x += player.speed;
    }
}

function drawEnemy(){
    for(let i = 0; i < enemies.length; i++){
        circle(enemies[i].x, enemies[i].y, enemies[i].size);
    }
}

function enemyMove(){
    for (let i = 0; i < enemies.length; i++){
        enemies[i].x -= enemies[i].speed;
    }
}

function checkCollisions(sprite1, sprite2){
    let d = dist(sprite1.x, sprite1.y, sprite2.x, sprite2.y)
    if(d<sprite1.size/2 + sprite2.size/2){
        return true;
    }else{
        return false;
    }
}



function timer(){
    let timer 
}

/* to do:
- health
- reset if off screen
- timer
- 