window.__require=function t(e,i,s){function o(c,r){if(!i[c]){if(!e[c]){var h=c.split("/");if(h=h[h.length-1],!e[h]){var a="function"==typeof __require&&__require;if(!r&&a)return a(h,!0);if(n)return n(h,!0);throw new Error("Cannot find module '"+c+"'")}c=h}var u=i[c]={exports:{}};e[c][0].call(u.exports,function(t){return o(e[c][1][t]||t)},u,u.exports,t,e,i,s)}return i[c].exports}for(var n="function"==typeof __require&&__require,c=0;c<s.length;c++)o(s[c]);return o}({BgBlock:[function(t,e,i){"use strict";cc._RF.push(e,"b5a31+HRDdOkYMz29Srq1UR","BgBlock"),cc.Class({extends:cc.Component,properties:{blockPrefab:cc.Prefab},start:function(){},setContent:function(){}}),cc._RF.pop()},{}],BgContainer:[function(t,e,i){"use strict";cc._RF.push(e,"cf7f9xzZqFCk5uGhH1ziY+T","BgContainer"),cc.Class({extends:cc.Component,properties:{bgContainerList:[cc.Node],scoreNode:cc.Node,endScoreLabel:cc.Label,highestScoreLabel:cc.Label},onLoad:function(){this.currentTimer=Date.now(),this.currentIdx=0,this.getScoreList=[];for(var t=0;t<3;t++)this.bgContainerList[t].getComponent("BgItem").setIndex(t),t>0&&(this.getScoreList=t%2==1?this.getScoreList.concat([-1*(t-1)*1200-800,-1*(t-1)*1200-1250,-1*(t-1)*1200-1700]):this.getScoreList.concat([-1*(t-1)*1200-1e3,-1*(t-1)*1200-1500]));console.log(this.getScoreList),this.theFirst=this.bgContainerList.shift(),this.currentSpeed=5,this.isOver=!1,this.scoreTimer=Date.now(),this.currentScore=0,this.scoreNode.getComponent("NumList").setNum(this.currentScore),this.endScoreLabel.string=""+this.currentScore,this.highestScore=cc.sys.localStorage.getItem("highestScore"),null==this.highestScore&&(this.highestScore=0),this.highestScoreLabel.string=""+this.highestScore,this.isPause=!0},pause:function(){this.isPause=!0},resume:function(){this.isPause=!1},start:function(){},gameOver:function(){this.isOver=!0},reset:function(){this.currentTimer=Date.now(),this.currentIdx=0,2===this.bgContainerList.length&&this.bgContainerList.push(this.theFirst),this.getScoreList=[];for(var t=0;t<3;t++)this.bgContainerList[t].getComponent("BgItem").setIndex(t),this.bgContainerList[t].setPosition(1200*t,0),t>0&&(this.getScoreList=t%2==1?this.getScoreList.concat([-1*(t-1)*1200-800,-1*(t-1)*1200-1250,-1*(t-1)*1200-1700]):this.getScoreList.concat([-1*(t-1)*1200-1e3,-1*(t-1)*1200-1500]));this.theFirst=this.bgContainerList.shift(),this.node.x=0,this.currentSpeed=5,this.isOver=!1,this.isPause=!1,this.currentScore=0,this.scoreNode.getComponent("NumList").setNum(this.currentScore),this.endScoreLabel.string=""+this.currentScore},update:function(t){if(!0!==this.isOver&&!0!==this.isPause&&Date.now()-this.currentTimer>=20){this.currentTimer=Date.now(),this.node.x-=this.currentSpeed;var e=this.node.x;this.getScoreList.length>0&&e<=this.getScoreList[0]&&(this.currentScore+=10,this.scoreNode.getComponent("NumList").setNum(this.currentScore),this.getScoreList.shift()),this.node.x<=-1200*(this.currentIdx+1)&&(this.theFirst.x=1200*(this.currentIdx+3),this.theFirst.getComponent("BgItem").setIndex(this.currentIdx+3),this.bgContainerList.push(this.theFirst),this.theFirst=this.bgContainerList.shift(),this.currentIdx++,this.currentIdx%2==1?this.getScoreList=this.getScoreList.concat([-1*(this.currentIdx+1)*1200-800,-1*(this.currentIdx+1)*1200-1250,-1*(this.currentIdx+1)*1200-1700]):this.getScoreList=this.getScoreList.concat([-1*(this.currentIdx+1)*1200-1e3,-1*(this.currentIdx+1)*1200-1500]),console.log(this.getScoreList),this.endScoreLabel.string=""+this.currentScore,this.currentScore>this.highestScore&&(cc.sys.localStorage.setItem("highestScore",this.currentScore),this.highestScoreLabel.string=""+this.currentScore),console.log("this.currentIdx: "+this.currentIdx),this.currentIdx<=10?this.currentSpeed=5:this.currentIdx<=20?this.currentSpeed=6:this.currentIdx<=30?this.currentSpeed=7:this.currentSpeed=8)}}}),cc._RF.pop()},{}],BgItem:[function(t,e,i){"use strict";cc._RF.push(e,"49ecbyhoPhHu5/2Co7i2q76","BgItem"),cc.Class({extends:cc.Component,properties:{blockPrefab:cc.Prefab,blockList:[],blockList_2:[],blockCount:5},onLoad:function(){},start:function(){},setIndex:function(t){this.index=t,this.createBlock()},createBlock:function(){this.positionXList,this.blockCount=3+Math.floor(Math.random()*this.index),this.index%2==1?(this.positionXList=[-450,0,450],this.blockCount>3&&(this.blockCount=3)):(this.positionXList=[-250,250],this.blockCount>2&&(this.blockCount=2));for(var t=0;t<this.blockList.length;t++){var e=this.blockList[t];this.blockList_2[t].parent=e.parent=null}if(0!==this.index)for(var i=0;i<this.blockCount;i++){if(i<this.blockList.length){var s=this.positionXList[i],o=1200*Math.random();this.blockList[i].y=-900-o,i>=1&&this.blockList_2[i-1].y<=1200&&(this.blockList[i].y=-900-o),this.blockList[i].x=s,this.blockList[i].parent=this.node}else{var n=cc.instantiate(this.blockPrefab);n.parent=this.node;var c=this.positionXList[i],r=1200*Math.random();n.x=c,n.y=-900-r,i>=1&&this.blockList_2[i-1].y<=1200&&(n.y=-900-r),n.setScale(1,1),this.blockList.push(n)}if(i<this.blockList_2.length){var h=this.positionXList[i],a=2100-(Math.abs(this.blockList[i].y)-900)*Math.random();this.blockList_2[i].y=0+a,i>=1&&this.blockList[i-1].y<=-1200&&(this.blockList_2[i].y=3e3-(Math.abs(this.blockList[i].y)-900)*Math.random()),this.blockList_2[i].x=h,this.blockList_2[i].setScale(1,-1),this.blockList_2[i].parent=this.node}else{var u=cc.instantiate(this.blockPrefab);u.parent=this.node;var d=this.positionXList[i],g=2100-(Math.abs(this.blockList[i].y)-900)*Math.random();u.y=0+g,i>=1&&this.blockList[i-1].y<=-1200&&(u.y=3e3-(Math.abs(this.blockList[i].y)-900)*Math.random()),u.x=d,u.setScale(1,-1),this.blockList_2.push(u)}if(this.blockList[i].y<=-1500&&this.blockList_2[i].y>=1500){if(i>1&&(this.blockList_2[i-1].y<=1200||this.blockList[i-1].y<=-1200))continue;this.blockList[i].y=100*Math.random()-1500,this.blockList_2[i].y=1500-100*Math.random()}}}}),cc._RF.pop()},{}],MainScene:[function(t,e,i){"use strict";cc._RF.push(e,"62db2yAZ+NCqJ85c+Azwu++","MainScene"),cc.Class({extends:cc.Component,properties:{role:cc.Node,bgContainer:cc.Node,endNode:cc.Node,moveBgList:[cc.Node],moveBgList_2:[cc.Node],moveBgList_3:[cc.Node],bg_2:cc.Node,bg_3:cc.Node,moveBgNode:cc.Node,moveBgNode_2:cc.Node,moveBgNode_3:cc.Node,pauseBtn:cc.Node,resumeBtn:cc.Node,guideNode:cc.Node,readyNode:cc.Node,menuNode:cc.Node,hitAudio:cc.AudioSource,endAudio:cc.AudioSource},start:function(){var t=this;this.roleComponent=this.role.getComponent("RoleAnimation"),this.node.on(cc.Node.EventType.TOUCH_START,function(){!0===t.guideNode.active?(t.startGame(),t.guideNode.active=!1):t.roleComponent.raise()},this),cc.director.getCollisionManager().enabled=!0,this.endNode.active=!1,this.pauseBtn.active=!1,this.resumeBtn.active=!1,this.guideNode.active=!1,this.role.active=!1,this.randomBackground()},randomBackground:function(){var t=[0,1,2],e=t[Math.floor(Math.random()*t.length)];0===e?(this.bg_2.active=!1,this.bg_3.active=!1,this.currentMoveBgList=this.moveBgList,this.moveBgNode.active=!0,this.moveBgNode_2.active=!1,this.moveBgNode_3.active=!1):1===e?(this.bg_2.active=!0,this.bg_3.active=!1,this.currentMoveBgList=this.moveBgList_2,this.moveBgNode.active=!1,this.moveBgNode_2.active=!0,this.moveBgNode_3.active=!1):(this.bg_2.active=!1,this.bg_3.active=!0,this.currentMoveBgList=this.moveBgList_3,this.moveBgNode.active=!1,this.moveBgNode_2.active=!1,this.moveBgNode_3.active=!0)},enterGame:function(){this.menuNode.active=!1,this.guideNode.active=!0,this.role.active=!0,this.node.getComponent("cc.AudioSource").play(),this.node.getComponent("cc.AudioSource").loop=!0},restarGame:function(){var t=this;this.randomBackground(),this.node.on(cc.Node.EventType.TOUCH_START,function(){t.roleComponent.raise()},this),this.roleComponent.reset(),this.bgContainer.getComponent("BgContainer").reset(),this.endNode.active=!1;for(var e=0;e<this.currentMoveBgList.length;e++){this.currentMoveBgList[e].getComponent("MoveBg").reset()}this.readyNode.active=!0,this.readyNode.setScale(0,0),cc.tween(this.readyNode).to(1,{scale:1},{easing:"elasticOut"}).start(),setTimeout(function(){t.readyNode.active=!1},2e3),this.node.getComponent("cc.AudioSource").play(),this.node.getComponent("cc.AudioSource").loop=!0},gameOver:function(){var t=this;this.bgContainer.getComponent("BgContainer").gameOver(),this.node.off(cc.Node.EventType.TOUCH_START,function(){t.roleComponent.raise()},this),this.roleComponent.dead(),this.endNode.active=!0;for(var e=0;e<this.currentMoveBgList.length;e++){this.currentMoveBgList[e].getComponent("MoveBg").gameOver()}this.node.getComponent("cc.AudioSource").stop(),this.hitAudio.volume=.3,this.hitAudio.play(),setTimeout(function(){t.endAudio.play()},500)},pauseGame:function(){var t=this;this.bgContainer.getComponent("BgContainer").pause(),this.node.off(cc.Node.EventType.TOUCH_START,function(){t.roleComponent.raise()},this),this.roleComponent.pause();for(var e=0;e<this.currentMoveBgList.length;e++){this.currentMoveBgList[e].getComponent("MoveBg").pause()}this.pauseBtn.active=!1,this.resumeBtn.active=!0,this.node.getComponent("cc.AudioSource").pause()},resumeGame:function(){var t=this;this.bgContainer.getComponent("BgContainer").resume(),this.node.on(cc.Node.EventType.TOUCH_START,function(){t.roleComponent.raise()},this),this.roleComponent.resume();for(var e=0;e<this.currentMoveBgList.length;e++){this.currentMoveBgList[e].getComponent("MoveBg").resume()}this.pauseBtn.active=!0,this.resumeBtn.active=!1,this.node.getComponent("cc.AudioSource").resume()},startGame:function(){var t=this;this.bgContainer.getComponent("BgContainer").resume(),this.roleComponent.resume();for(var e=0;e<this.currentMoveBgList.length;e++){this.currentMoveBgList[e].getComponent("MoveBg").resume()}this.readyNode.active=!0,this.readyNode.setScale(0,0),cc.tween(this.readyNode).to(1,{scale:1},{easing:"elasticOut"}).start(),setTimeout(function(){t.readyNode.active=!1},2e3),this.pauseBtn.active=!0}}),cc._RF.pop()},{}],MoveBg:[function(t,e,i){"use strict";cc._RF.push(e,"b3f2eP7XPZE1o5SqF9izYa7","MoveBg"),cc.Class({extends:cc.Component,properties:{bgContainerList:[cc.Node],currentSpeed:5},onLoad:function(){this.currentTimer=Date.now(),this.currentIdx=0,this.theFirst=this.bgContainerList.shift(),this.isOver=!1,this.isPause=!0},pause:function(){this.isPause=!0},resume:function(){this.isPause=!1},start:function(){},gameOver:function(){this.isOver=!0},reset:function(){this.currentTimer=Date.now(),this.currentIdx=0,2===this.bgContainerList.length&&this.bgContainerList.push(this.theFirst);for(var t=0;t<3;t++)this.bgContainerList[t].setPosition(1200*t,0);this.theFirst=this.bgContainerList.shift(),this.node.x=0,this.isOver=!1,this.isPause=!1},update:function(t){!0!==this.isOver&&!0!==this.isPause&&Date.now()-this.currentTimer>=20&&(this.currentTimer=Date.now(),this.node.x-=this.currentSpeed,this.node.x<=-1200*(this.currentIdx+1)&&(this.theFirst.x=1200*(this.currentIdx+3),this.bgContainerList.push(this.theFirst),this.theFirst=this.bgContainerList.shift(),this.currentIdx++))}}),cc._RF.pop()},{}],NumComponent:[function(t,e,i){"use strict";cc._RF.push(e,"6bf68b6QVlDl4Z7UNLVGSwA","NumComponent"),cc.Class({extends:cc.Component,properties:{numList:[cc.Node]},start:function(){},setNum:function(t){for(var e=0;e<this.numList.length;e++)this.numList[e].active=!1;this.numList[t].active=!0}}),cc._RF.pop()},{}],NumList:[function(t,e,i){"use strict";cc._RF.push(e,"3febaQ4d/BMWLxuFZiQ9cz8","NumList"),cc.Class({extends:cc.Component,properties:{numPrefab:cc.Prefab},onLoad:function(){},start:function(){},setNum:function(t){var e=(""+t).split("");if(this.numList)for(var i=0;i<this.numList.length;i++){this.numList[i].active=!1}else this.numList=[];for(var s=0;s<e.length;s++){var o=void 0;s<this.numList.length?(o=this.numList[s]).active=!0:((o=cc.instantiate(this.numPrefab)).parent=this.node,this.numList.push(o)),o.getComponent("NumComponent").setNum(e[s])}t>0&&cc.tween(this.node).to(.1,{scale:1.5}).to(.1,{scale:1}).start()}}),cc._RF.pop()},{}],RoleAnimation:[function(t,e,i){"use strict";cc._RF.push(e,"8398dCk+ptBK6T7Cjeyf+JI","RoleAnimation"),cc.Class({extends:cc.Component,properties:{imageList:[cc.Node],mainGame:cc.Node},onLoad:function(){this.imageList[0].active=!0,this.imageList[1].active=this.imageList[2].active=!1,this.currentIndex=1,this.currentTimer=Date.now(),this.intervalTimer=100,this.isDead=!1,this.isPause=!0,this.topY=null},start:function(){},onCollisionEnter:function(t,e){this.mainGame.getComponent("MainScene").gameOver()},dead:function(){cc.Tween.stopAll(),this.isDead=!0},pause:function(){cc.Tween.stopAll(),this.isPause=!0},resume:function(){this.isPause=!1,null!=this.topY?cc.tween(this.node).to(1,{position:cc.v2(0,-750)},{easing:"quadIn"}).start():cc.tween(this.node).to(.5,{position:cc.v2(0,this.topY)},{easing:"quadOut"}).to(1,{position:cc.v2(0,-750)},{easing:"quadIn"}).start()},reset:function(){this.node.x=0,this.node.y=0,this.isDead=!1,this.isPause=!1},update:function(t){!0!==this.isPause&&(50===this.intervalTimer&&Date.now()-this.restoreTimer>=300&&(this.intervalTimer=100),Date.now()-this.currentTimer>=this.intervalTimer&&(this.currentTimer=Date.now(),this.imageList[0].active=this.imageList[1].active=this.imageList[2].active=!1,this.imageList[this.currentIndex].active=!0,this.currentIndex++,this.currentIndex>2&&(this.currentIndex=0)))},raise:function(){var t=this;!0!==this.isDead&&!0!==this.isPause&&(this.intervalTimer=100,this.restoreTimer=Date.now(),this.topY=this.node.y+100,cc.tween(this.node).to(.5,{position:cc.v2(0,this.node.y+100)},{easing:"quadOut"}).call(function(){t.topY=null}).to(1,{position:cc.v2(0,-750)},{easing:"quadIn"}).start(),this.node.getComponent("cc.AudioSource").volume=.5,this.node.getComponent("cc.AudioSource").play())}}),cc._RF.pop()},{}]},{},["BgBlock","BgContainer","BgItem","MainScene","MoveBg","NumComponent","NumList","RoleAnimation"]);