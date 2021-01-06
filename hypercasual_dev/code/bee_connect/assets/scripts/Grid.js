// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        highLight: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            if (this.data.honey != null) {
                if (this.mainScene.isRemoving === true) {
                    this.mainScene.removeSameColor(this.data);
                } else {
                    if (this.mainScene.isMoving === true) return;
                    this.mainScene.restoreHoney();
                    this.startHight();
                    this.mainScene.startMove(this.data);
                }
            } else {
                this.mainScene.endMove(this.data);
            }
        });

        this.highLightTimer = 0;
        this.highLight.opacity = 0;
    },

    init (_data, _mainScene) {
        this.data = _data;
        this.data.grid = this;

        this.mainScene = _mainScene;
    },

    stopHight () {
        this.highLightTimer = 0;

        this.highLight.opacity = 0;
    },

    startHight () {
        this.highLightTimer = Date.now();
        this.currentTimer = Date.now();

        this.highLight.opacity = 0;
        this.increase = true;
    },

    start () {

    },

    update (dt) {
        if (this.highLightTimer === 0) return;

        if (Date.now() - this.currentTimer >= 30) {
            this.currentTimer = Date.now();

            if (this.increase) {
                this.highLight.opacity += 10;
                if (this.highLight.opacity >= 255) {
                    this.highLight.opacity = 255;
                    this.increase = false;
                }
            } else {
                this.highLight.opacity -= 10;
                if (this.highLight.opacity <= 0) {
                    this.highLight.opacity = 0;
                    this.increase = true;
                }
            }
        }
    },
});
