let bg;
let timeLeft = 60;
let customerStars = 0;
let game = "play";
let packageStatus = ""
let packageStatusTimer = 0

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
    },
    {
        x: 300,
        y: 180,
        size: 20,
        type: "yarn"
    },
    {
        x: 250,
        y: 300,
        size: 30,
        type: "sketchbooks"
    },
    {
        x: 500,
        y: 500,
        size: 40,
        type: "glitter"
    },
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
    },
    {
        yarn: 4,
        sketchbooks:1
    },
    {
        glitter: 2,
        sketchbooks:1
    },
]


//fix positioning
let deliveryStations = [
    {
        x: 395,
        y:150,
        size: 60
    },
    {
        x: 175,
        y:150,
        size: 60
    },
    {
        x: 245,
        y:150,
        size: 60
    },
    {
        x: 320,
        y:150,
        size: 60
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
    } else if(keyIsDown(RIGHT_ARROW) && player.x < 560){
        player.x += player.speed;
    } else if(keyIsDown(DOWN_ARROW) && player.y < 500){
        player.y += player.speed;
    } else if(keyIsDown(UP_ARROW) && player.y > 165){
        player.y -= player.speed;
    }
}


function drawSupplies(){
    for(let i = 0; i < supplies.length; i++){
        if(supplies[i].type === "paints"){
            fill("Purple");
        }else if(supplies[i].type === "yarn"){
            fill("green");
        }else if(supplies[i].type === "sketchbooks"){
            fill("pink");
        }else if(supplies[i].type === 'glitter'){
            fill("blue");
        }
        circle(supplies[i].x, supplies[i].y, supplies[i].size);
    }
}


function pickupCheck(){
    for(let i = 0; i < supplies.length; i++){
        let d = dist(player.x, player.y, supplies[i].x, supplies[i].y);
       
        if (d < 30){
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
    textSize(15);
    //update with each added item
    text("Paints: " + (player.inventory.paints || 0), 420, 540)
    text("Yarn: " + (player.inventory.yarn || 0), 420, 555)
    text("Sketchbooks: " + (player.inventory.sketchbooks || 0), 420, 570)
    text("Glitter: " + (player.inventory.glitter || 0), 420, 585)
}


function timer(){
    if (frameCount % 60 == 0 && timeLeft > 0) {
        timeLeft --;
    }
    
    if(timeLeft >= 0){
        fill("white");
        textSize(20);
        text("Time Left: " + timeLeft, 20, 550);
        text("Stars: " + customerStars, 20, 580);
    } else if (timeLeft <= 0) {
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
    fill(0,0,0,0);
    strokeWeight(0);
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


function keyReleased(){
    if(key === 'd'){
        deliverOrder();
    }


}


function stationKey(){
    if(withinStation()){
        fill("white");
        textSize(16);
        textAlign(CENTER);
        text("Press d to Deliver", player.x, player.y -20);
    }
}


function deliverOrder(){
    if(!withinStation()){
        return;
    }

    if(checkOrders()){
        customerStars += 5;
        player.inventory = {};
        curentOrders = random(order);

        fill("green");
        packageStatus = "Correct Package! + 10";
        packageStatusTimer = 1;
    }else{
        fill("red");
        customerStars -= 2;
        packageStatus = "Wrong Package :( - 2";
        packageStatusTimer = 1;
    }
}


function readyOrNot(){
    if(withinStation()){
        if(checkOrders()){
            fill("green");
            textSize(12);
            textAlign(CENTER);
            text("Ready for Delivery ", player.x, player.y);
        }else{
            fill("red");
            textSize(12);
            text("Not Ready", player.x, player.y);
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
    text("Time Up!", width/2, height/2);
    textSize(30);
    text("Stars: " + customerStars, width/2, height/2 - 80);
    textSize(30);
    fill("green");
    rect(width/2, height/2 + 80, 130, 40);
    fill("white");


    text("Restart? ", width/2, height /2 + 80);
}


function mousePressed(){
    if (game === "gameover"){
        restartGame();
    }
}


function restartGame(){
    game = "play";
    timeLeft = 60;
    customerStars = 0;
    player.inventory = {};


    curentOrders = random(order);
}


function drawOrders(){
    fill(225, 225, 225,150);
    strokeWeight(3);
    rectMode(CORNER);
    rect(15, 5,150,80); 
    fill("black"); 
    textSize(15);
    textAlign(LEFT, BASELINE);
    text("Order: ", 20, 20); //change values
    let items = Object.keys(curentOrders);
   
    for(let i = 0; i < items.length; i++){
        let item = items[i];
        let amount = curentOrders[item];


        text(item + " x " + amount, 40, 40 + i * 15); //change values
    }
}


/* THURSDAY:
    - fix delivery issue (correct amount of order current says wrong)  -> does count & gives points
    - quick notes on functions (+ order them better)
    - add more items + colors + orders --> create items?
    - order box -> add more for multiple orders at once
    - power ups and stuff
    - add sounds and character
    - fix restart button --> add only click within rectange?
    - figure out why I couldn't push content into github 
    - customer ratings + something that affects??
*/

