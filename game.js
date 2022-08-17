class Game{
    constructor(){
        
    }
    getGameState(){
        var gameStateRef  = database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState = data.val();
        })
    }
    updateGameState(state){
        database.ref('/').update({
            gameState: state
        });
    }
    async start(){
        player = new Player();

        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            playerCount = player.getPlayerCount();
        }

        form = new Form()
        form.display();

        ball = createSprite(1000,500);
        ball.addImage(ballImg);
        ball.scale = 0.05;
        
        goalkeeper = createSprite(1800,500);
        goalkeeper.addImage(playerImg);
        goalkeeper.scale = 0.125;

        defender1 = createSprite(1500,250);
        defender1.addImage(playerImg);
        defender1.scale = 0.125;

        defender2 = createSprite(1500,750);
        defender2.addImage(playerImg);
        defender2.scale = 0.125;

        midfielder1 = createSprite(1100,225);
        midfielder1.addImage(playerImg);
        midfielder1.scale = 0.125;

        midfielder2 = createSprite(1100,725);
        midfielder2.addImage(playerImg);
        midfielder2.scale = 0.125;

        striker1 = createSprite(300,200);
        striker1.addImage(playerImg);
        striker1.scale = 0.125;

        striker2 = createSprite(300,700);
        striker2.addImage(playerImg);
        striker2.scale = 0.125;

        players = [goalkeeper,defender1,defender2,midfielder1,midfielder2,striker1,striker2];

        cgoalkeeper = createSprite(200,500);
        cgoalkeeper.addImage(computerImg);
        cgoalkeeper.scale = 0.125;

        cdefender1 = createSprite(500,250);
        cdefender1.addImage(computerImg);
        cdefender1.scale = 0.125;
        cdefender1.velocityX = 0;
        cdefender1.velocityY = 0;

        cdefender2 = createSprite(500,750);
        cdefender2.addImage(computerImg);
        cdefender2.scale = 0.125;
        cdefender2.velocityX = 0;
        cdefender2.velocityY = 0;

        cmidfielder1 = createSprite(900,225);
        cmidfielder1.addImage(computerImg);
        cmidfielder1.scale = 0.125;

        cmidfielder2 = createSprite(900,725);
        cmidfielder2.addImage(computerImg);
        cmidfielder2.scale = 0.125;

        cstriker1 = createSprite(1700,200);
        cstriker1.addImage(computerImg);
        cstriker1.scale = 0.125;

        cstriker2 = createSprite(1700,700);
        cstriker2.addImage(computerImg);
        cstriker2.scale = 0.125;

        cplayers = [cgoalkeeper,cdefender1,cdefender2,cmidfielder1,cmidfielder2,cstriker1,cstriker2];

        InvisibleLeft = createSprite(0,500,5,1000);
        InvisibleLeft.visible = true;

        InvisibleRight = createSprite(2000,500,5,1000);
        InvisibleRight.visible = true;

        InvisibleTop = createSprite(1000,0,1000,5);
        InvisibleTop.visible = true;

        InvisibleBottom = createSprite(1000,1000,1000,5);
        InvisibleBottom.visible = true;
    }
    play(){
        form.hide();
        form.resetButtonPosition();
        form.bgHide();

        Player.getPlayerInfo();
        player.getRankInfo();

        console.log("Hello world!");

        if(allPlayers !== undefined){
            background(courtImg);

            setInterval(this.startGame,3000);

            for(var plr in allPlayers){

                index = index + 1 ;

                players[index-1].x = x;
                players[index-1].y = y;

                if (index === player.index){
                    players[index - 1].shapeColor = "black";
                    camera.position.x = displayWidth/2;
                    camera.position.y = players[index-1].y
                    ellipse(x,y,70);
                }

                /*const p1 = Object.assign(user1,goalkeeper);
                const p2 = Object.assign(user2,defender1);
                const p3 = Object.assign(user3,defender2);
                const p4 = Object.assign(user4,midfielder1);
                const p5 = Object.assign(user5,midfielder2);
                const p6 = Object.assign(user6,striker1);
                const p7 = Object.assign(user7,striker2);*/

                createEdgeSprites();

                ball.bounceOff(InvisibleTop);
                ball.bounceOff(InvisibleBottom);

                ball.bounceOff(goalkeeper);
                ball.bounceOff(defender1);
                ball.bounceOff(defender2);
                ball.bounceOff(midfielder1);
                ball.bounceOff(midfielder2);
                ball.bounceOff(striker1);
                ball.bounceOff(striker2);

                ball.bounceOff(cgoalkeeper);
                ball.bounceOff(cdefender1);
                ball.bounceOff(cdefender2);
                ball.bounceOff(cmidfielder1);
                ball.bounceOff(cmidfielder2);
                ball.bounceOff(cstriker1);
                ball.bounceOff(cstriker2);

                goalkeeper.bounceOff(InvisibleLeft);
                defender1.bounceOff(InvisibleLeft);
                defender2.bounceOff(InvisibleLeft);
                midfielder1.bounceOff(InvisibleLeft);
                midfielder2.bounceOff(InvisibleLeft);
                striker1.bounceOff(InvisibleLeft);
                striker2.bounceOff(InvisibleLeft);

                goalkeeper.bounceOff(InvisibleRight);
                defender1.bounceOff(InvisibleRight);
                defender2.bounceOff(InvisibleRight);
                midfielder1.bounceOff(InvisibleRight);
                midfielder2.bounceOff(InvisibleRight);
                striker1.bounceOff(InvisibleRight);
                striker2.bounceOff(InvisibleRight);

                goalkeeper.bounceOff(InvisibleTop);
                defender1.bounceOff(InvisibleTop);
                defender2.bounceOff(InvisibleTop);
                midfielder1.bounceOff(InvisibleTop);
                midfielder2.bounceOff(InvisibleTop);
                striker1.bounceOff(InvisibleTop);
                striker2.bounceOff(InvisibleTop);

                goalkeeper.bounceOff(InvisibleBottom);
                defender1.bounceOff(InvisibleBottom);
                defender2.bounceOff(InvisibleBottom);
                midfielder1.bounceOff(InvisibleBottom);
                midfielder2.bounceOff(InvisibleBottom);
                striker1.bounceOff(InvisibleBottom);
                striker2.bounceOff(InvisibleBottom);

                cgoalkeeper.bounceOff(InvisibleLeft);
                cdefender1.bounceOff(InvisibleLeft);
                cdefender2.bounceOff(InvisibleLeft);
                cmidfielder1.bounceOff(InvisibleLeft);
                cmidfielder2.bounceOff(InvisibleLeft);
                cstriker1.bounceOff(InvisibleLeft);
                cstriker2.bounceOff(InvisibleLeft);

                cgoalkeeper.bounceOff(InvisibleRight);
                cdefender1.bounceOff(InvisibleRight);
                cdefender2.bounceOff(InvisibleRight);
                cmidfielder1.bounceOff(InvisibleRight);
                cmidfielder2.bounceOff(InvisibleRight);
                cstriker1.bounceOff(InvisibleRight);
                cstriker2.bounceOff(InvisibleRight);

                cgoalkeeper.bounceOff(InvisibleTop);
                cdefender1.bounceOff(InvisibleTop);
                cdefender2.bounceOff(InvisibleTop);
                cmidfielder1.bounceOff(InvisibleTop);
                cmidfielder2.bounceOff(InvisibleTop);
                cstriker1.bounceOff(InvisibleTop);
                cstriker2.bounceOff(InvisibleTop);

                cgoalkeeper.bounceOff(InvisibleBottom);
                cdefender1.bounceOff(InvisibleBottom);
                cdefender2.bounceOff(InvisibleBottom);
                cmidfielder1.bounceOff(InvisibleBottom);
                cmidfielder2.bounceOff(InvisibleBottom);
                cstriker1.bounceOff(InvisibleBottom);
                cstriker2.bounceOff(InvisibleBottom);

                if(ball.x>1850){
                    players.score = players.score + 1;
                    players.score = players.getScore();
                    players.rank = players.getRankInfo();
                }
                if(ball.x<150){
                    cplayers.score = cplayers.score + 1;
                    cplayers.score = cplayers.CgetScore();
                    cplayers.rank = cplayers.CgetRankInfo();
                }
        
                if(players.score === 5 || cplayers.score === 5){
                    game.updateGameState(2);
                    
                    if(players.score === 5){
                        players.updateRank(1);
                        cplayers.CupdateRank(2);
                    }
                    if(cplayers.score === 5){
                        cplayers.CupdateRank(1);
                        players.updateRank(2);
                    }
                }

                console.log(players.score);
            }
            
        }

        drawSprites();
    }
    end(){
        var scorePC = players.getScore();
        var scoreNPC = cplayers.CgetScore();

        if(scorePC > scoreNPC){
            textSize(60);
            text("You win!!! Yayy!",850,600);
            text("Please click on reset to play again or to exit screen",750,800);
        } else{
            textSize(60);
            text("You lose! Better luck next time!",850,600);
            text("Please click on reset to play again or to exit screen",750,800);
        }
    }
    startGame(){
        ball.velocityY = 10;
        ball.velocityX = 10;

        //return; 

        cdefender1.velocityY = 6;
        cdefender2.velocityY = 6;
        cmidfielder1.velocityY = 6;
        cmidfielder2.velocityY = 6;
        cstriker1.velocityY = 6;
        cstriker2.velocityY = 6;

        cdefender1.velocityX = 6;
        cdefender2.velocityX = 6;
        cmidfielder1.velocityX = 6;
        cmidfielder2.velocityX = 6;
        cstriker1.velocityX = 6;
        cstriker2.velocityX = 6;
    }
}