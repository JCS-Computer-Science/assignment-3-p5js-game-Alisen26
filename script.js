let bg, yarn, glitter, paint, sketchbook;
let timeLeft = 60;
let customerStars = 0;
let game = "play";
let packageStatus = ""
let curentOrders;
let event = "none";
let eventTimer = 0;
let eventCountDown = 15;
let reverseControls = false;
let glitterCover = 0;

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
        size: 60,
        type: "paints"
    },
    {
        x: 300,
        y: 180,
        size: 60,
        type: "yarn"
    },
    {
        x: 250,
        y: 300,
        size: 60,
        type: "sketchbooks"
    },
    {
        x: 500,
        y: 500,
        size: 80,
        type: "glitter"
    },
]

//update whether urgent or not
let orders = [
    {
        paints: 2
    },
    {
        glitter: 3
    },
    {
        sketchbooks: 2
    },
    {
        yarn: 3
    },
    {
        yarn: 4,
        sketchbooks:1
    },
    {
        glitter: 2,
        sketchbooks:1
    },
    {
        paints: 3,
        sketchbooks:3
    },
    {
        glitter: 2,
        yarn:3
    },
    {
        paints: 4,
        yarn:1
    },
    {
        paints: 2,
        glitter:1
    },
    {
        yarn: 4,
        paints:2,
        sketchbooks:1
    },
    {
        glitter: 1,
        paints:2,
        sketchbooks:1
    },
    {
        glitter: 2,
        yarn:2,
        sketchbooks:2
    },
    {
        yarn: 2,
        paints:1,
        glitter:1
    }
]

let urgentOrder = [
    {
        paints: 2,
        urgent: true
    },
    {
        glitter: 3
    },
    {
        sketchbooks: 2
    },
    {
        yarn: 3
    },
    {
        yarn: 4,
        sketchbooks:1
    },
    {
        glitter: 2,
        sketchbooks:1
    },
    {
        paints: 3,
        sketchbooks:3
    },
    {
        glitter: 2,
        yarn:3
    },
    {
        paints: 4,
        yarn:1
    },
    {
        paints: 2,
        glitter:1
    },
    {
        yarn: 4,
        paints:2,
        sketchbooks:1
    },
    {
        glitter: 1,
        paints:2,
        sketchbooks:1
    },
    {
        glitter: 2,
        yarn:2,
        sketchbooks:2
    },
    {
        yarn: 2,
        paints:1,
        glitter:1
    }
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

let block = [
    {
        x: 500,
        y: 300,
        size: 20,
        type: "freeze"
    },
    {
        x: 200,
        y: 400,
        size: 20,
        type: "slip"
    }
]

function preload(){
    bg = loadImage("Images/compSciBg.png")
    yarn = loadImage("Images/yarn.png")
    glitter = loadImage("Images/gliiterBottle.png")
    sketchbook = loadImage("Images/sketchbook.png")
    paint = loadImage("Images/paint.png")
}

function setup(){
    createCanvas(600,600);
    curentOrders = makeOrder;
}

function draw(){
    imageMode(CORNER);
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
        beginEvent();
        playEvent();
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

    if(reverseControls === true){
        //left = right & so forth (do)
    }
}

function drawSupplies(){
    imageMode(CENTER);
    for(let i = 0; i < supplies.length; i++){
        let item = supplies[i];
        if(supplies[i].type === "paints"){
            image(paint, item.x, item.y, item.size, item.size);
        }else if(supplies[i].type === "yarn"){
            image(yarn, item.x, item.y, item.size, item.size);
        }else if(supplies[i].type === "sketchbooks"){
            image(sketchbook, item.x, item.y, item.size, item.size);
        }else if(supplies[i].type === 'glitter'){
            image(glitter, item.x, item.y, item.size, item.size);
        }
    }
}

function pickupCheck(){
    for(let i = 0; i < supplies.length; i++){
        let d = dist(player.x, player.y, supplies[i].x, supplies[i].y);
       
        if(d < 30){
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
    }else if(timeLeft <= 0) {
        game = "gameover"
    }
}

function checkOrders(){
    let items = Object.keys(curentOrders);

    for(let i = 0; i < items.length; i++){
        let item = items[i];
        let held = player.inventory[item] || 0;
        let need = curentOrders[item];
        if(need > held){
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

function extraSpeed(){
    if(checkOrders() > 4){
        player.speed++;
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

//Needs to be fixed
function deliverOrder(){
    if(withinStation()){
        if(checkOrders()){
            customerStars += 5;
            player.inventory = {};
            curentOrders = random(order);
   
            fill("green");
            packageStatus = "correct";
            if(packageStatus === "correct"){
                textSize(12);
                text("Correct Package! +" + customerStars, player.x, player.y -20);
            }
        }else{
            fill("red");
            if(customerStars > 0){
                customerStars -= 2;
            }
            packageStatus = "Wrong Package :( - 2";
            packageStatusTimer = 1;
        }
    }else{
        return;
    }
}

function readyOrNot(){
    if(withinStation()){
        if(checkOrders()){
            fill("green");
            textSize(12);
            textAlign(CENTER);
            text("Ready for Delivery", player.x, player.y);
        }else{
            fill("red");
            textSize(12);
            text("Not Ready for Delivery", player.x, player.y);
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
    text("Order: ", 20, 20);
    let items = Object.keys(curentOrders);
   
    for(let i = 0; i < items.length; i++){
        let item = items[i];
        let amount = curentOrders[item];
        text(item + " x " + amount, 40, 40 + i * 15);
    }
}

function makeOrder(){
    let typeOrder = random(["orders", "urgentOrder"]);

    if(typeOrder === "urgentOrder"){
        return{
            items: urgentOrder,
            urgent: true
        }
    }else{
        return{
            items: orders,
            urgent: false
        }
    }
}

function beginEvent(){
    
    if(event === "none"){
        eventCountDown--; 
        
        if(eventCountDown <= 0){
            let possibleEvent = ["paintSpill", "yarnTanged", "glitterBoom"];
            event = random(possibleEvent);
            eventTimer = 10;
            eventCountDown = 15;
        }
    }
    
    if(event !== "none"){
        fill("yellow");
        textSize(20);
        textAlign(CENTER);
        text("Event: " + event, 20, 520);
    }
}

function playEvent(){
    if(event !== "none"){
        eventTimer--;
    }
    
    if (event === "yarnTanged"){
        reverseControls = true;
    }else if (event === "paintSpill"){
        player.speed = 1;
    }else if (event === "glitterBoom"){
        glitterFilter();
    }
    
    if(eventTimer <= 0 && event !== "none"){
        event = "none";
        player.speed = 3;
        reverseControls = false;
    }
}

function glitterFilter(){
    if(glitterCover > 0){
        fill(255, 192, 203, 80);
        rectMode(CORNER);
        rect(0,0,width,height);
        glitterCover--;
    }
}


/* THURSDAY:
    - order box -> add more for multiple orders at once
    - power ups and stuff
    - add sounds and character
    - figure out why I couldn't push content into github
    - customer ratings + something that affects??
*/


