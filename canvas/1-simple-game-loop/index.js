"use strict";
let canvas;
let context;
let player;
let obstacles = []
let controls;
const gravity = 9.81;
window.onload = init;

function init() {
    canvas = document.getElementById('aCanvas');
    context = canvas.getContext('2d');
    player = new Player(new Vector(0, 100));
    obstacles.push(new StaticObject(new Vector(0,600), new Vector(600, 100)));
    obstacles.push(new StaticObject(new Vector(650,600), new Vector(400, 100)));
    controls = new Controls();
    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    obstacles.forEach(obstacle => {
        if (player.collisionCheck(obstacle)) {
            player.correctPosition(obstacle)
        }
        player.updatePlayerPosition();
       drawRect(obstacle.pos.x, obstacle.pos.y, obstacle.size.x, obstacle.size.y);
    });
    drawRect(player.pos.x, player.pos.y, player.size, player.size, 'red');
    window.requestAnimationFrame(gameLoop)
}

function drawRect(x, y, width, height, color = "#000") {
    context.fillStyle = color
    context.beginPath();
    context.rect(x, y, width, height);
    context.fill();
}

class StaticObject {
    pos = null;
    size = null;
    constructor(startVector, endVector) {
        this.pos = startVector
        this.size = endVector;
    }
}

class Controls {
    keys = [];
    constructor() {
        document.addEventListener("keydown", (event) => this.keyPressed(event.code));
        document.addEventListener("keyup", (event) => this.keyReleased(event.code));
    }

    keyPressed(keyCode) {
        console.log(keyCode);
        this.keys[keyCode] = true;
    }

    keyReleased(keyCode) {
        this.keys[keyCode] = false;
    }
}

class Player {
    pos = new Vector(0,0);
    size = 100;
    acceleration = new Vector(0, gravity);
    velocity = new Vector(0,0);

    constructor(startVector) {
        this.pos = startVector;
    }

    updatePlayerPosition() {
        if((this.pos.x + this.size) > context.canvas.width || this.pos.x < 0) {
            this.velocity.add(this.acceleration);
        }
        this.pos.add(this.velocity);
    }

    movePlayer() {
        if((this.pos.x + this.size) > context.canvas.width || this.pos.x < 0) {
            this.acceleration *= -1;
        }
        this.pos.x += this.acceleration;
    }

    clearAcceleration() {
        this.acceleration.x = 0;
        this.acceleration.y = 0;
    }

    correctPosition(obstacle) {
        let distanceX;
        let distanceY;
        if(this.velocity.x < 0) {
            distanceX = obstacle.pos.x;
        } else {
            distanceX = obstacle.pos.x + obstacle.size.x;
        }

        if(this.velocity.y < 0) {
            distanceY = obstacle.pos.y;
        } else {
            distanceY = obstacle.pos.y + obstacle.size.y;
        }

        let timeX = distanceX / this.velocity.x;
        let timeY = distanceY / this.velocity.y;

        let collisionTime = Math.min(timeX, timeY);

        this.pos.scalar(collisionTime);
    }

    collisionCheck(object) {
        return this.pos.x < object.pos.x + object.size.x &&
            this.pos.x + this.size > object.pos.x &&
            this.pos.y < object.pos.y + object.size.y &&
            this.pos.y + this.size > object.pos.y;
    }
}