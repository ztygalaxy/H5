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

class SoundDisplay extends egret.Bitmap {

    private onTexture = RES.getRes("sound_on_png");
    private offTexture = RES.getRes("sound_off_png");

    private sound: egret.Sound = RES.getRes("mp3_mp3");
    private soundChannel: egret.SoundChannel;

    constructor() {
        super();
        this.texture = this.onTexture;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.anchorOffsetX = 26;
        this.anchorOffsetY = 26;
        this.y = 70;
        this.x = CONST.WIDTH - 26 - this.width;
        this.scaleX = this.scaleY = 1.5;

        CONST.MAIN.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStage, this);
    }

    private onTouchStage(): void {
        CONST.MAIN.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStage, this);
        this.onTouch();
        this.onTouch();
    }

    private onFrame(): void {
        if (this.isOpen) {
            this.rotation += 1;
        }
    }

    private isOpen: boolean = true;

    private onTouch(): void {
        this.isOpen = !this.isOpen;
        this.onOpenChange();
    }

    private position = 0;

    private onOpenChange(): void {
        if (this.isOpen) {
            this.texture = this.onTexture;
            if (!this.soundChannel) {
                this.soundChannel = this.sound.play(this.position);
                this.soundChannel.volume = 0;
                egret.Tween.get(this.soundChannel).to({ volume: 1 }, 1000);
            }
        }
        else {
            this.texture = this.offTexture;
            if (this.soundChannel) {
                this.position = this.soundChannel.position;
                this.soundChannel.stop();
                egret.Tween.removeTweens(this.soundChannel);
                this.soundChannel = null;
            }
            this.rotation = 0;
        }
    }
}