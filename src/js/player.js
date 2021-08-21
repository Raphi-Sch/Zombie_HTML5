class Player {
    constructor(x, y, id){
        this.x = x;
        this.y = y;
        this.id = id;
    }

    move(game, x, y){
        var moved = false;
        var previousX = this.x;
        var previousY = this.y;

        if(x == 1 && !game.isCollinding(this.x + 1, this.y)){
            this.x++;
            moved = true;
        }

        if(x == -1 && !game.isCollinding(this.x - 1, this.y)){
            this.x--;
            moved = true;
        }

        if(y == 1 && !game.isCollinding(this.x, this.y + 1)){
            this.y++;
            moved = true;
        }

        if(y == -1 && !game.isCollinding(this.x, this.y - 1)){
            this.y--;
            moved = true;
        }

        if(moved){
            if(this.id == 1)
                game.update(6, previousX, previousY, this.x, this.y);
            
            if(this.id == 2)
                game.update(7, previousX, previousY, this.x, this.y); 
        }
    }

    positionX(){ return this.x };
    positionY(){ return this.y };
}