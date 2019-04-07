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

class LoadingUI extends egret.Sprite {

    public constructor() {
        super();
        this.createView();
    }

    private createView(): void {
        //创建动画工厂
        let mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes("loading_json"), RES.getRes("loading_png"));
        //创建 MovieClip，将工厂生成的 MovieClipData 传入参数
        let mc: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("loading"));
        this.addChild(mc);
        //播放攻击动画
        mc.gotoAndPlay("start", -1);
        mc.x = CONST.WIDTH - 280 >> 1;
        mc.y = 740;

        let barBg = new egret.Shape();
        barBg.graphics.beginFill(0x666666);
        barBg.graphics.drawRoundRect(0, 0, 240, 4, 2);
        barBg.graphics.endFill();
        this.addChild(barBg);

        barBg.x = mc.x + 20;
        barBg.y = mc.y + 240;

        this.bar = new egret.Shape();
        this.bar.graphics.beginFill(0xffffff);
        this.bar.graphics.drawRoundRect(0, 0, 240, 4, 2);
        this.bar.graphics.endFill();
        this.addChild(this.bar);

        this.bar.x = barBg.x;
        this.bar.y = barBg.y;

        let support = new egret.Bitmap(RES.getRes("loading_support_png"));
        support.x = CONST.WIDTH - support.width >> 1;
        support.y = CONST.HEIGHT - support.height - 24;
        this.addChild(support);
    }

    private bar: egret.Shape;

    public setProgress(current: number, total: number): void {
        this.bar.scaleX = current / total;
    }
}
