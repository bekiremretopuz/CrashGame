export class Base64Sprite extends PIXI.Sprite{
  private _frame: string;
  private _sprite: PIXI.Sprite;
    constructor(frame: string, position: { x: number, y: number }) {
        super(PIXI.Texture.from(frame));
        this._frame = frame;   
        let image = new Image();
        image.src = this._frame;
        let baseTexture = new PIXI.BaseTexture(image);
        let texture = new PIXI.Texture(baseTexture);
        this._sprite = new PIXI.Sprite(texture);
        this.position.set(position.x, position.y);
    }
    
    //GETTER AND SETTER
    public get sprite(): PIXI.Sprite{
      return this._sprite;
    }

    public get frame(): string{
      return this._frame;
    }
}