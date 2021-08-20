const textureSrc = [
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
var textureArray = new Array();
var tmpInterval;

function loadAssets(){
  // Canvas context
  ctx = document.getElementById('game-canvas').getContext('2d');

  // Loading textures
  var i = 0;
  var loaded = 0;
  textureSrc.forEach(function(src){
    var tmp = new Image();
    tmp.src = src;
    textureArray[i] = tmp;
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

  var currentLevel = level2;

  setupLevel(currentLevel);
  
}

function setupLevel(currentLevel){
  var zombies = new Array();
  var doors_state   = new Array();
  var doorsX  = new Array();
  var doorsY  = new Array();

  // Draw background
  var y = 0, x = 0;
  currentLevel.forEach(function(dateRow){
    x = 0;
    dateRow.forEach(function(dataCell){
      switch(dataCell){
        case 2: // Zombie
          ctx.drawImage(textureArray[0], x * 32, y * 32);
          zombies.push(new Zombie(x, y, zombies.length));
          break;

        case 3: // Button
          ctx.drawImage(textureArray[0], x * 32, y * 32);
          break;

        case 4: // Door
          ctx.drawImage(textureArray[0], x * 32, y * 32);
          doors_state.push(0);
          doorsX.push(x);
          doorsY.push(y);
          break;

        case 5: // Flag
          ctx.drawImage(textureArray[0], x * 32, y * 32);
          break;

        default: break;
      }
      ctx.drawImage(textureArray[dataCell], x * 32, y * 32);
      x++;
    });
    y++;
  });

  // Create players
  var player1 = new Player(2, 2, 1);
  var player2 = new Player(4, 2, 2);

  // Draw players
  ctx.drawImage(textureArray[6], player1.positionX() * 32, player1.positionY() * 32);
  ctx.drawImage(textureArray[7], player2.positionX() * 32, player2.positionY() * 32);

}

window.onload = loadAssets;