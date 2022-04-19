export class Bullet {
  constructor(x, y, container) {
    this.x = x;
    this.y = y;
    this.container = container;
    this.element = document.createElement("div");
    this.interval = null;
  }
  init() {
    this.element.setAttribute("class", "bullet");
    this.container.appendChild(this.element);
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  }
  animation() {
    this.interval = setInterval(() => {
      this.element.style.top = this.element.offsetTop - 10 + "px";
    }, 10);
  }
  remove() {
    clearInterval(this.interval);
    this.element.remove();
  }
}
