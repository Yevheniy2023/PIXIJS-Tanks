import * as PIXI from "pixi.js";
import { Tank } from "./Entities/Tank";
import { Walls } from "./Entities/Walls";

export default class Game {
  private _tank: any;
  private _app: PIXI.Application;
  private _wallHor1: any;
  private _prevPositionTank: any;
  constructor(pixiApp: PIXI.Application) {
    this._app = pixiApp;
    this._tank = new Tank();
    this._wallHor1 = new Walls(50, 100, 200, 20, "grey", "#0000FF", 2);
    const wallHor2 = new Walls(100, 200, 200, 20, "white", "blue", 2);
    const wallVer1 = new Walls(1100, 300, 20, 500, "grey", "blue", 2);
    window.addEventListener("keydown", this._tank.keydown);
    this._app.stage.addChild(
      this._wallHor1.container,
      wallHor2.container,
      wallVer1.container,
      this._tank.container
    );
    this._prevPositionTank = {
      x: this._tank.container.position.x,
      y: this._tank.container.position.y,
    };
    this._app.ticker.add(this.update.bind(this));
  }

  isCheckCollision(entity: Tank, area: Walls) {
    const tankBounds = entity.container.getBounds();
    const wallBounds = area.container.getBounds();
    return (
      tankBounds.x < wallBounds.x + wallBounds.width &&
      tankBounds.x + tankBounds.width > wallBounds.x &&
      tankBounds.y < wallBounds.y + wallBounds.height &&
      tankBounds.y + tankBounds.height > wallBounds.y
    );
  }

  update() {
    if (this.isCheckCollision(this._tank, this._wallHor1)) {
      console.log("collision");
      this._tank.container.y = this._prevPositionTank.y;
      this._tank.container.x = this._prevPositionTank.x;
    } else {
      this._prevPositionTank = {
        x: this._tank.container.position.x,
        y: this._tank.container.position.y,
      };
    }
  }
}
