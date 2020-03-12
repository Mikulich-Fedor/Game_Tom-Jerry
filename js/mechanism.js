var canvas1 = document.getElementById("canvas1");
var ctx = canvas1.getContext("2d");
var gamePlace = document.getElementById("game-place");

var backgroundImg = new Image();
backgroundImg.src = "images/background.jpg";

document.addEventListener("keydown", function(event) {
  if (event.code == "Escape") {
    window.location.reload();
  }
});

window.onload = function() {
  document.getElementById("play-game").onclick = function() {
    level();
    playAudio();
  };

  function playAudio() {
    var a = document.getElementById("audio");
    a.play();
  }

  function level() {
    var wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    var easy = document.createElement("span");
    easy.classList.add("easy");
    var norm = document.createElement("span");
    norm.classList.add("norm");
    var hard = document.createElement("span");
    hard.classList.add("hard");
    easy.innerHTML = "Легко";
    norm.innerHTML = "Средне";
    hard.innerHTML = "Тяжело";
    wrapper.appendChild(easy);
    wrapper.appendChild(norm);
    wrapper.appendChild(hard);
    gamePlace.appendChild(wrapper);

    easy.onclick = function() {
      tom.vx = 1;
      tom.vy = 1;
      wrapper.style.display = "none";
      playGame();
    };
    norm.onclick = function() {
      wrapper.style.display = "none";
      playGame();
    };
    hard.onclick = function() {
      wrapper.style.display = "none";
      tom.vx = 10;
      tom.vy = 10;
      playGame();
    };
  }

  function playGame() {
    updateCanvas1();

    setInterval(
      // Таймер который работает циклически за указанный промежуток времени
      function() {
        cheese.newProduct();
        cheese.createCheese();
      },
      2500
    );

    setInterval(function() {
      var random = tom.displayRandomTom();
      tom.createTom(random[0], random[1]);
    }, 6000);
  }
};

var keysPressed = {
  top: false,
  bottom: false,
  right: false,
  left: false //left
};

var TOP_KEY = 38;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var BOTTOM_KEY = 40;

document.onkeydown = function(event) {
  event.preventDefault();
  switch (event.keyCode) {
    case TOP_KEY:
      keysPressed.top = true;
      break;
    case BOTTOM_KEY:
      keysPressed.bottom = true;
      break;
    case RIGHT_KEY:
      keysPressed.right = true;
      break;
    case LEFT_KEY:
      keysPressed.left = true;
      break;
  }
};

document.onkeyup = function(event) {
  switch (event.keyCode) {
    case TOP_KEY:
      keysPressed.top = false;
      break;
    case BOTTOM_KEY:
      keysPressed.bottom = false; //Поменять забыл при копировании свойства
      break;
    case RIGHT_KEY:
      keysPressed.right = false;
      break;
    case LEFT_KEY:
      keysPressed.left = false;
      break;
  }
};

function updateCanvas1() {
  Object.keys(keysPressed).forEach(function(edit) {
    if (keysPressed[edit]) {
      jerry.move(edit);
    }
  });

  ctx.drawImage(backgroundImg, 0, 0);

  ctx.fillText("Текущие баллы : " + jerry.pointCounter + "очков", 700, 20);

  jerry.draw();
  tom.draw();
  tom.move(tom.tomArray);

  cheese.draw();

  if (jerry.isDead(tom.tomArray)) {
    gameOver();
  }

  for (var i = 0; i < cheese.cheeseArr.length; i++) {
    if (cheese.cheeseArr.length !== 0) {
      if (jerry.eatCheese(cheese.cheeseArr) === true) {
        if (cheese.cheeseArr[i].name === "normal") {
          //Тут тоже неправильно было написано cheese и Arr
          jerry.pointCounter += 50;
        } else if (cheese.cheeseArr[i].name === "bad") {
          //Тут тоже неправильно было написано cheese
          jerry.pointCounter += 100;
          jerry.speedX = 5;
          jerry.speedY = 5;
          setTimeout(function() {
            jerry.speedX = 15; //jerry был неправильно написан
            jerry.speedY = 15;
          }, 2500);
        }
        cheese.cheeseArr.splice(
          cheese.cheeseArr.indexOf(cheese.cheeseArr[i]),
          1 //Тут тоже неправильно было написано cheese
        );
      }
    }
  }

  requestAnimationFrame(updateCanvas1);
}

// Создание экзмепляров класса
var cheese = new ProductCheese();
var jerry = new Jerry();
var tom = new Tom();

function gameOver() {
  cancelAnimationFrame(cheese);
  cancelAnimationFrame(jerry);
  cancelAnimationFrame(tom);
  loadJerry();

  function pauseAudio() {
    var a = document.getElementById("audio");
    a.pause();
  }

  function audioEnd() {
    var a = document.getElementById("audio-end");
    a.play();
  }
  function loadJerry() {
    var record = jerry.pointCounter;
    if (localStorage.getItem("Jerry", record) < record) {
      pauseAudio();
      audioEnd();
      localStorage.setItem("Jerry", record);
      alert("УРА НОВЫЙ РЕКОРД " + localStorage.getItem("Jerry", record));
      window.location.reload();
    } else {
      pauseAudio();
      audioEnd();
      alert(
        "У вас " +
          record +
          " Рекорд :" +
          localStorage.getItem("Jerry", record) +
          " попробуй еще!"
      );
      window.location.reload();
    }
  }

  setInterval(function() {
    location.reload();
  }, 10000);
  jerry.pointCounter();
}
