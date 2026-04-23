let bg;
let timeLeft = 60;
let score = 0
let game = "play"

let player = {
    x: 100,
    y: 200,
    size: 40,
    speed: 3,
    inventory: {}
}

//add more
let supplies = [
    {
        x: 200,
        y: 200,
        size: 30,
        type: "paints"
    }
]

//add more
let order = [
    {
        paints: 2
    },
    {
        yarn: 5,
        paints:2,
        sketchbooks:1
    }
]

//fix positioning
let deliveryStations = [
    {
        x: 370,
        y:110,
        size: 50
    },
    {
        x: 161,
        y:102,
        size: 30
    },
    {
        x: 206,
        y:102,
        size: 30
    },
    {
        x: 255,
        y:102,
        size: 30
    }
]

let curentOrders;

function preload(){
    bg = loadImage("Images/compSciBg.png")
}

function setup(){
    createCanvas(600,600);
    curentOrders = random(order);
}

function draw(){
    image(bg, 0,0,600,600);
    if(game == "play"){
        playerMove();
        drawPlayer();
        drawSupplies();
        drawOrders();
        pickupCheck();
        inventoryText();
        timer();
        dropOff();
        stationKey();
        readyOrNot();
        checkForGameOver();
    }else{
        drawGameOver();
    }
}

function drawPlayer(){
    fill(0);
    circle(player.x,player.y, player.size);
}

function playerMove(){
    if (keyIsDown(LEFT_ARROW) && player.x > 40){
        player.x -= player.speed;
    }

    if(keyIsDown(RIGHT_ARROW) && player.x < 560){
        player.x += player.speed;
    }

    if(keyIsDown(DOWN_ARROW) && player.y < 500){
        player.y += player.speed;
    }

    if(keyIsDown(UP_ARROW) && player.y > 165){
        player.y -= player.speed;
    }
}

function drawSupplies(){
    for(let i = 0; i < supplies.length; i++){
        if(supplies[i].type === "paints"){
            fill("Purple");
        }

        circle(supplies[i].x, supplies[i].y, supplies[i].size);
    }
}

function pickupCheck(){
    for(let i = 0; i < supplies.length; i++){
        let d = dist(player.x, player.y, supplies[i].x, supplies[i].y);
        
        if (d < 20){
            let type = supplies[i].type;

            if(!player.inventory[type]){
                player.inventory[type] = 0;
            }

            player.inventory[type]++;
            
            supplies[i].x = random(60, 540);
            supplies[i].y = random(170, 480);
        }
    }
}

function inventoryText(){
    fill("white");
    textSize(30);
    //update with each added item
    text("Paints: " + (player.inventory.paints || 0), 420, 580)
    text("Yarn: " + (player.inventory.yarn || 0), 420, 580)
}

function timer(){
    if (frameCount % 60 == 0 && timeLeft > 0) {
        timeLeft --;
    }
    if(timeLeft >= 0){
        fill("white");
        textSize(20);
        text("Time Left: " + timeLeft, 20, 300);
    }
    if (timeLeft <= 0) {
        game = "gameover"
    }
}

function checkOrders(){
    let items = Object.keys(curentOrders);

    for(let i = 0; i < items.length; i++){
        let item = items[i];
        let held = player.inventory[item] || 0;
        let need = curentOrders[item];

        if (need > held){
            return false;
        }
    }

    return true;
}

function dropOff(){
    fill("orange");
    for(let i = 0; i < deliveryStations.length; i++){
        let stat = deliveryStations[i];
        rectMode(CENTER);
        rect(stat.x, stat.y, stat.size);
    }
}

function withinStation(){
    for(let i = 0; i < deliveryStations.length; i++){
        let stat = deliveryStations[i];
        let d = dist(player.x, player.y, stat.x, stat.y);

        if(d < stat.size/2){
            return true;
        }
    }
    return false;
}

function keyPressed(){
    if(key === 'd'){
        deliverOrder();
    }

    if (key === 'p'){
        //pause timer & stop game
    }
}

function stationKey(){
    if(withinStation()){
        fill("white");
        textSize(16);
        text("Press d to Deliver", player.x - 20, player.y -20);
    }
}

function deliverOrder(){
    if(!withinStation()){
        return;
    }

    if(checkOrders()){
        console.log("Correct Package!");
        score += 10;
        //add score amount;
        player.inventory = {};
        curentOrders = random(order);
    }else{
        console.log("Wrong Package!");
    }
}

function readyOrNot(){
    if(withinStation()){
        if(checkOrders()){
            fill("green");
            textSize(12);
            text("Ready for Delivery ", player.x -20, player.y -20);
        }else{
            fill("red");
            textSize(12);
            text("Wrong Order or Items", player.x - 20, player.y -20);
        }
    }
}

function checkForGameOver(){
    if(game === "gameover"){
        drawGameOver();
        return;
    }
}

function drawGameOver(){
    fill("white");
    textAlign(CENTER, CENTER);
    textSize(70);
    text("Game Over", width/2, height/2);
    textSize(30);
    text("Score: " + score, width/2, height/2 - 20);
    textSize(30);
    text("Restart? ", width/2, height /2 + 20);
}

function mousePressed(){
    if (game === "gameover"){
        restartGame();
    }
}

function restartGame(){
    game = "play";
    timeLeft = 60;
    score = 0;
    player.inventory = {};

    curentOrders = random(order);
}

function drawOrders(){
    fill("white");
    textSize(12);
    textAlign(LEFT, BASELINE);
    text("Order: ", 20, 20); //change values
    let items = Object.keys(curentOrders);
    
    for(let i = 0; i < items.length; i++){
        let item = items[i];
        let amount = curentOrders[item];

        text(item + " x " + amount, 40, 40 + i * 10); //change values
    }
}

/* THURSDAY:
    - fix positionings
    - timer fixing issues
    - quick notes on functions (+ order them better)
    - add more items + colors + orders
    - fix restart button
    - order box
    - show score
    - power ups and stuff
    - add sounds and character
*/
