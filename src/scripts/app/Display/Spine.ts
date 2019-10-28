import "pixi-spine";
export class Spine extends PIXI.spine.Spine {
    private _animationName: string[] = [];
    constructor(spine: PIXI.spine.Spine, position: { x: number, y: number }, anchor: { x: number, y: number }, animationName: { name: string[] }) {
        super(spine.spineData);
        this._animationName = animationName.name;
        this.state.timeScale = 1;
        this.position.set(position.x, position.y); 
    }

    public reversePlayAnimation(animationName: string, loop: boolean): void { 
    }

    public playAnimation(animationName: string, timeScale: number, loop: boolean): void {
        this.state.timeScale = timeScale;
        this.state.setAnimation(0, animationName, loop);
    }

    public setMixAll(duration: number): void {
        for (let i = 0; i < this.animationName.length; i++) {
            this.stateData.setMix(this.animationName()[i], this.animationName()[i++], duration);
        }
    }

    public setMix(fromName: string, toName: string, duration: number): void {
        this.stateData.setMix(fromName, toName, duration);
    }

    //GETTER AND SETTER 
    public animationName(): string[] {
        return this._animationName;
    }
 
    public trackLast(): number {
        return this.state.tracks[0].trackLast;
    }
}