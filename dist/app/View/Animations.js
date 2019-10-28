"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EntryPoint_1 = require("app/EntryPoint");
require("pixi-spine");
var Spine_1 = require("app/Display/Spine");
var gsap_1 = require("gsap");
var pixi_filters_1 = require("pixi-filters");
var SequenceAnimation_1 = require("app/Display/SequenceAnimation");
exports.FlashPoints = {
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
};
exports.Character = {
    "0": "char7_dark.png",
    "1": "char6_dark.png",
    "2": "char5_dark.png",
    "3": "char4_dark.png",
    "4": "char3_dark.png",
    "5": "char2_dark.png",
    "6": "char1_dark.png"
};
exports.JumpLogicBanner = {
    "1": { x: 1.2, y: 2.3 },
    "100": { x: 1.25, y: 2.3 },
    "10000": { x: 1.75, y: 2.3 },
    "100000": { x: 2, y: 2.3 },
    "1000000": { x: 2.2, y: 2.3 },
};
exports.JumpLogic = {
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
};
exports.BgLightAnimations = {
    "0": { light1: "char7_light1.png", light2: "char7_light1.png" },
    "1": { light1: "char6_light1.png", light2: "char6_light1.png" },
    "2": { light1: "char5_light1.png", light2: "char5_light1.png" },
    "3": { light1: "char4_light1.png", light2: "char4_light1.png" },
    "4": { light1: "char3_light1.png", light2: "char3_light1.png" },
    "5": { light1: "char2_light1.png", light2: "char2_light1.png" },
    "6": { light1: "char1_light1.png", light2: "char1_light1.png" },
};
var AnimationsNames = {
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
};
var Animations = (function (_super) {
    __extends(Animations, _super);
    function Animations() {
        var _this = _super.call(this) || this;
        _this._multiplier = 1;
        _this._bgCharacter = [];
        _this._bgCharacterLight = [];
        _this._flash = [];
        _this._portraitMode = false;
        _this._isFail = false;
        _this._game = EntryPoint_1.Base.EntryPoint.instance;
        _this.awake();
        _this.initSpineEvents();
        _this.initListeners();
        return _this;
    }
    Animations.prototype.initListeners = function () {
        console.log("IsMobile", PIXI.utils.isMobile.any);
        if (PIXI.utils.isMobile.any == true) {
            this._game.displayManager.on("orientationchanged", this.onOrientationChange, this);
        }
        else {
            this._game.displayManager.on("resize", this.onResize, this);
        }
    };
    Animations.prototype.onResize = function (width, height) {
        console.log("width", width);
        if (width <= 450) {
            this.portraitMode = true;
            this._banner.visible = false;
            this._characterAnimation.position.set(110, 590);
            this._characterAnimationClone.position.set(110, 600);
            this._smokeAnim.scale.set(3.5, 3.5);
            this._characterAnimation.scale.set(2, 2);
            this._characterAnimationClone.scale.set(2, 2);
            this._characterAnimationClone.filters = [new pixi_filters_1.AdjustmentFilter({ gamma: 1, contrast: 1, saturation: 1, brightness: 1, red: 0, green: 0, blue: 0, alpha: 1 })];
            this.multiplierText.position.y = 700;
            this._multiplierText.style.fontSize = 250;
        }
        else {
            this.portraitMode = false;
            this._banner.visible = true;
            this._characterAnimation.position.set(360, 260);
            this._characterAnimationClone.position.set(360, 260);
            this._characterAnimation.scale.set(1.5, 1.5);
            this._smokeAnim.scale.set(1.8, 1.3);
            this._characterAnimationClone.scale.set(1.5, 1.5);
            this._characterAnimationClone.filters = [];
            this.multiplierText.position.y = 130;
            this._multiplierText.style.fontSize = 225;
        }
    };
    Animations.prototype.onOrientationChange = function () {
        console.log("orientation (False is Portrait Mode)", this._game.displayManager.orientation);
        if (this._game.displayManager.orientation == false) {
            this.portraitMode = true;
            this._banner.visible = false;
            this._characterAnimation.position.set(110, 590);
            this._characterAnimationClone.position.set(110, 600);
            this._smokeAnim.scale.set(3.5, 3.5);
            this._characterAnimation.scale.set(2, 2);
            this._characterAnimationClone.scale.set(2, 2);
            this._characterAnimationClone.filters = [new pixi_filters_1.AdjustmentFilter({ gamma: 1, contrast: 1, saturation: 1, brightness: 1, red: 0, green: 0, blue: 0, alpha: 1 })];
            this.multiplierText.position.y = 700;
            this._multiplierText.style.fontSize = 250;
        }
        else {
            this.portraitMode = false;
            this._banner.visible = true;
            this._characterAnimation.position.set(360, 260);
            this._characterAnimationClone.position.set(360, 260);
            this._characterAnimation.scale.set(1.5, 1.5);
            this._smokeAnim.scale.set(1.8, 1.3);
            this._characterAnimationClone.scale.set(1.5, 1.5);
            this._characterAnimationClone.filters = [];
            this.multiplierText.position.y = 130;
            this._multiplierText.style.fontSize = 225;
        }
    };
    Animations.prototype.awake = function () {
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
        this._shadow2.position.set(960, 847);
        this._shadow2.name = "Shadow2";
        this.addChild(this._shadow2);
        console.log(this._shadow2);
        this._stand0 = new PIXI.Sprite(PIXI.Texture.from("stand1"));
        this._stand0.anchor.set(0.5, 0.5);
        this._stand0.position.set(960, 1140);
        this._stand0.name = "Stand0";
        this._stand0.visible = false;
        this._crowd0Ct.addChild(this._stand0);
        for (var i = 0; i < 7; i++) {
            this._bgCharacter[i] = new PIXI.Sprite(PIXI.Texture.from(exports.Character[i]));
            this._bgCharacter[i].anchor.set(0.5, 0.9);
            this._bgCharacter[i].position.set(160 + (i * 270), 1120);
            this._bgCharacter[i].rotation = 0;
            this._bgCharacter[i].name = "BGCharacter" + i;
            this._crowd0Ct.addChild(this._bgCharacter[i]);
            this._bgCharacterLight[i] = new PIXI.Sprite(PIXI.Texture.from(exports.BgLightAnimations[i].light1));
            this._bgCharacterLight[i].anchor.set(0.5, 0.9);
            this._bgCharacterLight[i].rotation = 0;
            this._bgCharacterLight[i].visible = false;
            this._bgCharacterLight[i].name = "BGCharacterLigth" + i;
            this._bgCharacter[i].addChild(this._bgCharacterLight[i]);
        }
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
        this._characterAnimation = new Spine_1.Spine(this._game.resource.loader.resources.character, { x: 360, y: 260 }, { x: 0.5, y: 0.5 }, {
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
        this._characterAnimationClone = new Spine_1.Spine(this._game.resource.loader.resources.character, { x: 360, y: 260 }, { x: 0.5, y: 0.5 }, {
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
        this._smokeAnim = new SequenceAnimation_1.SequenceAnimation("", 18, { x: 980, y: 1080 });
        this._smokeAnim.animationSpeed = 0.33;
        this._smokeAnim.scale.set(1.8, 1.3);
        this._smokeAnim.loop = false;
        this._smokeAnim.gotoAndPlay(18);
        this._smokeAnim.name = "SmokeAnim";
        this._smokeAnim.anchor.set(0.5, 0.5);
        this.addChild(this._smokeAnim);
        this._bannerContainer = new PIXI.Container();
        this._bannerContainer.name = "BannerContainer";
        this.addChild(this._bannerContainer);
        this._banner = new PIXI.Sprite(PIXI.Texture.from("banner_big"));
        this._banner.anchor.set(0.5, 0.5);
        this._banner.scale.set(1.2, 2.3);
        this._banner.position.set(960, 97);
        this._banner.name = "Banner";
        this._bannerContainer.addChild(this._banner);
        this._multiplierText = new PIXI.Text("", {
            fontFamily: "Ubuntu",
            fontSize: 225,
            fill: "#ffffff",
            align: "center",
            stroke: "#120548",
            strokeThickness: 3,
        });
        this._multiplierText.position.set(960, 115);
        this._multiplierText.anchor.set(0.5, 0.5);
        this._multiplierText.name = "MultiplierText ";
        this._bannerContainer.addChild(this._multiplierText);
        this.setMultiplierText(1.00);
        this.on("animationstatus", this.onCrashEventHandler, this);
        this.idleBackgroundAnimation();
        this.idleBackgroundLightAnimation();
        this.lightCharacterAnimations(this._bgCharacterLight[0], 0);
        this.flashAnimation(false);
        this.startGameProperties();
    };
    Animations.prototype.test = function () {
        var _this = this;
        var i = 0.75;
        setInterval(function () {
            i += Math.random() * 0.75;
            _this.setMultiplierText(i);
        }, 500);
    };
    Animations.prototype.startGameProperties = function () {
        this._characterAnimation.playAnimation(AnimationsNames.TreePerspire.animationName, 1, true);
        this._characterAnimationClone.playAnimation(AnimationsNames.TreePerspire.animationName, 1, true);
        this.setMultiplierText(1.00);
    };
    Animations.prototype.finishIdlePreparing = function () {
        var _this = this;
        this._characterAnimation.playAnimation(AnimationsNames.OneToTwoLifting.animationName, 1, false);
        this._characterAnimationClone.playAnimation(AnimationsNames.OneToTwoLifting.animationName, 1, false);
        this._characterAnimation.state.addListener({
            complete: function (e) {
                if (e.animation.name == AnimationsNames.OneToTwoLifting.animationName) {
                    _this._characterAnimation.playAnimation(AnimationsNames.TwoSmileShine.animationName, 1, false);
                    _this._characterAnimationClone.playAnimation(AnimationsNames.TwoSmileShine.animationName, 1, false);
                }
                if (e.animation.name == AnimationsNames.TwoSmileShine.animationName) {
                    _this._characterAnimation.playAnimation(AnimationsNames.TwoToTreeStrain.animationName, 1, false);
                    _this._characterAnimationClone.playAnimation(AnimationsNames.TwoToTreeStrain.animationName, 1, false);
                }
                if (e.animation.name == AnimationsNames.TwoToTreeStrain.animationName) {
                    _this._characterAnimation.playAnimation(AnimationsNames.TreePerspire.animationName, 1, true);
                    _this._characterAnimationClone.playAnimation(AnimationsNames.TreePerspire.animationName, 1, true);
                }
            }
        });
    };
    Animations.prototype.onCrashEventHandler = function (action, value) {
        switch (action) {
            case "crash":
                switch (value) {
                    case true:
                        var cloneThis_1 = this;
                        Object.keys(AnimationsNames).forEach(function (item) {
                            if (cloneThis_1._characterAnimation.state.tracks[0].animation.name == AnimationsNames[item].animationName) {
                                cloneThis_1._characterAnimation.playAnimation(AnimationsNames[item].failAnimation, 1, false);
                                cloneThis_1._characterAnimationClone.playAnimation(AnimationsNames[item].failAnimation, 1, false);
                                setTimeout(function () {
                                    cloneThis_1._smokeAnim.gotoAndPlay(0);
                                }, 100);
                            }
                        });
                        break;
                    case false:
                        this.startGameProperties();
                        break;
                }
        }
    };
    Animations.prototype.initSpineEvents = function () {
        var _this = this;
        this._characterAnimation.state.addListener({
            complete: function (e) {
                if (e.animation.name == AnimationsNames.TreeToFourPushUp.animationName) {
                    _this._characterAnimation.playAnimation(AnimationsNames.FourLegsShake.animationName, 1, AnimationsNames.FourLegsShake.loop);
                }
                if (e.animation.name == AnimationsNames.FourToFivePushUp2.animationName) {
                    _this._characterAnimation.playAnimation(AnimationsNames.FiveBodyShake.animationName, 1, AnimationsNames.FiveBodyShake.loop);
                }
                if (e.animation.name == AnimationsNames.FiveToSixRagePush.animationName) {
                    _this._characterAnimation.playAnimation(AnimationsNames.SixRageExpression.animationName, 1, AnimationsNames.SixRageExpression.loop);
                }
                if (e.animation.name == AnimationsNames.SixToSevenScreamPush.animationName) {
                    _this._characterAnimation.playAnimation(AnimationsNames.SevenToEightGodPush.animationName, 1, AnimationsNames.SevenToEightGodPush.loop);
                }
                if (e.animation.name == AnimationsNames.SevenToEightGodPush.animationName) {
                    _this._characterAnimation.playAnimation(AnimationsNames.EightOneHandLift.animationName, 1, AnimationsNames.EightOneHandLift.loop);
                }
                if (e.animation.name == AnimationsNames.TreePerspire.failAnimation ||
                    e.animation.name == AnimationsNames.FourLegsShake.failAnimation ||
                    e.animation.name == AnimationsNames.FiveBodyShake.failAnimation ||
                    e.animation.name == AnimationsNames.SixRageExpression.failAnimation ||
                    e.animation.name == AnimationsNames.SevenToEightGodPush.failAnimation ||
                    e.animation.name == AnimationsNames.EightOneHandLift.failAnimation) {
                    setTimeout(function () {
                        _this.emit("animationstatus", "crashed", true);
                    }, 1000);
                }
            }
        });
        this._characterAnimationClone.state.addListener({
            complete: function (e) {
                if (e.animation.name == AnimationsNames.TreeToFourPushUp.animationName) {
                    _this._characterAnimationClone.playAnimation(AnimationsNames.FourLegsShake.animationName, 1, AnimationsNames.FourLegsShake.loop);
                }
                if (e.animation.name == AnimationsNames.FourToFivePushUp2.animationName) {
                    _this._characterAnimationClone.playAnimation(AnimationsNames.FiveBodyShake.animationName, 1, AnimationsNames.FiveBodyShake.loop);
                }
                if (e.animation.name == AnimationsNames.FiveToSixRagePush.animationName) {
                    _this._characterAnimationClone.playAnimation(AnimationsNames.SixRageExpression.animationName, 1, AnimationsNames.SixRageExpression.loop);
                }
                if (e.animation.name == AnimationsNames.SixToSevenScreamPush.animationName) {
                    _this._characterAnimationClone.playAnimation(AnimationsNames.SevenToEightGodPush.animationName, 1, AnimationsNames.SevenToEightGodPush.loop);
                }
                if (e.animation.name == AnimationsNames.SevenToEightGodPush.animationName) {
                    _this._characterAnimationClone.playAnimation(AnimationsNames.EightOneHandLift.animationName, 1, AnimationsNames.EightOneHandLift.loop);
                }
            }
        });
    };
    Animations.prototype.multiplierTextHandler = function (value) {
        var cloneThis = this;
        loop1: for (var items in exports.JumpLogicBanner) {
            if (Number(items) >= value) {
                console.log(value, Number(items));
                if ((cloneThis._banner.scale.x != exports.JumpLogicBanner[items].x)) {
                    gsap_1.TweenLite.to(cloneThis._banner.scale, 0.15, { x: exports.JumpLogicBanner[items].x, y: exports.JumpLogicBanner[items].y, ease: gsap_1.Power0.easeNone });
                }
                break loop1;
            }
        }
        var _loop_1 = function (items) {
            if (Number(items) >= value) {
                cloneThis.smokeAnimation();
                var scale_1 = 1;
                var toScale = 1.5;
                gsap_1.TweenLite.to(cloneThis._multiplierText.scale, 0.125, {
                    x: toScale, y: toScale, onComplete: function () {
                        gsap_1.TweenLite.to(cloneThis._multiplierText.scale, 0.125, {
                            x: scale_1, y: scale_1
                        });
                    }
                });
                return "break-loop2";
            }
        };
        loop2: for (var items in exports.JumpLogic) {
            var state_1 = _loop_1(items);
            switch (state_1) {
                case "break-loop2": break loop2;
            }
        }
        loop3: for (var item in AnimationsNames) {
            if (Number(AnimationsNames[item].value) >= value) {
                if (cloneThis._characterAnimation.state.tracks[0] && cloneThis._characterAnimation.state.tracks[0].animation.name != AnimationsNames[item].animationName) {
                    cloneThis._characterAnimationClone.playAnimation(AnimationsNames[item].animationName, 1, AnimationsNames[item].loop);
                    cloneThis._characterAnimation.playAnimation(AnimationsNames[item].animationName, 1, AnimationsNames[item].loop);
                }
                break loop3;
            }
        }
    };
    Animations.prototype.getRandomFlashPoints = function () {
        var randomPosition = exports.FlashPoints[Math.floor(Math.random() * 10)];
        return { x: randomPosition.x, y: randomPosition.y };
    };
    Animations.prototype.flashAnimation = function (isJumpState) {
        var _this = this;
        var posX = this.getRandomFlashPoints().x;
        var posY = this.getRandomFlashPoints().y;
        if (this._flash[0].position.x == posX) {
            this.flashAnimation(isJumpState);
        }
        else {
            this._flash[0].position.set(posX, posY);
            this._flash[0].alpha = 0;
            this._flash[0].scale.set(0, 0);
            gsap_1.TweenLite.to(this._flash[0], 0.1, { alpha: 1 });
            gsap_1.TweenLite.to(this._flash[0].scale, 0.1, {
                x: 1, y: 1,
                onComplete: function () {
                    gsap_1.TweenLite.to(_this._flash[0].scale, 0.2, {
                        x: 1.4, y: 1.4, ease: gsap_1.Linear.easeIn, onComplete: function () {
                            gsap_1.TweenLite.to(_this._flash[0], 0.1, { alpha: 0 });
                            gsap_1.TweenLite.to(_this._flash[0].scale, 0.1, {
                                x: 1, y: 1, onComplete: function () {
                                    var duration = 0;
                                    if (isJumpState)
                                        duration = 1;
                                    else
                                        duration = 250;
                                    setTimeout(function () {
                                        _this.flashAnimation(isJumpState);
                                    }, duration);
                                }
                            });
                        }
                    });
                }
            });
        }
    };
    Animations.prototype.smokeAnimation = function () {
        var durationSmoke1 = Math.random() * 0.5 + 5.5;
        var durationSmoke2 = Math.random() * 0.5 + 2.5;
        this._smoke1.scale.set(1, 1);
        this._smoke1.position.y = 700;
        this._smoke1.alpha = 1;
        this._smoke2.scale.set(1, 1);
        this._smoke2.position.y = 560;
        this._smoke2.alpha = 1;
        gsap_1.TweenLite.to(this._smoke1.position, durationSmoke1, { y: 0 });
        gsap_1.TweenLite.to(this._smoke1.scale, durationSmoke1 + 2, { x: 2, y: 0 });
        gsap_1.TweenLite.to(this._smoke1, durationSmoke1 + 1.5, { alpha: 0 });
        gsap_1.TweenLite.to(this._smoke2.position, durationSmoke2, { y: 100 });
        gsap_1.TweenLite.to(this._smoke2, durationSmoke2 + 1.5, { alpha: 0 });
        gsap_1.TweenLite.to(this._smoke2.scale, durationSmoke2 + 2, { x: 2, y: 0 });
    };
    Animations.prototype.failAnimation = function () {
        this.isFail = true;
        this._mexicoWave.seek(0);
        this._mexicoWave.pause();
        gsap_1.TweenLite.killTweensOf(this._mexicoWave);
        this._mexicoWave.kill();
        this._spotLeft.tint = 0xff504e;
        this._spotMiddle.tint = 0xff504e;
        this._spotRight.tint = 0xff504e;
    };
    Animations.prototype.resumeAnimation = function () {
        this.isFail = false;
        this._spotLeft.tint = 0xffffff;
        this._spotMiddle.tint = 0xffffff;
        this._spotRight.tint = 0xffffff;
        this._mexicoWave.resume();
        this.idleBackgroundAnimation();
    };
    Animations.prototype.idleBackgroundAnimation = function () {
        var _this = this;
        if (this.isFail == false) {
            var firstOrder_1 = [this._bgCharacter[0].scale, this._bgCharacter[1].scale, this._bgCharacter[2].scale, this._bgCharacter[3].scale, this._bgCharacter[4].scale, this._bgCharacter[5].scale, this._bgCharacter[6].scale];
            this._mexicoWave = gsap_1.TweenLite.to(this._crowd3.scale, 0.4, {
                y: 1.1, ease: gsap_1.Circ.easeOut,
                onStart: function () {
                    setTimeout(function () {
                        gsap_1.TweenLite.to(_this._crowd2.scale, 0.4, {
                            y: 1.1, ease: gsap_1.Circ.easeOut,
                            onStart: function () {
                                setTimeout(function () {
                                    gsap_1.TweenLite.to(_this._crowd1.scale, 0.4, {
                                        y: 1.1, ease: gsap_1.Circ.easeOut,
                                        onStart: function () {
                                            setTimeout(function () {
                                                gsap_1.TweenLite.to(firstOrder_1, 0.4, {
                                                    y: 1.1, ease: gsap_1.Circ.easeOut,
                                                    onStart: function () {
                                                        setTimeout(function () {
                                                            if (_this.isFail == false) {
                                                                _this.idleBackgroundAnimation();
                                                            }
                                                        }, 225);
                                                    },
                                                    onComplete: function () {
                                                        gsap_1.TweenLite.to(firstOrder_1, 0.4, { y: 1, ease: gsap_1.Circ.easeOut });
                                                    }
                                                });
                                            }, 225);
                                        },
                                        onComplete: function () {
                                            gsap_1.TweenLite.to(_this._crowd1.scale, 0.4, { y: 1, ease: gsap_1.Circ.easeOut });
                                        }
                                    });
                                }, 225);
                            },
                            onComplete: function () {
                                gsap_1.TweenLite.to(_this._crowd2.scale, 0.4, { y: 1, ease: gsap_1.Circ.easeOut });
                            }
                        });
                    }, 225);
                },
                onComplete: function () {
                    gsap_1.TweenLite.to(_this._crowd3.scale, 0.4, { y: 1, ease: gsap_1.Circ.easeOut });
                }
            });
        }
    };
    Animations.prototype.lightCharacterAnimations = function (character, counter) {
        var _this = this;
        var duration = Math.random() * 0.1 + 0.1;
        var durationRecursive = Math.random() * 0.5 + 0.5;
        var delay = Math.random() * 0.1 + 0.15;
        character.visible = false;
        var alphaAnimation = gsap_1.TweenLite.to(character, duration, {
            alpha: 0, delay: delay, ease: gsap_1.Sine.easeIn,
            onStart: function () {
                character.alpha = 1;
                character.visible = true;
            },
            onComplete: function () {
                var randomLight = (Math.random() < 0.5) ? true : false;
                var spots = exports.BgLightAnimations[counter].light2;
                if (randomLight)
                    spots;
                else
                    spots = exports.BgLightAnimations[counter].light1;
                character.texture = PIXI.Texture.from(spots);
                duration = Math.random() * 0.1 + 0.1;
                delay = Math.random() * 0.1 + 0.15;
                durationRecursive = Math.random() * 0.5 + 0.5;
                _this._bgCharacterLight[counter].visible = false;
                var characterSequence = Math.floor(Math.random() * 6);
                setTimeout(function () {
                    _this.lightCharacterAnimations(_this._bgCharacterLight[characterSequence], characterSequence);
                }, durationRecursive);
            }
        });
    };
    Animations.prototype.idleBackgroundLightAnimation = function () {
        var _this = this;
        var leftSpotRotation = Math.random() * 0.1 + 0.1;
        var durationLeft = Math.random() * 0.5 + 0.75;
        var leftSpotAnimation = gsap_1.TweenLite.to(this._spotLeft, durationLeft, {
            rotation: -leftSpotRotation, onComplete: function () {
                gsap_1.TweenLite.to(_this._spotLeft, durationLeft, {
                    rotation: 0, onComplete: function () {
                        leftSpotRotation = Math.random() * 0.15 + 0.1;
                        durationLeft = Math.random() * 0.5 + 0.75;
                        leftSpotAnimation.restart(false);
                    }
                });
            }
        });
        var midSpotRotation = Math.random() * 0.8 + 1;
        var durationMid = Math.random() * 0.5 + 0.75;
        var midSpotAnimation = gsap_1.TweenLite.to(this._spotMiddle.scale, durationMid, {
            y: midSpotRotation,
            onStart: function () {
                gsap_1.TweenLite.to(_this._spotMiddle, 0.2, { alpha: 0.8 });
            },
            onComplete: function () {
                gsap_1.TweenLite.to(_this._spotMiddle.scale, durationMid, {
                    x: 2, y: 2,
                    onStart: function () {
                        gsap_1.TweenLite.to(_this._spotMiddle, 0.2, { alpha: 1 });
                    },
                    onComplete: function () {
                        durationMid = Math.random() * 0.5 + 0.75;
                        midSpotRotation = (Math.random() * 0.8) + 1;
                        midSpotAnimation.restart();
                    }
                });
            }
        });
        var durationRight = Math.random() * 0.5 + 0.75;
        var rightSpotRotation = Math.random() * 0.1 + 0.1;
        var rightSpotAnimation = gsap_1.TweenLite.to(this._spotRight, durationRight, {
            rotation: rightSpotRotation, onComplete: function () {
                gsap_1.TweenLite.to(_this._spotRight, durationRight, {
                    rotation: 0, onComplete: function () {
                        rightSpotRotation = Math.random() * 0.15 + 0.1;
                        durationLeft = Math.random() * 0.5 + 0.75;
                        rightSpotAnimation.restart(false);
                    }
                });
            }
        });
    };
    Object.defineProperty(Animations.prototype, "crash", {
        get: function () {
            return this._crash;
        },
        set: function (value) {
            if (this._crash != value) {
                this._crash = value;
                this.emit("animationstatus", "crash", value);
            }
            if (value == false) {
                this.emit("animationstatus", "crashed", false);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animations.prototype, "multiplierText", {
        get: function () {
            return this._multiplierText;
        },
        enumerable: true,
        configurable: true
    });
    Animations.prototype.setMultiplierText = function (value) {
        this._multiplierText.text = value.toFixed(2) + "X";
        var values = Math.floor(Number(value));
        if (values != this.multiplier) {
            this.multiplierTextHandler(values);
            this.multiplier = values;
        }
    };
    Object.defineProperty(Animations.prototype, "multiplier", {
        get: function () {
            return this._multiplier;
        },
        set: function (value) {
            if (this._multiplier != value)
                this._multiplier = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animations.prototype, "portraitMode", {
        get: function () {
            return this._portraitMode;
        },
        set: function (value) {
            this._portraitMode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animations.prototype, "isFail", {
        get: function () {
            return this._isFail;
        },
        set: function (value) {
            this._isFail = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animations.prototype, "banner", {
        get: function () {
            return this._banner;
        },
        enumerable: true,
        configurable: true
    });
    return Animations;
}(PIXI.Container));
exports.Animations = Animations;
//# sourceMappingURL=Animations.js.map