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

        numPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {

    },

    setNum (_num) {
        let numStr = "" + _num;
        let list = numStr.split("");
        if (this.numList) {
            for (let i = 0; i < this.numList.length; i++) {
                let num = this.numList[i];
                num.active = false;
            }
        } else {
            this.numList = [];
        }

        for (let j = 0; j < list.length; j++) {
            let num;
            if (j < this.numList.length) {
                num = this.numList[j];
                num.active = true;
            } else {
                num = cc.instantiate(this.numPrefab);
                num.parent = this.node;
                this.numList.push(num);
            }
            num.getComponent("NumComponent").setNum(list[j]);
        }

        if (_num > 0) {
            cc.tween(this.node).to(0.1, {scale: 1.5}).to(0.1, {scale: 1}).start();
        } 
    }

    // update (dt) {},
});
