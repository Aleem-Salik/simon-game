const squareContainer = $(".container");
const heading = $(".heading");

// HELPER FUNCTIONS

const randomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

const playSound = function (url) {
  const audio = new Audio(url);
  audio.play();
};

const animationAndSound = function (color) {
  $("." + color).addClass("randomColor");
  playSound(`./sounds/${color}.mp3`);
  setTimeout(function () {
    $("." + color).removeClass("randomColor");
  }, 200);
};

const generateColor = function () {
  const color = colors[randomNumber(0, 3)];
  generatedPattern.push(color);
  heading.text(`Level ${generatedPattern.length}`);
  animationAndSound(color);
  console.log(generatedPattern);
  document.removeEventListener("keydown", generateColor);
};

const reset = function () {
  playSound("./sounds/wrong.mp3");
  $(".simon-game").addClass("incorrect");
  setTimeout(function () {
    $(".simon-game").removeClass("incorrect");
  }, 300);
  generatedPattern.length = 0;
  current = 0;
  heading.text("Press Any Key To Restart");
  document.addEventListener("keydown", generateColor);
};

const colors = ["red", "green", "blue", "yellow"];
const generatedPattern = [];
let current = 0;

document.addEventListener("keydown", generateColor);

squareContainer.on("click", function (e) {
  if (!e.target.classList.contains("square")) return;
  const clickedBtn = e.target.classList[1];
  if (clickedBtn === generatedPattern[current]) {
    playSound(`./sounds/${clickedBtn}.mp3`);
    current++;
  } else {
    reset();
  }
  if (generatedPattern.length && current === generatedPattern.length) {
    current = 0;
    generateColor();
  }
});
