window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BgBlock: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b5a31+HRDdOkYMz29Srq1UR", "BgBlock");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        blockPrefab: cc.Prefab
      },
      start: function start() {},
      setContent: function setContent() {}
    });
    cc._RF.pop();
  }, {} ],
  BgContainer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cf7f9xzZqFCk5uGhH1ziY+T", "BgContainer");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bgContainerList: [ cc.Node ],
        scoreNode: cc.Node,
        endScoreLabel: cc.Label,
        highestScoreLabel: cc.Label
      },
      onLoad: function onLoad() {
        this.currentTimer = Date.now();
        this.currentIdx = 0;
        this.getScoreList = [];
        for (var i = 0; i < 3; i++) {
          this.bgContainerList[i].getComponent("BgItem").setIndex(i);
          i > 0 && (this.getScoreList = i % 2 === 1 ? this.getScoreList.concat([ -1 * (i - 1) * 1200 - 800, -1 * (i - 1) * 1200 - 1250, -1 * (i - 1) * 1200 - 1700 ]) : this.getScoreList.concat([ -1 * (i - 1) * 1200 - 1e3, -1 * (i - 1) * 1200 - 1500 ]));
        }
        console.log(this.getScoreList);
        this.theFirst = this.bgContainerList.shift();
        this.currentSpeed = 5;
        this.isOver = false;
        this.scoreTimer = Date.now();
        this.currentScore = 0;
        this.scoreNode.getComponent("NumList").setNum(this.currentScore);
        this.endScoreLabel.string = "" + this.currentScore;
        this.highestScore = cc.sys.localStorage.getItem("highestScore");
        null == this.highestScore && (this.highestScore = 0);
        this.highestScoreLabel.string = "" + this.highestScore;
        this.isPause = true;
      },
      pause: function pause() {
        this.isPause = true;
      },
      resume: function resume() {
        this.isPause = false;
      },
      start: function start() {},
      gameOver: function gameOver() {
        this.isOver = true;
      },
      reset: function reset() {
        this.currentTimer = Date.now();
        this.currentIdx = 0;
        2 === this.bgContainerList.length && this.bgContainerList.push(this.theFirst);
        this.getScoreList = [];
        for (var i = 0; i < 3; i++) {
          this.bgContainerList[i].getComponent("BgItem").setIndex(i);
          this.bgContainerList[i].setPosition(1200 * i, 0);
          i > 0 && (this.getScoreList = i % 2 === 1 ? this.getScoreList.concat([ -1 * (i - 1) * 1200 - 800, -1 * (i - 1) * 1200 - 1250, -1 * (i - 1) * 1200 - 1700 ]) : this.getScoreList.concat([ -1 * (i - 1) * 1200 - 1e3, -1 * (i - 1) * 1200 - 1500 ]));
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
      update: function update(dt) {
        if (true === this.isOver || true === this.isPause) return;
        if (Date.now() - this.currentTimer >= 20) {
          this.currentTimer = Date.now();
          this.node.x -= this.currentSpeed;
          var posX = this.node.x;
          if (this.getScoreList.length > 0 && posX <= this.getScoreList[0]) {
            this.currentScore += 10;
            this.scoreNode.getComponent("NumList").setNum(this.currentScore);
            this.getScoreList.shift();
          }
          if (this.node.x <= -1200 * (this.currentIdx + 1)) {
            this.theFirst.x = 1200 * (this.currentIdx + 3);
            this.theFirst.getComponent("BgItem").setIndex(this.currentIdx + 3);
            this.bgContainerList.push(this.theFirst);
            this.theFirst = this.bgContainerList.shift();
            this.currentIdx++;
            this.currentIdx % 2 === 1 ? this.getScoreList = this.getScoreList.concat([ -1 * (this.currentIdx + 1) * 1200 - 800, -1 * (this.currentIdx + 1) * 1200 - 1250, -1 * (this.currentIdx + 1) * 1200 - 1700 ]) : this.getScoreList = this.getScoreList.concat([ -1 * (this.currentIdx + 1) * 1200 - 1e3, -1 * (this.currentIdx + 1) * 1200 - 1500 ]);
            console.log(this.getScoreList);
            this.endScoreLabel.string = "" + this.currentScore;
            if (this.currentScore > this.highestScore) {
              cc.sys.localStorage.setItem("highestScore", this.currentScore);
              this.highestScoreLabel.string = "" + this.currentScore;
            }
            console.log("this.currentIdx: " + this.currentIdx);
            this.currentIdx <= 10 ? this.currentSpeed = 5 : this.currentIdx <= 20 ? this.currentSpeed = 6 : this.currentIdx <= 30 ? this.currentSpeed = 7 : this.currentSpeed = 8;
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  BgItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "49ecbyhoPhHu5/2Co7i2q76", "BgItem");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        blockPrefab: cc.Prefab,
        blockList: [],
        blockList_2: [],
        blockCount: 5
      },
      onLoad: function onLoad() {},
      start: function start() {},
      setIndex: function setIndex(_index) {
        this.index = _index;
        this.createBlock();
      },
      createBlock: function createBlock() {
        this.positionXList;
        this.blockCount = 3 + Math.floor(Math.random() * this.index);
        if (this.index % 2 === 1) {
          this.positionXList = [ -450, 0, 450 ];
          this.blockCount > 3 && (this.blockCount = 3);
        } else {
          this.positionXList = [ -250, 250 ];
          this.blockCount > 2 && (this.blockCount = 2);
        }
        for (var i = 0; i < this.blockList.length; i++) {
          var block = this.blockList[i];
          var block_2 = this.blockList_2[i];
          block_2.parent = block.parent = null;
        }
        if (0 === this.index) return;
        for (var _i = 0; _i < this.blockCount; _i++) {
          if (_i < this.blockList.length) {
            var posX = this.positionXList[_i];
            var posY = -900;
            var randomOffsetY = 1200 * Math.random();
            this.blockList[_i].y = posY - randomOffsetY;
            if (_i >= 1 && this.blockList_2[_i - 1].y <= 1200) {
              this.blockList[_i].y = posY - randomOffsetY;
              -900;
            }
            this.blockList[_i].x = posX;
            this.blockList[_i].parent = this.node;
          } else {
            var _block = cc.instantiate(this.blockPrefab);
            _block.parent = this.node;
            var _posX = this.positionXList[_i];
            var _posY = -900;
            var _randomOffsetY = 1200 * Math.random();
            _block.x = _posX;
            _block.y = _posY - _randomOffsetY;
            if (_i >= 1 && this.blockList_2[_i - 1].y <= 1200) {
              _block.y = _posY - _randomOffsetY;
              -900;
            }
            _block.setScale(1, 1);
            this.blockList.push(_block);
          }
          if (_i < this.blockList_2.length) {
            var _posX2 = this.positionXList[_i];
            var _posY2 = 0;
            var _randomOffsetY2 = 2100 - (Math.abs(this.blockList[_i].y) - 900) * Math.random();
            this.blockList_2[_i].y = _posY2 + _randomOffsetY2;
            _i >= 1 && this.blockList[_i - 1].y <= -1200 && (this.blockList_2[_i].y = 3e3 - (Math.abs(this.blockList[_i].y) - 900) * Math.random());
            this.blockList_2[_i].x = _posX2;
            this.blockList_2[_i].setScale(1, -1);
            this.blockList_2[_i].parent = this.node;
          } else {
            var _block2 = cc.instantiate(this.blockPrefab);
            _block2.parent = this.node;
            var _posX3 = this.positionXList[_i];
            var _posY3 = 0;
            var _randomOffsetY3 = 2100 - (Math.abs(this.blockList[_i].y) - 900) * Math.random();
            _block2.y = _posY3 + _randomOffsetY3;
            _i >= 1 && this.blockList[_i - 1].y <= -1200 && (_block2.y = 3e3 - (Math.abs(this.blockList[_i].y) - 900) * Math.random());
            _block2.x = _posX3;
            _block2.setScale(1, -1);
            this.blockList_2.push(_block2);
          }
          if (this.blockList[_i].y <= -1500 && this.blockList_2[_i].y >= 1500) {
            if (_i > 1 && (this.blockList_2[_i - 1].y <= 1200 || this.blockList[_i - 1].y <= -1200)) continue;
            this.blockList[_i].y = 100 * Math.random() - 1500;
            this.blockList_2[_i].y = 1500 - 100 * Math.random();
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  MainScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "62db2yAZ+NCqJ85c+Azwu++", "MainScene");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        role: cc.Node,
        bgContainer: cc.Node,
        endNode: cc.Node,
        moveBgList: [ cc.Node ],
        moveBgList_2: [ cc.Node ],
        moveBgList_3: [ cc.Node ],
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
      start: function start() {
        var _this = this;
        this.roleComponent = this.role.getComponent("RoleAnimation");
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
          if (true === _this.guideNode.active) {
            _this.startGame();
            _this.guideNode.active = false;
          } else _this.roleComponent.raise();
        }, this);
        cc.director.getCollisionManager().enabled = true;
        this.endNode.active = false;
        this.pauseBtn.active = false;
        this.resumeBtn.active = false;
        this.isMute = false;
        this.unmuteBtn.active = false;
        this.muteBtn.active = false;
        this.guideNode.active = false;
        this.role.active = false;
        this.randomBackground();
        try {
          adBreak({
            type: "next",
            name: "popup_start"
          });
        } catch (e) {
          console.error(e);
        }
      },
      randomBackground: function randomBackground() {
        var idxList = [ 0, 1, 2 ];
        var randomIdx = idxList[Math.floor(Math.random() * idxList.length)];
        if (0 === randomIdx) {
          this.bg_2.active = false;
          this.bg_3.active = false;
          this.currentMoveBgList = this.moveBgList;
          this.moveBgNode.active = true;
          this.moveBgNode_2.active = false;
          this.moveBgNode_3.active = false;
        } else if (1 === randomIdx) {
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
      enterGame: function enterGame() {
        this.menuNode.active = false;
        this.guideNode.active = true;
        this.role.active = true;
        this.node.getComponent("cc.AudioSource").play();
        this.node.getComponent("cc.AudioSource").loop = true;
      },
      restarGameCallback: function restarGameCallback() {
        var _this2 = this;
        this.randomBackground();
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
          _this2.roleComponent.raise();
        }, this);
        this.roleComponent.reset();
        this.bgContainer.getComponent("BgContainer").reset();
        this.endNode.active = false;
        for (var i = 0; i < this.currentMoveBgList.length; i++) {
          var moveBg = this.currentMoveBgList[i];
          moveBg.getComponent("MoveBg").reset();
        }
        this.readyNode.active = true;
        this.readyNode.setScale(0, 0);
        cc.tween(this.readyNode).to(1, {
          scale: 1
        }, {
          easing: "elasticOut"
        }).start();
        setTimeout(function() {
          _this2.readyNode.active = false;
        }, 2e3);
        if (false === this.isMute) {
          this.node.getComponent("cc.AudioSource").play();
          this.node.getComponent("cc.AudioSource").loop = true;
        }
        this.pauseBtn.active = true;
        this.resumeBtn.active = false;
        this.unmuteBtn.active = this.isMute;
        this.muteBtn.active = !this.isMute;
      },
      restarGame: function restarGame() {
        var _this3 = this;
        this.unscheduleAllCallbacks();
        this.scheduleOnce(this.restarGameCallback.bind(this), 1);
        try {
          adBreak({
            type: "next",
            name: "game_restart",
            beforeBreak: function() {
              _this3.unscheduleAllCallbacks();
            }.bind(this),
            afterBreak: function() {
              _this3.restarGameCallback();
            }.bind(this)
          });
        } catch (e) {
          console.error(e);
          this.unscheduleAllCallbacks();
          this.restarGameCallback();
        }
      },
      gameOver: function gameOver() {
        var _this4 = this;
        this.bgContainer.getComponent("BgContainer").gameOver();
        this.node.off(cc.Node.EventType.TOUCH_START, function() {
          _this4.roleComponent.raise();
        }, this);
        this.roleComponent.dead();
        this.endNode.active = true;
        for (var i = 0; i < this.currentMoveBgList.length; i++) {
          var moveBg = this.currentMoveBgList[i];
          moveBg.getComponent("MoveBg").gameOver();
        }
        this.node.getComponent("cc.AudioSource").stop();
        if (false === this.isMute) {
          this.hitAudio.volume = .3;
          this.hitAudio.play();
          setTimeout(function() {
            _this4.endAudio.play();
          }, 500);
        }
      },
      mute: function mute() {
        this.node.getComponent("cc.AudioSource").stop();
        this.isMute = true;
        this.muteBtn.active = false;
        this.unmuteBtn.active = true;
      },
      unmute: function unmute() {
        this.node.getComponent("cc.AudioSource").play();
        this.isMute = false;
        this.muteBtn.active = true;
        this.unmuteBtn.active = false;
      },
      pauseGame: function pauseGame() {
        var _this5 = this;
        this.bgContainer.getComponent("BgContainer").pause();
        this.node.off(cc.Node.EventType.TOUCH_START, function() {
          _this5.roleComponent.raise();
        }, this);
        this.roleComponent.pause();
        for (var i = 0; i < this.currentMoveBgList.length; i++) {
          var moveBg = this.currentMoveBgList[i];
          moveBg.getComponent("MoveBg").pause();
        }
        this.pauseBtn.active = false;
        this.resumeBtn.active = true;
        this.node.getComponent("cc.AudioSource").pause();
      },
      resumeGame: function resumeGame() {
        var _this6 = this;
        this.bgContainer.getComponent("BgContainer").resume();
        this.node.on(cc.Node.EventType.TOUCH_START, function() {
          _this6.roleComponent.raise();
        }, this);
        this.roleComponent.resume();
        for (var i = 0; i < this.currentMoveBgList.length; i++) {
          var moveBg = this.currentMoveBgList[i];
          moveBg.getComponent("MoveBg").resume();
        }
        this.pauseBtn.active = true;
        this.resumeBtn.active = false;
        this.node.getComponent("cc.AudioSource").resume();
      },
      startGame: function startGame() {
        var _this7 = this;
        this.bgContainer.getComponent("BgContainer").resume();
        this.roleComponent.resume();
        for (var i = 0; i < this.currentMoveBgList.length; i++) {
          var moveBg = this.currentMoveBgList[i];
          moveBg.getComponent("MoveBg").resume();
        }
        this.readyNode.active = true;
        this.readyNode.setScale(0, 0);
        cc.tween(this.readyNode).to(1, {
          scale: 1
        }, {
          easing: "elasticOut"
        }).start();
        setTimeout(function() {
          _this7.readyNode.active = false;
        }, 2e3);
        this.pauseBtn.active = true;
        this.resumeBtn.active = false;
        this.unmuteBtn.active = false;
        this.muteBtn.active = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  MoveBg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b3f2eP7XPZE1o5SqF9izYa7", "MoveBg");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bgContainerList: [ cc.Node ],
        currentSpeed: 5
      },
      onLoad: function onLoad() {
        this.currentTimer = Date.now();
        this.currentIdx = 0;
        this.theFirst = this.bgContainerList.shift();
        this.isOver = false;
        this.isPause = true;
      },
      pause: function pause() {
        this.isPause = true;
      },
      resume: function resume() {
        this.isPause = false;
      },
      start: function start() {},
      gameOver: function gameOver() {
        this.isOver = true;
      },
      reset: function reset() {
        this.currentTimer = Date.now();
        this.currentIdx = 0;
        2 === this.bgContainerList.length && this.bgContainerList.push(this.theFirst);
        for (var i = 0; i < 3; i++) this.bgContainerList[i].setPosition(1200 * i, 0);
        this.theFirst = this.bgContainerList.shift();
        this.node.x = 0;
        this.isOver = false;
        this.isPause = false;
      },
      update: function update(dt) {
        if (true === this.isOver || true === this.isPause) return;
        if (Date.now() - this.currentTimer >= 20) {
          this.currentTimer = Date.now();
          this.node.x -= this.currentSpeed;
          if (this.node.x <= -1200 * (this.currentIdx + 1)) {
            this.theFirst.x = 1200 * (this.currentIdx + 3);
            this.bgContainerList.push(this.theFirst);
            this.theFirst = this.bgContainerList.shift();
            this.currentIdx++;
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  NumComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6bf68b6QVlDl4Z7UNLVGSwA", "NumComponent");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        numList: [ cc.Node ]
      },
      start: function start() {},
      setNum: function setNum(_num) {
        for (var i = 0; i < this.numList.length; i++) this.numList[i].active = false;
        this.numList[_num].active = true;
      }
    });
    cc._RF.pop();
  }, {} ],
  NumList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3febaQ4d/BMWLxuFZiQ9cz8", "NumList");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        numPrefab: cc.Prefab
      },
      onLoad: function onLoad() {},
      start: function start() {},
      setNum: function setNum(_num) {
        var numStr = "" + _num;
        var list = numStr.split("");
        if (this.numList) for (var i = 0; i < this.numList.length; i++) {
          var num = this.numList[i];
          num.active = false;
        } else this.numList = [];
        for (var j = 0; j < list.length; j++) {
          var _num2 = void 0;
          if (j < this.numList.length) {
            _num2 = this.numList[j];
            _num2.active = true;
          } else {
            _num2 = cc.instantiate(this.numPrefab);
            _num2.parent = this.node;
            this.numList.push(_num2);
          }
          _num2.getComponent("NumComponent").setNum(list[j]);
        }
        _num > 0 && cc.tween(this.node).to(.1, {
          scale: 1.5
        }).to(.1, {
          scale: 1
        }).start();
      }
    });
    cc._RF.pop();
  }, {} ],
  RoleAnimation: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8398dCk+ptBK6T7Cjeyf+JI", "RoleAnimation");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        imageList: [ cc.Node ],
        mainGame: cc.Node
      },
      onLoad: function onLoad() {
        this.imageList[0].active = true;
        this.imageList[1].active = this.imageList[2].active = false;
        this.currentIndex = 1;
        this.currentTimer = Date.now();
        this.intervalTimer = 100;
        this.isDead = false;
        this.isPause = true;
        this.topY = null;
      },
      start: function start() {},
      onCollisionEnter: function onCollisionEnter(other, self) {
        this.mainGame.getComponent("MainScene").gameOver();
      },
      dead: function dead() {
        cc.Tween.stopAll();
        this.isDead = true;
      },
      pause: function pause() {
        cc.Tween.stopAll();
        this.isPause = true;
      },
      resume: function resume() {
        this.isPause = false;
        null != this.topY ? cc.tween(this.node).to(1, {
          position: cc.v2(0, -750)
        }, {
          easing: "quadIn"
        }).start() : cc.tween(this.node).to(.5, {
          position: cc.v2(0, this.topY)
        }, {
          easing: "quadOut"
        }).to(1, {
          position: cc.v2(0, -750)
        }, {
          easing: "quadIn"
        }).start();
      },
      reset: function reset() {
        this.node.x = 0;
        this.node.y = 0;
        this.isDead = false;
        this.isPause = false;
      },
      update: function update(dt) {
        if (true === this.isPause) return;
        50 === this.intervalTimer && Date.now() - this.restoreTimer >= 300 && (this.intervalTimer = 100);
        if (Date.now() - this.currentTimer >= this.intervalTimer) {
          this.currentTimer = Date.now();
          this.imageList[0].active = this.imageList[1].active = this.imageList[2].active = false;
          this.imageList[this.currentIndex].active = true;
          this.currentIndex++;
          this.currentIndex > 2 && (this.currentIndex = 0);
        }
      },
      raise: function raise() {
        var _this = this;
        if (true === this.isDead || true === this.isPause) return;
        this.intervalTimer = 100;
        this.restoreTimer = Date.now();
        this.topY = this.node.y + 100;
        cc.tween(this.node).to(.5, {
          position: cc.v2(0, this.node.y + 100)
        }, {
          easing: "quadOut"
        }).call(function() {
          _this.topY = null;
        }).to(1, {
          position: cc.v2(0, -750)
        }, {
          easing: "quadIn"
        }).start();
        if (false === this.mainGame.getComponent("MainScene").isMute) {
          this.node.getComponent("cc.AudioSource").volume = .5;
          this.node.getComponent("cc.AudioSource").play();
        }
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "BgBlock", "BgContainer", "BgItem", "MainScene", "MoveBg", "NumComponent", "NumList", "RoleAnimation" ]);