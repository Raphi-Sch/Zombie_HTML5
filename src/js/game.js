const tileSrc = [
  'src/img/floor.gif',
  'src/img/wall.gif',
  'src/img/zombie.gif',
  'src/img/button.gif',
  'src/img/door_close.gif',
  'src/img/flag.gif',
  'src/img/player1.gif',
  'src/img/player2.gif',
  'src/img/door_open.gif',
];

var ctx = null;
var tileArray = new Array();
var tmpInterval;

var currentLevel = null;
var zombies = new Array();
var doors_state   = new Array();
var doorsX  = new Array();
var doorsY  = new Array();
var player1 = null;
var player2 = null;
var playerMovement = 0;

function loadAssets(){
  // Canvas context
  ctx = document.getElementById('game-canvas').getContext('2d');

  // Loading textures
  var i = 0;
  var loaded = 0;
  tileSrc.forEach(function(src){
    var tmp = new Image();
    tmp.src = src;
    tileArray[i] = tmp;
    tmp.onload = function() {loaded++;}
    i++;
  });

  // Waiting for assets
  tmpInterval = setInterval(() => {
    if(loaded == i) main();
  }, 100);
}

function main(){
  clearInterval(tmpInterval);

  currentLevel = level1;

  setupLevel(currentLevel);
  
}

function setupLevel(level){
  // Draw background
  var y = 0, x = 0;
  level.forEach(function(dateRow){
    x = 0;
    dateRow.forEach(function(dataCell){
      switch(dataCell){
        case 2: // Zombie
          ctx.drawImage(tileArray[0], x * 32, y * 32);
          zombies.push(new Zombie(x, y, zombies.length));
          break;

        case 3: // Button
          ctx.drawImage(tileArray[0], x * 32, y * 32);
          break;

        case 4: // Door
          ctx.drawImage(tileArray[0], x * 32, y * 32);
          doors_state.push(0);
          doorsX.push(x);
          doorsY.push(y);
          break;

        case 5: // Flag
          ctx.drawImage(tileArray[0], x * 32, y * 32);
          break;

        default: break;
      }
      ctx.drawImage(tileArray[dataCell], x * 32, y * 32);
      x++;
    });
    y++;
  });

  // Create players
  player1 = new Player(2, 2, 1);
  player2 = new Player(4, 2, 2);

  // Draw players
  ctx.drawImage(tileArray[6], player1.positionX() * 32, player1.positionY() * 32);
  ctx.drawImage(tileArray[7], player2.positionX() * 32, player2.positionY() * 32);

}

function isCollinding(x, y){
  if(currentLevel[y][x] == 1 || currentLevel[y][x] == 4)
    return true;

  if(player1.positionX() == x && player1.positionY() == y)
    return true;

  if(player2.positionX() == x && player2.positionY() == y)
    return true;

  zombies.forEach(function(zombie) {
    if(zombie.positionX() == x && zombie.positionY() == y)
      return true;
  });

  return false;
}

function moveTile(tileId, currentX, currentY, nextX, nextY){
  ctx.drawImage(tileArray[0], currentX * 32, currentY * 32);

  upperTile = currentLevel[currentY][currentX];
  if(upperTile != 2)
    ctx.drawImage(tileArray[upperTile], currentX * 32, currentY * 32);

  ctx.drawImage(tileArray[tileId], nextX * 32, nextY * 32);
}

// Keyboard handler
/*
Z: 122,
S: 115,
Q: 113,
D: 100,

numpad4 : 52
numpad5 : 53
numpad6 : 54
numpad8 : 56

*/
function keyPressed(event){
    var key = event.which || event.keyCode;

    // Player 1
    if(key == 122){
      // UP
      player1.move(this, 0, -1);
      playerMovement++;
    }

    if(key == 115){
      // DOWN
      player1.move(this, 0, 1);
      playerMovement++;
    }

    if(key == 113){
      // LEFT
      player1.move(this, -1, 0);
      playerMovement++;
    }

    if(key == 100){
      // RIGHT
      player1.move(this, 1, 0);
      playerMovement++;
    }


    // Player 2
    if(key == 56){
      // UP
      player2.move(this, 0, -1);
      playerMovement++;
    }

    if(key == 53){
      // DOWN
      player2.move(this, 0, 1);
      playerMovement++;
    }

    if(key == 52){
      // LEFT
      player2.move(this, -1, 0);
      playerMovement++;
    }

    if(key == 54){
      // RIGHT
      player2.move(this, 1, 0);
      playerMovement++;
    }

    if(playerMovement >= 2){
      playerMovement = 0;
      zombies.forEach(function(zombie){
        zombie.move(this, player1.positionX(), player1.positionY(), player2.positionX(), player2.positionY());
      });
    }

}

window.onload = loadAssets;