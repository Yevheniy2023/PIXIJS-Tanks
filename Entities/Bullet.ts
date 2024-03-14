import * as PIXI from "pixi.js";

export class Bullet {
  private _bullet: PIXI.Sprite;
  private _container: PIXI.Container;
  private _bulletTexture: PIXI.Texture;
  private _bulletSpeed : number;

  constructor() {
    this._bullet = new PIXI.Sprite();
    this._container = new PIXI.Container();
    this._bulletTexture = PIXI.Texture.from("./img/bullet.png");
    this._bullet = new PIXI.Sprite(this._bulletTexture);
    this._bullet.anchor.set(0.5);
    this._bullet.width = 10;
    this._bullet.height = 30;
    this._bulletSpeed = 10;
    this._container.addChild(this._bullet);
    
  }
  public getBullet(x: number, y: number) {
    this._container.position.set(x,y)
    return this._container;
  }
  public update () {
    this._container.y -= this._bulletSpeed;
  }
}
