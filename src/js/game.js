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
var levelNumber = null;
var zombies = new Array();
var doors  = new Array();
var player1 = null;
var player2 = null;
var playerMovement = 0;

function loadAssets(level){
  // Canvas context
  ctx = document.getElementById('game-canvas').getContext('2d');

  // Loading bar
  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.strokeStyle = "black";
  ctx.rect(35, 326, 602, 20);
  ctx.stroke();
  ctx.font = "30px Arial";
  ctx.fillText("Loading ...", 280, 300); 

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
    // Progress bar
    ctx.beginPath();
    ctx.fillStyle = "#95a5a6";
    ctx.fillRect(36, 327, 600 * (loaded / tileSrc.length), 18);
    ctx.stroke();

    if(loaded == i){
      clearInterval(tmpInterval);
      levelNumber = parseInt(level);
      setupLevel(levelNumber);
    }
  }, 100);
}

function setupLevel(levelNumber){
  switch(levelNumber){
    default:
    case 1:
      currentLevel = level1;
      break;

    case 2:
      currentLevel = level2;
      break;

    case 3:
      currentLevel = level3;
      break;

    case 4:
      currentLevel = level4;
      break;

    case 5:
      currentLevel = level5;
      break;
  }

  // Draw background
  var y = 0, x = 0;
  currentLevel.forEach(function(dateRow){
    x = 0;
    dateRow.forEach(function(dataCell){
      switch(dataCell){
        case 2: // Zombie
          ctx.drawImage(tileArray[0], x * 32, y * 32);
          zombies.push(new Zombie(x, y, zombies.length));
          currentLevel[y][x] = 0;
          break;

        case 3: // Button
          ctx.drawImage(tileArray[0], x * 32, y * 32);
          break;

        case 4: // Door
          ctx.drawImage(tileArray[0], x * 32, y * 32);
          doors.push([x, y]);
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

  var zombie = null;
  for(var i = 0; i < zombies.length; i++){
    zombie = zombies[i];
    if(zombie.positionX() == x && zombie.positionY() == y)
      return true;
  }

  return false;
}

function buttonPressed(){
  return new Promise((resolve, reject) => {
    var active = false;

    if(currentLevel[player1.positionY()][player1.positionX()] == 3)
      active = true;
  
    if(currentLevel[player2.positionY()][player2.positionX()] == 3)
      active = true;
  
    zombies.forEach(function(zombie) {
      if(currentLevel[zombie.positionY()][zombie.positionX()] == 3)
        active = true;
    });
  
    if(active){
      doors.forEach(function(door){
        ctx.drawImage(tileArray[8], door[0] * 32, door[1] * 32);
        currentLevel[door[1]][door[0]] = 8;
      });
    }
    else{
      doors.forEach(function(door){
        ctx.drawImage(tileArray[4], door[0] * 32, door[1] * 32);
        currentLevel[door[1]][door[0]] = 4;
      });
    }

    resolve(true);
  })
}

function flagCatched(){
  if(currentLevel[player1.positionY()][player1.positionX()] == 5)
    victory(1)

  if(currentLevel[player2.positionY()][player2.positionX()] == 5)
    victory(2)
}

function clear(){
  return new Promise((resolve, reject) => {
    ctx.clearRect(0, 0, 672, 672);
    player1 = null;
    player2 = null;
    zombies = new Array();
    doors   = new Array();
    resolve(true);
  })
}

async function victory(playerId){
  alert("Victory !\nPlayer " + playerId + " has catched the flag.\nClick OK for the next level.");
  await clear();
  setupLevel(++levelNumber);
}

async function gameOver(playerId){
  alert("GAME OVER !\nPlayer " + playerId + " has been bitten by a zombie.\nClick OK to restart the level.");
  await clear();
  setupLevel(levelNumber);
}

async function update(tileId, currentX, currentY, nextX, nextY){
  // Restoring old tile
  ctx.drawImage(tileArray[0], currentX * 32, currentY * 32);
  ctx.drawImage(tileArray[currentLevel[currentY][currentX]], currentX * 32, currentY * 32);

  await buttonPressed();

  // Character
  ctx.drawImage(tileArray[tileId], nextX * 32, nextY * 32);

  flagCatched();
}

/* Keyboard handler
      | Player 1 | Player 2
UP    | Z: 122,  | numpad4 : 52
DOWN  | S: 115,  | numpad5 : 53
LEFT  | Q: 113,  | numpad6 : 54
RIGHT | D: 100,  | numpad8 : 56
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

    // Check if bitten
    zombies.forEach(function(zombie){
      if(zombie.positionX() == player1.positionX() && zombie.positionY() == player1.positionY())
        gameOver(1);

      if(zombie.positionX() == player2.positionX() && zombie.positionY() == player2.positionY())
        gameOver(2);
    });
}