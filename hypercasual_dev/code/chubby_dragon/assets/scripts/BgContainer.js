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

        scoreNode: cc.Node,
        endScoreLabel: cc.Label,
        highestScoreLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.currentTimer = Date.now();
        
        this.currentIdx = 0;

        this.getScoreList = [];
        for (let i = 0; i < 3; i++) {
            this.bgContainerList[i].getComponent('BgItem').setIndex(i);
            if (i > 0) {
                if (i % 2 === 1) {
                    this.getScoreList = this.getScoreList.concat([-1 * (i - 1) * 1200 - 800, -1 * (i - 1) * 1200 - 1250, -1 * (i - 1) * 1200 - 1700]);
                } else {
                    this.getScoreList = this.getScoreList.concat([-1 * (i - 1) * 1200 - 1000, -1 * (i - 1) * 1200 - 1500]);
                }
            }
        }
        console.log(this.getScoreList)
        this.theFirst = this.bgContainerList.shift();

        this.currentSpeed = 5;

        this.isOver = false;

        this.scoreTimer = Date.now();
        this.currentScore = 0;
        this.scoreNode.getComponent("NumList").setNum(this.currentScore);
        this.endScoreLabel.string = "" + this.currentScore;

        this.highestScore = cc.sys.localStorage.getItem("highestScore");
        if (this.highestScore == null)this.highestScore = 0;
        this.highestScoreLabel.string = "" + this.highestScore;

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
        this.getScoreList = [];
        for (let i = 0; i < 3; i++) {
            this.bgContainerList[i].getComponent('BgItem').setIndex(i);
            this.bgContainerList[i].setPosition(i * 1200, 0);
            if (i > 0) {
                if (i % 2 === 1) {
                    this.getScoreList = this.getScoreList.concat([-1 * (i - 1) * 1200 - 800, -1 * (i - 1) * 1200 - 1250, -1 * (i - 1) * 1200 - 1700]);
                } else {
                    this.getScoreList = this.getScoreList.concat([-1 * (i - 1) * 1200 - 1000, -1 * (i - 1) * 1200 - 1500]);
                }
            } 
        }
        this.theFirst = this.bgContainerList.shift();

        this.node.x = 0;

        this.currentSpeed = 5;

        this.isOver = false;

        this.isPause = false;

        this.currentScore = 0;
        this.scoreNode.getComponent("NumList").setNum(this.currentScore);
        this.endScoreLabel.string = "" + this.currentScore;
    },

    update (dt) {
        if (this.isOver === true || this.isPause === true) return;

        // if (this.currentIdx > 0) {
        //     if (Date.now() - this.scoreTimer >= 1000) {
        //         this.scoreTimer = Date.now();
                
        //     }
        // }

        if (Date.now() - this.currentTimer >= 20) {
            this.currentTimer = Date.now();

            this.node.x -= this.currentSpeed;
            // console.log(this.node.x)
            let posX = this.node.x;
            if (this.getScoreList.length > 0 && posX <= this.getScoreList[0]){
                this.currentScore += 10;
                this.scoreNode.getComponent("NumList").setNum(this.currentScore);
                this.getScoreList.shift();
                
            }

            if (this.node.x <= -1200 * (this.currentIdx + 1)) {
                this.theFirst.x = (this.currentIdx + 3) * 1200;
                this.theFirst.getComponent('BgItem').setIndex(this.currentIdx + 3);
                this.bgContainerList.push(this.theFirst);
                this.theFirst = this.bgContainerList.shift();
                this.currentIdx++;
                if (this.currentIdx % 2 === 1) {
                    this.getScoreList = this.getScoreList.concat([-1 * (this.currentIdx + 1) * 1200 - 800, -1 * (this.currentIdx + 1) * 1200 - 1250, -1 * (this.currentIdx + 1) * 1200 - 1700]);
                } else {
                    this.getScoreList = this.getScoreList.concat([-1 * (this.currentIdx + 1) * 1200 - 1000, -1 * (this.currentIdx + 1) * 1200 - 1500]);
                }
                console.log(this.getScoreList)
                this.endScoreLabel.string = "" + this.currentScore;
                if (this.currentScore > this.highestScore) {
                    cc.sys.localStorage.setItem("highestScore", this.currentScore);
                    this.highestScoreLabel.string = "" + this.currentScore;
                }

                console.log("this.currentIdx: " + this.currentIdx);

                if (this.currentIdx <= 10) {
                    this.currentSpeed = 5;
                } else if (this.currentIdx <= 20) {
                    this.currentSpeed = 6;
                } else if (this.currentIdx <= 30) {
                    this.currentSpeed = 7;
                } else {
                    this.currentSpeed = 8;
                }
            }
        }
    },
});
