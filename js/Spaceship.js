import { Bullet } from "./Bullet.js";

export class Spaceship {
  bullets = [];
  leftArrow = false;
  rightArrow = false;
  constructor(element, container) {
    this.element = element;
    this.container = container;
  }
  init() {
    this.setPosition();
    this.eventListeners();
    this.gameLoop();
  }
  setPosition() {
    this.element.style.bottom = "0px";
    this.element.style.left = `${
      window.innerWidth / 2 - this.element.offsetWidth / 2
    }px`;
  }
  getPosition() {
    return this.element.offsetLeft + this.element.offsetWidth / 2;
  }
  eventListeners() {
    window.addEventListener("keydown", ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          this.leftArrow = true;
          break;
        case 39:
          this.rightArrow = true;
          break;
      }
    });
    window.addEventListener("keyup", ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          this.leftArrow = false;
          break;
        case 39:
          this.rightArrow = false;
          break;
        case 32:
          this.shot();
          console.log("shot");
          break;
      }
    });
  }
  gameLoop = () => {
    this.whatKey();
    requestAnimationFrame(this.gameLoop);
  };
  whatKey() {
    if (this.leftArrow && this.getPosition() > 12) {
      this.element.style.left = `${
        parseInt(this.element.style.left, 10) - 5
      }px`;
    }
    if (this.rightArrow && this.getPosition() < innerWidth - 12) {
      this.element.style.left = `${
        parseInt(this.element.style.left, 10) + 5
      }px`;
    }
  }
  shot() {
    const bullet = new Bullet(
      this.getPosition() - 6,
      this.element.offsetTop,
      this.container
    );
    bullet.init();
    bullet.animation();
    this.bullets.push(bullet);
  }
}
