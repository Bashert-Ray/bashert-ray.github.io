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

        bgContainerList: [cc.Node],

        currentSpeed: 5
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.currentTimer = Date.now();
        
        this.currentIdx = 0;

        this.theFirst = this.bgContainerList.shift();

        this.isOver = false;

        this.isPause = true;
    },

    pause () {
        this.isPause = true;
    },

    resume () {
        this.isPause = false;
    },

    start () {

    },

    gameOver () {
        this.isOver = true;
    },

    reset () {
        this.currentTimer = Date.now();
        
        this.currentIdx = 0;

        if (this.bgContainerList.length === 2) {
            this.bgContainerList.push(this.theFirst);
        }
        for (let i = 0; i < 3; i++) {
            this.bgContainerList[i].setPosition(i * 1200, 0);
        }
        this.theFirst = this.bgContainerList.shift();

        this.node.x = 0;

        this.isOver = false;
        this.isPause = false;
    },

    update (dt) {
        if (this.isOver === true || this.isPause === true) return;

        if (Date.now() - this.currentTimer >= 20) {
            this.currentTimer = Date.now();

            this.node.x -= this.currentSpeed;
            if (this.node.x <= -1200 * (this.currentIdx + 1)) {
                this.theFirst.x = (this.currentIdx + 3) * 1200;
                this.bgContainerList.push(this.theFirst);
                this.theFirst = this.bgContainerList.shift();
                this.currentIdx++;
            }
        }
    },
});
