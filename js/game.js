class Game
{
    constructor()
    {
        this.resetTitle = createElement("h2");
        this.resetBtn = createButton("");
        this.leaderboardTitle = createElement("h2");
        this.leader1 = createElement("h2");
        this.leader2 = createElement("h2");
        
    }

    getState()
    {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value",(data)=>{
        gameState=data.val()
        })
    }

    update(state)
    {
        database.ref("/").update({
            gameState:state,
        });
    }
    start()
    {
        form = new Form()
        form.display();

        player = new Player()
        playerCount=player.getCount()
        
        c1 = createSprite(width/2-50,height-100);
        c1.addImage(cImg1);
        c1.scale=0.07;

        c2 = createSprite(width/2+100,height-100);
        c2.addImage(cImg2);
        c2.scale=0.07;

        cars=[c1,c2];

        fuels = new Group();
        powerCoins = new Group();
        obstacles = new Group();

        var obstaclesPosition = [
            {x:width/2+250,y:height-800,image:obstacles2Img},
            {x:width/2-150,y:height-1300,image:obstacles1Img},
            {x:width/2+250,y:height-1800,image:obstacles1Img},
            {x:width/2-100,y:height-2300,image:obstacles2Img},
            {x:width/2,y:height-2800,image:obstacles2Img},
            {x:width/2-180,y:height-3300,image:obstacles1Img},
            {x:width/2+180,y:height-3300,image:obstacles2Img},
            {x:width/2+250,y:height-3800,image:obstacles2Img},
            {x:width/2-150,y:height-4300,image:obstacles1Img},
            {x:width/2+250,y:height-4800,image:obstacles2Img},
            {x:width/2,y:height-5300,image:obstacles1Img},
            {x:width/2-180,y:height-5800,image:obstacles2Img},

        ]
        this.addSprites(fuels,4,fuelImg,0.2)
        this.addSprites(powerCoins,18,coinImg,0.09)
        this.addSprites(obstacles,obstaclesPosition.length,obstacle1Img,0.04,obstaclesPosition)
        
    }
    handleElements()
    {
        form.hide();
        form.titleImg.position(40,50);
        form.titleImg.class("gameTitleAfterEffect");

        this.resetTitle.html("RESET GAME");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width/2+200,40);

        this.resetBtn.class("resetBtn");
        this.resetBtn.position(width/2+230,100);

        this.leaderboardTitle.html("LEADERBOARD");
        this.leaderboardTitle.class("resetText");
        this.leaderboardTitle.position(width/3-50,130);

    }
    play()
    {
       this.handleElements();
       this.handleResetButton();
       Player.getPlayersInfo();

       if(allPlayer !==undefined)
       {
           image(track,0,-height*5,width,height*6);
           var index=0;
           //for(var i=0;i<2;i++)
           for(var p in allPlayer)
           {
               index=index+1;
               var x=allPlayer[p].positionX;
               var y=height-allPlayer[p].positionY;
               cars[index-1].position.x=x;
               cars[index-1].position.y=y;
               if(index===player.index)
               {
                   stroke(10);
                   fill("red");
                   ellipse(x,y,60,60);
                   camera.position.x=cars[index-1].position.x;
                   camera.position.y=cars[index-1].position.y;
               }
           }
           this.handlePlayerControls();
           this.showLeaderboard();
           drawSprites();
       }
    }
    handlePlayerControls()
    {
        if(keyDown(UP_ARROW))
        {
            player.positionY+=10;
            player.update();
        }
        if(keyDown(LEFT_ARROW)&&player.positionX>width/3-50)
        {
            player.positionX-=5;
            player.update();
        }
        if(keyDown(RIGHT_ARROW)&&player.positionX>width/2+300)
        {
            player.positionX+=5;
            player.update();
        }
        
    }
    showLeaderboard()
    {
        var leader1 ;
        var leader2;
        var players = Object.values(allPlayer);
        
        if((players[0].rank===0&&players[1].rank===0)|| players[0].rank===1 )
        {
            leader1 = player[0].rank+"&emsp;"+player[0].name+"&emsp;"+player[0].score
            leader2 = player[1].rank+"&emsp;"+player[1].name+"&emsp;"+player[1].score
        }
        if(players[1].rank===1)
        {
            leader1 = player[1].rank+"&emsp;"+player[1].name+"&emsp;"+player[1].score
            leader2 = player[0].rank+"&emsp;"+player[0].name+"&emsp;"+player[0].score
        }
        this.leader1.html(leader1);
        this.leader2.html(leader2);
    }
    handleResetButton()
    {
        this.resetBtn.mousePressed(()=>{
            database.ref("/").set({
                carsAtEnd:0,
                playerCount:0,
                gameState:0,
                players:{}
            })
            window.location.reload();
        })
    }

}