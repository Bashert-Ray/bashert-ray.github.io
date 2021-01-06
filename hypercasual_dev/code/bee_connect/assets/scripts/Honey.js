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
        num: cc.Node,

        bg: cc.Node,
        bg_1: cc.Node,
        bg_2: cc.Node,
        bg_3: cc.Node,
        bg_4: cc.Node,
        bg_5: cc.Node,
        bg_6: cc.Node,
        bg_7: cc.Node,
        bg_8: cc.Node,
        bg_9: cc.Node,
        bg_10: cc.Node,
        bg_default: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    setLabel (_num) {
        this.bg.active = this.bg_1.active = this.bg_2.active = this.bg_3.active = this.bg_4.active = this.bg_5.active = this.bg_6.active = this.bg_7.active = this.bg_8.active = this.bg_9.active = this.bg_10.active = this.bg_default.active = false;
        switch(_num) {
            case 1:
                this.bg.active = true;
                break;
            case 2:
                this.bg_1.active = true;
                break;
            case 4:
                this.bg_2.active = true;
                break;
            case 8:
                this.bg_3.active = true;
                break;
            case 16:
                this.bg_4.active = true;
                break;
            case 32:
                this.bg_5.active = true;
                break;
            case 64:
                this.bg_6.active = true;
                break;
            case 128:
                this.bg_7.active = true;
                break;
            case 256:
                this.bg_8.active = true;
                break;
            case 512:
                this.bg_9.active = true;
                break;
            case 1024:
                this.bg_10.active = true;
                break;
            default:
                this.bg_default.active = true;
                break;
        }
        this.num.getComponent("NumList").setNum(_num);
    },

    show (_parent, _grid, _callback) {
        this.setLabel(_grid.num);
        this.node.parent = _parent;
        this.node.setPosition(_grid.pos);
        this.node.setScale(0, 0);
        this.node.opacity = 255;
        cc.Tween.stopAllByTarget(this.node);
        cc.tween(this.node).to(1, {scale: 1}, {easing: 'elasticOut'})
        .call(() => {
            if (_callback != null) _callback();
        }).start();
    },

    hide () {
        this.node.setScale(1, 1);
        cc.tween(this.node).to(.8, {scale: 0}, {easing: 'elasticIn'}).call(() => { this.node.parent = null; }).start();
    }

    // update (dt) {},
});
