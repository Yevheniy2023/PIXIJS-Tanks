import { Bullet } from "./Bullet";
import * as PIXI from "pixi.js";
import { app } from "../app";
import { wall3 } from "../Game";
import { Collision } from "../Collision";

export class Tank {
  private _container: PIXI.Container;
  private _tank: PIXI.Sprite;
  private _speed: number;
  private _bullets: Bullet[];
  private _updateBullets: any;
  constructor() {
    this._container = new PIXI.Container();
    this._tank = new PIXI.Sprite(PIXI.Texture.from("./img/tank.png"));

    this._tank.width = 80;
    this._tank.height = 80;
    this._tank.anchor.set(0.5);
    this._container.addChild(this._tank);
    this._speed = 10;
    this._container.position.set(60, 450);
    this._container.width = 80;
    this._container.height = 80;
    this._container.interactive = true;
    this._bullets = [];
    this._updateBullets = () => {
      this._bullets.forEach((bullet: any) => bullet.update());
    };
    app.ticker.add(this._updateBullets);
  }
  public get container(): PIXI.Container {
    return this._container;
  }

  get bullets(): any {
    return this._bullets;
  }

  private move(direction: number) {
    const angle = this._container.rotation;
    const deltaX = direction * this._speed * Math.cos(angle);
    const deltaY = direction * this._speed * Math.sin(angle);
    this._container.x += deltaX;
    this._container.y += deltaY;
  }

  public keydown = (event: KeyboardEvent): void => {
    if (event.key === "ArrowUp") {
      this.move(1);
    }
    if (event.key === "ArrowDown") {
      this.move(-1);
    }
    if (event.key === "ArrowLeft") {
      this._container.rotation -= Math.PI / 2;
    }
    if (event.key === "ArrowRight") {
      this._container.rotation += Math.PI / 2;
    }
    if (event.key === " ") {
      const bullet = new Bullet(this._container.rotation);
      this._container.parent.addChild(
        bullet.getBullet(
          this._container.x,
          this._container.y,
          this._container.rotation
        )
      );
      this._bullets.push(bullet);

      // this._bullets.forEach((bullet : any) => {
      //   if(Collision.isCheckCollision(bullet, wall3)){
      //     console.log("bulllet colision");

      //   }
      // });
    }
  };
}
