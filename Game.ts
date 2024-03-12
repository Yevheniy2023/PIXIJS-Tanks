import * as PIXI from "pixi.js";
import { Tank } from "./Entities/Tank";
import { Walls } from "./Entities/Walls";

export default class Game {
  private _tank: Tank;
  private _app: PIXI.Application;
  private _walls: Walls[];
  private _wallHor1: Walls;
  private _wallHor2: Walls;
  private _wallVer1: Walls;
  private _wallVer2: Walls;
  private _prevPositionTank: any;
  constructor(pixiApp: PIXI.Application) {
    this._app = pixiApp;
    this._tank = new Tank();
    this._walls = [
      (this._wallHor1 = new Walls(50, 100, 200, 50, "grey", "#0000FF", 2)),
      (this._wallHor2 = new Walls(100, 250, 200, 50, "white", "blue", 2)),
      (this._wallVer1 = new Walls(1100, 300, 20, 500, "grey", "blue", 2)),
      (this._wallVer2 = new Walls(700, 300, 20, 500, "grey", "blue", 2)),
    ];

    window.addEventListener("keydown", this._tank.keydown);
    this._app.stage.addChild(
      ...this._walls.map((wall) => wall.container),
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
    let isCollision = false;
    this._walls.forEach((wall) => {
      if (this.isCheckCollision(this._tank, wall)) {
        console.log("collision");
        this._tank.container.y = this._prevPositionTank.y;
        this._tank.container.x = this._prevPositionTank.x;
        isCollision = true;
      }
    });
    if (!isCollision) {
      this._prevPositionTank = {
        x: this._tank.container.position.x,
        y: this._tank.container.position.y,
      };
    }
  }
}
