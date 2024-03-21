import * as PIXI from "pixi.js";
import { Tank } from "./Entities/Tank";
import { Walls } from "./Entities/Walls";
import { Collision } from "./Collision";

export const wall3 = new Walls(400, 500, 400, 30, "red", "blue", 1, "armored");

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
      (this._wallHor1 = new Walls(
        50,
        100,
        200,
        50,
        "grey",
        "#0000FF",
        2,
        "light"
      )),
      (this._wallHor2 = new Walls(
        100,
        250,
        200,
        50,
        "white",
        "blue",
        2,
        "armored"
      )),
      (this._wallVer1 = new Walls(
        1100,
        300,
        20,
        500,
        "grey",
        "blue",
        2,
        "light"
      )),
      (this._wallVer2 = new Walls(
        700,
        300,
        20,
        500,
        "grey",
        "blue",
        2,
        "light"
      )),
      wall3,
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

  update() {
    let isCollision = false;
    this._walls.forEach((wall) => {
      if (Collision.isCheckCollision(this._tank, wall)) {
        console.log("collision");
        this._tank.container.y = this._prevPositionTank.y;
        this._tank.container.x = this._prevPositionTank.x;

        isCollision = true;
      }
      
    });
    const armoredWalls = this._walls.filter((wall) => wall.hull === "armored");
    const lightWalls = this._walls.filter((wall) => wall.hull === "light");

      this._tank.bullets.forEach((bullet: any, index: number) => {
        lightWalls.forEach((currentWall: any) => {
          if (Collision.isCheckCollision(bullet, currentWall)) {
            console.log("light hit");
            this._app.stage.removeChild(
              currentWall.container,
              bullet.container
            );
            // lightWalls.splice(wallIndex, 1);
            this._walls.splice(this._walls.indexOf(currentWall), 1);
            this._tank.bullets.splice(index, 1);
          }
        });
        armoredWalls.forEach((currentWall: any) => {
          if (Collision.isCheckCollision(bullet, currentWall)) {
            console.log("armored hit");

            this._app.stage.removeChild(bullet.container);
            this._tank.bullets.splice(index, 1);
          }
        });
      });

    if (!isCollision) {
      this._prevPositionTank = {
        x: this._tank.container.position.x,
        y: this._tank.container.position.y,
      };
    }
  }
}
