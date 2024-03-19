import * as PIXI from "pixi.js";

export class Bullet {
  private _bullet: PIXI.Sprite;
  private _container: PIXI.Container;
  private _bulletTexture: PIXI.Texture;
  private _bulletSpeed: number;
  private _angle: number;

  constructor(angle: number) {
    this._bullet = new PIXI.Sprite();
    this._container = new PIXI.Container();
    this._bulletTexture = PIXI.Texture.from("./img/bullet.png");
    this._bullet = new PIXI.Sprite(this._bulletTexture);
    this._bullet.anchor.set(0.5);
    this._bullet.width = 30;
    this._bullet.height = 10;
    this._bulletSpeed = 10;
    this._angle = angle;
    this._container.addChild(this._bullet);
  }
  public get container(): PIXI.Container {
    return this._container;
  }
  public getBullet(x: number, y: number, rotation : number) {
    this._container.position.set(x, y);
    this._container.rotation = rotation
    return this._container;
  }
  public update() {
    const deltaX = this._bulletSpeed * Math.cos(this._angle)
    const deltaY = this._bulletSpeed * Math.sin(this._angle)
    this._container.x += deltaX;
    this._container.y += deltaY;
  }
}
