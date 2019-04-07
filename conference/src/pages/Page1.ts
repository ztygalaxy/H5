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

class Page1 extends Page {

    private mainImage: egret.Bitmap;

    private mainImageTweenTime = 800;

    public constructor() {
        super(1);

        this.mainImage = new egret.Bitmap(RES.getRes("page_1_bg_png"));
        this.mainImage.x = CONST.WIDTH >> 1;
        this.addChild(this.mainImage);

        this.mainImage.anchorOffsetX = this.mainImage.width >> 1;
        this.mainImage.anchorOffsetY = this.mainImage.height >> 1;

        this.mainImage.y = 187 + this.mainImage.anchorOffsetY;

        this.mainImage.scaleX = this.mainImage.scaleY = 0.85;
        this.mainImage.alpha = 0;
        egret.Tween.get(this.mainImage).wait(1000)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, this.mainImageTweenTime, egret.Ease.circOut)
            .call(() => {
                egret.Tween.get(this.mainImage, { loop: true }).to({
                    y: this.mainImage.y + 20
                }, 2000, egret.Ease.sineInOut).to({
                    y: this.mainImage.y
                }, 2000, egret.Ease.sineInOut);
            });
    }

    private firstLoad: boolean = true;

    public onLoad() {
        console.log("load page(1)");
        if (this.firstLoad) {
            this.firstLoad = false;
            let time = 300;
            egret.setTimeout(this.showParticle, this, this.mainImageTweenTime + time);
            egret.setTimeout(this.showTime, this, this.mainImageTweenTime + time);
            egret.setTimeout(this.showWord, this, this.mainImageTweenTime + time + 200, 1, 1156);
            egret.setTimeout(this.showWord, this, this.mainImageTweenTime + time + 300, 2, 1214);
            egret.setTimeout(this.showWord, this, this.mainImageTweenTime + time + 400, 3, 1282);
        }
    }

    private system: particle.GravityParticleSystem;

    private showParticle(): void {
        this.system = new particle.GravityParticleSystem(RES.getRes("particle_png"), RES.getRes("particle_json"));
        this.addChildAt(this.system, 0);
        this.system.start();

        this.system.emitterX = this.mainImage.x;
        this.system.emitterY = this.mainImage.y;
    }

    private showWordComplete: boolean = false;

    private showWord(index: number, y): void {
        let word;
        if (index == -1) {
            word = new egret.Bitmap(RES.getRes("page_front_line_png"));
        }
        else {
            word = new egret.Bitmap(RES.getRes("page_1_word" + index + "_png"));
        }
        this.addChild(word);
        word.x = CONST.WIDTH - word.width >> 1;
        word.y = y;
        word.alpha = 0;

        egret.Tween.get(word).to({
            alpha: 1
        }, CONST.TEXT_FADE_IN, CONST.TEXT_FADE_IN_EASE).call(() => {
            if (index == 3) {
                this.showWordComplete = true;
            }
        });
    }

    private timeText = new egret.BitmapText();
    private partyTime = new Date("2016-12-10").getTime() + 3600000 * 3;

    private showTime(): void {
        this.timeText.letterSpacing = 4;
        this.timeText.font = RES.getRes("font_fnt");
        this.onFrame();
        this.timeText.y = 992;
        this.timeText.alpha = 0;
        this.addChild(this.timeText);
        egret.Tween.get(this.timeText).to({ alpha: 1 }, CONST.TEXT_FADE_IN).call(() => {
            egret.startTick(this.onFrame, this);
        });

        let bitmap1 = new egret.Bitmap(RES.getRes("page_1_word_countdown_png"));
        bitmap1.x = this.timeText.x - 50;
        bitmap1.y = this.timeText.y;
        this.addChild(bitmap1);
        egret.Tween.get(bitmap1).to({ alpha: 1 }, CONST.TEXT_FADE_IN);

        let bitmap2 = new egret.Bitmap(RES.getRes("page_1_word_day_png"));
        bitmap2.x = this.timeText.x + 126;
        bitmap2.y = this.timeText.y + 22;
        this.addChild(bitmap2);
        egret.Tween.get(bitmap2).to({ alpha: 1 }, CONST.TEXT_FADE_IN);
    }

    private hand: egret.Bitmap;
    private point: egret.Shape;

    private onFrame(): boolean {
        //更新时间
        let dt = Math.max(0, Math.floor((this.partyTime - Date.now()) / 1000));
        let second = dt % 60;
        let minutes = ((dt - second) / 60) % 60;
        let hours = (dt - minutes * 60 - second) / 3600;
        let days = Math.floor(hours / 24);
        hours -= days * 24;
        let text = this.fill(days) + " " + this.fill(hours) + ":" + this.fill(minutes);
        this.timeText.text = text;
        this.timeText.x = (CONST.WIDTH - this.timeText.width >> 1) + 30;

        if (!this.moved && this.showWordComplete && !this.hand) {
            //创建手势
            this.point = new egret.Shape();
            this.point.graphics.beginFill(0xffffff);
            this.point.graphics.drawCircle(0, 0, 20);
            this.point.graphics.endFill();
            this.addChild(this.point);

            this.hand = new egret.Bitmap(RES.getRes("page_1_hand_png"));
            this.hand.y = 1342;
            this.hand.x = (CONST.WIDTH - this.hand.width >> 1) + 210;
            this.addChild(this.hand);

            this.hand.scaleX = this.hand.scaleY = 1.3;
            egret.Tween.get(this.hand, { loop: true })
                .to({ scaleX: 1, scaleY: 1 }, 100)
                .wait(200)
                .wait(100)
                .to({ x: this.hand.x - 420 }, 1000, egret.Ease.quadInOut)
                .to({ alpha: .3 }, 200)
                .set({ visible: false })
                .wait(500);

            this.point.x = this.hand.x + 22;
            this.point.y = this.hand.y + 10;

            this.point.alpha = 0.5;
            this.point.visible = false;
            egret.Tween.get(this.point, { loop: true })
                .wait(100)
                .set({ visible: true })
                .to({ scaleX: 1.5, scaleY: 1.5 }, 200, egret.Ease.getBackOut(6))
                .wait(100)
                .to({ x: this.point.x - 420 }, 1000, egret.Ease.quadInOut)
                .to({ alpha: .3 }, 200)
                .set({ visible: false })
                .wait(500);
        }

        return false;
    }

    private moved: boolean = false;

    public onMove() {
        this.moved = true;
        if (this.hand) {
            this.hand.visible = false;
            egret.Tween.removeTweens(this.hand);
            this.point.visible = false;
            egret.Tween.removeTweens(this.point);
        }
    }

    private fill(number: number): string {
        let str = number + "";
        if (str.length < 2) {
            str = "0" + str;
        }
        return str;
    }
}