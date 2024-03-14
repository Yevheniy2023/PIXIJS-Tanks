import { Container, Graphics } from "pixi.js";
import { Bullet } from "./Bullet";
import * as PIXI from "pixi.js";
import { app } from "../app";

export class Tank {
  private _container: Container;
  private _tank: PIXI.Sprite;
  private _speed: number;
  private _bullets: any;
  private _updateBullets: any;
  constructor() {
    this._container = new Container();
    this._tank = new PIXI.Sprite(PIXI.Texture.from("./img/tank.png"));

    this._tank.width = 80;
    this._tank.height = 80;
    this._tank.anchor.set(0.5);
    this._container.addChild(this._tank);
    this._speed = 10;
    this._container.position.set(550, 700);
    this._container.width = 80;
    this._container.height = 80;
    this._container.interactive = true;
    this._bullets = [];
    this._container.on("pointerdown", () => {
      const bullet = new Bullet();
      console.log("shot");
      this._container.parent.addChild(
        bullet.getBullet(this._container.x, this._container.y)
      );
      this._bullets.push(bullet);
    });
    this._updateBullets = () => {
      this._bullets.forEach((bullet: any) => bullet.update());
    };
    app.ticker.add(this._updateBullets);
  }
  public get container(): Container {
    return this._container;
  }

  private move(direction: number) {
    const angle = this._container.rotation;
    const deltaX = direction * this._speed * Math.cos(angle);
    const deltaY = direction * this._speed * Math.sin(angle);
    this._container.x += deltaX;
    this._container.y += deltaY;
  }

  public keydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      this.move(1);
    }
    if (event.key === "ArrowDown") {
      this.move(-1);
    }
    if (event.key === "ArrowLeft") {
      this._container.rotation -= 0.1;
    }
    if (event.key === "ArrowRight") {
      this._container.rotation += 0.1;
    }
  };
}
