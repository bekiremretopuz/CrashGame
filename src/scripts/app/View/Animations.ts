import { Base } from "app/EntryPoint";
import "pixi-spine";
import { Spine } from "app/Display/Spine";
import { TweenLite, Linear, Power0, Sine, Circ } from "gsap";
import { AdjustmentFilter } from "pixi-filters";
import { SequenceAnimation } from "app/Display/SequenceAnimation";

export const FlashPoints: any = {
    "0": { x: 580, y: 580 },
    "1": { x: 720, y: 490 },
    "2": { x: 340, y: 600 },
    "3": { x: 180, y: 730 },
    "4": { x: 600, y: 870 },
    "5": { x: 1380, y: 580 },
    "6": { x: 1170, y: 490 },
    "7": { x: 1420, y: 600 },
    "8": { x: 1680, y: 730 },
    "9": { x: 1230, y: 870 },
}

export const Character: any = {
    "0": "char7_dark.png",
    "1": "char6_dark.png",
    "2": "char5_dark.png",
    "3": "char4_dark.png",
    "4": "char3_dark.png",
    "5": "char2_dark.png",
    "6": "char1_dark.png"
}

export const JumpLogicBanner: any = { //Scale Banner Prop  
    "1": { x: 1.5, y: 2.6 },
    "100": { x: 1.7, y: 2.6 },
    "10000": { x: 1.85, y: 2.6 },
    "100000": { x: 2.1, y: 2.6 },
    "1000000": { x: 2.65, y: 2.7 },
}

export const JumpLogic: any = { // Multiplier Text Bounce Anim Properties
    "1": { x: 1, y: 1 },
    "2": { x: 1, y: 1 },
    "5": { x: 1, y: 1 },
    "10": { x: 1, y: 1 },
    "50": { x: 1, y: 1 },
    "500": { x: 1, y: 1 },
    "2500": { x: 1, y: 1 },
    "50000": { x: 1, y: 1 },
    "100000": { x: 1.25, y: 1.25 },
    "1000000": { x: 1.25, y: 1.25 },
    "10000000": { x: 1.25, y: 1.25 },
    "100000000": { x: 1.35, y: 1.35 },
    "1000000000": { x: 1.35, y: 1.35 },
    "10000000000": { x: 2, y: 1.5 },
}

export const BgLightAnimations: any = {
    "0": { light1: "char7_light1.png", light2: "char7_light1.png" },
    "1": { light1: "char6_light1.png", light2: "char6_light1.png" },
    "2": { light1: "char5_light1.png", light2: "char5_light1.png" },
    "3": { light1: "char4_light1.png", light2: "char4_light1.png" },
    "4": { light1: "char3_light1.png", light2: "char3_light1.png" },
    "5": { light1: "char2_light1.png", light2: "char2_light1.png" },
    "6": { light1: "char1_light1.png", light2: "char1_light1.png" },
}

const AnimationsNames: any = {
    OneIdlePreparing: { value: "0", animationName: "1.pose", failAnimation: "3to fail pose", loop: false },
    OneToTwoLifting: { value: "0", animationName: "1to2 pose", failAnimation: "3to fail pose", loop: false },
    TwoSmileShine: { value: "0", animationName: "2.pose", failAnimation: "3to fail pose", loop: false },
    TwoToTreeStrain: { value: "0", animationName: "2to3 pose", failAnimation: "3to fail pose", loop: false },
    TreePerspire: { value: "1", animationName: "3.pose", failAnimation: "3to fail pose", loop: true },
    TreeToFourPushUp: { value: "1.5", animationName: "3to4 pose", failAnimation: "3to fail pose", loop: false },
    FourLegsShake: { value: "2", animationName: "4.pose", failAnimation: "4to fail pose", loop: true },
    FourToFivePushUp2: { value: "2.5", animationName: "4to5 pose", failAnimation: "4to fail pose", loop: false },
    FiveBodyShake: { value: "5", animationName: "5.pose", failAnimation: "5to fail pose", loop: true },
    FiveToSixRagePush: { value: "5.5", animationName: "5to6 pose", failAnimation: "5to fail pose", loop: false },
    SixRageExpression: { value: "7", animationName: "6.pose", failAnimation: "6to fail pose", loop: true },
    SixToSevenScreamPush: { value: "7.5", animationName: "6to7 pose", failAnimation: "6to fail pose", loop: false },
    SevenScreamExpressionBendedBar: { value: "15", animationName: "7.pose", failAnimation: "7to fail pose", loop: true },
    SevenToEightGodPush: { value: "15.5", animationName: "7to8 pose", failAnimation: "7to fail pose", loop: false },
    EightOneHandLift: { value: "25", animationName: "8.pose", failAnimation: "8to fail pose", loop: true },
    EightRelaxFaceGodEyes: { value: "25", animationName: "8.pose", failAnimation: "8to fail pose", loop: true },
}

export class Animations extends PIXI.Container {
    private _game: Base.EntryPoint;
    private _characterContainer: PIXI.Container;
    private _characterAnimation: Spine;
    private _characterAnimationClone: Spine;
    private _smokeAnim: SequenceAnimation;
    private _multiplierText: PIXI.Text;
    private _crash: boolean;
    private _multiplier: number = 1;
    private _banner: PIXI.Sprite;
    private _bannerContainer: PIXI.Container;
    private _bgCharacterContainer: PIXI.Container;
    private _bgCharacter: PIXI.Sprite[] = [];
    private _bgCharacterLight: PIXI.Sprite[] = [];
    private _spotContainer: PIXI.Container;
    private _spotLeft: PIXI.Sprite;
    private _spotMiddle: PIXI.Sprite;
    private _spotRight: PIXI.Sprite;
    private _flagContainer: PIXI.Container;
    private _flagLeft: PIXI.Sprite;
    private _flagRight: PIXI.Sprite;
    private _arenaContainer: PIXI.Container;
    private _arena: PIXI.Sprite;
    private _rope: PIXI.Sprite;
    private _crowd0Ct: PIXI.Container;
    private _crowd1Ct: PIXI.Container;
    private _crowd2Ct: PIXI.Container;
    private _crowd3Ct: PIXI.Container;
    private _crowd1: PIXI.Sprite;
    private _crowd2: PIXI.Sprite;
    private _crowd3: PIXI.Sprite;
    private _stand0: PIXI.Sprite;
    private _stand1: PIXI.Sprite;
    private _stand2: PIXI.Sprite;
    private _smoke1: PIXI.Sprite;
    private _smoke2: PIXI.Sprite;
    private _smoke1Fake: PIXI.Sprite;
    private _smoke2Fake: PIXI.Sprite;
    private _flashContainer: PIXI.Container;
    private _flash: PIXI.Sprite[] = [];
    private _shadow2: PIXI.Sprite;
    private _portraitMode: boolean = false;
    private _mexicoWave1: TweenLite;
    private _mexicoWave2: TweenLite;
    private _mexicoWave3: TweenLite;
    private _mexicoWave4: TweenLite;
    private _spotLeftAnimation: TweenLite;
    private _spotRightAnimation: TweenLite;
    private _spotMiddleAnimation: TweenLite;
    private _bgLightAlphaAnimation: TweenLite;
    private _isFail: boolean = false;
    constructor() {
        super();
        this._game = Base.EntryPoint.instance;
        this.awake();
        this.initSpineEvents();
        this.initListeners();
    }

    private initListeners(): void {
        if (PIXI.utils.isMobile.any == true) {
            this._game.displayManager.on("orientationchanged", this.onOrientationChange, this);
        }
        else {
            this._game.displayManager.on("resize", this.onResize, this);
            this.onResize();
        }
    }

    private onResize(): void {
        let gameCanvas: any = document.getElementById("game-canvas"); 
        let gameCanvasWidth = gameCanvas.clientWidth;  
        if (gameCanvas && (gameCanvasWidth <= 475)) { //Portrait Desktop Mode 
            this.portraitMode = true;
            this._banner.visible = false;
            this._characterAnimation.position.set(110, 590);
            this._characterAnimationClone.position.set(110, 600);
            this._smokeAnim.scale.set(3.5, 3.5);
            this._characterAnimation.scale.set(2, 2);
            this._characterAnimationClone.scale.set(2, 2);
            this._characterAnimationClone.filters = [new AdjustmentFilter({ gamma: 1, contrast: 1, saturation: 1, brightness: 1, red: 0, green: 0, blue: 0, alpha: 1 })];
            this.multiplierText.position.y = 540;
            this._multiplierText.style.fontSize = 305;
        } else {
            this.portraitMode = false;
            this._banner.visible = true;
            this._characterAnimation.position.set(360, 260);
            this._characterAnimationClone.position.set(360, 260);
            this._characterAnimation.scale.set(1.5, 1.5);
            this._smokeAnim.scale.set(1.8, 1.3);
            this._characterAnimationClone.scale.set(1.5, 1.5);
            this._characterAnimationClone.filters = [];
            this.multiplierText.position.y = 130;
            this._multiplierText.style.fontSize = 250;
        }
    }

    private onOrientationChange(): void {
        let orientations: boolean = false;
        let gameCanvas: any = document.getElementById("game-canvas");
        let gameCanvasHeight = gameCanvas.clientHeight;
        let gameCanvasWidth = gameCanvas.clientWidth;
        if (gameCanvas && (gameCanvasHeight * 2 <= gameCanvasWidth)) orientations = true;
        else orientations = false;
        if (!orientations) { // Mobile Portrait Mode 
            this.portraitMode = true;
            this._banner.visible = false;
            this._characterAnimation.position.set(110, 590);
            this._characterAnimationClone.position.set(110, 600);
            this._smokeAnim.scale.set(3.5, 3.5);
            this._characterAnimation.scale.set(2, 2);
            this._characterAnimationClone.scale.set(2, 2);
            this._characterAnimationClone.filters = [new AdjustmentFilter({ gamma: 1, contrast: 1, saturation: 1, brightness: 1, red: 0, green: 0, blue: 0, alpha: 1 })];
            this.multiplierText.position.y = 540;
            this._multiplierText.style.fontSize = 305;

        } else {
            this.portraitMode = false;
            this._banner.visible = true;
            this._characterAnimation.position.set(360, 260);
            this._characterAnimationClone.position.set(360, 260);
            this._characterAnimation.scale.set(1.5, 1.5);
            this._smokeAnim.scale.set(1.8, 1.3);
            this._characterAnimationClone.scale.set(1.5, 1.5);
            this._characterAnimationClone.filters = [];
            this.multiplierText.position.y = 130;
            this._multiplierText.style.fontSize = 250;
        }
    }

    private awake(): void {
        //BGCharacter Container
        this._bgCharacterContainer = new PIXI.Container();
        this._bgCharacterContainer.name = "BGCHaracterContainer";
        this.addChild(this._bgCharacterContainer);

        this._crowd3Ct = new PIXI.Container();
        this._crowd3Ct.name = "Crowd3CT";
        this._bgCharacterContainer.addChild(this._crowd3Ct);

        this._crowd2Ct = new PIXI.Container();
        this._crowd2Ct.name = "Crowd2CT";
        this._bgCharacterContainer.addChild(this._crowd2Ct);

        this._crowd1Ct = new PIXI.Container();
        this._crowd1Ct.name = "Crowd1CT";
        this._bgCharacterContainer.addChild(this._crowd1Ct);

        //Spot Container 
        this._spotContainer = new PIXI.Container();
        this._spotContainer.name = "SpotContainer";
        this._bgCharacterContainer.addChild(this._spotContainer);

        this._spotLeft = new PIXI.Sprite(PIXI.Texture.from("spot_left"));
        this._spotLeft.anchor.set(0, 0);
        this._spotLeft.position.set(-170, 0);
        this._spotLeft.scale.set(2, 2);
        this._spotLeft.name = "SpotLeft";
        this._spotContainer.addChild(this._spotLeft);

        this._spotMiddle = new PIXI.Sprite(PIXI.Texture.from("spot_middle"));
        this._spotMiddle.anchor.set(0.5, 0);
        this._spotMiddle.position.set(930, 0);
        this._spotMiddle.scale.set(2, 2);
        this._spotMiddle.name = "SpotMiddle";
        this._spotContainer.addChild(this._spotMiddle);

        this._spotRight = new PIXI.Sprite(PIXI.Texture.from("spot_left"));
        this._spotRight.anchor.set(0, 0);
        this._spotRight.position.set(2080, 0);
        this._spotRight.scale.set(-2, 2);
        this._spotRight.name = "SpotRight";
        this._spotContainer.addChild(this._spotRight);

        this._crowd0Ct = new PIXI.Container();
        this._crowd0Ct.name = "Crowd0CT";

        this._bgCharacterContainer.addChild(this._crowd0Ct);
        this._bgCharacter = [];
        this._bgCharacterLight = [];

        this._crowd3 = new PIXI.Sprite(PIXI.Texture.from("crowd3"));
        this._crowd3.anchor.set(0.5, 0.9);
        this._crowd3.name = "Crowd3";
        this._crowd3.position.set(890, 810);
        this._crowd3Ct.addChild(this._crowd3);

        this._stand2 = new PIXI.Sprite(PIXI.Texture.from("stand2"));
        this._stand2.anchor.set(0.5, 0.5);
        this._stand2.position.set(970, 790);
        this._stand2.name = "Stand2";
        this._crowd3Ct.addChild(this._stand2);

        this._smoke2Fake = new PIXI.Sprite(PIXI.Texture.from("smoke2"));
        this._smoke2Fake.anchor.set(0.5, 0.5);
        this._smoke2Fake.scale.set(2, 2);
        this._smoke2Fake.position.set(920, 560);
        this._smoke2Fake.name = "Smoke2Fake";
        this._crowd2Ct.addChild(this._smoke2Fake);

        this._smoke2 = new PIXI.Sprite(PIXI.Texture.from("smoke2"));
        this._smoke2.anchor.set(0.5, 0.5);
        this._smoke2.scale.set(2, 2);
        this._smoke2.position.set(920, 560);
        this._smoke2.name = "Smoke2";
        this._crowd2Ct.addChild(this._smoke2);

        this._crowd2 = new PIXI.Sprite(PIXI.Texture.from("crowd2"));
        this._crowd2.anchor.set(0.5, 0.9);
        this._crowd2.name = "Crowd2";
        this._crowd2.position.set(920, 940);
        this._crowd2Ct.addChild(this._crowd2);

        this._stand1 = new PIXI.Sprite(PIXI.Texture.from("stand1"));
        this._stand1.anchor.set(0.5, 0.5);
        this._stand1.position.set(960, 920);
        this._stand1.name = "Stand1";
        this._crowd1Ct.addChild(this._stand1);

        this._smoke1Fake = new PIXI.Sprite(PIXI.Texture.from("smoke1"));
        this._smoke1Fake.anchor.set(0.5, 0.5);
        this._smoke1Fake.scale.set(2, 2);
        this._smoke1Fake.position.set(920, 700);
        this._smoke1Fake.name = "Smoke1Fake";
        this._crowd1Ct.addChild(this._smoke1Fake);

        this._smoke1 = new PIXI.Sprite(PIXI.Texture.from("smoke1"));
        this._smoke1.anchor.set(0.5, 0.5);
        this._smoke1.scale.set(2, 2);
        this._smoke1.position.set(920, 700);
        this._smoke1.name = "Smoke1";
        this._crowd1Ct.addChild(this._smoke1);

        this._crowd1 = new PIXI.Sprite(PIXI.Texture.from("crowd1"));
        this._crowd1.anchor.set(0.5, 0.9);
        this._crowd1.name = "Crowd1";
        this._crowd1.position.set(960, 1080);
        this._crowd1Ct.addChild(this._crowd1);

        this._shadow2 = new PIXI.Sprite(PIXI.Texture.from("shadow"));
        this._shadow2.anchor.set(0.5, 0.5);
        this._shadow2.scale.set(-3, 5);
        this._shadow2.rotation = 300;
        this._shadow2.position.set(960, 877);
        this._shadow2.name = "Shadow2";
        this.addChild(this._shadow2);

        this._stand0 = new PIXI.Sprite(PIXI.Texture.from("stand1"));
        this._stand0.anchor.set(0.5, 0.5);
        this._stand0.position.set(960, 1140);
        this._stand0.name = "Stand0";
        this._stand0.visible = false;
        this._crowd0Ct.addChild(this._stand0);

        for (let i = 0; i < 7; i++) {
            this._bgCharacter[i] = new PIXI.Sprite(PIXI.Texture.from(Character[i]));
            this._bgCharacter[i].anchor.set(0.5, 0.9);
            this._bgCharacter[i].position.set(160 + (i * 270), 1120);
            this._bgCharacter[i].rotation = 0;
            this._bgCharacter[i].name = "BGCharacter" + i;
            this._crowd0Ct.addChild(this._bgCharacter[i]);

            this._bgCharacterLight[i] = new PIXI.Sprite(PIXI.Texture.from(BgLightAnimations[i].light1));
            this._bgCharacterLight[i].anchor.set(0.5, 0.9);
            this._bgCharacterLight[i].rotation = 0;
            this._bgCharacterLight[i].visible = false;
            this._bgCharacterLight[i].name = "BGCharacterLigth" + i;
            this._bgCharacter[i].addChild(this._bgCharacterLight[i]);
        }
        //Flash Container
        this._flash = [];
        this._flashContainer = new PIXI.Container();
        this._flashContainer.name = "FlashContainer";
        this.addChild(this._flashContainer);

        this._flash[0] = new PIXI.Sprite(PIXI.Texture.from("flash"));
        this._flash[0].anchor.set(0.5, 0.5);
        this._flash[0].name = "Flash";
        this._flash[0].position.set(580, 580);
        this._flash[0].scale.set(0, 0);
        this._flash[0].alpha = 0;
        this._flashContainer.addChild(this._flash[0]);

        //Flag Container
        this._flagContainer = new PIXI.Container();
        this._flagContainer.name = "FlagContainer";
        this.addChild(this._flagContainer);

        this._flagLeft = new PIXI.Sprite(PIXI.Texture.from("flag"));
        this._flagLeft.anchor.set(0.5, 0.5);
        this._flagLeft.position.set(130, 100);
        this._flagLeft.name = "FlagLeft";
        this._flagContainer.addChild(this._flagLeft);

        this._flagRight = new PIXI.Sprite(PIXI.Texture.from("flag"));
        this._flagRight.anchor.set(0.5, 0.5);
        this._flagRight.position.set(1780, 100);
        this._flagRight.name = "FlagRight";
        this._flagContainer.addChild(this._flagRight);

        //Banner Container
        this._bannerContainer = new PIXI.Container();
        this._bannerContainer.name = "BannerContainer";
        this.addChild(this._bannerContainer);

        //Banner
        this._banner = new PIXI.Sprite(PIXI.Texture.from("banner_big"));
        this._banner.anchor.set(0.5, 0.5);
        this._banner.scale.set(1.5, 2.3);
        this._banner.position.set(960, 97);
        this._banner.name = "Banner";
        this._bannerContainer.addChild(this._banner);

        //MultiplierText
        this._multiplierText = new PIXI.Text("", {
            fontFamily: "Luckiest Guy",
            fontSize: 225,
            fontWeight: "400",
            fill: "#ffffff",
            align: "center",
        });
        this._multiplierText.position.set(960, 110);
        this._multiplierText.anchor.set(0.5, 0.5);
        this._multiplierText.name = "MultiplierText ";
        this._bannerContainer.addChild(this._multiplierText);
        this.setMultiplierText(1.00);

        //Arena Container
        this._arenaContainer = new PIXI.Container();
        this._arenaContainer.name = "ArenaContainer";
        this.addChild(this._arenaContainer);

        this._arena = new PIXI.Sprite(PIXI.Texture.from("arena"));
        this._arena.anchor.set(0.5, 0.5);
        this._arena.scale.x = 2;
        this._arena.position.set(960, 1375);
        this._arena.name = "Arena";
        this._arenaContainer.addChild(this._arena);

        this._rope = new PIXI.Sprite(PIXI.Texture.from("rope"));
        this._rope.anchor.set(0.5, 0.5);
        this._rope.scale.x = 2;
        this._rope.position.set(960, 1040);
        this._rope.name = "Rope";
        this._arenaContainer.addChild(this._rope);

        this._characterContainer = new PIXI.Container();
        this._characterContainer.name = "CharacterContainer";
        this._arenaContainer.addChild(this._characterContainer);

        this._characterAnimation = new Spine(this._game.resource.loader.resources.character, { x: 360, y: 260 }, { x: 0.5, y: 0.5 }, {
            name: [
                AnimationsNames.OneIdlePreparing.animationName, AnimationsNames.OneToTwoLifting.animationName,
                AnimationsNames.TwoSmileShine.animationName, AnimationsNames.TwoToTreeStrain.animationName,
                AnimationsNames.TreePerspire.animationName, AnimationsNames.TreeToFourPushUp.animationName, AnimationsNames.TreePerspire.failAnimation,
                AnimationsNames.FourLegsShake.animationName, AnimationsNames.FourToFivePushUp2.animationName, AnimationsNames.FourLegsShake.failAnimation,
                AnimationsNames.FiveBodyShake.animationName, AnimationsNames.FiveToSixRagePush.animationName, AnimationsNames.FiveBodyShake.failAnimation,
                AnimationsNames.SixRageExpression.animationName, AnimationsNames.SixToSevenScreamPush.animationName, AnimationsNames.SixRageExpression.failAnimation,
                AnimationsNames.SevenScreamExpressionBendedBar.animationName, AnimationsNames.SevenToEightGodPush.animationName, AnimationsNames.SevenScreamExpressionBendedBar.failAnimation,
                AnimationsNames.EightOneHandLift.animationName, AnimationsNames.EightOneHandLift.failAnimation,
            ]
        });
        this._characterAnimation.stateData.setMix(AnimationsNames.OneIdlePreparing.animationName, AnimationsNames.OneToTwoLifting.animationName, 0.01);
        this._characterAnimation.stateData.setMix(AnimationsNames.OneIdlePreparing.animationName, AnimationsNames.OneIdlePreparing.animationName, 0.1);

        this._characterAnimation.stateData.setMix(AnimationsNames.OneToTwoLifting.animationName, AnimationsNames.TwoToTreeStrain.animationName, 0.1);
        this._characterAnimation.stateData.setMix(AnimationsNames.TwoToTreeStrain.animationName, AnimationsNames.TreePerspire.animationName, 0.1);

        this._characterAnimation.stateData.setMix(AnimationsNames.TreePerspire.animationName, AnimationsNames.TreeToFourPushUp.animationName, 0.1);
        this._characterAnimation.stateData.setMix(AnimationsNames.TreePerspire.animationName, AnimationsNames.TreePerspire.failAnimation, 0.1);

        this._characterAnimation.stateData.setMix(AnimationsNames.TreeToFourPushUp.animationName, AnimationsNames.FourLegsShake.animationName, 0.1);
        this._characterAnimation.stateData.setMix(AnimationsNames.TreeToFourPushUp.animationName, AnimationsNames.FourLegsShake.failAnimation, 0.1);

        this._characterAnimation.stateData.setMix(AnimationsNames.FourLegsShake.animationName, AnimationsNames.FiveBodyShake.animationName, 0.1);
        this._characterAnimation.stateData.setMix(AnimationsNames.FourLegsShake.animationName, AnimationsNames.FourLegsShake.failAnimation, 0.1);

        this._characterAnimation.stateData.setMix(AnimationsNames.FiveBodyShake.animationName, AnimationsNames.SixRageExpression.animationName, 0.1);
        this._characterAnimation.stateData.setMix(AnimationsNames.FiveBodyShake.animationName, AnimationsNames.FiveBodyShake.failAnimation, 0.1);

        this._characterAnimation.stateData.setMix(AnimationsNames.SixRageExpression.animationName, AnimationsNames.SevenScreamExpressionBendedBar.animationName, 0.1);
        this._characterAnimation.stateData.setMix(AnimationsNames.SixRageExpression.animationName, AnimationsNames.SixRageExpression.failAnimation, 0.1);

        this._characterAnimation.stateData.setMix(AnimationsNames.SevenScreamExpressionBendedBar.animationName, AnimationsNames.EightOneHandLift.animationName, 0.1);
        this._characterAnimation.stateData.setMix(AnimationsNames.SevenScreamExpressionBendedBar.animationName, AnimationsNames.SevenScreamExpressionBendedBar.failAnimation, 0.1);

        this._characterAnimation.stateData.setMix(AnimationsNames.EightOneHandLift.animationName, AnimationsNames.EightOneHandLift.animationName, 0.1);
        this._characterAnimation.stateData.setMix(AnimationsNames.EightOneHandLift.animationName, AnimationsNames.EightOneHandLift.failAnimation, 0.1);

        this._characterAnimation.scale.set(1.5, 1.5);
        this._characterAnimation.name = "SpineBoyAnim";
        this._characterAnimation.playAnimation(AnimationsNames.OneIdlePreparing.animationName, 1, true);
        this._characterAnimation.state.timeScale = 1;
        this._characterContainer.addChild(this._characterAnimation);

        this._characterAnimationClone = new Spine(this._game.resource.loader.resources.character, { x: 360, y: 260 }, { x: 0.5, y: 0.5 }, {
            name: [
                AnimationsNames.OneIdlePreparing.animationName, AnimationsNames.OneToTwoLifting.animationName,
                AnimationsNames.TwoSmileShine.animationName, AnimationsNames.TwoToTreeStrain.animationName,
                AnimationsNames.TreePerspire.animationName, AnimationsNames.TreeToFourPushUp.animationName, AnimationsNames.TreePerspire.failAnimation,
                AnimationsNames.FourLegsShake.animationName, AnimationsNames.FourToFivePushUp2.animationName, AnimationsNames.FourLegsShake.failAnimation,
                AnimationsNames.FiveBodyShake.animationName, AnimationsNames.FiveToSixRagePush.animationName, AnimationsNames.FiveBodyShake.failAnimation,
                AnimationsNames.SixRageExpression.animationName, AnimationsNames.SixToSevenScreamPush.animationName, AnimationsNames.SixRageExpression.failAnimation,
                AnimationsNames.SevenScreamExpressionBendedBar.animationName, AnimationsNames.SevenToEightGodPush.animationName, AnimationsNames.SevenScreamExpressionBendedBar.failAnimation,
                AnimationsNames.EightOneHandLift.animationName, AnimationsNames.EightOneHandLift.failAnimation,
            ]
        });
        this._characterAnimationClone.scale.set(1.5, 1.5);
        this._characterAnimationClone.stateData.setMix(AnimationsNames.OneIdlePreparing.animationName, AnimationsNames.OneToTwoLifting.animationName, 0.01);
        this._characterAnimationClone.stateData.setMix(AnimationsNames.OneIdlePreparing.animationName, AnimationsNames.OneIdlePreparing.animationName, 0.1);

        this._characterAnimationClone.stateData.setMix(AnimationsNames.OneToTwoLifting.animationName, AnimationsNames.TwoToTreeStrain.animationName, 0.1);
        this._characterAnimationClone.stateData.setMix(AnimationsNames.TwoToTreeStrain.animationName, AnimationsNames.TreePerspire.animationName, 0.1);

        this._characterAnimationClone.stateData.setMix(AnimationsNames.TreePerspire.animationName, AnimationsNames.TreeToFourPushUp.animationName, 0.1);
        this._characterAnimationClone.stateData.setMix(AnimationsNames.TreePerspire.animationName, AnimationsNames.TreePerspire.failAnimation, 0.1);

        this._characterAnimationClone.stateData.setMix(AnimationsNames.TreeToFourPushUp.animationName, AnimationsNames.FourLegsShake.animationName, 0.1);
        this._characterAnimationClone.stateData.setMix(AnimationsNames.TreeToFourPushUp.animationName, AnimationsNames.FourLegsShake.failAnimation, 0.1);

        this._characterAnimationClone.stateData.setMix(AnimationsNames.FourLegsShake.animationName, AnimationsNames.FiveBodyShake.animationName, 0.1);
        this._characterAnimationClone.stateData.setMix(AnimationsNames.FourLegsShake.animationName, AnimationsNames.FourLegsShake.failAnimation, 0.1);

        this._characterAnimationClone.stateData.setMix(AnimationsNames.FiveBodyShake.animationName, AnimationsNames.SixRageExpression.animationName, 0.1);
        this._characterAnimationClone.stateData.setMix(AnimationsNames.FiveBodyShake.animationName, AnimationsNames.FiveBodyShake.failAnimation, 0.1);

        this._characterAnimationClone.stateData.setMix(AnimationsNames.SixRageExpression.animationName, AnimationsNames.SevenScreamExpressionBendedBar.animationName, 0.1);
        this._characterAnimationClone.stateData.setMix(AnimationsNames.SixRageExpression.animationName, AnimationsNames.SixRageExpression.failAnimation, 0.1);

        this._characterAnimationClone.stateData.setMix(AnimationsNames.SevenScreamExpressionBendedBar.animationName, AnimationsNames.EightOneHandLift.animationName, 0.1);
        this._characterAnimationClone.stateData.setMix(AnimationsNames.SevenScreamExpressionBendedBar.animationName, AnimationsNames.SevenScreamExpressionBendedBar.failAnimation, 0.1);

        this._characterAnimationClone.stateData.setMix(AnimationsNames.EightOneHandLift.animationName, AnimationsNames.EightOneHandLift.animationName, 0.1);
        this._characterAnimationClone.stateData.setMix(AnimationsNames.EightOneHandLift.animationName, AnimationsNames.EightOneHandLift.failAnimation, 0.1);

        this._characterAnimationClone.name = "SpineBoyAnimClone";
        this._characterAnimationClone.state.timeScale = 1;
        this._characterAnimationClone.playAnimation(AnimationsNames.OneIdlePreparing.animationName, 1, true);
        this._characterContainer.addChild(this._characterAnimationClone);

        this._smokeAnim = new SequenceAnimation("", 18, { x: 980, y: 1080 });
        this._smokeAnim.animationSpeed = 0.33;
        this._smokeAnim.scale.set(1.8, 1.3);
        this._smokeAnim.loop = false;
        this._smokeAnim.gotoAndPlay(18);
        this._smokeAnim.name = "SmokeAnim";
        this._smokeAnim.anchor.set(0.5, 0.5);
        this.addChild(this._smokeAnim);

        //Init Animations
        this.on("animationstatus", this.onCrashEventHandler, this);
        this.idleBackgroundAnimation();
        this.idleBackgroundLightAnimation();
        this.lightCharacterAnimations(this._bgCharacterLight[0], 0);
        this.flashAnimation(false);
        this.startGameProperties();
    }

    public test(): void {
        let i: number = 0.75;
        setInterval(() => {
            i += Math.random() * 0.75;
            this.setMultiplierText(i);
        }, 500);
    }

    public startGameProperties(): void {
        this._characterAnimation.playAnimation(AnimationsNames.TreePerspire.animationName, 1, true);
        this._characterAnimationClone.playAnimation(AnimationsNames.TreePerspire.animationName, 1, true);
        this.setMultiplierText(1.00);
    }



    public finishIdlePreparing2(): void {  
        this._characterAnimation.state.addListener({
            complete: (e: any) => {
                if (e.animation.name == AnimationsNames.TwoSmileShine.animationName) {
                    this._characterAnimation.playAnimation(AnimationsNames.TwoToTreeStrain.animationName, 1, false);
                    this._characterAnimationClone.playAnimation(AnimationsNames.TwoToTreeStrain.animationName, 1, false);
                }
                if (e.animation.name == AnimationsNames.TwoToTreeStrain.animationName) {
                    this._characterAnimation.playAnimation(AnimationsNames.TreePerspire.animationName, 1, true);
                    this._characterAnimationClone.playAnimation(AnimationsNames.TreePerspire.animationName, 1, true);
                }
            }
        });
    }  

    public finishIdlePreparing(): void {
        this._characterAnimation.playAnimation(AnimationsNames.OneIdlePreparing.animationName, 1, false);
        this._characterAnimationClone.playAnimation(AnimationsNames.OneIdlePreparing.animationName, 1, false);
        this._characterAnimation.state.addListener({
            complete: (e: any) => {
                if (e.animation.name == AnimationsNames.OneIdlePreparing.animationName) {
                    this._characterAnimation.playAnimation(AnimationsNames.OneToTwoLifting.animationName, 1, false);
                    this._characterAnimationClone.playAnimation(AnimationsNames.OneToTwoLifting.animationName, 1, false);
                }
                if (e.animation.name == AnimationsNames.OneToTwoLifting.animationName) {
                    this._characterAnimation.playAnimation(AnimationsNames.TwoSmileShine.animationName, 1, true);
                    this._characterAnimationClone.playAnimation(AnimationsNames.TwoSmileShine.animationName, 1, true);
                }
            }
        });
    }

    private onCrashEventHandler(action: string, value: any): void {
        switch (action) {
            case "crash":
                switch (value) {
                    case true:
                        const cloneThis = this;
                        Object.keys(AnimationsNames).forEach(function (item: any) {
                            if (cloneThis._characterAnimation.state.tracks[0].animation.name == AnimationsNames[item].animationName) {
                                cloneThis._characterAnimation.playAnimation(AnimationsNames[item].failAnimation, 1, false);
                                cloneThis._characterAnimationClone.playAnimation(AnimationsNames[item].failAnimation, 1, false);
                                setTimeout(() => {
                                    cloneThis._smokeAnim.gotoAndPlay(0);
                                }, 100);
                            }
                        });
                        break;
                    case false:
                        this.startGameProperties();
                        break;
                }
        }
    }

    private initSpineEvents(): void {
        this._characterAnimation.state.addListener({
            complete: (e: any) => {
                if (e.animation.name == AnimationsNames.TreeToFourPushUp.animationName) {
                    this._characterAnimation.playAnimation(AnimationsNames.FourLegsShake.animationName, 1, AnimationsNames.FourLegsShake.loop);
                }
                if (e.animation.name == AnimationsNames.FourToFivePushUp2.animationName) {
                    this._characterAnimation.playAnimation(AnimationsNames.FiveBodyShake.animationName, 1, AnimationsNames.FiveBodyShake.loop);
                }
                if (e.animation.name == AnimationsNames.FiveToSixRagePush.animationName) {
                    this._characterAnimation.playAnimation(AnimationsNames.SixRageExpression.animationName, 1, AnimationsNames.SixRageExpression.loop);
                }
                if (e.animation.name == AnimationsNames.SixToSevenScreamPush.animationName) {
                    this._characterAnimation.playAnimation(AnimationsNames.SevenToEightGodPush.animationName, 1, AnimationsNames.SevenToEightGodPush.loop);
                }
                if (e.animation.name == AnimationsNames.SevenToEightGodPush.animationName) {
                    this._characterAnimation.playAnimation(AnimationsNames.EightOneHandLift.animationName, 1, AnimationsNames.EightOneHandLift.loop);
                }
                if (e.animation.name == AnimationsNames.TreePerspire.failAnimation ||
                    e.animation.name == AnimationsNames.FourLegsShake.failAnimation ||
                    e.animation.name == AnimationsNames.FiveBodyShake.failAnimation ||
                    e.animation.name == AnimationsNames.SixRageExpression.failAnimation ||
                    e.animation.name == AnimationsNames.SevenToEightGodPush.failAnimation ||
                    e.animation.name == AnimationsNames.EightOneHandLift.failAnimation) {
                    this.failAnimation();
                    setTimeout(() => {
                        this.emit("animationstatus", "crashed", true);
                    }, 1000);
                }
            }
        });

        this._characterAnimationClone.state.addListener({
            complete: (e: any) => {
                if (e.animation.name == AnimationsNames.TreeToFourPushUp.animationName) {
                    this._characterAnimationClone.playAnimation(AnimationsNames.FourLegsShake.animationName, 1, AnimationsNames.FourLegsShake.loop);
                }
                if (e.animation.name == AnimationsNames.FourToFivePushUp2.animationName) {
                    this._characterAnimationClone.playAnimation(AnimationsNames.FiveBodyShake.animationName, 1, AnimationsNames.FiveBodyShake.loop);
                }
                if (e.animation.name == AnimationsNames.FiveToSixRagePush.animationName) {
                    this._characterAnimationClone.playAnimation(AnimationsNames.SixRageExpression.animationName, 1, AnimationsNames.SixRageExpression.loop);
                }
                if (e.animation.name == AnimationsNames.SixToSevenScreamPush.animationName) {
                    this._characterAnimationClone.playAnimation(AnimationsNames.SevenToEightGodPush.animationName, 1, AnimationsNames.SevenToEightGodPush.loop);
                }
                if (e.animation.name == AnimationsNames.SevenToEightGodPush.animationName) {
                    this._characterAnimationClone.playAnimation(AnimationsNames.EightOneHandLift.animationName, 1, AnimationsNames.EightOneHandLift.loop);
                }
            }
        });
    }

    public multiplierTextHandler(value: any): void {
        const cloneThis = this;
        loop1:
        for (let items in JumpLogicBanner) {
            if (Number(items) >= value) {
                if ((cloneThis._banner.scale.x != JumpLogicBanner[items].x)) {
                    TweenLite.to(cloneThis._banner.scale, 0.15, { x: JumpLogicBanner[items].x, y: JumpLogicBanner[items].y, ease: Power0.easeNone });
                }
                break loop1;
            }
        }

        loop2:
        for (let items in JumpLogic) {
            if (Number(items) == value) {
                cloneThis.smokeAnimation();
                //Multiplier Text One Shot Bounce Animation
                let scale: number = 1;
                let toScale: number = 1.5;
                TweenLite.to(cloneThis._multiplierText.scale, 0.125, {
                    x: toScale, y: toScale, onComplete: () => {
                        TweenLite.to(cloneThis._multiplierText.scale, 0.125, {
                            x: scale, y: scale
                        });
                    }
                });
                break loop2;
            }
        }

        //Set Spine Animation 
        loop3:
        for (let item in AnimationsNames) {
            if (Number(AnimationsNames[item].value) >= value) {
                if (cloneThis._characterAnimation.state.tracks[0] && cloneThis._characterAnimation.state.tracks[0].animation.name != AnimationsNames[item].animationName) {
                    cloneThis._characterAnimationClone.playAnimation(AnimationsNames[item].animationName, 1, AnimationsNames[item].loop);
                    cloneThis._characterAnimation.playAnimation(AnimationsNames[item].animationName, 1, AnimationsNames[item].loop);
                }
                break loop3;
            }
        }
    }

    private getRandomFlashPoints(): { x: number, y: number } {
        const randomPosition: any = FlashPoints[Math.floor(Math.random() * 10)];
        return { x: randomPosition.x, y: randomPosition.y };

    }

    private flashAnimation(isJumpState: boolean): void {
        if (this.isFail == false) {
            let posX = this.getRandomFlashPoints().x;
            let posY = this.getRandomFlashPoints().y;
            if (this._flash[0].position.x == posX) {
                this.flashAnimation(isJumpState);
            } else {
                this._flash[0].position.set(posX, posY);
                this._flash[0].alpha = 0;
                this._flash[0].scale.set(0, 0);
                TweenLite.to(this._flash[0], 0.1, { alpha: 1 });
                TweenLite.to(this._flash[0].scale, 0.1, {
                    x: 1, y: 1,
                    onComplete: () => {
                        if (this.isFail == false) {
                            TweenLite.to(this._flash[0].scale, 0.2, {
                                x: 1.4, y: 1.4, ease: Linear.easeIn, onComplete: () => {
                                    if (this.isFail == false) {
                                        TweenLite.to(this._flash[0], 0.1, { alpha: 0 });
                                        TweenLite.to(this._flash[0].scale, 0.1, {
                                            x: 1, y: 1, onComplete: () => {
                                                let duration: number = 0;
                                                if (isJumpState) duration = 1;
                                                else duration = 250;
                                                setTimeout(() => {
                                                    if (this.isFail == false)
                                                        this.flashAnimation(isJumpState);
                                                }, duration);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    }

    private smokeAnimation(): void {
        let durationSmoke1: number = Math.random() * 0.5 + 5.5;
        let durationSmoke2: number = Math.random() * 0.5 + 2.5;
        this._smoke1.scale.set(1, 1);
        this._smoke1.position.y = 700;
        this._smoke1.alpha = 1;
        this._smoke2.scale.set(1, 1);
        this._smoke2.position.y = 560;
        this._smoke2.alpha = 1;
        TweenLite.to(this._smoke1.position, durationSmoke1, { y: 0 });
        TweenLite.to(this._smoke1.scale, durationSmoke1 + 2, { x: 2, y: 0 });
        TweenLite.to(this._smoke1, durationSmoke1 + 1.5, { alpha: 0 });
        TweenLite.to(this._smoke2.position, durationSmoke2, { y: 100 });
        TweenLite.to(this._smoke2, durationSmoke2 + 1.5, { alpha: 0 });
        TweenLite.to(this._smoke2.scale, durationSmoke2 + 2, { x: 2, y: 0 });
    }


    public failAnimation(): void {
        this.isFail = true;
        this._spotLeftAnimation.seek(0);
        this._spotLeftAnimation.pause();
        TweenLite.killTweensOf(this._spotLeftAnimation);
        this._spotLeftAnimation.kill();

        this._spotMiddleAnimation.seek(0);
        this._spotMiddleAnimation.pause();
        TweenLite.killTweensOf(this._spotMiddleAnimation);
        this._spotMiddleAnimation.kill();

        this._spotRightAnimation.seek(0);
        this._spotRightAnimation.pause();
        TweenLite.killTweensOf(this._spotRightAnimation);
        this._spotRightAnimation.kill();

        this._bgLightAlphaAnimation.seek(0);
        this._bgLightAlphaAnimation.pause();
        TweenLite.killTweensOf(this._bgLightAlphaAnimation);
        this._bgLightAlphaAnimation.kill();

        this._spotLeft.tint = 0xff504e;
        this._spotMiddle.tint = 0xff504e;
        this._spotRight.tint = 0xff504e;
    }

    public resumeAnimation(): void {
        this.isFail = false;
        this._spotLeft.tint = 0xffffff;
        this._spotMiddle.tint = 0xffffff;
        this._spotRight.tint = 0xffffff;

        this._bgLightAlphaAnimation.resume();
        this._spotRightAnimation.resume();
        this._spotLeftAnimation.resume();
        this._spotMiddleAnimation.resume();

        this.idleBackgroundAnimation();
        this.idleBackgroundLightAnimation();
        this.lightCharacterAnimations(this._bgCharacterLight[0], 0);
        this.flashAnimation(false);
    }

    private idleBackgroundAnimation(): void {
        if (this.isFail == false) {
            let firstOrder = [this._bgCharacter[0].scale, this._bgCharacter[1].scale, this._bgCharacter[2].scale, this._bgCharacter[3].scale, this._bgCharacter[4].scale, this._bgCharacter[5].scale, this._bgCharacter[6].scale];
            this._mexicoWave1 = TweenLite.to(this._crowd3.scale, 0.4, {
                y: 1.1, ease: Circ.easeOut,
                onStart: () => {
                    setTimeout(() => {
                        if (this.isFail == false) {
                            this._mexicoWave2 = TweenLite.to(this._crowd2.scale, 0.4, {
                                y: 1.1, ease: Circ.easeOut,
                                onStart: () => {
                                    setTimeout(() => {
                                        if (this.isFail == false) {
                                            this._mexicoWave3 = TweenLite.to(this._crowd1.scale, 0.4, {
                                                y: 1.1, ease: Circ.easeOut,
                                                onStart: () => {
                                                    setTimeout(() => {
                                                        if (this.isFail == false) {
                                                            this._mexicoWave4 = TweenLite.to(firstOrder, 0.4, {
                                                                y: 1.1, ease: Circ.easeOut,
                                                                onStart: () => {
                                                                    setTimeout(() => {
                                                                        if (this.isFail == false) {
                                                                            this.idleBackgroundAnimation();
                                                                        }
                                                                    }, 225);
                                                                },
                                                                onComplete: () => {
                                                                    if (this.isFail == false)
                                                                        TweenLite.to(firstOrder, 0.4, { y: 1, ease: Circ.easeOut });
                                                                }
                                                            });
                                                        }
                                                    }, 225);
                                                },
                                                onComplete: () => {
                                                    if (this.isFail == false)
                                                        TweenLite.to(this._crowd1.scale, 0.4, { y: 1, ease: Circ.easeOut });
                                                }
                                            });
                                        }
                                    }, 225);
                                },
                                onComplete: () => {
                                    if (this.isFail == false)
                                        TweenLite.to(this._crowd2.scale, 0.4, { y: 1, ease: Circ.easeOut });
                                }
                            });
                        }
                    }, 225);
                },
                onComplete: () => {
                    if (this.isFail == false)
                        TweenLite.to(this._crowd3.scale, 0.4, { y: 1, ease: Circ.easeOut });
                }
            });
        }
    }

    private lightCharacterAnimations(character: PIXI.Sprite, counter: number): void {
        if (this.isFail == false) {
            let duration = Math.random() * 0.1 + 0.1;
            let durationRecursive = Math.random() * 0.5 + 0.5;
            let delay = Math.random() * 0.1 + 0.15;
            character.visible = false;
            this._bgLightAlphaAnimation = TweenLite.to(character, duration, {
                alpha: 0, delay: delay, ease: Sine.easeIn,
                onStart: () => {
                    character.alpha = 1;
                    character.visible = true;
                },
                onComplete: () => {
                    let randomLight: boolean = (Math.random() < 0.5) ? true : false;
                    let spots = BgLightAnimations[counter].light2;
                    if (randomLight) spots;
                    else spots = BgLightAnimations[counter].light1;
                    character.texture = PIXI.Texture.from(spots);
                    duration = Math.random() * 0.1 + 0.1;
                    delay = Math.random() * 0.1 + 0.15;
                    durationRecursive = Math.random() * 0.5 + 0.5;
                    this._bgCharacterLight[counter].visible = false;
                    let characterSequence = Math.floor(Math.random() * 6);

                    setTimeout(() => {
                        if (this.isFail == false)
                            this.lightCharacterAnimations(this._bgCharacterLight[characterSequence], characterSequence);
                    }, durationRecursive);
                }
            });
        }
    }

    private idleBackgroundLightAnimation(): void {
        let leftSpotRotation = Math.random() * 0.1 + 0.1;
        let durationLeft: number = Math.random() * 0.5 + 0.75;
        this._spotLeftAnimation = TweenLite.to(this._spotLeft, durationLeft, {
            rotation: -leftSpotRotation, onComplete: () => {
                TweenLite.to(this._spotLeft, durationLeft, {
                    rotation: 0, onComplete: () => {
                        leftSpotRotation = Math.random() * 0.15 + 0.1;
                        durationLeft = Math.random() * 0.5 + 0.75;
                        if (this.isFail == false)
                            this._spotLeftAnimation.restart(false);
                    }
                });
            }
        });
        let midSpotRotation = Math.random() * 0.8 + 1;
        let durationMid: number = Math.random() * 0.5 + 0.75;
        this._spotMiddleAnimation = TweenLite.to(this._spotMiddle.scale, durationMid, {
            y: midSpotRotation,
            onStart: () => {
                TweenLite.to(this._spotMiddle, 0.2, { alpha: 0.8 });
            },
            onComplete: () => {
                TweenLite.to(this._spotMiddle.scale, durationMid, {
                    x: 2, y: 2,
                    onStart: () => {
                        TweenLite.to(this._spotMiddle, 0.2, { alpha: 1 });
                    },
                    onComplete: () => {
                        durationMid = Math.random() * 0.5 + 0.75;
                        midSpotRotation = (Math.random() * 0.8) + 1;
                        if (this.isFail == false)
                            this._spotMiddleAnimation.restart();
                    }
                });
            }
        });
        let durationRight: number = Math.random() * 0.5 + 0.75;
        let rightSpotRotation = Math.random() * 0.1 + 0.1;
        this._spotRightAnimation = TweenLite.to(this._spotRight, durationRight, {
            rotation: rightSpotRotation, onComplete: () => {
                TweenLite.to(this._spotRight, durationRight, {
                    rotation: 0, onComplete: () => {
                        rightSpotRotation = Math.random() * 0.15 + 0.1;
                        durationLeft = Math.random() * 0.5 + 0.75;
                        if (this.isFail == false)
                            this._spotRightAnimation.restart(false);
                    }
                });
            }
        });
    }

    //GETTER AND SETTER 
    public get crash(): boolean {
        return this._crash;
    }

    public set crash(value: boolean) {
        if (this._crash != value) {
            this._crash = value;
            this.emit("animationstatus", "crash", value);
        }
        if (value == false) { //Dimmerı kapatmak için.
            this.emit("animationstatus", "crashed", false);
        }
    }

    public get multiplierText(): PIXI.Text {
        return this._multiplierText;
    }

    public setMultiplierText(value: any) {
        this._multiplierText.text = value.toFixed(2) + "X";
        const values = Math.floor(Number(value));
        if (values != this.multiplier) {
            this.multiplierTextHandler(values);
            this.multiplier = values;
        }
    }

    public get multiplier(): number {
        return this._multiplier;
    }

    public set multiplier(value: number) {
        if (this._multiplier != value)
            this._multiplier = value;
    }

    public get portraitMode(): boolean {
        return this._portraitMode;
    }

    public set portraitMode(value: boolean) {
        this._portraitMode = value;
    }


    public get isFail(): boolean {
        return this._isFail;
    }

    public set isFail(value: boolean) {
        this._isFail = value;
    }

    public get banner(): PIXI.Sprite {
        return this._banner;
    }
}