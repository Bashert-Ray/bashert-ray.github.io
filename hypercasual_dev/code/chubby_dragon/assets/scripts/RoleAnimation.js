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

        imageList: [cc.Node],

        mainGame: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.imageList[0].active = true;
        this.imageList[1].active = this.imageList[2].active = false;
        this.currentIndex = 1;
        this.currentTimer = Date.now();
        this.intervalTimer = 100;

        this.isDead = false;

        this.isPause = true;
        
        this.topY = null;
    },

    start () {

    },

    onCollisionEnter: function(other,self){
        // dead
        this.mainGame.getComponent('MainScene').gameOver();
    },

    dead () {
        cc.Tween.stopAll();
        this.isDead = true;
    },

    pause () {
        cc.Tween.stopAll();
        this.isPause = true;
    },

    resume () {
        this.isPause = false;

        if (this.topY != null) {
            cc.tween(this.node).to(1, {position: cc.v2(0, -750)}, {easing: 'quadIn'}).start();
        } else {
            cc.tween(this.node).to(0.5, {position: cc.v2(0, this.topY)}, {easing: 'quadOut'})
            .to(1, {position: cc.v2(0, -750)}, {easing: 'quadIn'}).start();
        }
    },

    reset () {
        this.node.x = 0;
        this.node.y = 0;

        this.isDead = false;
        this.isPause = false;
    },

    update (dt) {
        if (this.isPause === true) return;

        if (this.intervalTimer === 50) {
            if (Date.now() - this.restoreTimer >= 300) {
                this.intervalTimer = 100;
            }
        }
        if (Date.now() - this.currentTimer >= this.intervalTimer) {
            this.currentTimer = Date.now();

            this.imageList[0].active = this.imageList[1].active = this.imageList[2].active = false;
            this.imageList[this.currentIndex].active = true;
            this.currentIndex++;
            if (this.currentIndex > 2) this.currentIndex = 0;
        }
    },

    raise () {
        if (this.isDead === true || this.isPause === true) return;

        this.intervalTimer = 100;
        this.restoreTimer = Date.now();
        
        this.topY = this.node.y + 100;
        cc.tween(this.node).to(0.5, {position: cc.v2(0, this.node.y + 100)}, {easing: 'quadOut'})
        .call(() => {
            this.topY = null;
        })
        .to(1, {position: cc.v2(0, -750)}, {easing: 'quadIn'}).start();

        if (this.mainGame.getComponent('MainScene').isMute === false) {
            this.node.getComponent("cc.AudioSource").volume = 0.5;
            this.node.getComponent("cc.AudioSource").play();
        }
    }
});
