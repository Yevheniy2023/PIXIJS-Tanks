import { Container, Graphics } from "pixi.js";

export class Walls {
  private _wall: Graphics;
  private _container: Container;
  private _hull : string;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: string,
    lineColor: string,
    lineWidth: number,
    hull : string
  ) {
    this._wall = new Graphics();
    this._container = new Container();

    this._wall
      .beginFill(fillColor)
      .lineStyle(lineWidth,lineColor)
      .drawRect(x,y,width,height)
      .endFill();
    this._container.addChild(this._wall);
    this._hull = hull
  }
  public get container() {
    return this._container
  }
  public get hull () {
    return this._hull
  }
}
