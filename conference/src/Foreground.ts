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

class Foreground extends Container {

    private bitmap1: egret.Bitmap;
    private bitmap2: egret.Bitmap;
    private bitmap3: egret.Bitmap;
    private bitmap4: egret.Bitmap;
    private bitmap5: egret.Bitmap;
    private bitmap6: egret.Bitmap;

    private moveWidth: number = -350;

    public constructor(index: number, speed: number, resName: string, bitmapNum: number = 5, speacial?: boolean) {
        super();
        this.speed = speed;
        if (speacial) {
            for (let i = 1; i <= bitmapNum; i++) {
                let bitmap = new egret.Bitmap(RES.getRes(resName + "_1_png"));
                bitmap.x = this.moveWidth;
                this.moveWidth += bitmap.width + Math.ceil(Math.random() * 170);
                this.addChild(bitmap);
                this["bitmap" + i] = bitmap;
            }
        }
        else {
            for (let i = 1; i <= bitmapNum; i++) {
                let bitmap = new egret.Bitmap(RES.getRes(resName + "_" + i + "_png"));
                bitmap.x = this.moveWidth;
                this.moveWidth += bitmap.width;
                this.addChild(bitmap);
                this["bitmap" + i] = bitmap;
            }
        }
        this.y = CONST.HEIGHT;
        egret.Tween.get(this).wait(500).to({ y: this.y - this.height }, 600 + index * 250, egret.Ease.sineOut);
        this.fixPosition();
    }

    public move(distance: number): void {
        let length = this.numChildren;
        for (let i = 0; i < length; i++) {
            this.getChildAt(i).x += distance;
        }
        this.fixPosition();
    }

    private fixPosition(): void {
        let leftChild = this.getChildAt(0);
        let rightChild = this.getChildAt(this.numChildren - 1);
        if (leftChild.x > 0) {
            rightChild.x -= this.moveWidth;
            this.addChildAt(rightChild, 0);
        }
        else if (rightChild.x < CONST.WIDTH) {
            leftChild.x += this.moveWidth;
            this.addChild(leftChild);
        }
    }
}