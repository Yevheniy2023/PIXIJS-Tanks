import * as PIXI from "pixi.js";
import { Tank } from "./Entities/Tank";
import { Walls } from "./Entities/Walls";

export default class Game {
  private _app: PIXI.Application;
  constructor(pixiApp: PIXI.Application) {
    this._app = pixiApp;
    const tank = new Tank();
    const wallHor1 = new Walls(100, 100, 200, 20, "grey", "#0000FF", 2);
    const wallHor2 = new Walls(100, 200, 200, 20, "white", "blue", 2);
    const wallVer1 = new Walls(1100, 300, 20, 500, "grey", "blue", 2);
    window.addEventListener("keydown", tank.keydown);
    this._app.stage.addChild(
      wallHor1.getWall(),
      wallHor2.getWall(),
      wallVer1.getWall(),
      tank.getTank()
    );
  }
}
