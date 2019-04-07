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

class ScrollController {

    private _tweenTimePerLen: number = CONST.TWEEN_TIME_PER_PIXEL;

    private _keyFramePosition = [];

    public circle_gap = CONST.CIRCLE_GAP;
    public max_width = CONST.MAX_WIDTH;
    public key_frame = CONST.KEY_FRAME;

    private circlePrev(): void {
        for (let i = 0; i < this._keyFramePosition.length; i++) {
            this._keyFramePosition[i] -= this.max_width;
        }
    }

    private circleNext(): void {
        for (let i = 0; i < this._keyFramePosition.length; i++) {
            this._keyFramePosition[i] += this.max_width;
        }
    }

    private containerList: Array<Container>;

    public constructor(containerList: Array<Container>) {
        this.containerList = containerList;

        this.generateKeyFrame();
    }

    public generateKeyFrame(): void {
        this._keyFramePosition.length = 0;
        for (let i = 0; i < this.key_frame.length; i++) {
            this._keyFramePosition.push(this.key_frame[i]);
        }
    }

    public moveForeground(value: number): void {
        let length = this.containerList.length;
        for (let i = 1; i < length; i++) {
            let obj = this.containerList[i];
            obj.move(value / obj.speed);
        }
    }

    private _distance: number = 0;

    public set distance(value) {
        let length = this.containerList.length;
        for (let i = 0; i < length; i++) {
            let obj = this.containerList[i];
            obj.move((this._distance - value) / obj.speed);
        }

        this._distance = value;

        this.dispatchPageMoving();
    }

    public get distance(): number {
        return this._distance;
    }

    // 吸附到最近的页面
    public turnToNearestFrame(): void {
        if (this._distance - this._keyFramePosition[this._keyFramePosition.length - 1] > this.circle_gap) {
            this.circleNext();
        }

        let num = Infinity, key = 0;
        for (let i = 0; i < this._keyFramePosition.length; i++) {
            let delta = Math.abs(this._keyFramePosition[i] - this._distance);
            if (num > delta) {
                num = delta;
                key = i;
            }
        }

        this.turnToFrame(key);
    }

    // 下一页
    public turnToNextFrame(): void {
        if (this._keyFramePosition[this._keyFramePosition.length - 1] <= this._distance) {
            this.circleNext();
        }

        let key = this._keyFramePosition.length - 1;
        for (let i = 0; i < this._keyFramePosition.length; i++) {
            if (this._keyFramePosition[i] - this._distance >= 0) {
                key = i;
                break;
            }
        }

        this.turnToFrame(key);
    }

    // 上一页
    public turnToPrevFrame(): void {
        if (this._keyFramePosition[0] >= this._distance) {
            this.circlePrev();
        }

        let key = 0;
        for (let i = this._keyFramePosition.length - 1; i >= 0; i--) {
            if (this._keyFramePosition[i] - this._distance <= 0) {
                key = i;
                break;
            }
        }

        this.turnToFrame(key);
    }

    // 跳转到指定页面
    public turnToFrame(key): void {
        let target: number = this._keyFramePosition[key];

        let delta: number = Math.abs(target - this._distance);

        // 计算需要移动的长度来控制动画时间
        let tweenTime = Math.max(this._tweenTimePerLen * delta, CONST.TWEEN_TIME_MIN);

        egret.Tween.get(this, undefined, undefined, true).to({
            distance: target
        }, tweenTime, CONST.TURN_PAGE_EASE).call(
            this.dispatchPageLoaded, this, [key]
            );
    }

    private activePage: number = 0;

    public dispatchPageLoaded(page: number): void {
        if ((<Background>this.containerList[0]).onPageLoaded) {
            (<Background>this.containerList[0]).onPageLoaded(page);
        }
        this.activePage = page;
    }

    public dispatchPageMoving(): void {
        if ((<Background>this.containerList[0]).onPageMoving) {
            (<Background>this.containerList[0]).onPageMoving(this.activePage);
        }
    }

}