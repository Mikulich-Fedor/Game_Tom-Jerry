var tomImage = new Image();
tomImage.src = "images/tomas.jpg";

function Tom() {
  this.x = 100;
  this.y = 500;
  this.width = 50;
  this.height = 50;
  this.name = "Tom";
  this.vx = 5;
  this.vy = 5;
  this.tomCounter = 0;
  this.tomArray = [];

  this.tomRandomArray = [
    [Math.floor(Math.random() * canvas1.width), 0],
    [Math.floor(Math.random() * canvas1.width), canvas1.height],
    [0, Math.floor(Math.random() * canvas1.width)],
    [canvas1.height, Math.floor(Math.random() * canvas1.width)]
  ];
}

Tom.prototype.displayRandomTom = function() {
  var index = Math.floor(Math.random() * this.tomRandomArray.length);
  return this.tomRandomArray[index];
};

Tom.prototype.createTom = function(valX, valY) {
  this.tomArray.push({
    x: valX,
    y: valY,
    w: 50,
    h: 50,
    vx: this.vx,
    vy: this.vy
  });
  this.tomCounter += 1;
};

Tom.prototype.drawImage = function(cheese) {
  ctx.drawImage(tomImage, cheese.x, cheese.y, 50, 50); // исправле ния
};

Tom.prototype.draw = function() {
  this.tomArray.forEach(this.drawImage.bind(this));
};

Tom.prototype.move = function() {
  this.tomArray.forEach(function(tomTab) {
    tomTab.x += tomTab.vx;
    tomTab.y += tomTab.vy;

    if (tomTab.y + tomTab.vy > canvas1.height || tomTab.y + tomTab.vy < 0) {
      // ищменения canvas1.height
      tomTab.vy *= -1;
    }
    if (tomTab.x + tomTab.vx > canvas1.width || tomTab.x + tomTab.vx < 0) {
      tomTab.vx *= -1;
    }
  });
};
