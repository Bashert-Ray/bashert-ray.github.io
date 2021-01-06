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

        role: cc.Node,
        bgContainer: cc.Node,

        endNode: cc.Node,

        moveBgList: [cc.Node],
        moveBgList_2: [cc.Node],
        moveBgList_3: [cc.Node],
        bg_2: cc.Node,
        bg_3: cc.Node,

        moveBgNode: cc.Node,
        moveBgNode_2: cc.Node,
        moveBgNode_3: cc.Node,

        pauseBtn: cc.Node,
        resumeBtn: cc.Node,
        muteBtn: cc.Node,
        unmuteBtn: cc.Node,

        guideNode: cc.Node,
        readyNode: cc.Node,
        menuNode: cc.Node,

        hitAudio: cc.AudioSource,
        endAudio: cc.AudioSource
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (!window.adsbygoogle) {
            var script = document.createElement("script");
            script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
            script.setAttribute('data-ad-client', 'pub-3901483273906883');
            // script.setAttribute('data-adbreak-test', 'on'); // for test purpose
            script.async = true;
            script.onload = script.onreadystatechange = this.initializeAd.bind(this);
            document.head.appendChild(script);
        } else {
            this.initializeAd();
        }
    },

    initializeAd() {
        // this.isAdInitialized to make sure we won't initialize this when returned from other scenes.
        if (!this.isAdInitialized) {
            this.isAdInitialized = true;
            window.adBreak = window.adConfig = function(o) {window.adsbygoogle.push(o);}
            // optional
            // window.adConfig({
            //     preloadAdBreaks: 'on', // uncomment this one if you want to change to default value `auto`
            //     sound: 'on',
            // });
        }
    },

    start () {
        this.roleComponent = this.role.getComponent('RoleAnimation');
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            if (this.guideNode.active === true) {
                this.startGame();
                this.guideNode.active = false;
            } else {
                this.roleComponent.raise();
            }
        }, this);

        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;

        this.endNode.active = false;

        this.pauseBtn.active = false;
        this.resumeBtn.active = false;

        this.isMute = false;

        this.unmuteBtn.active = false;
        this.muteBtn.active = false;

        this.guideNode.active = false;
        this.role.active = false;

        this.randomBackground();
    },

    randomBackground() {
        let idxList = [0, 1, 2];
        let randomIdx = idxList[Math.floor(Math.random() * idxList.length)];
        if (randomIdx === 0) {
            this.bg_2.active = false;
            this.bg_3.active = false;
            this.currentMoveBgList = this.moveBgList;
            this.moveBgNode.active = true;
            this.moveBgNode_2.active = false;
            this.moveBgNode_3.active = false;
        } else if (randomIdx === 1){
            this.bg_2.active = true;
            this.bg_3.active = false;
            this.currentMoveBgList = this.moveBgList_2;
            this.moveBgNode.active = false;
            this.moveBgNode_2.active = true;
            this.moveBgNode_3.active = false;
        } else {
            this.bg_2.active = false;
            this.bg_3.active = true;
            this.currentMoveBgList = this.moveBgList_3;
            this.moveBgNode.active = false;
            this.moveBgNode_2.active = false;
            this.moveBgNode_3.active = true;
        }
    },

    enterGame () {
        this.menuNode.active = false;
        this.guideNode.active = true;
        this.role.active = true;

        this.node.getComponent("cc.AudioSource").play();
        this.node.getComponent("cc.AudioSource").loop = true;
    },

    restarGameCallback() {
        this.randomBackground();
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.roleComponent.raise();
        }, this);

        this.roleComponent.reset();
        this.bgContainer.getComponent('BgContainer').reset();

        this.endNode.active = false;

        for (let i = 0; i < this.currentMoveBgList.length; i++) {
            let moveBg = this.currentMoveBgList[i];
            moveBg.getComponent("MoveBg").reset();
        }

        this.readyNode.active = true;
        this.readyNode.setScale(0, 0);
        cc.tween(this.readyNode).to(1, {scale: 1}, {easing: "elasticOut"}).start();
        setTimeout(() => {
            this.readyNode.active = false;
        }, 2000);

        if (this.isMute === false) {
            this.node.getComponent("cc.AudioSource").play();
            this.node.getComponent("cc.AudioSource").loop = true;
        }

        this.pauseBtn.active = true;
        this.resumeBtn.active = false;

        this.unmuteBtn.active = this.isMute;
        this.muteBtn.active = !this.isMute;
    },

    restarGame () {
        // the will be a silence if no ad is returned when we call adBreak()
        // so we have to schedule the action for that case.
        this.unscheduleAllCallbacks()
        this.scheduleOnce(this.restarGameCallback.bind(this), 0.5)
        try {
            adBreak({
                type: 'next',
                name: 'game_restart',
                beforeBreak: (() => {
                this.unscheduleAllCallbacks()
                }).bind(this),
                afterBreak: (() => {
                this.restarGameCallback()
                }).bind(this)
            })
        } catch (e) {
        console.error(e)
        this.unscheduleAllCallbacks()
        this.restarGameCallback()
        }
    },

    gameOver () {
        this.bgContainer.getComponent('BgContainer').gameOver();

        this.node.off(cc.Node.EventType.TOUCH_START, () => {
            this.roleComponent.raise();
        }, this);

        this.roleComponent.dead();

        this.endNode.active = true;

        for (let i = 0; i < this.currentMoveBgList.length; i++) {
            let moveBg = this.currentMoveBgList[i];
            moveBg.getComponent("MoveBg").gameOver();
        }

        this.node.getComponent("cc.AudioSource").stop();

        if (this.isMute === false) {
            this.hitAudio.volume = 0.3;
            this.hitAudio.play();
            setTimeout(() => {
                this.endAudio.play();
            }, 500);
        }

        // the adBreak() won't show on the first time we call that, 
        // moreover the adBreak() won't show when no user input either
        // so we use below line to kickstart the the following adBreak()
        window.adBreak({
            type: 'next',
            name: 'popup_start'
        });
    },

    mute () {
        this.node.getComponent("cc.AudioSource").stop();
        this.isMute = true;

        this.muteBtn.active = false;
        this.unmuteBtn.active = true;
    },

    unmute () {
        this.node.getComponent("cc.AudioSource").play();
        this.isMute = false;

        this.muteBtn.active = true;
        this.unmuteBtn.active = false;
    },

    pauseGame () {
        this.bgContainer.getComponent('BgContainer').pause();

        this.node.off(cc.Node.EventType.TOUCH_START, () => {
            this.roleComponent.raise();
        }, this);

        this.roleComponent.pause();

        for (let i = 0; i < this.currentMoveBgList.length; i++) {
            let moveBg = this.currentMoveBgList[i];
            moveBg.getComponent("MoveBg").pause();
        }

        this.pauseBtn.active = false;
        this.resumeBtn.active = true;

        this.node.getComponent("cc.AudioSource").pause();
    },

    resumeGame () {
        this.bgContainer.getComponent('BgContainer').resume();

        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.roleComponent.raise();
        }, this);

        this.roleComponent.resume();

        for (let i = 0; i < this.currentMoveBgList.length; i++) {
            let moveBg = this.currentMoveBgList[i];
            moveBg.getComponent("MoveBg").resume();
        }

        this.pauseBtn.active = true;
        this.resumeBtn.active = false;

        this.node.getComponent("cc.AudioSource").resume();
    },

    startGame () {
        this.bgContainer.getComponent('BgContainer').resume();

        this.roleComponent.resume();

        for (let i = 0; i < this.currentMoveBgList.length; i++) {
            let moveBg = this.currentMoveBgList[i];
            moveBg.getComponent("MoveBg").resume();
        }

        this.readyNode.active = true;
        this.readyNode.setScale(0, 0);
        cc.tween(this.readyNode).to(1, {scale: 1}, {easing: "elasticOut"}).start();
        setTimeout(() => {
            this.readyNode.active = false;
        }, 2000);
        this.pauseBtn.active = true;
        this.resumeBtn.active = false;

        this.unmuteBtn.active = false;
        this.muteBtn.active = true;
    }

    // update (dt) {},
});
