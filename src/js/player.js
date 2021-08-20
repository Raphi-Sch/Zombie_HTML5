class Player {
    constructor(x, y, id){
        this.x = x;
        this.y = y;
        this.id = id;
    }

    move(game, x, y){
        var moved = false;

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

        if(moved)
            game.showPlayerMovement(this.id, x, y);
    }

    positionX(){ return this.x };
    positionY(){ return this.y };
}