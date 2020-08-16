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
    player = new Player(0, 200);
    obstacles.push(new StaticObject(0,600, 600, 100));
    obstacles.push(new StaticObject(650,600, 400, 100));
    controls = new Controls();
    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    obstacles.forEach(obstacle => {
        if (player.collisionCheck(obstacle)) {

        }
       drawRect(obstacle.pos.x, obstacle.pos.y, obstacle.width, obstacle.height);
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
    width = null;
    height = null;
    constructor(startX,startY, width, height) {
        this.pos = {x: startX, y:startY};
        this.width = width;
        this.height = height;
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
    pos = null;
    size = 100;
    accelration = {
        x: gravity,
        y: 0,
    };
    velocity = {
        x: 0,
        y: 0,
    };

    constructor(startX, startY) {
        this.pos = {x: startX, y: startY};
    }

    updatePlayerPostion() {
        this.velocity
        if((this.pos.x + this.size) > context.canvas.width || this.pos.x < 0) {
            this.acceleration *= -1;
        }
        this.pos.x += this.acceleration
    }

    movePlayer() {
        if((this.pos.x + this.size) > context.canvas.width || this.pos.x < 0) {
            this.acceleration *= -1;
        }
        this.pos.x += this.acceleration
    }

    collisionCheck(object) {
        return this.pos.x < object.pos.x + object.width &&
            this.pos.x + this.size > object.pos.x &&
            this.pos.y < object.pos.y + object.height &&
            this.pos.y + this.size > object.pos.y;
    }
}