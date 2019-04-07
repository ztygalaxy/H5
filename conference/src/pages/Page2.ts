//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Page2 extends Page {

    private mainImage: egret.Bitmap;
    private mainContainer: egret.DisplayObjectContainer;

    private pointList = [
        new egret.Point(134, 152),
        new egret.Point(240, 56),
        new egret.Point(408, 0),
        new egret.Point(580, 35),
        new egret.Point(706, 118),
        new egret.Point(774, 196),
        new egret.Point(810, 319),
        new egret.Point(820, 434),
        new egret.Point(842, 440),
        new egret.Point(854, 451)
    ];

    public constructor() {
        super(2);

        this.mainContainer = new egret.DisplayObjectContainer();
        this.addChild(this.mainContainer);

        this.mainImage = new egret.Bitmap(RES.getRes("page_2_bg_png"));
        this.mainImage.x = CONST.WIDTH - this.mainImage.width >> 1;
        this.mainImage.y = 700;
        this.mainContainer.addChild(this.mainImage);

        egret.Tween.get(this.mainContainer, { loop: true }).to({
            y: this.mainContainer.y + 20
        }, 1000, egret.Ease.sineInOut).to({
            y: this.mainContainer.y
        }, 1000, egret.Ease.sineInOut);

        egret.startTick(this.onFrame, this);
    }

    private firstLoad: boolean = true;

    public onLoad() {
        console.log("load page(2)");
        if (this.firstLoad) {
            this.firstLoad = false;
            this.showWord(1, 334);
            egret.setTimeout(this.showWord, this, 100, 2, 438);
            egret.setTimeout(this.showWord, this, 200, -1, 496);
            egret.setTimeout(this.showWord, this, 300, 3, 516);

            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

            let effect = new ClickEffect();
            effect.x = this.mainImage.x + 450;
            effect.y = this.mainImage.y + 600;
            this.addChild(effect);
        }
    }

    private touchBeginX: number;
    private touchBeginY: number;

    private onTouchBegin(e: egret.TouchEvent): void {
        this.touchBeginX = e.stageX;
        this.touchBeginY = e.stageY;
    }

    private onTouchEnd(e: egret.TouchEvent): void {
        if (Math.abs(this.touchBeginX - e.stageX) < CONST.TOUCH_OFFSET && Math.abs(this.touchBeginY - e.stageY) < CONST.TOUCH_OFFSET) {
            this.showInfo();
        }
    }

    private showWord(index: number, y): void {
        let word;
        if (index == -1) {
            word = new egret.Bitmap(RES.getRes("page_front_line_png"));
            word.width = 612;
        }
        else {
            word = new egret.Bitmap(RES.getRes("page_2_word" + index + "_png"));
        }
        this.addChild(word);
        word.x = CONST.WIDTH;
        word.y = y;

        egret.Tween.get(word).to({
            x: CONST.WIDTH - word.width >> 1
        }, CONST.TEXT_FADE_IN, CONST.TEXT_FADE_IN_EASE);
    }

    private onFrame(): boolean {
        //随机生成雪花
        if (Math.random() < 0.2) {
            let meteor = new egret.Shape();
            meteor.graphics.beginFill(0xffffff);
            meteor.graphics.drawRect(-6, -6, 12, 12);
            meteor.graphics.endFill();
            meteor.x = Math.floor(Math.random() * (CONST.WIDTH + 400));
            meteor.y = Math.floor(Math.random() * CONST.HEIGHT / 2);
            meteor.alpha = 0;
            this.addChildAt(meteor, 0);

            let distance = Math.floor(300 + Math.random() * 200);

            egret.Tween.get(meteor, {
                //雪花要停留在球体上
                onChange: () => {
                    for (let i = 0; i < this.pointList.length - 1; i++) {
                        let p1 = this.pointList[i];
                        let p2 = this.pointList[i + 1];
                        let x = meteor.x - this.mainImage.x;
                        let y = meteor.y - this.mainImage.y;
                        if (x > p1.x && x < p2.x && y > (p1.y < p2.y ? p1.y : p2.y) && y < (p2.y > p1.y ? p2.y : p1.y)) {
                            let dis = this.pointToSegDist(x, y, p1.x, p1.y, p2.x, p2.y);
                            if (dis < 5) {
                                this.mainContainer.addChild(meteor);
                                egret.Tween.removeTweens(meteor);
                                egret.Tween.get(meteor)
                                    .wait(3000)
                                    .to({ alpha: 0 }, 1500)
                                    .call(function () {
                                        meteor.parent.removeChild(meteor);
                                    });
                            }
                        }
                    }
                }
            })
                .to({ x: meteor.x - .8 * distance, y: meteor.y + distance, alpha: 1, rotation: 7200 + Math.floor(Math.random() * 360) }, 1000, egret.Ease.quadOut)
                .to({ alpha: 0 }, 100)
                .call(function () {
                    meteor.parent.removeChild(meteor);
                });
        }
        return false;
    }

    private pointToSegDist(x, y, startx, starty, endx, endy) {
        let se = (startx - endx) * (startx - endx) + (starty - endy) * (starty - endy);//线段两点距离平方  
        let p = ((x - startx) * (endx - startx) + (y - starty) * (endy - starty)); //向量点乘=|a|*|b|*cosA  
        let r = p / se; //r即点到线段的投影长度与线段长度比  
        let outx = startx + r * (endx - startx);
        let outy = starty + r * (endy - starty);
        let des = (x - outx) * (x - outx) + (y - outy) * (y - outy);
        return Math.sqrt(des);
    }

    public onMove(): void {
    }

    private showInfo(): void {
        let pannel = new Info1();
        this.stage.addChild(pannel);
        //出现动画
        this.touchEnabled = false;
        egret.Tween.get(pannel).set({
            x: CONST.WIDTH / 2,
            y: CONST.HEIGHT / 2,
            anchorOffsetX: CONST.WIDTH / 2,
            anchorOffsetY: CONST.HEIGHT / 2,
            scaleX: 0.1,
            scaleY: 0.1,
            alpha: 0.5
        }).to({
            y: CONST.HEIGHT / 2 - 450,
            scaleX: 0.2,
            scaleY: 0.2,
        }, 200, egret.Ease.circIn).to({
            x: CONST.WIDTH / 2,
            y: CONST.HEIGHT / 2,
            scaleX: 1,
            scaleY: 1,
            alpha: 1
        }, 150, egret.Ease.circOut).call(function () {
            this.touchEnabled = true;
        }, this);
    }
}