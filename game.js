const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;

let bestScoreP = document.querySelector(".bestScore")
let bestScore = 0;

let game;

let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != "right")
        dir = "left";
    else if(event.keyCode == 38 && dir != "down")
        dir = "up";
    else if(event.keyCode == 39 && dir != "left")
        dir = "right";
    else if(event.keyCode == 40 && dir != "up")
        dir = "down";

}

function eatTail (head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "purple";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    if (bestScore <= score) {
        bestScore = score;
    }

    bestScoreP.innerHTML = bestScore;

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
     food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

    } else {
        snake.pop();
    }

    if(snakeX < box || snakeX > box * 17
       || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game);

    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX +=box;
    if(dir == "up") snakeY -=box;
    if(dir == "down") snakeY +=box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead);


}

let lvl1 = document.querySelector("#lvl1");
let lvl2 = document.querySelector("#lvl2");
let lvl3 = document.querySelector("#lvl3");

function restartGame() {

    clearInterval(game);
    snake = [];
    snake[0] = {
        x: 9 * box,
        y: 10 * box,
    };
    score = 0;
    dir = undefined;

    if (lvl1.checked) {
        game = setInterval(drawGame, 150);
    }
    else if (lvl2.checked) {
        game = setInterval(drawGame, 100);
    }
    else if (lvl3.checked) {
        game = setInterval(drawGame, 50);
    }
    else {
        alert("Выберите уровень сложности!")
    }


}

let button = document.querySelector(".learn-more")
button.addEventListener('click', restartGame);

// let form = document.querySelector(".form")
// form.addEventListener("submit", function(event) {
//
// })

let select = document.querySelector("select");
select.addEventListener("change", changeURLLang);
const allLang = ["en", "ru", "ua"];

function changeURLLang() {
    let lang = select.value;
    location.href = window.location.pathname + "#" + lang;
    location.reload();
}

function changeLang() {
    let hash = window.location.hash;
    hash = hash.substring(1);
    console.log(hash);
    if (!allLang.includes(hash)) {
        location.href = window.location.pathname + "#en";
        location.reload();
    }
    select.value = hash;
    document.querySelector(".bScore").innerHTML = langArr['score'][hash];
}

changeLang();





