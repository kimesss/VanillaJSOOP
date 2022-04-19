export class Enemy {
  constructor(container, enemySpeed, enemyClass, explosionClass, lives = 1) {
    this.container = container;
    this.element = document.createElement("div");
    this.enemyClass = enemyClass;
    this.interval = null;
    this.enemiesSpeed = enemySpeed;
    this.lives = lives;
    this.explosionClass = explosionClass;
  }
  init() {
    this.setEnemy();
  }
  animation() {
    this.interval = setInterval(() => this.setPosition(), this.enemiesSpeed);
  }
  setEnemy() {
    this.element.setAttribute("class", this.enemyClass);
    this.container.appendChild(this.element);
    this.element.style.top = "0px";
    this.element.style.left = this.randomPosition() + "px";
  }
  randomPosition() {
    return Math.floor(
      Math.random() * window.innerWidth - this.element.offsetWidth
    );
  }
  setPosition() {
    this.element.style.top = `${this.element.offsetTop + 1}px`;
  }
  remove() {
    clearInterval(this.interval);
    this.element.remove();
  }
  hit() {
    this.lives--;
    if (!this.lives) {
      this.explode();
    }
  }
  explode() {
    this.element.classList.remove(this.enemyClass);
    this.element.classList.add(this.explosionClass);
    clearInterval(this.interval);
    setTimeout(() => this.element.remove(), 500);
    // this.element.remove();
  }
}
