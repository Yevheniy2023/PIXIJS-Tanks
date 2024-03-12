import { Container, Graphics } from "pixi.js";

export class Tank {
  private _container: Container;
  private _view: Graphics;
  private _speed: number;
  constructor() {
    this._container = new Container();
    this._view = new Graphics();
    this._view
      .beginFill("yellow", 1)
      .lineStyle(1, "red")
      .drawRect(20, 20, 40, 40)
      .endFill();
    this._container.addChild(this._view);
    this._speed = 10;
    this._container.position.set(20, 20);
  }
  public get container(): Container {
    return this._container;
  }
  public keydown = (event: any) => {
    if (event.key === "ArrowUp") {
      this._container.position.y -= this._speed;
    }
    if (event.key === "ArrowDown") {
      this._container.position.y += this._speed;
    }
    if (event.key === "ArrowLeft") {
      this._container.position.x -= this._speed;
    }
    if (event.key === "ArrowRight") {
      this._container.position.x += this._speed;
    }
  };
}
