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

class Info2 extends eui.Component {

    public scroller:eui.Scroller;

    public content:eui.Image;

    public btn1:eui.ToggleButton;
    public btn2:eui.ToggleButton;
    public btn3:eui.ToggleButton;
    public btn4:eui.ToggleButton;
    public btn5:eui.ToggleButton;

    private btns:Array<eui.ToggleButton>;

    constructor() {
        super();
        this.skinName = "skins.Info2Skin";
        this.verticalCenter = 0;
        this.horizontalCenter = 0;
        this.width = CONST.WIDTH;
        this.height = CONST.HEIGHT;

        this.initBtns();
    }

    private initBtns():void {
        this.btns = [this.btn1, this.btn2, this.btn3, this.btn4, this.btn5];

        for(let i = 0, l = this.btns.length; i < l; i++) {
            this.btns[i].selected = (i === 0);
            this.btns[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTaggle, this);
        }
    }

    private onTaggle(event:egret.TouchEvent) {
        let target = event.target;

        for(let i = 0, l = this.btns.length; i < l; i++) {
            if(this.btns[i] == target) {
                this.btns[i].selected = true;
                this.changeContent(i + 1);
            } else {
                this.btns[i].selected = false;
            }
        }
    }

    private changeContent(id): void {
        this.content.source = RES.getRes("info_2_detail_" + id + "_png");

        // 返回顶部
        this.scroller.viewport.scrollV = 0;
    }
}