var jerryImage = new Image();
jerryImage.src = "images/jerry.jpg";

function Jerry() {
  this.x = canvas1.width / 2;
  this.y = canvas1.height - 100;
  this.width = 25;
  this.height = 25;
  this.name = "Jerry";
  this.speedX = 12;
  this.speedY = 12;
  this.pointCounter = 0;
}

Jerry.prototype.move = function(edit) {
  if (edit === "top") {
    this.y -= this.speedY;
  } else if (edit === "bottom") {
    this.y += this.speedY; //speed Y
  } else if (edit === "left") {
    this.x -= this.speedX;
  } else if (edit === "right") {
    this.x += this.speedX;
  }

  this.x = Math.min(canvas1.width - this.width, Math.max(0, this.x));
  this.y = Math.min(canvas1.height - this.height, Math.max(0, this.y));
};

Jerry.prototype.draw = function() {
  ctx.drawImage(jerryImage, this.x, this.y, this.width, this.height);
};

Jerry.prototype.isStatus = function(array) {
  return (
    this.x < array.x + array.w &&
    this.x + this.width > array.x &&
    this.y < array.y + array.h &&
    this.height + this.y > array.y
  );
};

Jerry.prototype.isDead = function(tom) {
  return tom.some(this.isStatus.bind(this));
};

Jerry.prototype.eatCheese = function(cheese) {
  return cheese.some(this.isStatus.bind(this));
};
