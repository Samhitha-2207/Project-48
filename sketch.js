var courtImg;
var database;
var gameState, playerCount;
var form, player, game;
var players, cplayers;
var allPlayers;
var ball;
var goalkeeper,defender1,defender2,midfielder1,midfielder2,striker1,striker2;
var cgoalkeeper,cdefender1,cdefender2,cmidfielder1,cmidfielder2,cstriker1,cstriker2;
var InvisibleLeft,InvisibleRight,InvisibleTop,InvisibleBottom;

function preload(){
    courtImg = loadImage("images/football_field.jpeg");
    computerImg = loadImage("images/computer_paddles.webp");
    playerImg = loadImage("images/player_paddle.webp");
    ballImg = loadImage("images/football.png");
}

function setup(){
    createCanvas(2000,1000);
    database = firebase.database();

    game = new Game();
    game.getGameState();
    game.start();

     /*cdefender1.velocityY = 0;
    cdefender2.velocityY = 0;
    cmidfielder1.velocityY = 0;
        cmidfielder2.velocityY = 0;
        cstriker1.velocityY = 0;
        cstriker2.velocityY = 0;

        cdefender1.velocityX = 0;
        cdefender2.velocityX = 0;
        cmidfielder1.velocityX = 0;
        cmidfielder2.velocityX = 0;
        cstriker1.velocityX = 0;
        cstriker2.velocityX = 0;*/
}

function draw(){
    if(playerCount === 2){
        game.updateGameState(1);
    }
    if(gameState === 1){
        clear();
        game.play();
    }
    if(gameState === 2){
        game.end();
    }
}