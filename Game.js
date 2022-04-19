import { Spaceship } from "./js/Spaceship.js";
import { Enemy } from "./js/Enemy.js";

class Game {
  htmlElements = {
    spaceship: document.querySelector(".spaceship"),
    container: document.querySelector(".container"),
    myLives: document.querySelector(".information__content__lives"),
    score: document.querySelector(".information__content__scores"),
    modal: document.querySelector(".modal"),
    scoreInfo: document.querySelector(".modal__text"),
    button: document.querySelector(".modal__button"),
  };
  ship = new Spaceship(
    this.htmlElements.spaceship,
    this.htmlElements.container
  );
  myLives = 0;
  score = 0;
  enemies = [];
  interval = null;
  enemiesInterval = null;
  enemiesSpeed = null;
  init() {
    this.ship.init();
    this.newGame();
    this.htmlElements.button.addEventListener("click", () => this.newGame());
  }
  newGame() {
    this.htmlElements.modal.classList.add("hide");
    this.myLives = 3;
    this.score = 0;
    this.htmlElements.score.textContent = `Scores : ${this.score}`;
    this.htmlElements.myLives.textContent = `Lives : ${this.myLives}`;
    this.enemiesSpeed = 20;
    this.enemiesInterval = setInterval(() => this.randomEnemy(), 1000);
    this.interval = setInterval(() => this.checkPosition(), 10);
  }
  createEnemy(...params) {
    const enemy = new Enemy(...params);
    enemy.init();
    enemy.animation();
    this.enemies.push(enemy);
  }
  randomEnemy() {
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    randomNumber % 5
      ? this.createEnemy(
          this.htmlElements.container,
          this.enemiesSpeed,
          "enemy",
          "explosion"
        )
      : this.createEnemy(
          this.htmlElements.container,
          this.enemiesSpeed,
          "enemy--big",
          "explosion--big",
          3
        );
  }
  checkPosition() {
    this.enemies.forEach((enemy, enemyIndex, enemyArr) => {
      const enemyPosition = {
        top: enemy.element.offsetTop,
        right: enemy.element.offsetLeft + enemy.element.offsetWidth,
        bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
        left: enemy.element.offsetLeft,
      };
      if (enemyPosition.top > innerHeight - enemy.element.offsetHeight - 1) {
        this.updateLives();
        enemy.remove();
        enemyArr.splice(enemyIndex, 1);
      }

      this.ship.bullets.forEach((bullet, bulletIndex, bulletArr) => {
        const bulletPosition = {
          top: bullet.element.offsetTop,
          right: bullet.element.offsetLeft + bullet.element.offsetWidth,
          bottom: bullet.element.offsetTop + bullet.element.offsetHeight,
          left: bullet.element.offsetLeft,
        };
        if (
          bulletPosition.bottom >= enemyPosition.top &&
          bulletPosition.top <= enemyPosition.bottom &&
          bulletPosition.right >= enemyPosition.left &&
          bulletPosition.left <= enemyPosition.right
        ) {
          enemy.hit();
          if (!enemy.lives) {
            enemyArr.splice(enemyIndex, 1);
          }
          bullet.remove();
          bulletArr.splice(bulletIndex, 1);
          this.updateScore();
        }
        if (bulletPosition.bottom < 0) {
          bullet.remove();
          bulletArr.splice(bulletIndex, 1);
        }
      });
    });
  }
  updateScore() {
    this.score++;
    if (this.score % 20) {
      this.enemiesSpeed--;
    }
    this.htmlElements.score.textContent = `Scores : ${this.score}`;
  }
  updateLives() {
    this.myLives--;
    this.htmlElements.myLives.textContent = `Lives : ${this.myLives}`;
    this.htmlElements.container.classList.add("hit");
    setTimeout(() => {
      this.htmlElements.container.classList.remove("hit");
    }, 100);
    if (!this.myLives) {
      this.endGame();
    }
  }
  endGame() {
    this.htmlElements.modal.classList.remove("hide");
    this.htmlElements.scoreInfo.textContent = `You Loose! Your Score ${this.score}`;
    this.enemies.forEach((enemy) => enemy.remove());
    this.enemies.length = 0;
    clearInterval(this.enemiesInterval);
    clearInterval(this.interval);
  }
}

window.onload = function () {
  const game = new Game();
  game.init();
};
