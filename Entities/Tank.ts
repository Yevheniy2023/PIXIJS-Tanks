import { Container, Graphics } from "pixi.js";

export class Tank {
  private _container: Container;
  private _view: Graphics;
  constructor() {
    this._container = new Container();
    this._view = new Graphics();
    this._view.beginFill("yellow", 1).lineStyle(1, "red")
    .drawRect(20, 20, 40, 40).endFill()
    this._container.addChild(this._view);
  }
  public get container() : Container {
    return this._container;
  }
  public keydown = (event : any)=> {
    if(event.key === "ArrowUp") {
      this._container.position.y -= 20;
    }
    if(event.key === "ArrowDown") {
      this._container.position.y += 20;
    }
    if(event.key === "ArrowLeft") {
      this._container.position.x -= 20;
    }
    if(event.key === "ArrowRight") {
      this._container.position.x += 20;
    }
}

}
