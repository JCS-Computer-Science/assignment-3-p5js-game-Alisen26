let bg, yarn, glitter, paint, sketchbook;
let timeLeft = 90;
let customerStars = 0;
let game = "play";
let packageStatus = ""
let curentOrders;
let currentEvent = "none";
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

let orders = [
    {
        paints: 2,
        urgent: false,
        endTime: 30
    },
    {
        glitter: 3,
        urgent: false,
        endTime: 30
    },
    {
        sketchbooks: 2,
        urgent: false,
        endTime: 25


    },
    {
        yarn: 3,
        urgent: false,
        endTime: 30


    },
    {
        yarn: 4,
        sketchbooks:1,
        urgent: false,
        endTime: 35
    },
    {
        glitter: 2,
        sketchbooks:1,
        urgent: false,
        endTime: 35
    },
    {
        paints: 3,
        sketchbooks:3,
        urgent: false,
        endTime: 35
    },  
    {
        glitter: 2,
        yarn:3,
        urgent: false,
        endTime: 35


    },
    {
        paints: 4,
        yarn:1,
        urgent: false,
        endTime: 35
    },
    {
        paints: 2,
        glitter:1,
        urgent: false,
        endTime: 35
    },
    {
        yarn: 4,
        paints:2,
        sketchbooks:1,
        urgent: false,
        endTime: 35
    },
    {
        glitter: 1,
        paints:2,
        sketchbooks:1,
        urgent: false,
        endTime: 35
    },
    {
        glitter: 2,
        yarn:2,
        sketchbooks:2,
        urgent: false,
        endTime: 35
    },
    {
        yarn: 2,
        paints:1,
        glitter:1,
        urgent: false,
        endTime: 35
    }
]


let urgentOrder = [
    {
        paints: 2,
        urgent: true,
        endTime: 15
    },
    {
        glitter: 3,
        urgent: true,
        endTime: 15
    },
    {
        sketchbooks: 2,
        urgent: true,
        endTime: 15
    },
    {
        yarn: 3,
        urgent: true,
        endTime: 15
    },
    {
        yarn: 4,
        sketchbooks:1,
        urgent: true,
        endTime: 20
    },
    {
        glitter: 2,
        sketchbooks:1,
        urgent: true,
        endTime: 20
    },
    {
        paints: 3,
        sketchbooks:3,
        urgent: true,
        endTime: 20
    },
    {
        glitter: 2,
        yarn:3,
        urgent: true,
        endTime: 20
    },
    {
        paints: 4,
        yarn:1,
        urgent: true,
        endTime: 20
    },
    {
        paints: 2,
        glitter:1,
        urgent: true,
        endTime: 20
    },
    {
        yarn: 4,
        paints:2,
        sketchbooks:1,
        urgent: true,
        endTime: 20
    },
    {
        glitter: 1,
        paints:2,
        sketchbooks:1,
        urgent: true,
        endTime: 20
    },
    {
        glitter: 2,
        yarn:2,
        sketchbooks:2,
        urgent: true,
        endTime: 20
    },
    {
        yarn: 2,
        paints:1,
        glitter:1,
        urgent: true,
        endTime: 20
    }
]


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
    createCanvas(800,600);
    curentOrders = [makeUrgentOrder(),makeOrder(),makeOrder()];
}


function draw(){
    imageMode(CORNER);
    image(bg, 0,0,600,600);
    if(game === "play"){
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
        drawGlitterFilter();
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
    if(reverseControls){
        if(keyIsDown(LEFT_ARROW) && player.x < 560){
            player.x += player.speed;
        }
        if(keyIsDown(RIGHT_ARROW) && player.x > 40){
            player.x -= player.speed;
        }
        if(keyIsDown(UP_ARROW) && player.y < 500){
            player.y += player.speed;
        }
        if(keyIsDown(DOWN_ARROW) && player.y > 165){
            player.y -= player.speed;
        }
    }else{
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
        if(currentEvent !== "none"){
            eventTimer--;
        }else{
            eventCountDown--;
        }
        for(let i = 0; i < curentOrders.length; i++){
            curentOrders[i].endTime--;
        }
    
    }
    
    if(timeLeft >= 0){
        fill("white");
        textSize(20);
        text("Time Left: " + timeLeft, 20, 550);
        text("Stars: " + customerStars, 20, 580);
    }else if(timeLeft <= 0) {
        game = "gameover"
    }
    
    for(let i = curentOrders.length - 1; i >=0; i--){
        if(curentOrders[i].endTime <= 0){
            customerStars -= 3;
            curentOrders.splice(i,1);
            if(i === 0){
                curentOrders.unshift(makeUrgentOrder());
            }else{
                curentOrders.push(makeOrder());
            }
        }
    }
}


function checkOrders(orderTypes){
    let items = Object.keys(orderTypes);

    for(let i = 0; i < items.length; i++){
        let item = items[i];

        if(item === "urgent")continue;
        if(item === "endTime")continue;

        let held = player.inventory[item] || 0;
        let need = orderTypes[item];
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
    if(!withinStation()){
        return;
    }

    let delivered = false;

    for(let i = 0; i < curentOrders.length; i++){
        if(checkOrders(curentOrders[i])){
            customerStars += 5;
            curentOrders.splice(i,1);
            if(i === 0){
                curentOrders.unshift(makeUrgentOrder());
            }else{
                curentOrders.push(makeOrder());
            }
            player.inventory = {};
           
            delivered = true;
            packageStatus = "correct";
            if(packageStatus === "correct"){
                fill("green");
                textSize(12);
                text("Correct Package! +" + customerStars, player.x, player.y -20);
            }

            return;
        }


    }


    if(!delivered){
        if(customerStars > 0){
            fill("red");
            textSize(12);
            customerStars -= 2;
            text("Wrong Package :( - 2", player.x, player.y -20);
        }
    }
}


function readyOrNot(){
    if(!withinStation()){
        return;
    }


    for(let i = 0; i < curentOrders.length; i++){
        if(checkOrders(curentOrders[i])){
            fill("green");
            textSize(12);
            textAlign(CENTER);
            text("Ready for Delivery", player.x, player.y);
            return;
        }
    }
    fill("red");
    textSize(12);
    text("Not Ready for Delivery", player.x, player.y);
}


function checkForGameOver(){
    if(timeLeft <= 0){
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
    curentOrders = [makeUrgentOrder(),makeOrder(),makeOrder()];
}


function drawOrders(){
    for(let i = 0; i < curentOrders.length; i++){
        let orderTypes = curentOrders[i];
       
        fill(225, 225, 225,150);
        strokeWeight(3);
        rectMode(CORNER);
        rect(610, 10 + i *85,150,80);
        fill("black");
        textSize(15);
        textAlign(LEFT, BASELINE);
        text("Order: ", 620, 25 + i * 85);


        let items = Object.keys(orderTypes);
       
        if(orderTypes.urgent){
            fill("red")
            text("Urgent!", 700, 15, i * 85)
            fill("black");
        }
        for(let j = 0; j < items.length; j++){
            let item = items[j];
            let amount = orderTypes[item];
            if(item === "urgent")continue;
            if(item === "endTime")continue;
            text(item + " x " + amount, 620, 40 + j * 15 + i * 85);
            text("Time: " + orderTypes.endTime, 620, 85 + i*85);
        }
    }
}


function makeUrgentOrder(){
    return {...random(urgentOrder)};
}

function makeOrder(){
    return {...random(orders)};
}


function beginEvent(){
    if(currentEvent === "none" && eventCountDown <=0){        
        let possibleEvent = ["paintSpill", "yarnTangled", "glitterBoom"];
        currentEvent = random(possibleEvent);
        eventTimer = 10;
        eventCountDown = 15;
    }
   
    if(currentEvent !== "none"){
        fill("yellow");
        textSize(20);
        textAlign(LEFT);
        text("Event: " + currentEvent, 40, 520);
    }
}


function playEvent(){
   
    if (currentEvent === "yarnTangled"){
        reverseControls = true;
    }else if (currentEvent=== "paintSpill"){
        player.speed = 1;
    }else if (currentEvent === "glitterBoom"){
        if(glitterCover === 0){
            glitterCover += 20;
        }
    }
   
    if(eventTimer <= 0 && currentEvent !== "none"){
        currentEvent = "none";
        player.speed = 3;
        reverseControls = false;
    }
}


function drawGlitterFilter(){
    if(glitterCover > 0){
        fill(255, 192, 203, 80);
        circle(random(width), random(height), random(5,15));
        glitterCover--;
    }
}
