class Zombie {
    constructor(x, y, id){
        this.x = x;
        this.y = y;
        this.id = id;
    }
    positionX(){ return this.x };
    positionY(){ return this.y };

    closestPlayer(player1X, player1Y, player2X, player2Y){
        dPlayer1 = Math.sqrt(Math.pow(player1X - this.x, 2) + Math.pow(player1Y - this.y, 2));
        dPlayer2 = Math.sqrt(Math.pow(player2X - this.x, 2) + Math.pow(player2Y - this.y, 2));

        if(dPlayer1 < dPlayer2)
            return [player1X - this.x, player1Y - this.y];
        else
            return [player2X - this.x, player2Y - this.y];
    }

    followPlayer(dx, dy){
        if(Math.abs(dx) < Math.abs(dy)){
            if(dx > 0)
                return "L";
            else
                return "R";
        }
        else{
            if(dy > 0)
                return "U";
            else
                return "D";
        }
    }

    possiblePath(game){
        // All Path blocked (in order : UP, DOWN, LEFT, RIGHT)
        if(game.isCollinding(this.x, this.y - 1) && game.isCollinding(this.x, this.y + 1) &&  game.isCollinding(this.x - 1, this.y && game.isCollinding(this.x + 1, this.y)))
            return "";

        // 3 Path blocked
        // UP, DOWN, RIGHT
        if(game.isCollinding(this.x, this.y - 1) && game.isCollinding(this.x, this.y + 1) && game.isCollinding(this.x + 1, this.y))
            return "L";

        // UP, LEFT, RIGHT
        if(game.isCollinding(this.x, this.y - 1) && game.isCollinding(this.x - 1, this.y) && game.isCollinding(this.x + 1, this.y))
            return "D";
    }

    move(game, player1X, player1Y, player2X, player2Y){
        var previousX = this.x;
        var previousY = this.y;

        /*
        if(Math.random() > 0.5)
            this.x++;
        else
            this.x--;

        if(Math.random() > 0.5)
            this.y++;
        else
            this.y--;

        if(this.x <= 0) this.x = 0;
        if(this.x >= 20) this.x = 20;

        if(this.y <= 0) this.y = 0;
        if(this.y >= 20) this.y = 20;
        */

        

        game.moveTile(2, previousX, previousY, this.x, this.y)
    }
}