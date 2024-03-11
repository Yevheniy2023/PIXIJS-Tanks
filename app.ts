import * as PIXI from "pixi.js";
import Game from "./Game";

export const app = new PIXI.Application({
    width: 1500,
    height: 900,
    backgroundColor: "lightblue",
    antialias: true
})

document.body.appendChild(app.view as HTMLCanvasElement)

new Game(app);