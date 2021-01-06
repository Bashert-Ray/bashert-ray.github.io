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
        blockPrefab: cc.Prefab,

        blockList: [],
        blockList_2: [],
        blockCount: 5
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {

    },

    setIndex (_index) {
        this.index = _index;

        // console.log ('_index: ' + _index);

        this.createBlock();
    },

    createBlock () {
        this.positionXList;
        this.blockCount = 3 + Math.floor(Math.random() * this.index);
        if ((this.index % 2) === 1) {
            this.positionXList = [-450, 0, 450];
            if (this.blockCount > 3) this.blockCount = 3;
        } else {
            this.positionXList = [-250, 250];
            if (this.blockCount > 2) this.blockCount = 2;
        }

        // console.log("this.blockCount: " + this.blockCount);

        for (let i = 0; i < this.blockList.length; i++) {
            let block = this.blockList[i];
            let block_2 = this.blockList_2[i];
            block_2.parent = block.parent = null;
        }

        if (this.index === 0) {
            return;
        }
        
        for (let i = 0; i < this.blockCount; i++) {
            if (i < this.blockList.length) {
                let posX = this.positionXList[i];
                let posY = -900;
                let randomOffsetY = 1200 * Math.random();
                this.blockList[i].y = posY - randomOffsetY;
                if (i >= 1) {
                    if (this.blockList_2[i - 1].y <= 1200) {
                        this.blockList[i].y = posY - randomOffsetY; - 900
                    }
                }
                this.blockList[i].x = posX;
                this.blockList[i].parent = this.node;
            } else {
                let block = cc.instantiate(this.blockPrefab);
                block.parent = this.node;
                let posX = this.positionXList[i];
                let posY = -900;
                let randomOffsetY = 1200 * Math.random();
                block.x = posX;
                block.y = posY - randomOffsetY;
                if (i >= 1) {
                    if (this.blockList_2[i - 1].y <= 1200) {
                        block.y = posY - randomOffsetY; - 900
                    }
                }
                block.setScale(1, 1);
                this.blockList.push(block);
            }

            if (i < this.blockList_2.length) {
                let posX = this.positionXList[i];
                let posY = 0;
                let randomOffsetY = 2100 - (Math.abs(this.blockList[i].y) - 900) * Math.random();
                this.blockList_2[i].y = posY + randomOffsetY;
                if (i >= 1) {
                    if (this.blockList[i - 1].y <= -1200) {
                        this.blockList_2[i].y = 3000 - (Math.abs(this.blockList[i].y) - 900) * Math.random();
                    }
                }
                this.blockList_2[i].x = posX;
                this.blockList_2[i].setScale(1, -1);
                this.blockList_2[i].parent = this.node;
            } else {
                let block = cc.instantiate(this.blockPrefab);
                block.parent = this.node;
                let posX = this.positionXList[i];
                let posY = 0;
                let randomOffsetY = 2100 - (Math.abs(this.blockList[i].y) - 900) * Math.random();
                block.y = posY + randomOffsetY;
                if (i >= 1) {
                    if (this.blockList[i - 1].y <= -1200) {
                        block.y = 3000 - (Math.abs(this.blockList[i].y) - 900) * Math.random();
                    }
                }
                block.x = posX;
                block.setScale(1, -1);
                this.blockList_2.push(block);
            }

            if (this.blockList[i].y <= -1500 && this.blockList_2[i].y >= 1500) {
                if (i > 1 && (this.blockList_2[i - 1].y <= 1200 || this.blockList[i - 1].y <= -1200)) continue;
                this.blockList[i].y = -1500 + 100 * Math.random();
                this.blockList_2[i].y = 1500 - 100 * Math.random();
            }
        }
    }

    // update (dt) {},
});
