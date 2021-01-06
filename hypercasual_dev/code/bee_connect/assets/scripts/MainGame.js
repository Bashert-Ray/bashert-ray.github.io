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
        honeyPrefab: cc.Prefab,
        honeyList: [cc.Node],
        honeyPool: [cc.Node],
        gridPrefab: cc.Prefab,

        openList: [],
        closeList: [],

        gameOverNode: cc.Node,
        scoreLabel: cc.Label,
        coinLabel: cc.Label,

        gridsBg: cc.Node,
        container: cc.Node,

        gameOverScoreLabel: cc.Label,

        honeyNumList: [cc.Node],

        tip: cc.Node,

        startNode: cc.Node,

        highestScoreLabel: cc.Label,

        skillNode: cc.Node,

        refreshCoin: 25,
        remove1Coin: 40,
        remove5Coin: 75,
        removeColorCoin: 150,

        refreshCoinLabel: cc.Label,
        remove1CoinLabel: cc.Label,
        remove5CoinLabel: cc.Label,
        removeColorCoinLabel: cc.Label,

        moveAudio: cc.AudioSource,
        mergeAudio: cc.AudioSource,
        endAudio: cc.AudioSource,
        skillAudio_1: cc.AudioSource,
        skillAudio_23: cc.AudioSource,
        skillAudio_4: cc.AudioSource,

        skillTip: cc.Node,

        muteBtn: cc.Node,
        unmuteBtn: cc.Node
    },

    showTip () {
        if (this.isShowTip === true) return;
        this.tip.active = true;
        this.tip.opacity = 255;
        this.isShowTip = true;
        this.tip.setScale(0, 0);
        this.tip.setPosition(0, 0);
        cc.tween(this.tip).to(1, {scale: 1}, {easing:"elasticOut"})
        .call(() => {
            setTimeout(() => {
                cc.tween(this.tip).to(0.5, {position: cc.v2(0, 450), opacity: 0})
                .call(() => {
                    this.isShowTip = false;
                }).start();
            }, 1000);
        }).start();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.randomNumberList = [1 ,2, 4, 8];
        this.initGrids();

        this.currentMoveGrid = null;

        this.gameOverNode.active = false;

        this.currentScore = 0;
        this.currentCoin = 0;
        this.coinLabel.string = "" + this.currentCoin;
        this.scoreLabel.string = "SCORE: " + this.currentScore;
        this.gameOverScoreLabel.string = this.currentScore;

        for (let i = 0; i < 5; i++) {
            this.honeyNumList[i].setScale(0, 0);
        }

        this.gridsBg.active = true;
        this.container.active = true;
        this.gridsBg.setScale(0, 0);
        
        this.isRemoving = false;

        this.tip.active = false;
        this.isShowTip = false;
        this.tip.opacity = 255;
        this.tip.setScale(0, 0);
        this.tip.setPosition(0, 0);

        this.startNode.opacity = 255;
        this.startNode.active = true;

        this.highestScore = cc.sys.localStorage.getItem("highestScore");
        if (this.highestScore == null)this.highestScore = 0;
        this.highestScoreLabel.string = "" + this.highestScore;

        this.skillNode.active = false;

        this.refreshCoinLabel.string = "" + this.refreshCoin;
        this.remove1CoinLabel.string = "" + this.remove1Coin;
        this.remove5CoinLabel.string = "" + this.remove5Coin;
        this.removeColorCoinLabel.string = "" + this.removeColorCoin;

        this.skillTip.active = false;
        this.currentTimer = Date.now();

        this.limitClick = this.node.getComponent('LimitClick');

        this.isMute = false;
        this.muteBtn.active = !this.isMute;
        this.unmuteBtn.active = this.isMute;

        this.isMoving = false;

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

    mute () {
        this.isMute = true;
        this.muteBtn.active = !this.isMute;
        this.unmuteBtn.active = this.isMute;

        this.node.getComponent("cc.AudioSource").stop();
    },

    unmute () {
        this.isMute = false;
        this.muteBtn.active = !this.isMute;
        this.unmuteBtn.active = this.isMute;

        this.node.getComponent("cc.AudioSource").play();
    },

    startGame () {
        cc.tween(this.gridsBg).to(1, {scale: 1}, {easing: 'elasticOut'})
        .call(() => {
            this.preloadHoneyNum(true);
            this.createRandomGrids(10);
        }).start();
    },

    onClickStartBtn() {
        if (this.limitClick.clickTime() == false) {
            return
        }
        cc.tween(this.startNode).to(1, {opacity: 0})
        .call(() => {
            this.startNode.active = false;
            this.startGame();
        }).start();

        if (this.isMute === false) {
            this.node.getComponent("cc.AudioSource").volume = 0.5;
            this.node.getComponent("cc.AudioSource").play();
            this.node.getComponent("cc.AudioSource").loop = true;
        }
    },

    onClickSkillBtn () {
        if (this.limitClick.clickTime() == false) {
            return
        }
        if (this.skillNode.active === true) return;
        this.skillNode.active = true;
        this.skillNode.setScale(0, 0);
        cc.tween(this.skillNode).to(0.8, {scale: 1}, {easing: 'elasticOut'}).start();
    },

    onClickCloseSkill (_event, _callback) {
        if (_event != null && this.limitClick.clickTime() == false) {
            return
        }
        this.skillNode.setScale(1, 1);
        cc.tween(this.skillNode).to(0.2, {scale: 0})
        .call(() => {
            this.skillNode.active = false;

            if (_callback != null) _callback();
        }).start();
    },

    onClickRefresh () {
        if (this.limitClick.clickTime() == false) {
            return
        }
        if (this.currentCoin < this.refreshCoin) {
            this.onClickCloseSkill(null, null);
            this.showTip();
            return;
        }

        this.currentCoin -= this.refreshCoin;
        this.coinLabel.string = "" + this.currentCoin;

        this.onClickCloseSkill(null, () => {
            this.preloadHoneyNum(false);
            if (this.isMute === false) {
                setTimeout(()=> {
                    this.skillAudio_1.play();
                    this.skillAudio_1.volume = 0.5;
                }, 400);
            }
        });
    },

    onClickRemoveOne () {
        if (this.limitClick.clickTime() == false) {
            return
        }
        if (this.currentCoin < this.remove1Coin) {
            this.onClickCloseSkill(null, null);
            this.showTip();
            return;
        }

        this.currentCoin -= this.remove1Coin;
        this.coinLabel.string = "" + this.currentCoin;

        this.onClickCloseSkill(null, () => {
            let grids = this.getHoneyGrids();
            if (grids.length === 0) return;
            let grid = grids[Math.floor(Math.random() * grids.length)];
            grid.honey.getComponent("Honey").hide();
            grid.honey = null;
            grid.num = 0;

            grids = this.getHoneyGrids();
            if (grids.length === 0) this.createRandomGrids(5);

            if (this.isMute === false) {
                setTimeout(()=> {
                    this.skillAudio_23.volume = 0.5;
                    this.skillAudio_23.play();
                }, 300);
            }
        });
    },

    onClickRemoveFive () {
        if (this.limitClick.clickTime() == false) {
            return
        }
        if (this.currentCoin < this.remove5Coin) {
            this.onClickCloseSkill(null, null);
            this.showTip();
            return;
        }

        this.currentCoin -= this.remove5Coin;
        this.coinLabel.string = "" + this.currentCoin;

        this.onClickCloseSkill(null, () => {
            let grids = this.getHoneyGrids();
            if (grids.length === 0) return;
            let currentLength = grids.length < 5 ? grids.length : 5;
    
            while(currentLength > 0) {
                grids = this.getHoneyGrids();
                let grid = grids[Math.floor(Math.random() * grids.length)];
                grid.honey.getComponent("Honey").hide();
                grid.honey = null;
                grid.num = 0;
                currentLength--;
            }
    
            grids = this.getHoneyGrids();
            if (grids.length === 0) this.createRandomGrids(5);

            if (this.isMute === false) {
                setTimeout(()=> {
                    this.skillAudio_23.volume = 0.5;
                    this.skillAudio_23.play();
                }, 300);
            }
        });
    },

    onClickRemoveSameColor () {
        if (this.limitClick.clickTime() == false) {
            return
        }
        if (this.currentCoin < this.removeColorCoin) {
            this.onClickCloseSkill(null, null);
            this.showTip();
            return;
        }

        this.currentCoin -= this.removeColorCoin;
        this.coinLabel.string = "" + this.currentCoin;

        this.isRemoving = true;

        this.onClickCloseSkill(null);

        this.addOpacity = true;
        this.skillTip.opacity = 0;
        this.skillTip.active = true;
    },

    removeSameColor (_grid) {
        this.skillTip.active = false;
        let grids = this.getSameColorGrids(_grid);
        for (let i = 0; i < grids.length; i++) {
            let grid = grids[i];
            grid.honey.getComponent("Honey").hide();
            grid.honey = null;
            grid.num = 0;
        }
        this.isRemoving = false;

        grids = this.getHoneyGrids();
        if (grids.length === 0) this.createRandomGrids(5);

        if (this.isMute === false) {
            this.skillAudio_4.play();
        }
    },

    getSameColorGrids (_grid) {
        let result = [];
        for (let i = 0; i < this.gridList.length; i++) {
            let grid = this.gridList[i];
            if (grid.num === _grid.num) result.push(grid);
        }

        return result;
    },

    getHoneyGrids () {
        let result = [];
        for (let i = 0; i < this.gridList.length; i++) {
            let grid = this.gridList[i];
            if (grid.honey != null) result.push(grid);
        }

        return result;
    },

    preloadHoneyNum (_isInit) {
        this.randomHoneyNumList = [];
        for (let i = 0; i < 5; i++) {
            let num = this.randomNumberList[Math.floor(Math.random() * this.randomNumberList.length)];
            this.randomHoneyNumList.push(num);
        }

        if (_isInit) {
            for (let j = 0; j < 5; j++) {
                setTimeout(()=> {
                    this.honeyNumList[j].getComponent("Honey").setLabel(this.randomHoneyNumList[j]);
                    cc.tween(this.honeyNumList[j]).to(.5, {scale: 1}, {easing: "elasticOut"}).start();
                }, j * 50);
            }
        } else {
            for (let k = 0; k < 5; k++) {
                cc.tween(this.honeyNumList[k]).to(.5, {scale: 0}, {easing: "elasticIn"})
                .call(() => {
                    setTimeout(()=> {
                        this.honeyNumList[k].getComponent("Honey").setLabel(this.randomHoneyNumList[k]);
                        cc.tween(this.honeyNumList[k]).to(.5, {scale: 1}, {easing: "elasticOut"}).start();
                    }, k * 50);
                }).start();
            }
        }
    },

    restarGameCallback () {
        cc.tween(this.gameOverNode).to(1, {scale: 0}, {easing: "elasticIn"})
        .call(() => {
            this.gameOverNode.active = false;

            for (let i = 0; i < this.gridList.length; i++){
                let grid = this.gridList[i];
                this.honeyPool.push(grid.honey);
                grid.honey.parent = null;
                grid.honey = null;
                grid.num = 0;
            }
            this.gameOverNode.active = false;
            this.currentScore = 0;
            // this.currentCoin = 0;
            // this.coinLabel.string = "" + this.currentCoin;
            this.scoreLabel.string = "SCORE: " + this.currentScore;
            this.gameOverScoreLabel.string = this.currentScore;

            for (let i = 0; i < 5; i++) {
                this.honeyNumList[i].setScale(0, 0);
            }
    
            this.gridsBg.active = true;
            this.container.active = true;
            this.gridsBg.setScale(0, 0);
            cc.tween(this.gridsBg).to(1, {scale: 1}, {easing: 'elasticOut'})
            .call(() => {
                this.preloadHoneyNum(true);
                this.createRandomGrids(10);
            }).start();
        }).start();

        this.isRemoving = false;
        this.tip.active = false;
        this.tip.opacity = 255;
        this.isShowTip = false;
        this.tip.setScale(0, 0);
        this.tip.setPosition(0, 0);

        if (this.isMute === false) {
            this.node.getComponent("cc.AudioSource").volume = 0.5;
            this.node.getComponent("cc.AudioSource").play();
            this.node.getComponent("cc.AudioSource").loop = true;
        }
    },

    restart () {
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

    initGrids () {
        this.grids = [];
        let minCount = 5;
        let maxCount = 13;
        let minDis = -149;
        let maxDis = -297;
        let initY = 270;
        let count;
        let initDis;
        let gridInstance;
        let index = 0;
        this.gridList = [];
        for (let i = 0; i < 9; i++) {
            if (i <= 4) {
                count = minCount + i;
                initDis = minDis - i * 37;
            } else {
                count = maxCount - i;
                initDis = maxDis + (i - 4) * 37;
            }
            this.grids[i] = [];
            for (let j = 0; j < count; j++) {
                this.grids[i][j] = {row: i, col: j, pos: cc.v2(initDis + j * 74, initY - i * 64), index: index, honey: null, num: 0};

                let grid = cc.instantiate(this.gridPrefab);
                grid.parent = this.container;
                grid.setPosition(this.grids[i][j].pos);
                grid.getComponent("Grid").init(this.grids[i][j], this);
                
                index++;
                this.gridList.push(this.grids[i][j]);
                // gridInstance = cc.instantiate(this.honeyPrefab);
                // gridInstance.parent = this.container;
                // gridInstance.setPosition();
            }
        }
    },

    createRandomGrids (_count) {
        let honey;
        this.previousDeleteGrids = null;
        let nullGridList = this.getNullGrids();
        let currentCount = nullGridList.length > _count ? _count : nullGridList.length;
        this.checkCount = currentCount;
        this.currentCheckCount = 0;
        for(let i = 0; i < currentCount; i++) {
            let num;
            if (_count === 10) {
                num = this.randomNumberList[Math.floor(Math.random() * this.randomNumberList.length)];
            } else {
                num = this.randomHoneyNumList[i];
            }
            if (this.honeyPool.length > 0) {
                honey = this.honeyPool.pop();
            } else {
                honey = cc.instantiate(this.honeyPrefab);
            }

            nullGridList = this.getNullGrids();
            let currentGrid = nullGridList[Math.floor(Math.random() * nullGridList.length)];
            currentGrid.num = num;
            currentGrid.honey = honey;
            honey.getComponent("Honey").show(this.container, currentGrid);
            setTimeout(() => {
                this.checkMerge(currentGrid);
            }, 1)
        }
        // nullGridList = this.getNullGrids();
        // console.log(nullGridList);
        if (_count === 5) this.preloadHoneyNum(false);
    },

    checkMerge (_gridData) {
        if (this.previousDeleteGrids && this.previousDeleteGrids.indexOf(_gridData) >= 0) {
            this.currentCheckCount++;
            if (this.currentCheckCount >= this.checkCount) {
                let nullGridList = this.getNullGrids();
                if (nullGridList.length === 0) this.gameOver();
            }
            return;
        }
        this.previousDeleteGrids = this.getGroup(_gridData);
        if (this.previousDeleteGrids.length >= 4) {
            this.isMoving = true;
            this.mergeHoney(_gridData, this.previousDeleteGrids);
        } else {
            this.currentCheckCount++;
            if (this.currentCheckCount >= this.checkCount) {
                let nullGridList = this.getNullGrids();
                if (nullGridList.length === 0) this.gameOver();
            }
        }
    },

    gameOver () {
        this.gameOverNode.active = true;
        // this.gridsBg.active = false;
        // this.container.active = false;
        this.gameOverNode.setScale(0, 0);
        cc.tween(this.gameOverNode).to(1, {scale: 1}, {easing: "elasticOut"}).start();

        if (this.isMute === false) {
            this.node.getComponent("cc.AudioSource").stop();
            this.endAudio.volume = 0.5;
            this.endAudio.play();
        }

        // the adBreak() won't show on the first time we call that, 
        // moreover the adBreak() won't show when no user input either
        // so we use below line to kickstart the the following adBreak()
        window.adBreak({
            type: 'next',
            name: 'popup_start'
        });
    },

    getNullGrids () {
        let result = [];
        for (let i = 0; i < this.gridList.length; i++) {
            if (this.gridList[i].honey == null) {
                result.push(this.gridList[i]);
            }
        }

        return result;
    },

    startMove (_gridData) {
        this.currentMoveGrid = _gridData;
    },

    move () {

    },

    endMove (_gridData) {
        if (this.currentMoveGrid) {
            this.honey = this.currentMoveGrid.honey;
            
            this.path = this.getPath(this.currentMoveGrid, _gridData);

            if (this.path == null) {
                this.restoreHoney();
                return;
            }

            this.isMoving = true;

            this.currentMoveGrid.honey = null;
            _gridData.honey = this.honey;
            _gridData.num = this.currentMoveGrid.num;
            this.currentMoveGrid.num = 0;
            
            let callback = cc.callFunc(function () {
                if (this.isMute === false) {
                    this.moveAudio.volume = 0.5;
                    this.moveAudio.play();
                }
                let deleteGrids = this.getGroup(_gridData);
                if (deleteGrids.length >= 4) {
                    this.mergeHoney(_gridData, deleteGrids);
                } else {
                    this.createRandomGrids(5);
                    this.isMoving = false;
                }
            }, this);

            let result = [];
            let sequence;
            if (this.path.length > 1) {
                for (let i = 0; i < this.path.length; i++) {
                    let point = this.path[i].pos;
                    let action = cc.moveTo(.05,cc.v2(point.x,point.y));
                    result.push(action);
                }
                result.push(callback);
                sequence = cc.sequence(result);
                this.honey.runAction(sequence);
            } else {
                let action = cc.moveTo(.05,cc.v2(this.path[0].pos.x,this.path[0].pos.y));
                result = [action, callback];
                sequence = cc.sequence(result);
                this.honey.runAction(sequence);
            }

            this.currentMoveGrid.grid.stopHight();
            this.currentMoveGrid = null;
        }
    },

    restoreHoney () {
        if (this.currentMoveGrid != null) {
            this.currentMoveGrid.grid.stopHight();
        } 
    },

    mergeHoney (_gridData, _deleteList) {
        let resultNum = _gridData.num * 4;
        _gridData.mergeCount = _deleteList.length - 1;
        for (let i = 0; i < _deleteList.length; i++) {
            let grid = _deleteList[i];
            if (grid != _gridData) {
                cc.tween(grid.honey).to(0.5, {position: cc.v2(_gridData.pos.x, _gridData.pos.y)}, {easing: 'elasticIn'})
                .call((_honey) => {
                    _gridData.mergeCount--;

                    _honey.parent = null;
                    this.honeyPool.push(_honey);

                    // console.log("_gridData.mergeCount: " + _gridData.mergeCount)
                    if (_gridData.mergeCount <= 0) {
                        
                        cc.tween(_gridData.honey).to(0.8, {scale: 0},{easing: 'elasticIn'}).call(() => {
                            _gridData.num = resultNum;
                            _gridData.honey.getComponent('Honey').setLabel(resultNum);
                            if (this.isMute === false) {
                                this.mergeAudio.volume = 0.5;
                                this.mergeAudio.play();
                            }
                            cc.tween(_gridData.honey).to(0.8, {scale: 1}, {easing: 'elasticOut'})
                            .call(() => {
                                this.isMoving = false;
                                this.previousDeleteGrids = null;
                                this.checkMerge(_gridData);
                                
                            }).start();
                        }).start();
                    }
                }).start();
                grid.honey = null;
                grid.num = 0;
            }
        }

        this.currentCoin++;
        this.currentScore += resultNum;
        if (this.currentScore > this.highestScore) {
            cc.sys.localStorage.setItem("highestScore", this.currentScore);
            this.highestScoreLabel.string = "" + this.currentScore;
        }
        this.coinLabel.string = "" + this.currentCoin;
        this.scoreLabel.string = "SCORE: " + this.currentScore;
        this.gameOverScoreLabel.string = this.currentScore;
    },

    getPath (_startGrid, _endGrid) {
        // reset
        for (let i = 0; i < this.gridList.length; i++) {
            let grid = this.gridList[i];
            grid.parentGrid = null;
        }

        this.openList = [_startGrid];
        this.closeList = [];
        let idx;
        while(true) {
            let targetGrid = this.getMinNode(_startGrid, _endGrid);
            this.closeList.push(targetGrid);
            idx = this.openList.indexOf(targetGrid);
            this.openList.splice(idx, 1);
            
            this.openList = this.openList.concat(this.getRoundNode(targetGrid));
            
            if (targetGrid == _endGrid) {
                let endPoint = targetGrid;
                let endPath = [];
                while(true) {
                    if (endPoint.parentGrid) {
                        endPath.push(endPoint);
                        endPoint = endPoint.parentGrid;
                    } else {
                        return endPath.reverse();
                    }
                }
            }

            if (this.openList.length === 0) return null;
        }
    },

    filterGrid (_grid) {
        let openIdx = this.openList.indexOf(_grid);
        let closeIdx = this.closeList.indexOf(_grid);

        return openIdx < 0 && closeIdx < 0;
    },

    getRoundNode (_grid, _notPath) {
        let currentRow = _grid.row;
        let currentCol = _grid.col;
        let top = currentRow > 0 ? this.grids[currentRow - 1] : null;
        let middle = this.grids[currentRow];
        let bottom = currentRow < 8 ? this.grids[currentRow + 1] : null;
        let result = [];
        
        if (middle) {
            // left
            if (currentCol > 0) {
                if (_notPath || (middle[currentCol - 1].honey == null && this.filterGrid(middle[currentCol - 1]))) {
                    if (_notPath != true) middle[currentCol - 1].parentGrid = _grid;
                    result.push(middle[currentCol - 1]);
                }
            }
            // right
            if (currentCol < (middle.length - 1)) {
                if (_notPath || (middle[currentCol + 1].honey == null && this.filterGrid(middle[currentCol + 1]))) {
                    if (_notPath != true) middle[currentCol + 1].parentGrid = _grid;
                    result.push(middle[currentCol + 1]);
                }
            }
        }
        if (top) {
            // left
            if (top.length > this.grids[currentRow].length) {
                if (_notPath || (top[currentCol].honey == null && this.filterGrid(top[currentCol]))) {
                    if (_notPath != true) top[currentCol].parentGrid = _grid;
                    result.push(top[currentCol]);
                }
            } else {
                if (currentCol > 0) {
                    if (_notPath || (top[currentCol - 1].honey == null && this.filterGrid(top[currentCol - 1]))) {
                        if (_notPath != true) top[currentCol - 1].parentGrid = _grid;
                        result.push(top[currentCol - 1]);
                    }
                }
            }
            // right
            if (top.length > this.grids[currentRow].length) {
                if (_notPath || (top[currentCol + 1].honey == null && this.filterGrid(top[currentCol + 1]))) {
                    if (_notPath != true) top[currentCol + 1].parentGrid = _grid;
                    result.push(top[currentCol + 1]);
                }
            } else {
                if (currentCol < (this.grids[currentRow].length - 1)) {
                    if (_notPath || (top[currentCol].honey == null && this.filterGrid(top[currentCol]))) {
                        if (_notPath != true) top[currentCol].parentGrid = _grid;
                        result.push(top[currentCol]);
                    }
                }
            }
        }
        if (bottom) {
            // left
            if (bottom.length > this.grids[currentRow].length) {
                if (_notPath || (bottom[currentCol].honey == null && this.filterGrid(bottom[currentCol]))) {
                    if (_notPath != true) bottom[currentCol].parentGrid = _grid;
                    result.push(bottom[currentCol]);
                }
            } else {
                if (currentCol > 0) {
                    if (_notPath || (bottom[currentCol - 1].honey == null && this.filterGrid(bottom[currentCol - 1]))) {
                        if (_notPath != true) bottom[currentCol - 1].parentGrid = _grid;
                        result.push(bottom[currentCol - 1]);
                    }
                }
            }
            // right
            if (bottom.length > this.grids[currentRow].length) {
                if (_notPath || (bottom[currentCol + 1].honey == null && this.filterGrid(bottom[currentCol + 1]))) {
                    if (_notPath != true) bottom[currentCol + 1].parentGrid = _grid;
                    result.push(bottom[currentCol + 1]);
                }
            } else {
                if (currentCol < (this.grids[currentRow].length - 1)) {
                    if (_notPath || (bottom[currentCol].honey == null && this.filterGrid(bottom[currentCol]))) {
                        if (_notPath != true) bottom[currentCol].parentGrid = _grid;
                        result.push(bottom[currentCol]);
                    }
                }
            }
        }

        return result;
    },

    getMinNode (_startGrid, _endGrid) {
        let currentNode = this.openList[0];
        let currentValue = this.getValue(_startGrid, _endGrid, currentNode);
        currentNode.pathValue = currentValue;
        for (let i = 1; i < this.openList.length; i++) {
            let value = this.getValue(_startGrid, _endGrid, this.openList[i]);
            this.openList[i].pathValue = value;
            if (value < currentValue) {
                currentNode = this.openList[i];
                currentValue = value;
            }
        }

        return currentNode;
    },

    getValue (_startGrid, _endGrid, _currentGrid) {
        return this.getDis(_startGrid.pos, _currentGrid.pos) + this.getDis(_currentGrid.pos, _endGrid.pos);
    },

    getDis (_startPos, _endPos) {
        let a = _endPos.x - _startPos.x;
        let b = _endPos.y - _startPos.y;
        return Math.sqrt(a * a + b * b);
    },

    getGroup (_grid) {
        let currentGrid = _grid;
        let roundList;
        let list = [];
        let result = [_grid];
        while(true) {
            roundList = this.getRoundNode(currentGrid, true);
            for (let i = 0; i < roundList.length; i++) {
                if (roundList[i].num === _grid.num && list.indexOf(roundList[i]) < 0 && result.indexOf(roundList[i]) < 0) {
                    list.push(roundList[i]);
                    if (result.indexOf(roundList[i]) < 0) result.push(roundList[i]);
                }
            }
            if (list.length === 0) return result;
            currentGrid = list.pop();
        }
        
        return null;
    },

    start () {

    },

    update (dt) {
        if (this.skillTip.active === false) return;
        if (Date.now() - this.currentTimer >= 100) {
            this.currentTimer = Date.now();

            if (this.addOpacity === true) {
                this.skillTip.opacity += 20;
            } else {
                this.skillTip.opacity -= 20;
            }
            
            if (this.skillTip.opacity >= 255) {
                this.addOpacity = false;
            } else if (this.skillTip.opacity <= 0) {
                this.addOpacity = true;
            }
        }
    },
});
