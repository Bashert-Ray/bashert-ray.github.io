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
        numList: [],
        numPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    setNum(_num) {
        for (let j = 0; j < this.numList.length; j++) {
            this.numList[j].active = false;
        }
        let numArray = ("" + _num).split("");
        for (let i = 0; i < numArray.length; i++) {
            if (i < this.numList.length) {
                this.numList[i].active = true;
                this.numList[i].getComponent("NumComponent").setContent(numArray[i]);
            } else {
                let num = cc.instantiate(this.numPrefab);
                num.parent = this.node;
                num.getComponent("NumComponent").setContent(numArray[i]);
                this.numList.push(num);
            }
        }

        switch(numArray.length) {
            case 3:
                this.node.setScale(0.9, 0.9);
            break;
            case 4:
                this.node.setScale(0.6, 0.6);
            break;
            case 5:
                this.node.setScale(0.45, 0.45);
            break;
            case 6:
                this.node.setScale(0.4, 0.4);
            break;
            default:
                this.node.setScale(1, 1);
            break;
        }

        if (numArray.length >= 4) {

        } else if (numArray.length >= 4) {

        }
    }

    // update (dt) {},
});
