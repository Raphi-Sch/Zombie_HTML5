class Zombie {
    constructor(x, y, id){
        this.x = x;
        this.y = y;
        this.id = id;
    }
    positionX(){ return this.x };
    positionY(){ return this.y };

    closestPlayer(player1X, player1Y, player2X, player2Y){
        var dPlayer1 = Math.sqrt(Math.pow(player1X - this.x, 2) + Math.pow(player1Y - this.y, 2));
        var dPlayer2 = Math.sqrt(Math.pow(player2X - this.x, 2) + Math.pow(player2Y - this.y, 2));

        if(dPlayer1 < dPlayer2)
            return [player1X - this.x, player1Y - this.y];
        else
            return [player2X - this.x, player2Y - this.y];
    }

    followPlayer(dx, dy){
        if(Math.abs(dx) > Math.abs(dy)){
            if(dx < 0)
                return "L";
            if(dx > 0)
                return "R";
        }
        else{
            if(dy < 0)
                return "U";
            if(dy > 0)
                return "D";
        }
    }

    firstPossiblePath(game, dx, dy){
        // All Path blocked (in order : UP, DOWN, LEFT, RIGHT)
        if(game.isCollinding(this.x, this.y - 1) && game.isCollinding(this.x, this.y + 1) && game.isCollinding(this.x - 1, this.y) && game.isCollinding(this.x + 1, this.y))
            return "";

        // 3 Path blocked ---------------------
        // UP, DOWN, RIGHT
        if(game.isCollinding(this.x, this.y - 1) && game.isCollinding(this.x, this.y + 1) && game.isCollinding(this.x + 1, this.y))
            return "L";

        // UP, DOWN, LEFT
        if(game.isCollinding(this.x, this.y - 1) && game.isCollinding(this.x, this.y + 1) && game.isCollinding(this.x - 1, this.y))
            return "R";

        // UP, LEFT, RIGHT
        if(game.isCollinding(this.x, this.y - 1) && game.isCollinding(this.x - 1, this.y) && game.isCollinding(this.x + 1, this.y))
            return "D";

        // DOWN, LEFT, RIGHT
        if(game.isCollinding(this.x, this.y + 1) && game.isCollinding(this.x - 1, this.y) && game.isCollinding(this.x + 1, this.y))
            return "U";

        // 2 Path blocked --------------------
        // UP, LEFT
        if(game.isCollinding(this.x, this.y - 1) && game.isCollinding(this.x - 1, this.y))
            return "R";
        
        // UP, RIGHT
        if(game.isCollinding(this.x, this.y - 1) && game.isCollinding(this.x + 1, this.y))
            return "L";
        
        // DOWN, LEFT
        if(game.isCollinding(this.x, this.y + 1) && game.isCollinding(this.x - 1, this.y))
            return "R";

        // UP, RIGHT
        if(game.isCollinding(this.x, this.y + 1) && game.isCollinding(this.x + 1, this.y))
            return "L";

        // 1 Path blocked --------------------
        if(game.isCollinding(this.x, this.y + 1) || game.isCollinding(this.x, this.y - 1)){
            if(dx < 0)
                return "L";
            else
                return "R";
        }

        if(game.isCollinding(this.x + 1, this.y) || game.isCollinding(this.x - 1, this.y)){
            if(dy < 0)
                return "U";
            else
                return "D";
        }
    }

    move(game, player1X, player1Y, player2X, player2Y){
        var moved = false;
        var previousX = this.x;
        var previousY = this.y;

        // Distance
        var res = this.closestPlayer(player1X, player1Y, player2X, player2Y);
        var dx = res[0];
        var dy = res[1];

        var direction = this.followPlayer(dx, dy);

        // Primary movement
        if(direction == "U" && !game.isCollinding(this.x, this.y - 1)){
            this.y--;
            moved = true;
        }

        if(direction == "D" && !game.isCollinding(this.x, this.y + 1)){
            this.y++;
            moved = true;
        }

        if(direction == "L" && !game.isCollinding(this.x - 1, this.y)){
            this.x--;
            moved = true;
        }

        if(direction == "R" && !game.isCollinding(this.x + 1, this.y)){
            this.x++;
            moved = true;
        }

        // Secondary movement (didn't moved before)
        if(!moved){
            direction = this.firstPossiblePath(game, dx, dy);
            switch(direction){
                case "U":
                    this.y--;
                    moved = true;
                    break;
                
                case "D":
                    this.y++;
                    moved = true;
                    break;
                
                case "L":
                    this.x--;
                    moved = true;
                    break;
            
                case "R":
                    this.x++;
                    moved = true;
                    break;

                default: break;
            }
        }

        // Updating tile if it moved
        if(moved)
            game.moveTile(2, previousX, previousY, this.x, this.y);
    }
}