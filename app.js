const score = document.querySelector('.score');
const startScreen = document.querySelector('.start-screen');
const gameArea = document.querySelector('.game-area');

// console.log(score);

startScreen.addEventListener('click', start);

let player = { speed: 5, score: 0 };

let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key);
    // console.log(keys);
}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}


function moveLines() {
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function (item) {
        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your Score : " + player.score + " <br> Click and again play!"
}

function moveCar(car) {
    let attack = document.querySelectorAll('.attack');

    attack.forEach(function (item) {

        if (isCollide(car, item)) {
            // console.log("Boom Hit");
            endGame();
        }

        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 330) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gamePlay() {
    // console.log("Hi I am clicked");
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    let car = document.querySelector('.car');

    if (player.start) {
        moveLines();
        moveCar(car);

        if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 90)) { player.y += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
        if (keys.ArrowRight && player.x < (road.width - 75)) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay);
        // console.log(player.score++);

        player.score++;
        let playerScore = player.score - 2;
        score.innerText = "Your Score : " + playerScore;
    }

}

function start() {

    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerText = "I am your car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log("Top position " + car.offsetTop);
    // console.log("Left position " + car.offsetLeft);

    for (x = 0; x < 3; x++) {
        let attackCar = document.createElement('div');
        attackCar.setAttribute('class', 'attack');
        attackCar.y = ((x + 1) * 350) * -1;
        attackCar.style.top = attackCar.y + "px";
        attackCar.style.backgroundColor = randomColor();
        attackCar.style.borderRadius = "10px";
        attackCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(attackCar);
    }
}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}