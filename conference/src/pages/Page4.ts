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

class Page4 extends Page {

    private mainImage: egret.Bitmap;
    private mainImage2: egret.Bitmap;
    private mainImage3: egret.Bitmap;
    private mainImage4: egret.Bitmap;
    private mainImage5: egret.Bitmap;

    private boxs: Array<egret.Bitmap> = [];

    public constructor() {
        super(4);

        this.createBox();

        this.mainImage = new egret.Bitmap(RES.getRes("page_4_logo_png"));
        this.mainImage.x = (CONST.WIDTH - this.mainImage.width) / 2;
        this.mainImage.y = 650;
        this.addChild(this.mainImage);

        this.mainImage.touchEnabled = true;
        this.mainImage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMainImageTouchBegin, this);
        this.mainImage.addEventListener(egret.TouchEvent.TOUCH_END, this.onMainImageTouchEnd, this);

        this.mainImage2 = new egret.Bitmap(RES.getRes("page_4_logo1_png"));
        this.mainImage2.x = this.mainImage.x + 310 - 56;
        this.mainImage2.y = this.mainImage.y + 600 + 10;
        this.addChild(this.mainImage2);

        this.mainImage3 = new egret.Bitmap(RES.getRes("page_4_logo2_png"));
        this.mainImage3.x = this.mainImage.x + 310 - 22;
        this.mainImage3.y = this.mainImage.y + 600 + 40;
        this.addChild(this.mainImage3);

        this.mainImage4 = new egret.Bitmap(RES.getRes("page_4_logo3_png"));
        this.mainImage4.x = this.mainImage.x + 310 + 40;
        this.mainImage4.y = this.mainImage.y + 600 + 25;
        this.addChild(this.mainImage4);

        this.mainImage5 = new egret.Bitmap(RES.getRes("page_4_logo1_png"));
        this.mainImage5.x = this.mainImage.x + 310 - 100;
        this.mainImage5.y = this.mainImage.y + 600;
        this.addChild(this.mainImage5);
    }

    private openIndex: number;
    private touchBeginX: number;
    private touchBeginY: number;

    private onMainImageTouchBegin(e): void {
        this.touchBeginX = e.stageX;
        this.touchBeginY = e.stageY;
    }

    private onMainImageTouchEnd(e): void {
        if (Math.abs(e.stageX - this.touchBeginX) > 20 || Math.abs(e.stageY - this.touchBeginY) > 20) {
            return;
        }
        window.location.href = "http://www.huodongxing.com/event/9361412645900";
    }

    private createBox() {
        // 粒子出生位置
        let originX = CONST.WIDTH / 2 - 20;
        let originY = CONST.HEIGHT - 400;

        for (let i = 1; i <= 70; i++) {
            let box = new egret.Bitmap(RES.getRes("page_4_part" + (i % 8 + 1) + "_png"));
            box.x = originX;
            box.y = originY;
            this.boxs.push(box);
            this.addChild(box);

            egret.Tween.get(box, { loop: true })
                .set({
                    visible: false,
                    alpha: 1,
                    scaleX: 0,
                    scaleY: 0
                })
                .wait(3000 * Math.random())
                .set({
                    visible: true
                })
                .to({
                    x: originX + 450 * Math.random() - 230,
                    y: originY - 500,
                    alpha: 1,
                    scaleX: 2,
                    scaleY: 2
                }, 1500 + 1000 * Math.random(), egret.Ease.circIn);
        }
    }

    private firstLoad: boolean = true;

    public onLoad() {
        console.log("load page(4)")
        if (this.firstLoad) {
            this.firstLoad = false;
            this.showWord(1, 334);
            egret.setTimeout(this.showWord, this, 100, 2, 438);
            egret.setTimeout(this.showWord, this, 200, -1, 496);
            egret.setTimeout(this.showWord, this, 300, 3, 516);

            egret.Tween.get(this.mainImage, { loop: true }).to({
                y: 650 + 10
            }, 1000, egret.Ease.sineInOut).to({
                y: 650
            }, 1000, egret.Ease.sineInOut);

            egret.Tween.get(this.mainImage2, { loop: true }).wait(200).to({
                y: this.mainImage2.y + 10
            }, 1000, egret.Ease.sineInOut).to({
                y: this.mainImage2.y
            }, 1000, egret.Ease.sineInOut);

            egret.Tween.get(this.mainImage3, { loop: true }).wait(400).to({
                y: this.mainImage3.y + 10
            }, 1000, egret.Ease.sineInOut).to({
                y: this.mainImage3.y
            }, 1000, egret.Ease.sineInOut);

            egret.Tween.get(this.mainImage4, { loop: true }).wait(600).to({
                y: this.mainImage4.y + 10
            }, 1000, egret.Ease.sineInOut).to({
                y: this.mainImage4.y
            }, 1000, egret.Ease.sineInOut);

            egret.Tween.get(this.mainImage5, { loop: true }).wait(800).to({
                y: this.mainImage5.y + 10
            }, 1000, egret.Ease.sineInOut).to({
                y: this.mainImage5.y
            }, 1000, egret.Ease.sineInOut);
        }
    }

    public onMove() {
    }

    private showWord(index: number, y): void {
        let word;
        if (index == -1) {
            word = new egret.Bitmap(RES.getRes("page_front_line_png"));
            word.width = 478;
        }
        else {
            word = new egret.Bitmap(RES.getRes("page_4_word" + index + "_png"));
        }
        this.addChild(word);
        word.x = CONST.WIDTH;
        word.y = y;

        egret.Tween.get(word).to({
            x: CONST.WIDTH - word.width >> 1
        }, CONST.TEXT_FADE_IN, CONST.TEXT_FADE_IN_EASE);
    }
}