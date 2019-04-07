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

class Background extends Container {

    private moveWidth: number = 0;

    private pageClasses = [Page1, Page2, Page3, Page4];
    private pages: Array<Page> = [];

    public constructor() {
        super();
        this.speed = CONST.SPEED_BACKGROUND;
        for (let i = 0; i < 4; i++) {
            let page = new this.pageClasses[i];
            page.x = this.moveWidth;
            this.addChild(page);
            this.pages.push(page);
            this.moveWidth += CONST.WIDTH * 2;
        }
    }

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
        this.pages[id].onLoad();
    }

    public onPageMoving(id: number): void {
        this.pages[id].onMove();
    }
}