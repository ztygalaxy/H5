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

class Info1 extends eui.Component {

    public imageGroup: eui.Group;

    constructor() {
        super();
        this.skinName = "skins.Info1Skin";
        this.verticalCenter = 0;
        this.horizontalCenter = 0;
        this.width = CONST.WIDTH;
        this.height = CONST.HEIGHT;
    }

    private containerList: Array<Container> = [];

    private scrollController: ScrollController;

    private buttonContainer = new egret.DisplayObjectContainer();

    //嘉宾列表
    private list0  = [1,   2,   3,   4,   5,   6,   7,   8,   9,   10,  11,  12];
    private list1  = [13,  14,  15,  16,  17,  18,  19,  20,  21,  22,  23,  24];
    private list2  = [25,  26,  27,  28,  29,  30,  31,  32,  33,  34,  35,  36];
    private list3  = [37,  38,  39,  40,  41,  42,  43,  44,  45,  46,  47,  48];
    private list4  = [49,  50,  51,  52,  53,  54,  55,  56,  57,  58,  59,  60];
    private list5  = [61,  62,  63,  64,  65,  66,  67,  68,  69,  70,  71,  72];
    private list6  = [73,  74,  75,  76,  77,  78,  79,  80,  81,  82,  83,  84];
    private list7  = [85,  86,  87,  88,  89,  90,  91,  92,  93,  94,  95,  96];
    private list8  = [97,  98,  99,  100, 101, 102, 103, 129, 104, 105, 106, 107];
    private list9  = [108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119];
    private list10 = [120, 121, 122, 123, 124, 125, 126, 127, 128];

    private pages:number = 11;

    public createChildren(): void {
        super.createChildren();

        this.buttonContainer.y = 1758;
        this.addChild(this.buttonContainer);

        this.validateNow();
        let width = this.imageGroup.width;
        this.imageGroup.mask = new egret.Rectangle(10, 0, width - 20, this.imageGroup.height);

        width += 200;

        let container = new Info1Container();
        container.speed = CONST.SPEED_BACKGROUND;
        this.containerList.push(container);
        this.imageGroup.addChild(container);
        //创建嘉宾
        for (let i = 0; i < this.pages; i++) {
            let c = new egret.DisplayObjectContainer();
            let list = this["list" + i];
            for (let i = 0; i < list.length; i++) {
                let head = new egret.Bitmap(RES.getRes("h" + list[i] + "_png"));
                head.x = i % 3 * 308 + 70;
                head.y = Math.floor(i / 3) * 391 + 10;
                c.addChild(head);
                let name = new egret.Bitmap(RES.getRes("w" + list[i] + "_png"));
                name.x = head.x + (236 - name.width >> 1);
                name.y = head.y + 267;
                c.addChild(name);
            }
            container.addChild(c);
            c.x = i * width;
            container.moveWidth += width;

            let button = new egret.Bitmap();
            this.addChild(button);
            button.x = i * 60;
            this.buttonContainer.addChild(button);
        }

        this.scrollController = new ScrollController(this.containerList);
        this.scrollController.dispatchPageLoaded(0);

        this.scrollController.key_frame = [];
        for (let i = 0; i < this.pages; i++) {
            this.scrollController.key_frame.push(width * CONST.SPEED_BACKGROUND * i);
        }
        this.scrollController.max_width = width * CONST.SPEED_BACKGROUND * this.pages;
        this.scrollController.circle_gap = width * CONST.SPEED_BACKGROUND;
        this.scrollController.generateKeyFrame();

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    }

    private touchX: number = NaN;

    private touchStartX: number = NaN;
    private touchStartTimer: number = NaN;

    private onTouchBegin(e: egret.TouchEvent): void {
        this.touchStartX = e.stageX;
        this.touchStartTimer = egret.getTimer();

        egret.Tween.removeTweens(this.scrollController);
    }

    private onTouchMove(e: egret.TouchEvent): void {
        if (this.touchX != this.touchX) {
            this.touchX = e.stageX;
        }
        this.scrollController.distance -= (e.stageX - this.touchX) * 15;
        this.touchX = e.stageX;
    }

    private onTouchEnd(e: egret.TouchEvent): void {
        this.touchX = NaN;

        let delteX = e.stageX - this.touchStartX;

        if (this.touchStartTimer) {
            let delteTimer = egret.getTimer() - this.touchStartTimer;
            let num = delteX / delteTimer;

            if (Math.abs(num) > 1.0) {
                if (num > 0) {
                    this.scrollController.turnToPrevFrame();
                } else {
                    this.scrollController.turnToNextFrame();
                }
            } else {
                if (Math.abs(delteX) >= CONST.WIDTH / 3) {
                    if (delteX > 0) {
                        this.scrollController.turnToPrevFrame();
                    } else {
                        this.scrollController.turnToNextFrame();
                    }
                } else {
                    this.scrollController.turnToNearestFrame();
                }
            }

            this.touchStartX = NaN;
            this.touchStartTimer = NaN;
        } else {
            if (Math.abs(delteX) >= CONST.WIDTH / 3) {
                if (delteX > 0) {
                    this.scrollController.turnToPrevFrame();
                } else {
                    this.scrollController.turnToNextFrame();
                }
            } else {
                this.scrollController.turnToNearestFrame();
            }
        }
    }

    public onLoad(id: number): void {
        for (let i = 0; i < this.buttonContainer.numChildren; i++) {
            if (i == id) {
                (<egret.Bitmap>this.buttonContainer.getChildAt(i)).texture = RES.getRes("btn_on_png");
            }
            else {
                (<egret.Bitmap>this.buttonContainer.getChildAt(i)).texture = RES.getRes("btn_off_png");
            }
        }

        this.buttonContainer.x = this.width - this.buttonContainer.width >> 1;
    }
}

class Info1Container extends Container {

    public moveWidth: number = 0;

    public move(distance: number): void {
        super.move(distance);
        this.fixPosition();
    }

    private fixPosition(): void {
        let leftChild = this.getChildAt(0);
        let rightChild = this.getChildAt(this.numChildren - 1);
        if (leftChild.localToGlobal(0, 0).x > 0) {
            rightChild.x -= this.moveWidth;
            this.addChildAt(rightChild, 0);
        }
        else if (rightChild.localToGlobal(0, 0).x < CONST.WIDTH) {
            leftChild.x += this.moveWidth;
            this.addChild(leftChild);
        }
    }

    public onPageLoaded(id: number): void {
        (<Info1>this.parent.parent).onLoad(id);
    }

    public onPageMoving(id: number): void {
    }
}