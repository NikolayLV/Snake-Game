const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;

let bestScoreP = document.querySelector(".bestScore")
let select = document.querySelector("select");
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

let kb1 = document.querySelector("#kb1");
let kb2 = document.querySelector("#kb2");
let langHash = select.value;

function chooseKeyBoard() {

    if (kb1.checked) {
        document.addEventListener("keydown", direction);
        console.log(kb1.checked)
    } else if (kb2.checked) {
        document.addEventListener("keydown", directionSecond);
        console.log(kb2.checked)
    } else {
        if (langHash == "ru") {
            alert(langArr['keyAlert']['ru'])
        } else if (langHash == "en") {
            alert(langArr['keyAlert']['en'])
        } else if (langHash == "ua") {
            alert(langArr['keyAlert']['ua'])
        } else {
            alert(langArr['keyAlert']['en'])
        }
    }

}


let dir;

function direction(event) {
    if (event.keyCode == 37 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
        dir = "up";
    else if (event.keyCode == 39 && dir != "left")
        dir = "right";
    else if (event.keyCode == 40 && dir != "up")
        dir = "down";

}

let chosenColorHead = "#0DC0B8FF";
let chosenColorBody = "#d36f6f";

function applyColor() {
    const colorHead = document.getElementById('colorHead');
    const colorBody = document.getElementById('colorBody');


    chosenColorHead = colorHead.value;
    chosenColorBody = colorBody.value;
    console.log(chosenColorHead)

}

function directionSecond(event) {
    if (event.keyCode == 65 && dir != "right")
        dir = "left";
    else if (event.keyCode == 87 && dir != "down")
        dir = "up";
    else if (event.keyCode == 68 && dir != "left")
        dir = "right";
    else if (event.keyCode == 83 && dir != "up")
        dir = "down";

}



function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? chosenColorHead : chosenColorBody;
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

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };

    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game);

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

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
    } else if (lvl2.checked) {
        game = setInterval(drawGame, 100);
    } else if (lvl3.checked) {
        game = setInterval(drawGame, 50);
    } else {
        if (langHash == "ru") {
            alert(langArr['alert']['ru'])
        } else if (langHash == "en") {
            alert(langArr['alert']['en'])
        } else if (langHash == "ua") {
            alert(langArr['alert']['ua'])
        } else {
            alert(langArr['alert']['en'])
        }
    }


}

let button = document.querySelector(".learn-more")
button.addEventListener('click', restartGame);
button.addEventListener('click', chooseKeyBoard);


select.addEventListener("change", changeLang);
const allLang = ["en", "ru", "ua"];

function changeURLLang() {
    console.log(select.value);
}

function changeLang() {
    let hash = select.value;

    if (hash == "ru") {
        document.querySelector(".bScore").innerHTML = langArr['score'][hash];
        document.querySelector(".learn-more").innerHTML = langArr['start'][hash];
        document.querySelector(".choose__dif").innerHTML = langArr['difficulty'][hash];
        document.querySelector(".layout").innerHTML = langArr['layout'][hash];
        document.querySelector(".colorH").innerHTML = langArr['colorH'][hash];
        document.querySelector(".colorB").innerHTML = langArr['colorBody'][hash];
        document.querySelector("#colorBtn1").innerHTML = langArr['colorBtn'][hash];
        document.querySelector("#colorBtn2").innerHTML = langArr['colorBtn'][hash];
    } else if (hash == "en") {
        document.querySelector(".bScore").innerHTML = langArr['score'][hash];
        document.querySelector(".learn-more").innerHTML = langArr['start'][hash];
        document.querySelector(".choose__dif").innerHTML = langArr['difficulty'][hash];
        document.querySelector(".layout").innerHTML = langArr['layout'][hash];
        document.querySelector(".colorH").innerHTML = langArr['colorH'][hash];
        document.querySelector(".colorB").innerHTML = langArr['colorBody'][hash];
        document.querySelector("#colorBtn1").innerHTML = langArr['colorBtn'][hash];
        document.querySelector("#colorBtn2").innerHTML = langArr['colorBtn'][hash];
    } else if (hash == "ua") {
        document.querySelector(".bScore").innerHTML = langArr['score'][hash];
        document.querySelector(".learn-more").innerHTML = langArr['start'][hash];
        document.querySelector(".choose__dif").innerHTML = langArr['difficulty'][hash];
        document.querySelector(".layout").innerHTML = langArr['layout'][hash];
        document.querySelector(".colorH").innerHTML = langArr['colorH'][hash];
        document.querySelector(".colorB").innerHTML = langArr['colorBody'][hash];
        document.querySelector("#colorBtn1").innerHTML = langArr['colorBtn'][hash];
        document.querySelector("#colorBtn2").innerHTML = langArr['colorBtn'][hash];
    }
}



changeLang();





