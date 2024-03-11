import * as PIXI from "pixi.js";
import { Tank } from "./Entities/Tank";
import { Walls } from "./Entities/Walls";
import { update } from "@tweenjs/tween.js";

export default class Game {
  private _tank: any;
  private _app: PIXI.Application;
  private _wallHor1: any;
  constructor(pixiApp: PIXI.Application) {
    this._app = pixiApp;
    this._tank = new Tank();
    this._wallHor1 = new Walls(100, 100, 200, 20, "grey", "#0000FF", 2);
    const wallHor2 = new Walls(100, 200, 200, 20, "white", "blue", 2);
    const wallVer1 = new Walls(1100, 300, 20, 500, "grey", "blue", 2);
    window.addEventListener("keydown", this._tank.keydown);
    this._app.stage.addChild(
      this._wallHor1.getWall(),
      wallHor2.getWall(),
      wallVer1.getWall(),
      this._tank.container
    );
    this._app.ticker.add(this.update.bind(this));
  }

  isCheckAABB(entity: Tank, area: Walls) {
    const tankBounds = entity.container.getBounds();
    const wall1Bounds = area.getWall().getBounds();
    return (
      tankBounds.x < wall1Bounds.x + wall1Bounds.width &&
      tankBounds.x + tankBounds.width > wall1Bounds.x &&
      tankBounds.y < wall1Bounds.y + wall1Bounds.height &&
      tankBounds.y + tankBounds.height > wall1Bounds.y
    );
  }
  update() {
    const y = this._tank.y;

    if (this.isCheckAABB(this._tank, this._wallHor1)) {
      console.log("collision");
      this._tank.y = y
    }
  }
}
